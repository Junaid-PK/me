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
  link: [{ rel: "canonical", href: "https://hijunaid.com/" }],
});
</script>

<template>
  <div>
    <HeroSection />

    <section id="work" class="section section--work" aria-labelledby="work-title">
      <div class="section-heading section-heading--split">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 id="work-title">Systems with evidence behind them.</h2>
        </div>
        <p>
          Public code, concrete decisions, and honest status. No placeholder concepts or invented outcomes.
        </p>
      </div>
      <ProjectCard />
    </section>

    <section class="section practice" aria-labelledby="practice-title">
      <div class="section-heading">
        <p class="eyebrow">Engineering practice</p>
        <h2 id="practice-title">Useful software survives the demo.</h2>
      </div>

      <div class="practice-grid">
        <article>
          <span class="practice-index">01</span>
          <h3>Model the real workflow</h3>
          <p>I start with users, permissions, failure states, and the decisions the system needs to preserve—not a list of framework features.</p>
        </article>
        <article>
          <span class="practice-index">02</span>
          <h3>Keep operations visible</h3>
          <p>Queues, imports, reporting, observability, and deployment belong in the product conversation from the beginning.</p>
        </article>
        <article>
          <span class="practice-index">03</span>
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
