<script lang="ts" setup>
import HeroSection from "../components/Home/HeroSection.vue";
import SkillCard from "../components/Home/SkillsCard";
import ProjectCard from "../components/Home/ProjectCard.vue";
import ContactSection from "../components/Home/ContactSection.vue";
import About from "../components/Home/About.vue";
import GithubStats from "../components/Home/GithubStats.vue";
import BlogSection from "../components/Home/BlogSection.vue";
</script>
<template>
  <div class="relative max-w-[720px] mx-auto px-4 py-32 shadow-sm">
    <HeroSection :is-visible="true" />
    <section id="skills" class="mb-32 h-full m-0">
      <h2
        class="text-3xl font-semibold mb-12 text-center capitalize tracking-tighter"
      >
        ABOUT ME
      </h2>
      <About />
    </section>
    <section id="skills" class="mb-32 h-full m-0">
      <h2
        class="text-3xl font-semibold mb-12 text-center capitalize tracking-tighter"
      >
        TECHNICAL EXPERTISE
      </h2>
      <SkillCard />
    </section>

    <section id="projects" class="mb-32 scroll-mt-12">
      <h2
        class="text-3xl font-semibold mb-12 text-center capitalize tracking-tighter"
      >
        FEATURED PROJECTS
      </h2>
      <div class="space-y-8">
        <ProjectCard />
      </div>
    </section>

    <section id="github-stats" class="mb-32 scroll-mt-12">
      <h2
        class="text-3xl font-semibold mb-12 text-center capitalize tracking-tighter"
      >
        GITHUB STATS
      </h2>
      <div class="space-y-8">
        <GithubStats />
      </div>
    </section>
    <BlogSection :is-visible="true" />
    <ContactSection />
  </div>
</template>
