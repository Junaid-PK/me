---
title: "Building Big Software That Stays Small (from a PHP engineer's desk)"
excerpt: "Learn how to design PHP systems that scale without complexity by using black-box modules, stable contracts, and careful interface design. Keep your large systems maintainable and team-friendly."
date: "2025-09-15"
readTime: "15 min read"
category: "Engineering"
author: "Junaid"
featured: false
---

### Building Big Software That Stays Small (from a PHP engineer's desk)

You ship a Composer update, a minor framework release lands, and half your app starts throwing type errors in places you didn't touch. I've had my day derailed by that too many times. The fix isn't "be more careful." It's to design your system so large work feels small - black box modules with narrow, stable contracts that one person can own, finish, and replace without a team meeting.

Here's how I do that in PHP.

### Reframing the problem

What if scaling teams means refusing to build a single "big thing"? Treat the system as a federation of finished packages/services, each behind a forward compatible interface. Keep the domain pure PHP, push frameworks to the edges, and make implementation replaceable under a stable contract.

Big idea: it's faster to write five careful, explicit lines today than one vague line you'll "fix later." Later is always pricier.

## The core philosophy

### 1) Reduce risk, not just deliver features
 -  **Wrap what you don't control**: Vendors, SDKs, cloud services change. Talk to them through your adapters, not inline calls.
 -  **Prefer boring longevity**: PHP 8.x with strict types, PSR standards, Composer, semantic versioning, automated BC checks.
 -  **Eliminate "small" speed bumps**: Guard against trivial breakages (type contracts, static analysis, CI) because a thousand pebbles stop the cart.

### 2) Black boxes over shared guts
A module is a package/service with a documented interface. everything else is implementation. Single owner. "Done" means others never need to read your code.

 -  **Forward‑compatible APIs**: Design for two years out. ship a minimal impl today. Replace guts later without changing call sites.
 -  **Replaceability by contract**: If the interface is good, you can bin a bad impl and swap it. Staff turnover doesn't stall the system.

Example: future proof storage you can swap from local to S3/GCS/Azure without touching callers.
```php
interface BlobStorage {
    // Returns canonical URI. metadata is extensible for future needs
    public function put(string $path, string $bytes, array $metadata = []): Uri.

    public function get(string $path): ?Blob. // null if not found
    public function delete(string $path): void.
}
```

### 3) Own your "platform layer"
 -  **Infrastructure adapters**: HTTP clients, queues, schedulers, filesystems, caches - hide them behind interfaces. PSR - 18/PSR - 7/PSR - 6 where helpful, but keep your domain free of vendor types.
 -  **Demo harness first**: A tiny CLI or HTTP endpoint that exercises the adapter surface. Port/replace infra by getting the harness green first.
 -  **UI is just another edge**: If you're on Symfony/Laravel, keep controllers thin. bind domain ports to framework adapters at the edge.

### 4) Helper libraries > app glue
Invest in internal Composer packages: `company/http`, `company/queue`, `company/feature - flags`, `company/telemetry`. Reuse everywhere. don't re - learn each SDK.

### 5) Keep the "domain brain" headless. make everything else a plugin
Put the rules and invariants in a framework free core. Hang capabilities off it via plugins (packages) discovered at runtime (Composer metadata) or build time (container wiring).

 -  **Multiple UIs, same core**: Web app, worker, CLI, async pipeline - same domain. different adapters.
 -  **UI panels as plugins**: In modular frontends, mirror PHP's plugin shape with capability descriptors.

Capability as data contracts (self describing, UI‑friendly):
```php
final class WasherStatus {
    public function __construct(
        public bool $isRunning,
        public Mode $mode,
        public float $temperatureC,
        public float $loadKg,
        public int $secondsRemaining,
    ) {}
}

final class WasherCommand {
    public function __construct(
        public bool $run,
        public Mode $requestedMode,
        public float $requestedTemperatureC,
    ) {}
}
```

## Three systems, one approach

### A. "Video editor": the primitive is a timeline
Even if the runtime isn't PHP, the modeling is. Treat everything as clips with parameters over time. the core enforces invariants and undo. effects are plugins.

```php
final class Timeline {
    /** @var list<Clip> */
    private array $clips = [].

    public function add(Clip $clip): void { /* enforce bounds, overlap rules, etc. */ }
    public function at(Timecode $t): Frame { /* evaluate graph */ }
}

interface EffectPlugin {
    public function descriptor(): EffectDescriptor. // inputs, params, docs
    public function apply(Frame $in, Parameters $params): Frame.
}
```

 -  Ship a minimal effect set. keep the API stable so higher quality implementations drop in later.
 -  Discover plugins via Composer `extra` and a registry. one owner per plugin.

### B. Health system: the primitive is events, not "journals"
Use domain events (past and future). Keep storage behind an access API. dual‑write to legacy. cut over gradually.

```php
interface EventStore {
    public function append(Event $event): void.
    /** @return iterable<Event> */
    public function eventsFor(PatientId $id): iterable.
    /** @return iterable<Event> */
    public function eventsOn(LocalDate $date, ClinicId $clinic): iterable.
}
```

 -  Provide bindings: raw PHP (domain), Symfony service, Laravel facade, CLI.
 -  Never expose SQL from the API. that's a lifetime coupling you don't want.

### C. Jet fighter: the primitive is world state
Model "now" with confidence, accuracy, source, and units. Publish/subscribe subsets to many computers at different rates.

```php
interface WorldStateBus {
    public function publish(StateUpdate $update): void.
    public function subscribe(Subscription $sub, callable $onUpdate): SubscriptionId.
}
```

 -  Start with one core. evolve to redundant/voting cores later - same API, drop‑in replacement.
 -  Tooling first: recorder, playback, logger, visualizer, and a Python/PHP simulator. Contractors validate in isolation. share traces, not lab time.

## The craft underneath: format design in PHP

We're really designing formats (APIs, payloads, events). Make them small, powerful, and implementable.

 -  **Semantics vs structure**: JSON gives structure. your schema/events supply meaning. Version both.
 -  **Pick one good primitive per pipeline**: Don't support "everything." Every extra option is multiplied implementation cost (and bugs).
 -  **Constrain for quality**: Explicit types, units, encodings, idempotency, stable error models.
 -  **Keep implementation freedom**: Ports - and - adapters/hexagonal. Never leak persistence or transport into domain interfaces.
 -  **Plugin direction**: Prefer "plugins come to us" (your contracts, your lifecycle) over "we plug into them" (you inherit their chaos).

## The offering: make it real

 -  **Kickoff**
   -  Name the primitive and its invariants.
   -  Slice into packages/services. one owner each.
   -  Draft forward compatible interfaces. version from day one.
   -  Identify vendor/platform risks. wrap them.

 -  **API checklist**
   -  Minimal surface, explicit errors, strong typing.
   -  Future‑proof I/O (units, encoding, locale, time).
   -  No backend specific escape hatches.
   -  Contract tests and a tiny harness.

 -  **Tooling**
   -  Demo harness per adapter.
   -  Structured logger + trace printer.
   -  Recorder/playback for the core.
   -  Simulator for critical flows.

 -  **Team topology**
   -  Seniors on hard modules. juniors on well‑bounded ones.
   -  Core stays framework free. edges adapt frameworks.

 -  **Migration**
   -  Dual‑write bridge between old/new. incremental cutover in production.

### Closing thought

PHP is at its best when our domain is plain, strict‑typed PHP - and everything else is a replaceable adapter. If we choose clear primitives, stabilize interfaces, and invest in tooling, big systems stay small. People can rotate, vendors can change, frameworks can be swapped. The system keeps its promises.

 -  **Design so one person can finish any piece.**
 -  **Choose a primitive and honor it.**
 -  **Stabilize interfaces. let implementations evolve.**
 -  **Invest in tooling early.**
 -  **Relentlessly reduce risk.**

That's how we keep shipping - without waking up to another surprise from `vendor/`.
