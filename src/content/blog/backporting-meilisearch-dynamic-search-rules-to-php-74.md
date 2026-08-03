---
title: "Backporting Meilisearch Dynamic Search Rules Without Dropping PHP 7.4"
excerpt: "A field note on moving a modern Meilisearch PHP feature onto v1.x while preserving its public conventions, PHP 7.4 support, and a green integration suite."
date: "2026-08-04"
readTime: "8 min read"
category: "Open Source"
author: "Junaid Hussnain"
featured: true
---

Open-source backports look deceptively mechanical. Find the newer commit, copy the files, resolve a few conflicts, and open a pull request.

That approach works only when the source and target branches still speak the same language. In practice, the feature may depend on contracts, runtime syntax, test infrastructure, and API conventions that did not exist on the older branch.

I ran into exactly that while working on [Meilisearch PHP issue #911](https://github.com/meilisearch/meilisearch-php/issues/911). The task was to bring Dynamic Search Rules from the mainline client to `v1.x`, including the Meilisearch 1.50 behavior, without breaking the branch's PHP 7.4 support.

The implementation is available in [pull request #942](https://github.com/meilisearch/meilisearch-php/pull/942). The pull request is still open, so this note describes the engineering and verification behind the proposed change rather than presenting it as a released feature.

## Start with the target branch, not the source patch

The two upstream changes provided the feature's intended behavior, but the `v1.x` branch had different foundations:

- asynchronous operations returned task arrays rather than a modern `Task` contract;
- PHP 7.4 remained part of the supported test matrix;
- some newer typed contracts and enums did not exist;
- the integration environment still pointed at a generic latest Meilisearch image;
- dormant static-analysis issues had surfaced as development dependencies moved forward.

The useful question was not “How do I copy the newer implementation?” It was “What would this feature look like if it had been designed inside v1.x?”

That framing prevented a much larger and riskier backport of the newer task architecture.

## Preserve the branch's public conventions

On the current branch, Dynamic Search Rules operations return task objects. Backporting that API literally would have introduced a second task model into `v1.x`, or forced an unrelated architectural migration.

Instead, the asynchronous methods return the same task-array shape already used by the branch's index and document APIs:

```php
$task = $client->updateDynamicSearchRule(
    (new UpdateDynamicSearchRuleQuery('movie-promotion'))
        ->setDescription('Promote the featured movie')
        ->setActions([
            [
                'selector' => [
                    'indexUid' => 'movies',
                    'id' => '299537',
                ],
                'action' => [
                    'type' => 'pin',
                    'position' => 0,
                ],
            ],
        ])
);

$client->waitForTask($task['taskUid']);
```

That gives users the new capability without changing how they reason about asynchronous work elsewhere in the same major version.

Backwards compatibility is often less about retaining old internals and more about preserving a coherent mental model.

## Translate syntax without weakening types

The source implementation used language features newer than PHP 7.4, including constructor property promotion, `readonly`, and the null-safe operator. Removing those features is straightforward; keeping the contracts precise takes more care.

The backport uses explicit typed properties and constructors while retaining detailed PHPStan shapes for:

- rule selectors and pin actions;
- query and time conditions;
- paginated rule responses;
- optional update fields that may be deliberately set to `null`;
- asynchronous task responses.

The update query tracks whether each setter was called. That distinction matters because “omit this field” and “send this field as null” have different meanings in a patch request.

```php
$query = (new UpdateDynamicSearchRuleQuery('movie-promotion'))
    ->setDescription(null)
    ->setPrecedence(null);

// Both keys must remain in the payload.
$query->toArray();
```

A broad `array<string, mixed>` would have made the port quicker, but it would also discard one of the main benefits of a client library: catching malformed API payloads before they cross the network boundary.

## Test against the server version that owns the behavior

Dynamic Search Rules are exposed by Meilisearch Enterprise, and the requested backport includes behavior from Meilisearch 1.50. The integration environment therefore needed to use the enterprise `v1.50.0` image and enable the required experimental IP configuration.

Changing the server image uncovered old expectations elsewhere in the suite. Ranking-rule names had evolved, and a federated-search fixture no longer produced deterministic ordering. Those failures were not caused by the new endpoint, but leaving them unresolved would guarantee a red pull request.

I updated the affected fixtures to match the same 1.50 behavior already exercised by the main branch. On a cold first run, several embedding tests also timed out while their model resources were being prepared. Re-running on the warmed service separated environmental startup cost from persistent failures.

The final verification covered:

- 480 integration tests;
- 1,528 assertions;
- 3 intentional skips;
- 14 focused Dynamic Search Rules tests with 37 assertions;
- the full PHPStan analysis;
- the full formatter check;
- Composer validation;
- a PHP 7.4 syntax scan across `src/` and `tests/`.

## Dependency drift is part of maintaining an old branch

The branch does not commit a Composer lockfile. A fresh install therefore uses newer compatible development tools than the branch's last successful CI run.

The latest PHPStan release correctly exposed a conditional return annotation that treated an options array as raw only when `raw` was its sole key. A real call containing both `raw` and `transformHits` was incorrectly inferred as returning an object.

The right fix was an unsealed array shape:

```php
/**
 * @phpstan-return (
 *   $options is array{raw: true|non-falsy-string|positive-int, ...}
 *   ? array
 *   : SearchResult
 * )
 */
```

The trailing `...` says that additional option keys are valid. That models the runtime API instead of suppressing the test or pinning an older analyzer.

Old branches do not stay still just because their production code does. Package resolution, CI images, and static analyzers continue moving around them.

## What made the backport manageable

Four decisions kept the work bounded:

1. **Treat the target branch as the design authority.** The source patch defined behavior, not architecture.
2. **Avoid importing unrelated abstractions.** The feature did not justify moving the entire task system.
3. **Keep types precise at the HTTP boundary.** Compatibility should not mean ambiguity.
4. **Run the broad suite against the real target server.** Focused tests prove the feature; the full suite proves the backport belongs on the branch.

The result is more than a cherry-pick. It is a translation between two versions of the same codebase, with the target branch's promises kept intact.

You can follow the review and see the full diff in [Meilisearch PHP pull request #942](https://github.com/meilisearch/meilisearch-php/pull/942).
