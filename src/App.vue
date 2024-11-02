<script setup lang="ts">
import { ref, onMounted } from "vue";
import HeroSection from "./components/HeroSection.vue";
import SkillCard from "./components/SkillCard.vue";
import ProjectCard from "./components/ProjectCard.vue";
import ContactSection from "./components/ContactSection.vue";
import BlogSection from "./components/BlogSection.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import About from "./components/About.vue";

const isVisible = ref(false);

const isDark = ref(false);

onMounted(() => {
  isVisible.value = true;
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark");
};
const projects = [
  {
    title: "Project One",
    description: "A description of project one",
    link: "https://example.com/project-one",
  },
  {
    title: "Project Two",
    description: "A description of project two",
    link: "https://example.com/project-two",
  },
];
const skills = [
  { name: "JavaScript", level: "Advanced" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "Vue.js", level: "Advanced" },
  { name: "HTML & CSS", level: "Advanced" },
  { name: "Node.js", level: "Intermediate" },
];
const blogPosts = [
  {
    title: "Understanding Vue 3",
    description: "A comprehensive guide to Vue 3 features and best practices.",
    link: "https://example.com/vue-3-guide",
  },
  {
    title: "TypeScript for Beginners",
    description:
      "An introduction to TypeScript and its benefits for JavaScript developers.",
    link: "https://example.com/typescript-beginners",
  },
  {
    title: "Advanced CSS Techniques",
    description: "Explore advanced CSS techniques for modern web design.",
    link: "https://example.com/advanced-css",
  },
];
defineExpose({
  isVisible,
  isDark,
  toggleTheme,
  projects,
  skills,
  blogPosts,
});
</script>

<template>
  <div :class="{ dark: isDark }">
    <div
      class="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    ></div>

    <main class="relative min-h-screen bg-[#EDE8DC]">
      <nav
        class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/20 dark:bg-gray-900/70 border-b border-border/5 supports-[backdrop-filter]:bg-white/10"
      >
        <div
          class="max-w-[720px] mx-auto flex items-center justify-between h-10 px-4"
        >
          <a
            href="#"
            class="text-xl text-blue-500 font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            🌟
          </a>
          <div class="flex items-center gap-6">
            <a
              v-for="link in ['About', 'Blog', 'Projects', 'Contact']"
              :key="link"
              :href="'#' + link.toLowerCase()"
              class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-[#27005D] px-2 rounded"
            >
              {{ link }}
            </a>
            <ThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
          </div>
        </div>
      </nav>

      <div class="relative max-w-[720px] mx-auto px-4 py-32 shadow-sm">
        <HeroSection :is-visible="isVisible" />
        <section id="skills" class="mb-32 h-full m-0">
          <h2 class="text-3xl font-semibold mb-12 text-center">About me</h2>
          <About />
        </section>
        <section id="skills" class="mb-32 h-full m-0">
          <h2 class="text-3xl font-semibold mb-12 text-center">
            Technical Expertise
          </h2>
          <SkillCard />
        </section>

        <BlogSection :posts="blogPosts" :is-visible="isVisible" />

        <section id="projects" class="mb-32">
          <h2 class="text-3xl font-semibold mb-12 text-center">
            Featured Projects
          </h2>
          <div class="space-y-8">
            <ProjectCard
              v-for="(project, index) in projects"
              :key="project.title"
              v-bind="project"
              :delay="index * 200"
              :is-visible="isVisible"
            />
          </div>
        </section>

        <ContactSection />
      </div>
    </main>
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
