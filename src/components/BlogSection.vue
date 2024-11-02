<script setup lang="ts">
defineProps<{
  posts: Array<{
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
    image: string
  }>
  isVisible: boolean
}>()
</script>

<template>
  <section id="blog" class="mb-32">
    <h2 class="text-3xl font-semibold mb-12 text-center">Latest Articles</h2>
    <div class="grid grid-cols-1 gap-8">
      <article 
        v-for="(post, index) in posts" 
        :key="post.title"
        class="group backdrop-blur-lg bg-white/40 dark:bg-gray-900/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl border border-white/20"
        :class="isVisible ? 'animate-fade-in' : ''"
        :style="{ animationDelay: `${index * 200}ms` }"
      >
        <div class="relative h-48 overflow-hidden">
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span class="absolute bottom-4 left-4 text-white text-sm font-medium backdrop-blur-md bg-white/20 px-3 py-1 rounded-full border border-white/20">
            {{ post.category }}
          </span>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <time>{{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</time>
            <span>{{ post.readTime }}</span>
          </div>
          <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {{ post.title }}
          </h3>
          <p class="text-muted-foreground mb-4">{{ post.excerpt }}</p>
          <a href="#" class="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Read More
            <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>