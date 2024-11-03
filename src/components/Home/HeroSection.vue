<script setup lang="ts">
import { ref, onMounted } from "vue";
import quotesData from "../../data/quotes.json";
defineProps<{
  isVisible: boolean;
}>();

const quote = ref("");

onMounted(() => {
  try {
    const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
    const randomQuote = quotesData.quotes[randomIndex];
    quote.value = `"${randomQuote.quote}" - <strong>${randomQuote.source}</strong>`;
  } catch (error) {
    console.error("Error selecting quote:", error);
    quote.value = "Failed to load quote.";
  }
});
</script>

<template>
  <section
    class="text-center transition-all duration-1000 transform relative border border-dashed border-neutral-900 p-8 rounded-sm"
    :class="
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    "
  >
    <div class="flex-col">
      <div class="flex">
        <img
          :src="'https://avatars.githubusercontent.com/u/84363665?v=4'"
          class="w-24 h-24 rounded-full border border-gray-400"
          alt="Avatar"
        />

        <div class="text-start px-2">
          <h1
            class="text-3xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent capitalize"
          >
            JUNAID HUSSNAIN
          </h1>
          <div class="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/junaid-hussnain-a951791bb/"
              target="_blank"
            >
              <img
                src="https://img.shields.io/badge/linkedin-%23007ACC.svg?style=flat&logo=linkedin&logoColor=white"
                alt="LinkedIn"
              />
            </a>
            <a href="https://github.com/Junaid-PK" target="_blank">
              <img
                src="https://img.shields.io/badge/github-black.svg?style=flat&logo=github&logoColor=white"
                alt="Github"
              />
            </a>
            <a href="mailto:junaidhussnain369@gmail.com" target="_blank">
              <img
                src="https://img.shields.io/badge/mail-%234ea94b.svg?style=flat&logo=gmail&logoColor=white"
                alt="Gmail"
              />
            </a>
            <a
              href="https://www.google.com/maps/search/Lahore,+Pakistan"
              target="_blank"
            >
              <img
                src="https://img.shields.io/badge/Lahore, Pakistan-black.svg?style=flat&logo=google-maps&logoColor=white"
                alt="Location"
              />
            </a>
          </div>
          <p class="text-muted-foreground font-light pt-2">
            Senior Software Engineer
          </p>
        </div>
      </div>
      <p
        class="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed mt-4"
      >
        I believe in my skills 💪 and I am Not Afraid of AI 🤖 taking over my
        job.
      </p>

      <div class="mt-8 flex justify-center gap-4">
        <a
          href="#projects"
          class="px-2 py-1 bg-primary text-sm text-primary-foreground rounded-lg font-light hover:opacity-90 transition-opacity"
        >
          View Projects
        </a>
        <a
          href="#contact"
          class="px-2 py-1 border text-sm border-neutral-900 text-secondary-foreground rounded-lg font-light hover:bg-secondary/80 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </div>
  </section>
  <section class="mb-32">
    <div class="text-center mt-8 text-muted-foreground text-sm italic">
      <blockquote v-html="quote"></blockquote>
    </div>
  </section>
</template>
