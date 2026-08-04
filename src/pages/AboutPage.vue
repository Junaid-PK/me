<script setup lang="ts">
import { useHead } from "@unhead/vue";

const publicWork = [
  {
    status: "Merged",
    name: "Verdict Evaluation CLI",
    detail: "Added safer CI comparisons and regression reporting to a Laravel security package.",
    href: "https://github.com/fissible/verdict/pull/6",
  },
  {
    status: "Open PR",
    name: "Rector: Safe Constructor Default Inlining",
    detail: "Fixed a property initialization edge case in Rector's PHP refactoring engine.",
    href: "https://github.com/rectorphp/rector-src/pull/8281",
  },
  {
    status: "Open PR",
    name: "Meilisearch PHP: Dynamic Search Rules",
    detail: "Backported a search rules API with tests and PHP 7.4 compatibility.",
    href: "https://github.com/meilisearch/meilisearch-php/pull/942",
  },
];

const tools = ["Laravel", "PHP", "TypeScript", "Vue", "React", "Python", "PostgreSQL", "Redis", "Docker", "GitHub Actions"];

useHead({
  title: "About Junaid Hussnain — Software Engineer",
  meta: [
    {
      name: "description",
      content: "Junaid Hussnain is a software engineer in Lahore with 5+ years of experience building web applications, backend systems, and developer tools.",
    },
    { property: "og:type", content: "profile" },
    { property: "og:title", content: "About Junaid Hussnain — Software Engineer" },
    { property: "og:description", content: "Software engineer building useful web products, backend systems, and developer tools." },
    { property: "og:url", content: "https://hijunaid.com/about" },
  ],
  link: [
    { rel: "canonical", href: "https://hijunaid.com/about" },
    { rel: "me", href: "https://github.com/Junaid-PK" },
    { rel: "me", href: "https://www.linkedin.com/in/junaid-hussnain-a951791bb/" },
  ],
  script: [{
    type: "application/ld+json",
    textContent: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://hijunaid.com/about#profile-page",
      url: "https://hijunaid.com/about",
      name: "About Junaid Hussnain",
      mainEntity: {
        "@type": "Person",
        "@id": "https://hijunaid.com/#junaid-hussnain",
        name: "Junaid Hussnain",
        jobTitle: "Software Engineer",
        url: "https://hijunaid.com/",
        image: "https://avatars.githubusercontent.com/u/84363665?v=4",
        description: "Software engineer with more than five years of experience building web applications, backend systems, and developer tools.",
        address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
        sameAs: ["https://github.com/Junaid-PK", "https://www.linkedin.com/in/junaid-hussnain-a951791bb/"],
      },
    }),
  }],
});
</script>

<template>
  <article class="profile-page">
    <header class="profile-hero">
      <div>
        <p class="eyebrow">About me</p>
        <h1>Junaid Hussnain</h1>
        <p class="profile-lede">Software engineer building web products from backend to interface.</p>
        <div class="profile-actions">
          <a class="button button--primary" href="mailto:junaidhussnain369@gmail.com">Email me</a>
          <a class="text-link" href="https://github.com/Junaid-PK" target="_blank" rel="me noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <img src="https://avatars.githubusercontent.com/u/84363665?v=4" alt="Junaid Hussnain" width="520" height="520" />
    </header>

    <section class="profile-summary" aria-labelledby="profile-summary-title">
      <h2 id="profile-summary-title">Backend-minded. Product-focused.</h2>
      <div>
        <p>I’m based in Lahore and have more than five years of experience building web applications, business platforms, APIs, automation, reporting, and developer tools.</p>
        <p>I enjoy turning complicated workflows into software that is clear to use and straightforward to maintain.</p>
      </div>
    </section>

    <section class="profile-tools" aria-labelledby="profile-tools-title">
      <p class="eyebrow">Tools I use</p>
      <h2 id="profile-tools-title">A practical web stack.</h2>
      <div class="profile-tool-list">
        <span v-for="tool in tools" :key="tool">{{ tool }}</span>
      </div>
    </section>

    <section class="public-record" aria-labelledby="public-record-title">
      <div class="profile-section-heading">
        <div><p class="eyebrow">Open source</p><h2 id="public-record-title">Recent contributions.</h2></div>
        <p>Work submitted to projects maintained by other teams.</p>
      </div>
      <div class="public-record__list">
        <a v-for="item in publicWork" :key="item.href" :href="item.href" target="_blank" rel="noreferrer">
          <span class="public-record__status">{{ item.status }}</span>
          <span class="public-record__copy"><strong>{{ item.name }}</strong><span>{{ item.detail }}</span></span>
          <span class="public-record__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section class="profile-next" aria-labelledby="profile-next-title">
      <div><p class="eyebrow">Contact</p><h2 id="profile-next-title">Have something useful to build?</h2></div>
      <div><p>I’m happy to discuss product engineering, backend systems, developer tooling, and open-source work.</p><a class="button button--primary" href="mailto:junaidhussnain369@gmail.com">Email me</a></div>
    </section>
  </article>
</template>

<style scoped>
.profile-page { width: min(1320px, calc(100% - 2rem)); margin: 0 auto; }
.profile-hero { display: grid; grid-template-columns: 1.35fr 0.65fr; align-items: center; gap: clamp(3rem, 8vw, 8rem); margin-top: 0.35rem; padding: clamp(3rem, 7vw, 6rem); background: var(--paper); border: 1px solid var(--rule); border-radius: 2rem; box-shadow: 0 24px 70px rgba(16, 37, 31, 0.08); }
.profile-hero h1 { margin: 0; font: 600 clamp(4rem, 8vw, 7.2rem)/0.9 "Newsreader", serif; letter-spacing: -0.06em; }
.profile-lede { max-width: 700px; margin: 1.5rem 0 0; color: var(--blueprint); font: 500 clamp(1.5rem, 3vw, 2.6rem)/1.12 "Newsreader", serif; letter-spacing: -0.035em; }
.profile-actions { display: flex; align-items: center; gap: 1.5rem; margin-top: 2rem; }
.profile-hero > img { width: 100%; aspect-ratio: 1; object-fit: cover; object-position: 50% 30%; background: var(--steel); border: 1px solid var(--rule-strong); border-radius: 1.5rem; box-shadow: 12px 12px 0 var(--mint); }
.profile-summary, .profile-section-heading, .profile-next { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 8vw, 8rem); }
.profile-summary, .profile-tools, .public-record { padding: clamp(5rem, 9vw, 8rem) 0; border-bottom: 1px solid var(--rule); }
.profile-summary h2, .profile-tools h2, .profile-section-heading h2, .profile-next h2 { margin: 0; font: 600 clamp(2.5rem, 5vw, 4.6rem)/0.98 "Newsreader", serif; letter-spacing: -0.045em; }
.profile-summary p, .profile-section-heading > p, .profile-next p { margin: 0 0 1rem; color: var(--muted); line-height: 1.75; }
.profile-tool-list { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-top: 2rem; }
.profile-tool-list span { padding: 0.65rem 0.85rem; background: var(--paper); border: 1px solid var(--rule-strong); border-radius: 999px; font: 500 0.72rem/1 "IBM Plex Mono", monospace; }
.profile-section-heading { align-items: end; margin-bottom: 2.5rem; }
.public-record__list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.public-record__list > a { display: flex; min-height: 250px; flex-direction: column; padding: 1.5rem; color: var(--ink); background: var(--paper); border: 1px solid var(--rule-strong); border-radius: 1.3rem; text-decoration: none; transition: transform 180ms ease, background 180ms ease; }
.public-record__list > a:nth-child(2) { background: var(--steel); }
.public-record__list > a:nth-child(3) { background: var(--mint); }
.public-record__list > a:hover { transform: translateY(-4px); background: var(--lime); }
.public-record__status { color: var(--blueprint); font: 500 0.65rem/1.4 "IBM Plex Mono", monospace; text-transform: uppercase; }
.public-record__copy { display: grid; gap: 0.8rem; margin-top: auto; }
.public-record__copy strong { font: 600 1.45rem/1.1 "Newsreader", serif; }
.public-record__copy > span { color: var(--muted); font-size: 0.82rem; line-height: 1.6; }
.public-record__arrow { margin-top: 1rem; color: var(--blueprint); }
.profile-next { align-items: end; margin-top: clamp(4rem, 8vw, 7rem); padding: clamp(3rem, 6vw, 5rem); background: var(--steel); border: 1px solid var(--rule-strong); border-radius: 2rem; }
@media (max-width: 800px) {
  .profile-hero, .profile-summary, .profile-section-heading, .profile-next { grid-template-columns: 1fr; gap: 2.5rem; }
  .profile-hero > img { max-width: 420px; }
  .public-record__list { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .profile-page { width: min(100% - 1rem, 1320px); }
  .profile-hero, .profile-next { padding: 3rem 1.25rem; border-radius: 1.4rem; }
  .profile-actions { align-items: flex-start; flex-direction: column; }
  .public-record__list > a { min-height: 210px; }
}
</style>
