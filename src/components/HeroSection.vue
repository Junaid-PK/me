<script setup lang="ts">
import { ref, onMounted } from 'vue';
import quotesData from './quotes.json';
defineProps<{
  isVisible: boolean;
}>();

const quote = ref('');

onMounted(() => {
  try {
    const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
    const randomQuote = quotesData.quotes[randomIndex];
    quote.value = `"${randomQuote.quote}" - ${randomQuote.source}`;
  } catch (error) {
    console.error('Error selecting quote:', error);
    quote.value = 'Failed to load quote.';
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
      <div class="flex border">
        <img
          :src="'https://avatars.githubusercontent.com/u/84363665?v=4'"
          class="w-24 h-24 rounded-full border border-gray-400"
          alt="Avatar"
        />

        <div class="text-start p-2">
          <h1
            class="text-3xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Junaid Hussnain
          </h1>
          <p class="text-muted-foreground font-light">
            Senior Software Engineer
          </p>
        </div>
      </div>
      <p
        class="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed mt-2"
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
        <p>
        <blockquote>
          {{ quote }}
        </blockquote>
        </p>
      </div>
  </section>
</template>
