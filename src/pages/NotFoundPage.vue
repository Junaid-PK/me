<script setup lang="ts">
import { useHead } from "@unhead/vue";

useHead({
  title: "Page not found — Junaid Hussnain",
  meta: [
    { name: "description", content: "This page does not exist. Return to Junaid Hussnain's portfolio or browse the engineering notes." },
    { name: "robots", content: "noindex, follow" },
  ],
});
</script>

<template>
  <section class="not-found" aria-labelledby="not-found-title">
    <div class="error-code" aria-hidden="true">404</div>
    <div class="not-found-copy">
      <p class="eyebrow">Nothing at this address</p>
      <h1 id="not-found-title">The useful part is one turn back.</h1>
      <p>
        This URL may be outdated or mistyped. The portfolio and engineering notes
        are still here, with direct links to the public work behind them.
      </p>
      <div class="not-found-actions">
        <RouterLink class="button button--primary" to="/">Return home</RouterLink>
        <RouterLink class="text-link" to="/blog">Browse engineering notes</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  width: min(1180px, calc(100% - 3rem));
  min-height: 68vh;
  margin: 0 auto;
  padding: clamp(4rem, 9vw, 9rem) 0;
  display: grid;
  grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1.45fr);
  align-items: start;
  gap: clamp(3rem, 9vw, 9rem);
}

.error-code {
  color: var(--signal-text);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 1.2rem 0;
  font: 500 clamp(4.5rem, 10vw, 8rem)/0.9 "IBM Plex Mono", monospace;
  letter-spacing: -0.08em;
}

.not-found-copy h1 {
  max-width: 760px;
  margin: 0;
  font: 600 clamp(3rem, 7vw, 6.5rem)/0.93 "Newsreader", serif;
  letter-spacing: -0.055em;
}

.not-found-copy > p:not(.eyebrow) {
  max-width: 650px;
  margin: 2rem 0 0;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.75;
}

.not-found-actions {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-top: 2.2rem;
}

@media (max-width: 720px) {
  .not-found {
    width: min(100% - 2rem, 1180px);
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-top: 3rem;
  }

  .error-code {
    width: min(100%, 250px);
  }

  .not-found-actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
