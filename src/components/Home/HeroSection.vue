<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-grid">
      <header class="hero-copy">
        <p class="eyebrow">Junaid Hussnain · Lahore, Pakistan</p>
        <h1 id="hero-title">Software engineer building practical web products and backend systems.</h1>
        <p class="hero-lede">
          For more than five years, I’ve worked across the stack—from databases and APIs to the interfaces
          people use every day. I focus on software that is clear, reliable, and straightforward to maintain.
        </p>
        <div class="hero-actions">
          <a class="button button--primary" href="#work">View selected work <span aria-hidden="true">↓</span></a>
          <RouterLink class="text-link" to="/about">More about me <span aria-hidden="true">→</span></RouterLink>
        </div>
      </header>

      <dl class="hero-overview" aria-label="Professional overview">
        <div>
          <dt>Experience</dt>
          <dd>5+ years in software engineering</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Web applications, backend systems, and developer tools</dd>
        </div>
        <div>
          <dt>Work</dt>
          <dd>Business platforms, APIs, automation, and reporting</dd>
        </div>
        <div>
          <dt>Core stack</dt>
          <dd>Laravel, PHP, TypeScript, Python, PostgreSQL, and Docker</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
