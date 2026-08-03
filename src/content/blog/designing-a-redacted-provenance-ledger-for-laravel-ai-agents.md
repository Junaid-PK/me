---
title: "Designing a Redacted Provenance Ledger for Laravel AI Agents"
excerpt: "How to track which user, retrieval, tool, and application inputs entered an agent invocation without turning observability into a second store of sensitive content."
date: "2026-08-04T02:30:00+05:00"
readTime: "9 min read"
category: "Security Engineering"
author: "Junaid Hussnain"
featured: true
---

An agent invocation rarely contains only a user's message. It may also include retrieved documents, tool responses, application state, stored memory, and instructions assembled by several components.

When something goes wrong, “this prompt produced that result” is not enough evidence. We need to know which labeled inputs entered the invocation and where they came from. The obvious answer—log the rendered prompt—creates a different problem: the observability system becomes another database of prompts, documents, API results, filenames, URLs, and personal information.

I worked through that boundary while contributing a redacted provenance ledger to [Fissible Verdict](https://github.com/fissible/verdict), a Laravel package for policy-bound agent actions and security evidence. The implementation is open in [Verdict pull request #7](https://github.com/fissible/verdict/pull/7). Its complete PHP 8.3–8.5, Laravel 12/13, Ubuntu, and Windows matrix is green, together with a clean Laravel consumer installation.

This note explains the core model, where the redaction boundary sits, and what deterministic fingerprints can—and cannot—prove.

## Provenance is more than a correlation ID

A correlation ID can group events from one invocation. It cannot explain the role of each input.

Consider four values that all appear as text by the time they reach a model:

- a customer's current question;
- a product description retrieved from a search index;
- an order status returned by a tool;
- an application-defined tenant identifier.

Those values have different sources, trust levels, classifications, and paths into the invocation. Flattening them into one string discards the facts an incident review needs most.

The ledger therefore records four explicit dimensions for every input:

```php
enum ContextChannel: string
{
    case UserInput = 'user_input';
    case RetrievedDocument = 'retrieved_document';
    case ToolResult = 'tool_result';
    case ApplicationContext = 'application_context';
}
```

The channel says how the value entered the invocation. It does not decide whether the value is safe. A retrieved document is not automatically untrusted, and a value created inside the application is not automatically trustworthy.

That decision remains explicit at the call site:

```php
$entry = Verdict::provenance()->record(
    correlationId: 'invocation-01J4Z8X9',
    source: Source::external('knowledge-base'),
    trust: Trust::Untrusted,
    dataClass: DataClass::Internal,
    channel: ContextChannel::RetrievedDocument,
    content: [
        'title' => $document->title,
        'body' => $document->body,
    ],
    componentLabel: 'catalog-retriever',
    componentVersion: 'v2.1.0',
);
```

Verdict does not infer trust from the source or channel. That is deliberate. A framework cannot know that an external catalog was curated, that an internal cache was not poisoned, or that a tool result came from the tenant the current principal may access.

## Put the fingerprint boundary before the recorder

Redacting inside a database adapter is too late. A custom recorder, queue job, event listener, debug serializer, or in-memory implementation could observe the raw value before the database hashes it.

The safer boundary is earlier:

```text
raw scalar or structured content
    -> canonical normalization
    -> SHA-256 fingerprint
    -> immutable ProvenanceEntry
    -> EvidenceRecorder
```

Only the fingerprint crosses the recorder interface. `ProvenanceEntry` has no property capable of holding the original content or component version.

That gives the recorder contract a useful invariant: if a recorder can serialize the entry, it still cannot serialize the raw prompt, document body, or tool result because those values are already gone.

Recorder failures also remain failures. The ledger creates the redacted entry, calls the configured recorder, and returns only after the recorder succeeds. An exception is allowed to propagate; it is never converted into a successful provenance result.

## Canonicalization makes structured evidence comparable

Hashing a string is straightforward. Hashing structured content requires a stable representation.

These two arrays carry the same information:

```php
[
    'query' => 'red shoes',
    'filters' => ['stock' => true, 'price' => 10.0],
]

[
    'filters' => ['price' => 10.0, 'stock' => true],
    'query' => 'red shoes',
]
```

Their fingerprints should match even though their associative keys were inserted in a different order. The canonicalizer recursively sorts associative keys before JSON encoding and preserves zero fractions so `10` and `10.0` remain different values.

List order stays significant. `['first', 'second']` is not the same input as `['second', 'first']`.

The accepted content surface is intentionally small: strings, integers, floats, booleans, `null`, and nested native arrays containing those values. Arbitrary objects are rejected instead of depending on mutable public properties, serializer hooks, or framework-specific conversion rules.

That narrow contract makes a fingerprint reproducible across recorder implementations without teaching the provenance layer about Eloquent models, HTTP responses, provider DTOs, or document classes.

## Keep stable labels readable and version values redacted

The optional component metadata separates two concerns:

- `componentLabel` is a readable, stable identifier such as `catalog-retriever`;
- `componentVersion` is fingerprinted before it enters the evidence record.

This makes it possible to group evidence by a known component without persisting a build value that may contain internal metadata. A version cannot be supplied without a component label because an unlabelled version fingerprint has no useful meaning.

Correlation, component, and version identifiers use the same restricted alphabet as Verdict's existing context routes: letters, numbers, dots, underscores, and hyphens. Colons, slashes, whitespace, and URL-shaped values are rejected. Besides avoiding ambiguous composite identifiers, this makes it harder to accidentally use a filename or endpoint as a “label.”

The restriction is not a privacy guarantee. A developer can still put a sensitive alphanumeric value into a label. The API and documentation make the responsibility explicit: labels are durable evidence and must be non-sensitive by design.

## One recorder contract, three storage behaviors

Verdict already supported null, in-memory, and database evidence recorders. Provenance extends the same contract rather than introducing a parallel storage subsystem.

The behaviors are intentionally different:

- the null recorder discards entries because Verdict cannot choose an application's retention destination safely;
- the in-memory recorder supports deterministic tests and local development, but remains unsafe for long-running workers or tenant-separated production use;
- the database recorder persists redacted entries and retrieves them by correlation ID.

Correlation reads always filter on both record type and correlation ID. Decision evidence sharing the same identifier cannot be mixed into the provenance result, and another invocation's inputs stay separate.

The database schema change is additive. It adds nullable channel, component label, component fingerprint, and content fingerprint columns to the existing evidence table. Existing action-decision and context-release rows remain valid. A migration test creates a pre-upgrade decision row, applies the new migration, and proves that the row survives unchanged.

## A hash is correlation, not anonymization

Deterministic fingerprints answer a bounded question:

> Did these two observations contain the same canonical value?

They do not make predictable values private.

If an attacker suspects that a fingerprint represents one of a few order states, email addresses, short prompts, filenames, or version strings, they can hash those guesses and compare the results. SHA-256 resists reversing a random high-entropy value; it does not add entropy to a guessable one.

That means a content fingerprint is:

- useful for equality checks and evidence correlation;
- safe from accidental raw-value logging at the recorder boundary;
- not encryption;
- not anonymization;
- not proof that the content was trustworthy;
- not proof that the database record is immutable.

The database adapter is an ordinary mutable evidence store. It is not signed, append-only, or tamper-evident. Applications still own access control, tenant isolation, encryption at rest, retention, export, and deletion policy.

## Explicit instrumentation has an honest visibility limit

The core ledger records only the inputs an application passes to it. It does not reconstruct a rendered prompt, observe hidden provider transformations, inspect model internals, or recover provenance after an integration discards its labels.

That limitation is preferable to a false claim of complete visibility.

Automatic Laravel AI middleware and listener integration belongs in a separate layer. Keeping it outside the core model made this contribution independently testable: the channels, labels, fingerprints, recorder behavior, database migration, and failure semantics can all be verified without calling a model.

## Verification followed the data-flow threat model

The contribution's tests cover the places raw content could survive or records could become ambiguous:

- canonical fingerprints for nested associative content;
- significant list order and scalar types;
- rejection of unsupported objects;
- all four context channels;
- invalid correlation, component, and version labels;
- component-version pairing;
- absence of raw content and raw version values from entry serialization;
- absence of raw prompt, document, and tool-result values from database rows;
- correlation filtering across invocations;
- null, in-memory, and database recorder behavior;
- propagation of recorder failures;
- preservation of existing evidence through the additive migration;
- facade and scoped-container resolution.

Locally, the complete Verdict suite passed 152 tests and 834 assertions with PHPStan, formatting, and 100% type coverage. Upstream then passed 24 PHP/Laravel combinations across Linux and Windows plus a clean Laravel consumer installation.

## The reusable design rule

The broader lesson is not “hash your prompts.” It is to decide where sensitive data must stop existing in your observability path.

For a redacted provenance system:

1. Require callers to supply source, trust, classification, and channel labels explicitly.
2. Canonicalize structured values before hashing them.
3. Remove raw content before crossing recorder, queue, event, or storage boundaries.
4. Keep readable labels narrow, stable, and non-sensitive.
5. Treat deterministic hashes as correlation aids rather than privacy controls.
6. Let recorder failures remain application faults.
7. Document what the integration cannot observe.
8. Test serialization and persisted rows for the exact values that must never survive.

The implementation, tests, migration, and review history are available in [Verdict pull request #7](https://github.com/fissible/verdict/pull/7). The pull request is open and fully green; this note describes the submitted implementation rather than a released package feature.
