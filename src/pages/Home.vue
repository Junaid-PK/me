<script setup lang="ts">
import { useHead } from "@unhead/vue";
import About from "../components/Home/About.vue";
import BlogSection from "../components/Home/BlogSection.vue";
import ContactSection from "../components/Home/ContactSection.vue";
import HeroSection from "../components/Home/HeroSection.vue";
import ProjectCard from "../components/Home/ProjectCard.vue";

useHead({
  title: "Junaid Hussnain — Software Engineer",
  meta: [
    {
      name: "description",
      content:
        "Junaid Hussnain is a software engineer in Lahore with 5+ years of experience building backend products, operational tools, and reliable delivery systems.",
    },
  ],
  link: [
    { rel: "canonical", href: "https://hijunaid.com/" },
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
          "@id": "https://hijunaid.com/#profile-page",
          url: "https://hijunaid.com/",
          name: "Junaid Hussnain — Software Engineer",
          mainEntity: { "@id": "https://hijunaid.com/#junaid-hussnain" },
          isPartOf: { "@id": "https://hijunaid.com/#website" },
        },
        {
          "@type": "Person",
          "@id": "https://hijunaid.com/#junaid-hussnain",
          name: "Junaid Hussnain",
          alternateName: "Junaid-PK",
          url: "https://hijunaid.com/",
          description: "Software engineer with more than five years of experience building backend products, operational tools, and reliable delivery systems.",
          image: "https://avatars.githubusercontent.com/u/84363665?v=4",
          jobTitle: "Software Engineer",
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
      ],
    }),
  }],
});
</script>

<template>
  <div>
    <HeroSection />

    <section id="work" class="section section--work" aria-labelledby="work-title">
      <div class="section-heading section-heading--split">
        <div>
          <p class="eyebrow">Verified work</p>
          <h2 id="work-title">Follow the decisions back to the code.</h2>
        </div>
        <p>
          Every card leads to public source or an upstream pull request. Status is stated plainly; outcomes are never invented.
        </p>
      </div>
      <ProjectCard />
    </section>

    <section class="section practice" aria-labelledby="practice-title">
      <div class="section-heading">
        <p class="eyebrow">Engineering practice</p>
        <h2 id="practice-title">The work starts where the happy path ends.</h2>
      </div>

      <div class="practice-grid">
        <article>
          <span class="practice-index">Domain</span>
          <h3>Model the real workflow</h3>
          <p>I start with users, permissions, failure states, and the decisions the system needs to preserve—not a list of framework features.</p>
        </article>
        <article>
          <span class="practice-index">Operations</span>
          <h3>Keep operations visible</h3>
          <p>Queues, imports, reporting, observability, and deployment belong in the product conversation from the beginning.</p>
        </article>
        <article>
          <span class="practice-index">Delivery</span>
          <h3>Leave a maintainable trail</h3>
          <p>Tests, narrow contracts, readable documentation, and boring infrastructure make the next change cheaper and safer.</p>
        </article>
      </div>

      <div class="capability-line" aria-label="Core technologies">
        <span>PHP / Laravel</span>
        <span>TypeScript</span>
        <span>Python</span>
        <span>PostgreSQL</span>
        <span>Redis</span>
        <span>Docker</span>
        <span>GitHub Actions</span>
      </div>
    </section>

    <About />
    <BlogSection />
    <ContactSection />
  </div>
</template>
