<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Software engineer · Lahore, Pakistan</p>
        <h1 id="hero-title">
          I make complicated systems
          <em>easier to run.</em>
        </h1>
        <p class="hero-lede">
          I’m Junaid Hussnain, a software engineer with 5+ years of experience building backend products,
          operational tools, and the interfaces that make them understandable.
        </p>
        <div class="hero-actions">
          <a class="button button--primary" href="#work">Explore selected work</a>
          <RouterLink class="text-link" to="/blog">Read engineering notes <span aria-hidden="true">→</span></RouterLink>
        </div>
      </div>

      <aside class="hero-dossier" aria-label="Current engineering profile">
        <div class="dossier-topline">
          <span>Current file</span>
          <span class="status"><i aria-hidden="true"></i> Shipping</span>
        </div>
        <img
          class="portrait"
          src="https://avatars.githubusercontent.com/u/84363665?v=4"
          alt="Junaid Hussnain"
          width="160"
          height="160"
        />
        <div class="dossier-note">
          <p class="mono-label">Now building</p>
          <p><strong>Stackline</strong> — a private, browser-based ATS resume builder with inspectable scoring and export.</p>
        </div>
        <dl class="evidence-list">
          <div><dt>Experience</dt><dd>5+ years</dd></div>
          <div><dt>Public repos</dt><dd>58</dd></div>
          <div><dt>Primary lane</dt><dd>Backend & product</dd></div>
          <div><dt>Timezone</dt><dd>UTC+5</dd></div>
        </dl>
      </aside>
    </div>

    <div class="hero-proof" aria-label="What this portfolio contains">
      <p>Built to be inspected</p>
      <span>Source code</span>
      <span>Architecture decisions</span>
      <span>Writing</span>
      <span>Production delivery</span>
    </div>
  </section>
</template>
