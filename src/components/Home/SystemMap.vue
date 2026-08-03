<template>
  <aside class="system-map" aria-label="How Junaid approaches a software system">
    <div class="system-map__topline">
      <span>System map</span>
      <span class="live-state"><i aria-hidden="true"></i> Ready to inspect</span>
    </div>

    <div class="system-map__canvas">
      <svg class="system-map__paths" viewBox="0 0 620 470" aria-hidden="true">
        <path d="M110 118 C 210 118, 205 235, 310 235" />
        <path d="M310 235 C 415 235, 410 118, 510 118" />
        <path d="M310 235 C 415 235, 410 352, 510 352" />
        <circle class="system-map__pulse system-map__pulse--one" r="5" cx="110" cy="118" />
        <circle class="system-map__pulse system-map__pulse--two" r="5" cx="310" cy="235" />
      </svg>

      <div class="system-node system-node--need">
        <span>01 · Input</span>
        <strong>User need</strong>
        <small>Real workflow, not feature theatre</small>
      </div>
      <div class="system-node system-node--policy">
        <span>02 · Core</span>
        <strong>Explicit rules</strong>
        <small>Permissions, states, contracts</small>
      </div>
      <div class="system-node system-node--workers">
        <span>03 · Operations</span>
        <strong>Visible workers</strong>
        <small>Queues, imports, delivery</small>
      </div>
      <div class="system-node system-node--evidence">
        <span>04 · Proof</span>
        <strong>Evidence loop</strong>
        <small>Tests, logs, decisions</small>
      </div>
    </div>

    <div class="system-map__footer">
      <span>PHP / Laravel</span>
      <span>TypeScript</span>
      <span>Delivery systems</span>
    </div>
  </aside>
</template>
