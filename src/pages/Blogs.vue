<template>
  <section class="blogs">
    <h1
      class="text-3xl font-semibold mb-12 text-center capitalize tracking-tighter"
    >
      Blog Posts
    </h1>
    <div class="blog-list">
      <div
        v-for="post in blogPosts"
        :key="post.title"
        class="blog-post rounded-lg border border-border/5 shadow-sm overflow-hidden"
      >
        <!-- <div class="blog-post-image">
          <img :src="post.image" alt="Blog post image" />
        </div> -->
        <div class="blog-post-content">
          <h2 class="blog-post-title">{{ post.title }}</h2>
          <p class="blog-post-excerpt">{{ post.excerpt }}</p>
          <div class="blog-post-meta">
            <span class="blog-post-date">{{ post.date }}</span>
            <span class="blog-post-read-time">{{ post.readTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const blogPosts = ref([
  {
    title: "Understanding Vue 3",
    excerpt: "A comprehensive guide to Vue 3 features and best practices.",
    date: "2023-10-01",
    readTime: "5 min",
    category: "Vue.js",
    image: "path/to/image1.jpg",
  },
  {
    title: "TypeScript for Beginners",
    excerpt:
      "An introduction to TypeScript and its benefits for JavaScript developers.",
    date: "2023-09-15",
    readTime: "7 min",
    category: "TypeScript",
    image: "path/to/image2.jpg",
  },
  // Add more blog posts as needed
]);
</script>

<style scoped>
.blogs {
  padding: 2rem;
}
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
