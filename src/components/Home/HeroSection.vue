<script setup lang="ts">
import AceternityMovingBorder from "../ui/AceternityMovingBorder.vue";
import AceternitySpotlight from "../ui/AceternitySpotlight.vue";
import SystemMap from "./SystemMap.vue";
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <AceternitySpotlight />
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span> Software engineer · Lahore, Pakistan</p>
        <h1 id="hero-title">
          I build software that
          <em>holds up after launch.</em>
        </h1>
        <p class="hero-lede">
          I’m Junaid Hussnain. For more than five years I’ve worked across backend products,
          operational tools, and the delivery systems that keep software useful when real work begins.
        </p>
        <div class="hero-actions">
          <AceternityMovingBorder href="#work">Inspect verified work <span aria-hidden="true">↘</span></AceternityMovingBorder>
          <RouterLink class="text-link" to="/about">How I work <span aria-hidden="true">→</span></RouterLink>
        </div>
        <dl class="hero-facts" aria-label="Professional summary">
          <div><dt>Experience</dt><dd>5+ years</dd></div>
          <div><dt>Focus</dt><dd>Backend + product</dd></div>
          <div><dt>Public proof</dt><dd>Code, PRs, notes</dd></div>
        </dl>
      </div>

      <SystemMap />
    </div>

    <div class="hero-proof" aria-label="What this portfolio contains">
      <p>Evidence, not adjectives</p>
      <span>Public source</span>
      <span>Engineering decisions</span>
      <span>Open-source work</span>
      <span>Production delivery</span>
    </div>
  </section>
</template>
