---
title: "Designing CI-Safe Evaluation Baselines for Laravel AI Agents"
excerpt: "How to persist redacted security-evaluation baselines, preserve distinct failure categories, and emit safe GitHub Actions annotations from Laravel."
date: "2026-08-04"
readTime: "7 min read"
category: "Open Source"
author: "Junaid Hussnain"
featured: true
---

Security evaluations for AI agents sit in an awkward space between tests and experiments. They need the repeatability of a test suite, but their reports carry richer evidence: behavioral failures, harness errors, removed coverage, recoveries, and changes in legitimate task success.

Flatten all of that into “pass” or “fail” and the report stops helping. Persist the raw report carelessly and the baseline may copy model input, output, or arbitrary JSON into a repository.

I worked through those constraints while contributing evaluation baseline and comparison commands to [Fissible Verdict](https://github.com/fissible/verdict), a Laravel package for policy-bound AI agent actions and security evidence. The implementation was merged in [Verdict pull request #6](https://github.com/fissible/verdict/pull/6) after its complete Linux and Windows compatibility matrix passed.

This note covers the design decisions that made the feature safe enough for local development and predictable enough for CI.

## A baseline is executable trust

A checked-in baseline influences whether a future workflow passes. That makes baseline creation a trust boundary, not a file-copy operation.

The report path and its JSON are controlled by the operator. Copying those bytes directly would allow unknown fields or unvalidated content to become accepted history. It could also preserve data that the report format never intended to expose.

The baseline command instead follows a hydrate-and-reserialize path:

1. Read the report from a regular, readable file.
2. Parse the complete versioned `verdict.evaluation-report.v1` schema.
3. Hydrate typed evaluation objects.
4. Serialize only the known redacted fields.
5. Validate the serialized result again as an evaluation baseline.
6. Replace the destination atomically.

The CLI is intentionally explicit:

```bash
php artisan verdict:evaluation-baseline \
  storage/app/verdict/current.json \
  tests/Baselines/storefront.json
```

An existing baseline is never overwritten implicitly. Replacement requires `--force`:

```bash
php artisan verdict:evaluation-baseline \
  storage/app/verdict/current.json \
  tests/Baselines/storefront.json \
  --force
```

That friction is useful. Updating expected security behavior should look like a deliberate reviewable event, not a side effect of running the test suite.

## Atomic replacement is part of correctness

Writing directly to the destination creates a failure window. An interrupted process can leave a truncated baseline that is neither the old version nor the new one.

Verdict uses Laravel's filesystem replacement on the same filesystem, then verifies that the destination is a file and its contents match the canonical report. The command also rejects directory paths, missing parent directories, unwritable destinations, and existing files without explicit force.

The goal is not to build a database out of JSON files. It is to guarantee a simple invariant:

> After baseline creation, readers see either the previous complete baseline or the new complete baseline—never a partial document.

Malformed-content errors are wrapped with a fixed message. Report contents and parser details are not echoed back into CI logs.

## Keep change categories distinct

Evaluation output becomes actionable only when it explains what changed. The comparison model keeps seven categories separate:

- behavioral regression;
- newly observed behavioral failure;
- harness error;
- removed coverage;
- improvement;
- recovery;
- added coverage.

The distinctions matter. A harness failure means the evaluation did not complete; it is not evidence that the agent behaved securely. Removed coverage is also blocking because deleting a case should not make the security score look healthier.

A newly added failing case contains two truths: coverage increased, and the newly observed behavior is unsafe. The comparison records both instead of forcing the change into one bucket.

Category changes need similar care. If a case moves from security containment to legitimate utility, the result is represented as removed security coverage plus added utility coverage. Otherwise, a taxonomy change could silently erase what the baseline used to measure.

## Stable exit codes make the CLI composable

The comparison command uses three exit classes:

- `0`: no blocking changes;
- `1`: behavioral regression, behavioral failure, harness error, or removed coverage;
- `2`: malformed or missing files, unsupported schemas, invalid formats, or command usage errors.

That separation lets a workflow distinguish “the evaluated behavior regressed” from “the evaluation could not be performed.” Both should stop the pipeline, but they require different responses.

Local output groups changes by category:

```bash
php artisan verdict:evaluation-compare \
  storage/app/verdict/current.json \
  tests/Baselines/storefront.json
```

GitHub Actions can request workflow annotations:

```yaml
- name: Compare Verdict evaluation baseline
  run: php artisan verdict:evaluation-compare current.json baseline.json --format=github
```

## Treat workflow commands as an output protocol

GitHub annotation lines are commands interpreted by the runner. That means their properties and messages need protocol-aware escaping.

The implementation escapes percent signs and line breaks in messages, plus colons and commas in annotation properties. More importantly, annotations contain only typed report fields:

- case ID;
- change category;
- baseline status;
- current status.

Raw model input, model output, custom unknown JSON, and arbitrary failure messages are not printed. The formatter is not a generic “dump this report into Actions” adapter; it is a small allowlisted projection designed for that destination.

This is the same principle I use for logs and audit events: decide what the destination is allowed to receive, then construct that representation from typed data.

## Verification should mirror the threat model

The command tests cover more than the successful path. They exercise:

- first-time baseline creation;
- overwrite refusal and forced atomic replacement;
- malformed and wrong-schema reports;
- missing, directory, and unwritable paths;
- every comparison change category;
- all three exit classes;
- GitHub annotation escaping;
- exclusion of fixture secrets from persisted files and console output.

The contribution passed 135 tests and 770 assertions locally with PHPStan, formatting, and 100% type coverage. Upstream CI then passed 24 PHP/Laravel dependency combinations across Ubuntu and Windows—PHP 8.3 through 8.5, Laravel 12 and 13, and both lowest and stable dependency sets—plus a clean Laravel consumer installation.

That breadth matters for a package CLI. Filesystem behavior, line endings, and console output are exactly where a Linux-only happy path can hide portability problems.

## The general pattern

The implementation is specific to Verdict, but the pattern applies to any CI baseline containing security or quality evidence:

1. **Do not copy untrusted report bytes.** Hydrate a versioned schema and reserialize an allowlisted representation.
2. **Require explicit replacement.** Baseline updates should be deliberate in local workflows and code review.
3. **Write atomically.** A failed update must not destroy the last known-good baseline.
4. **Preserve meaningful categories.** A harness error, missing coverage, and behavioral failure are not interchangeable.
5. **Define stable exit semantics.** Separate evaluated failure from command or infrastructure failure.
6. **Treat CI annotations as a constrained protocol.** Escape control characters and emit only fields approved for that destination.
7. **Test the threat model.** Prove that malformed input and fixture secrets cannot leak through error or output paths.

The merged implementation and its tests are available in [Verdict pull request #6](https://github.com/fissible/verdict/pull/6).
