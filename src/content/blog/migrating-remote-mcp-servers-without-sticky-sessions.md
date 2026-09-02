---
title: "Migrating Remote MCP Servers Without Sticky Sessions"
excerpt: "A practical migration plan for MCP 2026-07-28 across stateless HTTP, explicit workflow state, gateway routing, caching, multi-step tools, and OAuth validation."
date: "2026-09-02"
readTime: "10 min read"
category: "AI Infrastructure"
author: "Junaid Hussnain"
featured: true
---

The Model Context Protocol's 2026-07-28 revision removes the `initialize` handshake, the `initialized` notification, and the `Mcp-Session-Id` header from its modern HTTP flow. Each request carries its own protocol version, client identity, and capabilities. In protocol terms, a remote MCP server can now sit behind an ordinary round-robin load balancer without transport-level session affinity.

That is a useful architectural change, but “stateless protocol” does not mean “stateless application.” A tool may still coordinate a long-running import, wait for approval, or retain tenant-scoped data. The difference is that this state can no longer hide behind a connection or session header.

I would therefore treat MCP 2026-07-28 as a state-model migration, not an SDK update. The goal is to make every dependency between requests explicit, authenticated, and testable while preserving a controlled path for older clients.

## Inventory what the session was doing

Before changing the transport, I would search the server for every assumption attached to the old session:

- maps, caches, or temporary files keyed by `Mcp-Session-Id`;
- client capabilities or identity retained from `initialize`;
- server-to-client requests for elicitation, sampling, or roots;
- an HTTP GET stream kept open for later notifications;
- load-balancer affinity or a shared session store;
- cleanup jobs triggered when a connection closes.

These responsibilities do not all need the same replacement. Client metadata now arrives with each request. A multi-step interaction uses Multi Round-Trip Requests. A durable business operation needs application storage and an explicit handle. Notifications use the protocol's subscription mechanism where supported.

This classification matters because moving the entire old session object into Redis would preserve the hidden coupling while adding a network dependency. The new protocol provides an opportunity to give each piece of state the lifetime and trust boundary it actually needs.

## Negotiate the new protocol deliberately

Upgrading the TypeScript SDK to v2 does not automatically put 2026-07-28 messages on the wire. The [official SDK migration guide](https://ts.sdk.modelcontextprotocol.io/v2/migration/support-2026-07-28) says the default client behavior remains the 2025-era `initialize` exchange.

For a client that must work with both generations, the first rollout can enable automatic negotiation:

```ts
const client = new Client(
  { name: "operations-console", version: "1.0.0" },
  { versionNegotiation: { mode: "auto" } },
)

await client.connect(transport)

console.log(client.getProtocolEra()) // "modern" or "legacy"
```

In automatic mode, the client probes with `server/discover` and falls back to the older handshake when the server only supports the legacy protocol. A later release can pin `2026-07-28` and fail closed when legacy behavior is no longer acceptable.

On the server, `createMcpHandler(factory)` creates a fresh server for every modern HTTP request and can also serve stateless 2025-era traffic. If the existing legacy path depends on real sessions, I would keep that handler temporarily and route older requests to it before the strict modern handler:

```ts
const modern = createMcpHandler(buildServer, { legacy: "reject" })

export default {
  async fetch(request: Request) {
    if (await isLegacyRequest(request)) {
      return legacySessionfulHandler(request)
    }

    return modern.fetch(request)
  },
}
```

This creates a useful rollback boundary. Modern requests exercise the new architecture; legacy clients keep the known path until telemetry shows they can be retired.

## Replace hidden state with the right explicit handle

There are two different kinds of state to model.

The first is durable application state. If `start_import` creates work that may outlive one request, it should return an operation identifier:

```json
{
  "operationId": "imp_01K4M6V8Q2",
  "status": "queued"
}
```

A later `get_import` call includes that identifier as a normal tool argument. The server loads the operation under the authenticated tenant, rather than trusting the identifier to establish ownership. The handle makes the workflow visible to the model, logs, tests, and authorization layer.

The second is short-lived interaction state. The new Multi Round-Trip Request flow lets a handler return `input_required`; the client gathers the requested input and retries the original operation with `inputResponses` and an opaque `requestState` value.

The TypeScript SDK is explicit about the trust boundary: `requestState` passes through the client and is therefore untrusted. It should be integrity-protected, bound to the principal and original operation, and given an expiry. The SDK's `createRequestStateCodec` helper signs state but does not encrypt it, so secrets and sensitive payloads do not belong inside the token.

For a tool that needs approval, I would model phases rather than infer progress from whichever fields happen to return:

```ts
type DeleteFlow =
  | { step: "awaiting-confirmation"; projectId: string }
  | { step: "approved"; projectId: string; approvalId: string }
```

Each retry verifies the state, switches on `step`, accepts only the response expected for that phase, and authorizes the destructive action again. Approval state is evidence for the flow; it is not a substitute for current authorization.

## Make the gateway understand MCP without trusting it blindly

Modern Streamable HTTP requests include `MCP-Protocol-Version`, `Mcp-Method`, and, for named operations, `Mcp-Name`. A gateway can route `tools/call` separately, apply tool-specific rate limits, or produce bounded usage metrics without parsing every JSON-RPC body.

For example, a policy can meter calls where:

```text
Mcp-Method: tools/call
Mcp-Name: search
```

Those headers are still client input. They are useful for dispatch and early rejection, but an authorization decision must also use authenticated identity and the server's tool policy. The TypeScript SDK validates the standard headers against the request body and rejects missing or conflicting values on modern requests. A custom gateway or transport should preserve the same invariant instead of trusting whichever representation is more convenient.

I would test the gateway with three negative cases: a missing protocol-version header, a method header that disagrees with the JSON-RPC method, and a tool name that disagrees with `params.name`. These are cheap tests that prevent routing, metrics, and execution from describing three different requests.

## Treat cache hints as an authorization decision

The protocol now adds `ttlMs` and `cacheScope` to cacheable discovery and list results, including `tools/list`, `prompts/list`, `resources/list`, and `resources/read`. This can reduce repeated catalog fetches and keep ordering stable, but it also creates a new place to leak tenant-specific capabilities.

The TypeScript SDK defaults to `ttlMs: 0` and `cacheScope: "private"`, which is the right starting point. I would only increase the lifetime after answering:

- Does this result change with the authenticated user, tenant, scopes, plan, or feature flags?
- What event invalidates the cached catalog?
- Is the cache key partitioned by every security-relevant input?
- Can removing a tool or resource take effect before the advertised lifetime ends?

Public caching should be reserved for content that is genuinely identical across principals. A fast `tools/list` response is not worth exposing the existence of an internal tool to the wrong tenant.

## Harden OAuth in the same migration

The [2026-07-28 authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) tightens the authorization-code flow around issuer identity. Before redirecting, the client records the issuer from validated authorization-server metadata. When the authorization response includes `iss`, the client must compare it with the recorded issuer before sending the code to a token endpoint.

The comparison is intentionally strict: no host case folding, trailing-slash cleanup, default-port removal, or other normalization. If the issuer does not match, the client stops. This closes an authorization-server mix-up path where a code could otherwise be sent to the wrong token endpoint.

The same revision formally deprecates Dynamic Client Registration in favor of Client ID Metadata Documents, while keeping DCR for compatibility. I would not combine these changes into one irreversible release. First add issuer recording and validation with tests, then introduce the preferred registration mechanism, and only remove DCR after client compatibility is visible.

## Prove the server is stateless under failure

A happy-path call to one local process proves very little. My migration gate would cover the properties the old session previously supplied:

1. Send consecutive calls from one workflow to different server instances with no affinity cookie.
2. Restart an instance between `input_required` and the retry.
3. Reject modified, expired, cross-tenant, and wrong-operation `requestState` values.
4. Retry a side-effecting tool with the same application idempotency key and verify it does not execute twice.
5. Exercise both modern and legacy clients through the same public endpoint.
6. Verify header/body mismatches fail before tool execution.
7. Confirm private list results never cross identity or tenant cache keys.
8. Test issuer match, mismatch, absence, and metadata-advertisement combinations from the authorization specification.

I would also record the negotiated protocol era, method, tool name, server instance, cache outcome, and workflow operation ID in structured telemetry. These fields make it possible to distinguish a protocol negotiation problem from an application-state problem without logging prompts, credentials, or raw tool arguments.

## Remove compatibility in a separate release

The [release announcement](https://blog.modelcontextprotocol.io/posts/2026-07-28/) defines a minimum twelve-month deprecation window for retired features. That is time to migrate deliberately, not a reason to operate both paths indefinitely.

Once modern traffic is stable, I would pin selected clients to 2026-07-28, remove load-balancer affinity, watch for legacy handshakes, and set a dated removal threshold. Deleting the old handler, session store, and fallback negotiation should be its own reviewed change with a production rollback plan.

The most valuable outcome is not fewer session headers. It is a system where workflow state, authorization, caching, retries, and compatibility are visible in the contracts instead of being accidental properties of one long-lived connection.
