---
title: "Building Big Software That Stays Small"
excerpt: "How narrow contracts, explicit ownership, and evidence-driven boundaries keep PHP systems changeable as their responsibilities grow."
date: "2025-09-15"
updated: "2026-08-04"
readTime: "9 min read"
category: "Engineering"
author: "Junaid Hussnain"
featured: false
---

Large software is not difficult because it contains many lines. It is difficult when a small change requires understanding too many unrelated decisions.

The useful measure of size is **change radius**: how much of the system must be inspected, coordinated, tested, and deployed to alter one behavior safely?

A system can grow in capability while keeping that radius small. The work is less about adding layers and more about creating boundaries that carry real responsibility.

## Begin with behavior, not folders

`Controllers`, `Services`, and `Repositories` describe technical roles. They do not reveal which business capability owns a rule.

A stronger module boundary groups the decisions that change together. In an operations product, invoicing, workforce payments, bank movements, and access control may share infrastructure while remaining separate capabilities. Each capability should own:

- its rules and invariants;
- its application operations;
- the data it is allowed to change;
- the events or results it exposes;
- the tests that prove its public behavior.

Framework code can still exist at the edge. The important part is that a request handler delegates to one clear capability instead of orchestrating rules from several unrelated directories.

## Make contracts smaller than implementations

An interface is valuable when it protects a decision boundary. It is not valuable merely because every class can have one.

Suppose the application needs to store generated reports. The application contract can describe that behavior without exposing an SDK:

```php
interface ReportStore
{
    public function put(ReportName $name, string $contents): StoredReport;

    public function find(ReportName $name): ?StoredReport;
}
```

The contract says nothing about S3, a local disk, signed URLs, or framework filesystem types. An adapter can use any of those. Callers depend on the application’s language, not the vendor’s language.

The rule is not “wrap every dependency.” Wrap dependencies where vendor types or behavior would otherwise spread into business code. A direct framework call in one delivery adapter may be simpler and safer than a speculative abstraction.

## Keep invariants close to the state they protect

Validation at an HTTP boundary protects one request. A domain invariant must survive every entry point: HTTP, CLI, queue, import, and test setup.

Value objects are useful when they make invalid states harder to express:

```php
final class Money
{
    public function __construct(
        public readonly int $minorUnits,
        public readonly Currency $currency,
    ) {
        if ($minorUnits < 0) {
            throw new InvalidArgumentException('Money cannot be negative.');
        }
    }
}
```

Not every scalar needs a class. Promote a value when it has rules, units, formatting, comparison behavior, or enough meaning that mixing it with another scalar would be dangerous.

## Test the boundary, not every private step

Tests become expensive when they mirror implementation structure. A refactor then breaks the test suite even though the public behavior is unchanged.

For each module, prefer a small set of tests around observable contracts:

- accepted commands produce the expected state or result;
- invalid commands fail with a stable error;
- authorization rules hold at the capability boundary;
- external adapters satisfy a shared contract suite;
- important persistence and serialization shapes remain compatible.

Use unit tests where a dense rule benefits from fast examples. Use integration tests where the risk lives in wiring, database behavior, framework configuration, or a third-party boundary. The test type should follow the failure mode.

## Make ownership visible

A boundary without ownership becomes a suggestion. The repository should make it easy to answer:

- Who reviews changes to this capability?
- Which public contracts must remain compatible?
- Which data does the module own?
- Which other modules consume its output?
- How is it observed in production?

Ownership does not require a large team. Even a solo engineer benefits from writing these answers down because they reduce the amount of context that must be reconstructed later.

## Extract only after the seam is real

Moving a module into a package or service too early creates distribution work without proving independence.

A safer extraction sequence is:

1. identify a capability with a narrow public surface;
2. stop other code from reading its tables or internal classes directly;
3. move calls behind explicit commands, queries, or events;
4. add contract tests;
5. observe its load and release needs;
6. extract only if independent ownership, deployment, or scaling repays the cost.

This approach preserves the option to split without paying for the split on day one.

## Watch for false modularity

Several patterns look organized while keeping the change radius large:

- a shared `Common` package containing business decisions from every module;
- interfaces that simply duplicate a concrete class method for method;
- events used for synchronous work that must succeed in one transaction;
- services that share a database and reach into each other’s tables;
- a “domain” layer filled with framework and transport types;
- generic repositories that hide the queries a capability actually needs.

The test is simple: can one capability change without coordinated edits across unrelated areas? If not, the folder structure is not a boundary.

## Small is an operating property

Architecture diagrams cannot keep software small by themselves. The property comes from repeated habits:

- name the capability that owns each rule;
- expose the minimum useful contract;
- keep units and invariants explicit;
- test observable behavior;
- record why a boundary exists;
- introduce new infrastructure only when evidence justifies it.

Big software stays manageable when each change has an obvious home, a limited blast radius, and a verification path. That is a more durable definition of “small” than a line count or a microservice count.
