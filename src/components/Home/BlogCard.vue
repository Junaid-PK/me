<script setup lang="ts">
import type { Blog } from "./blog";

defineProps<{
  blog: Blog;
}>();
</script>

<template>
  <article
    class="blog-card border border-dashed border-neutral-900 rounded-sm text-black text-start min-h-[450px]"
  >
    <img :src="blog.imageUrl" :alt="blog.title" class="blog-image" />
    <div class="blog-content text-black">
      <h3 class="text-2xl text-black font-bold mb-4 text-start">
        {{ blog.title }}
      </h3>
      <p class="excerpt">{{ blog.excerpt }}</p>
      <div class="meta">
        <span class="author">{{ blog.author }}</span>
        <span class="date">{{ new Date(blog.date).toLocaleDateString() }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.blog-card {
  /* background: #1f2937; */
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
}

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 1.5rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  /* color: #e5e7eb; */
}

.excerpt {
  /* color: #9ca3af; */
  margin-bottom: 1rem;
  line-height: 1.5;
}

.meta {
  display: flex;
  justify-content: space-between;
  /* color: #6b7280; */
  font-size: 0.875rem;
}

.author {
  font-weight: 500;
}
</style>
