<script setup lang="ts">
import { useHead } from "@unhead/vue";

const publicEvidence = [
  {
    status: "Merged upstream",
    name: "Verdict Evaluation CLI",
    detail: "Validated baselines, stable regression exits, and redacted GitHub Actions annotations for a Laravel security package.",
    href: "https://github.com/fissible/verdict/pull/6",
  },
  {
    status: "Upstream PR · CI green",
    name: "Rector: Safe Constructor Default Inlining",
    detail: "A regression fix that preserves property initialization when an extensible PHP class bypasses its parent constructor.",
    href: "https://github.com/rectorphp/rector-src/pull/8281",
  },
  {
    status: "Upstream PR · CI green",
    name: "Verdict Provenance Ledger",
    detail: "Explicit trust labels and canonical fingerprints for agent inputs without retaining prompts, documents, or tool results.",
    href: "https://github.com/fissible/verdict/pull/7",
  },
  {
    status: "Upstream PR",
    name: "Meilisearch PHP: Dynamic Search Rules",
    detail: "A PHP 7.4-compatible v1.x backport with typed contracts, asynchronous task conventions, and integration coverage.",
    href: "https://github.com/meilisearch/meilisearch-php/pull/942",
  },
];

useHead({
  title: "About Junaid Hussnain — Software Engineer",
  meta: [
    {
      name: "description",
      content:
        "About Junaid Hussnain, a software engineer in Lahore with 5+ years of experience in backend products, operational tools, open source, and reliable delivery.",
    },
    { property: "og:type", content: "profile" },
    { property: "og:title", content: "About Junaid Hussnain — Software Engineer" },
    {
      property: "og:description",
      content: "Backend products, operational systems, verified open-source work, and an engineering practice built around maintainability.",
    },
    { property: "og:url", content: "https://hijunaid.com/about" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "About Junaid Hussnain — Software Engineer" },
    {
      name: "twitter:description",
      content: "Backend products, operational systems, verified open-source work, and reliable delivery.",
    },
  ],
  link: [
    { rel: "canonical", href: "https://hijunaid.com/about" },
    { rel: "me", href: "https://github.com/Junaid-PK" },
    { rel: "me", href: "https://www.linkedin.com/in/junaid-hussnain-a951791bb/" },
    { rel: "me", href: "https://www.freelancer.com.au/u/junaidhussnain36" },
  ],
  script: [{
    type: "application/ld+json",
    textContent: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://hijunaid.com/about#profile-page",
          url: "https://hijunaid.com/about",
          name: "About Junaid Hussnain — Software Engineer",
          description: "A verified professional profile for software engineer Junaid Hussnain.",
          mainEntity: { "@id": "https://hijunaid.com/#junaid-hussnain" },
          isPartOf: { "@id": "https://hijunaid.com/#website" },
          breadcrumb: { "@id": "https://hijunaid.com/about#breadcrumb" },
        },
        {
          "@type": "Person",
          "@id": "https://hijunaid.com/#junaid-hussnain",
          name: "Junaid Hussnain",
          alternateName: "Junaid-PK",
          url: "https://hijunaid.com/",
          image: "https://avatars.githubusercontent.com/u/84363665?v=4",
          jobTitle: "Software Engineer",
          description: "Software engineer with more than five years of experience building backend products, operational tools, and reliable delivery systems.",
          address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
          sameAs: [
            "https://github.com/Junaid-PK",
            "https://www.linkedin.com/in/junaid-hussnain-a951791bb/",
            "https://www.freelancer.com.au/u/junaidhussnain36",
          ],
          knowsAbout: ["Software engineering", "Laravel", "PHP", "TypeScript", "Python", "PostgreSQL", "Docker"],
        },
        {
          "@type": "WebSite",
          "@id": "https://hijunaid.com/#website",
          url: "https://hijunaid.com/",
          name: "Junaid Hussnain",
          inLanguage: "en",
          publisher: { "@id": "https://hijunaid.com/#junaid-hussnain" },
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://hijunaid.com/about#breadcrumb",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://hijunaid.com/" },
            { "@type": "ListItem", position: 2, name: "About Junaid Hussnain", item: "https://hijunaid.com/about" },
          ],
        },
      ],
    }),
  }],
});
</script>

<template>
  <article class="profile-page">
    <header class="profile-hero">
      <div class="profile-intro">
        <p class="eyebrow">Profile / Junaid Hussnain</p>
        <h1>Junaid Hussnain</h1>
        <p class="profile-thesis">I build the operational spine behind useful software.</p>
        <p class="profile-lede">
          I’m a software engineer in Lahore with more than five years of experience across backend products, web interfaces, automation, and the delivery work that keeps systems dependable after launch.
        </p>
        <div class="profile-actions">
          <a class="button button--primary" href="/#work">Inspect selected work</a>
          <a class="text-link" href="mailto:junaidhussnain369@gmail.com">Email Junaid <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <aside class="profile-file" aria-label="Junaid Hussnain profile summary">
        <div class="profile-file__topline"><span>Working file</span><span>JH / 2026</span></div>
        <img src="https://avatars.githubusercontent.com/u/84363665?v=4" alt="Junaid Hussnain" width="420" height="320" />
        <dl>
          <div><dt>Role</dt><dd>Software engineer</dd></div>
          <div><dt>Base</dt><dd>Lahore, Pakistan</dd></div>
          <div><dt>Experience</dt><dd>5+ years</dd></div>
          <div><dt>Primary lane</dt><dd>Backend &amp; product</dd></div>
          <div><dt>Timezone</dt><dd>UTC+5</dd></div>
        </dl>
      </aside>
    </header>

    <section class="profile-story" aria-labelledby="profile-story-title">
      <div class="profile-story__label">
        <p class="eyebrow">How I got here</p>
        <p>Feature delivery grew into operational ownership.</p>
      </div>
      <div class="profile-story__copy">
        <h2 id="profile-story-title">The work gets interesting when the happy path ends.</h2>
        <div class="profile-story__columns">
          <p>
            I started in web development and kept moving toward the parts of a product that carry the most context: permissions, data boundaries, imports, reporting, failure recovery, and the interfaces people use to understand what the system is doing.
          </p>
          <p>
            Much of my professional experience belongs to private products. I do not turn that into invented case studies. Instead, I publish transferable decisions through inspectable tools, technical notes, deployment infrastructure, and contributions to projects maintained by other teams.
          </p>
        </div>
        <blockquote>“Reliable software makes the next decision easier, not just the current task possible.”</blockquote>
      </div>
    </section>

    <section class="trust-section" aria-labelledby="trust-title">
      <header class="profile-section-heading">
        <div><p class="eyebrow">What I can own</p><h2 id="trust-title">Responsibility beyond the ticket.</h2></div>
        <p>These are the recurring engineering problems behind the public work and writing on this site.</p>
      </header>
      <div class="trust-grid">
        <article><p class="mono-label">Backend products</p><h3>Model the real workflow.</h3><p>Turn users, permissions, state changes, and failure modes into code that remains understandable as the product grows.</p></article>
        <article><p class="mono-label">Operational tools</p><h3>Make system state visible.</h3><p>Build imports, reporting, audit trails, and interfaces that help people act without guessing what happened underneath.</p></article>
        <article><p class="mono-label">Delivery systems</p><h3>Carry the work into production.</h3><p>Treat tests, deployment, security headers, observability, and recovery paths as part of the product rather than release-day extras.</p></article>
        <article><p class="mono-label">Engineering practice</p><h3>Leave evidence behind.</h3><p>Use focused contracts, regression tests, readable notes, and public contributions to make technical judgment inspectable.</p></article>
      </div>
    </section>

    <section class="public-record" aria-labelledby="public-record-title">
      <header class="profile-section-heading">
        <div><p class="eyebrow">Current public record</p><h2 id="public-record-title">Claims with links attached.</h2></div>
        <p>Direct upstream references are shown with their current, deliberately plain status.</p>
      </header>
      <div class="public-record__list">
        <a v-for="item in publicEvidence" :key="item.href" :href="item.href" target="_blank" rel="noreferrer">
          <span class="public-record__status">{{ item.status }}</span>
          <span class="public-record__copy"><strong>{{ item.name }}</strong><span>{{ item.detail }}</span></span>
          <span class="public-record__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <p class="public-record__note">Open work is described as open. A contribution moves to “merged” only when the upstream repository says it is.</p>
    </section>

    <section class="profile-next" aria-labelledby="profile-next-title">
      <div><p class="eyebrow eyebrow--light">Start with the difficult part</p><h2 id="profile-next-title">Have a system that needs clearer boundaries?</h2></div>
      <div><p>I’m interested in backend products, operational software, developer tooling, and open-source collaboration.</p><a class="button button--light" href="mailto:junaidhussnain369@gmail.com">Email Junaid</a></div>
    </section>
  </article>
</template>

<style scoped>
.profile-page { width: min(1180px, calc(100% - 3rem)); margin: 0 auto; }
.profile-hero { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.7fr); align-items: start; gap: clamp(3rem, 8vw, 8rem); padding: clamp(4rem, 8vw, 7.5rem) 0 clamp(5rem, 10vw, 9rem); border-bottom: 1px solid var(--ink); }
.profile-intro { padding-top: 1.2rem; }
.profile-intro h1 { margin: 0; font: 600 clamp(4rem, 9vw, 8.2rem)/0.84 "Newsreader", serif; letter-spacing: -0.065em; }
.profile-thesis { max-width: 760px; margin: 1.8rem 0 0; color: var(--blueprint); font: 500 clamp(1.8rem, 4vw, 3.4rem)/1.02 "Newsreader", serif; letter-spacing: -0.04em; }
.profile-lede { max-width: 740px; margin: 2rem 0 0; color: #3f4755; font-size: clamp(1.05rem, 1.5vw, 1.25rem); line-height: 1.7; }
.profile-actions { display: flex; align-items: center; gap: 1.6rem; margin-top: 2.2rem; }
.profile-file { background: var(--paper); border: 1px solid var(--ink); box-shadow: 10px 10px 0 var(--soft-blue); }
.profile-file__topline { display: flex; justify-content: space-between; padding: 0.85rem 1rem; border-bottom: 1px solid var(--ink); font: 500 0.68rem/1 "IBM Plex Mono", monospace; text-transform: uppercase; }
.profile-file img { width: 100%; aspect-ratio: 1.32 / 1; object-fit: cover; object-position: 50% 30%; background: var(--signal); filter: saturate(0.82) contrast(1.04); }
.profile-file dl { margin: 0; border-top: 1px solid var(--ink); }
.profile-file dl div { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 1rem; padding: 0.8rem 1rem; border-bottom: 1px solid var(--rule); }
.profile-file dl div:last-child { border-bottom: 0; }
.profile-file dt { color: var(--muted); font: 400 0.67rem/1.4 "IBM Plex Mono", monospace; text-transform: uppercase; }
.profile-file dd { margin: 0; font-size: 0.82rem; font-weight: 700; }
.profile-story { display: grid; grid-template-columns: 0.5fr 1.5fr; gap: clamp(3rem, 8vw, 9rem); padding: clamp(6rem, 10vw, 10rem) 0; border-bottom: 1px solid var(--rule); }
.profile-story__label > p:last-child { max-width: 190px; margin: 3rem 0 0; color: var(--muted); font: 400 0.76rem/1.7 "IBM Plex Mono", monospace; }
.profile-story h2, .profile-section-heading h2, .profile-next h2 { margin: 0; font: 600 clamp(2.7rem, 5vw, 4.8rem)/0.98 "Newsreader", serif; letter-spacing: -0.045em; }
.profile-story__columns { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4.5rem); margin-top: 2.5rem; }
.profile-story__columns p { margin: 0; color: var(--muted); line-height: 1.8; }
.profile-story blockquote { margin: 3rem 0 0; padding: 1.8rem 2rem; color: var(--blueprint); background: var(--soft-blue); border-left: 5px solid var(--blueprint); font: 500 clamp(1.35rem, 2.4vw, 2rem)/1.35 "Newsreader", serif; }
.trust-section, .public-record { padding: clamp(6rem, 10vw, 10rem) 0; border-bottom: 1px solid var(--rule); }
.profile-section-heading { display: grid; grid-template-columns: 1.35fr 0.65fr; align-items: end; gap: 4rem; margin-bottom: clamp(3rem, 6vw, 5rem); }
.profile-section-heading > p { margin: 0 0 0.3rem; color: var(--muted); line-height: 1.7; }
.trust-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--ink); border-left: 1px solid var(--ink); }
.trust-grid article { min-height: 270px; padding: clamp(1.6rem, 4vw, 3rem); border-right: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
.trust-grid h3 { margin: 3rem 0 0.85rem; font: 600 clamp(1.7rem, 3vw, 2.5rem)/1.05 "Newsreader", serif; letter-spacing: -0.035em; }
.trust-grid article > p:last-child { max-width: 470px; margin: 0; color: var(--muted); line-height: 1.7; }
.public-record__list { border-top: 1px solid var(--ink); }
.public-record__list > a { display: grid; grid-template-columns: 210px minmax(0, 1fr) 30px; align-items: center; gap: 2rem; padding: 1.7rem 0; border-bottom: 1px solid var(--rule); text-decoration: none; }
.public-record__list > a:hover strong { color: var(--blueprint); }
.public-record__status { color: var(--signal-text); font: 500 0.68rem/1.5 "IBM Plex Mono", monospace; text-transform: uppercase; }
.public-record__copy { display: grid; grid-template-columns: minmax(240px, 0.7fr) 1fr; align-items: center; gap: 2rem; }
.public-record__copy strong { font: 600 clamp(1.3rem, 2vw, 1.75rem)/1.15 "Newsreader", serif; }
.public-record__copy > span { color: var(--muted); font-size: 0.85rem; line-height: 1.65; }
.public-record__arrow { color: var(--blueprint); font-size: 1.1rem; }
.public-record__note { max-width: 680px; margin: 1.4rem 0 0 auto; color: var(--muted); font-size: 0.78rem; line-height: 1.65; }
.profile-next { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: clamp(3rem, 8vw, 8rem); margin: clamp(5rem, 9vw, 9rem) 0 0; padding: clamp(3rem, 7vw, 6rem); color: var(--paper); background: var(--ink); }
.profile-next > div:last-child { align-self: end; }
.profile-next > div:last-child p { margin: 0 0 2rem; color: #cbd0db; line-height: 1.7; }
@media (max-width: 900px) {
  .profile-hero, .profile-story, .profile-section-heading, .profile-next { grid-template-columns: 1fr; gap: 2.5rem; }
  .profile-file { max-width: 540px; }
  .public-record__copy { grid-template-columns: 1fr; gap: 0.5rem; }
}
@media (max-width: 720px) {
  .profile-page { width: min(100% - 2rem, 1180px); }
  .profile-hero { padding-top: 3rem; }
  .profile-intro h1 { font-size: clamp(3.5rem, 19vw, 5.8rem); }
  .profile-actions { align-items: flex-start; flex-direction: column; }
  .profile-story__columns, .trust-grid { grid-template-columns: 1fr; }
  .profile-story__columns { gap: 1.5rem; }
  .trust-grid article { min-height: 230px; }
  .public-record__list > a { grid-template-columns: 1fr 22px; gap: 0.8rem; }
  .public-record__status { grid-column: 1 / -1; }
  .profile-next { padding: 2.5rem 1.4rem; }
}
</style>
