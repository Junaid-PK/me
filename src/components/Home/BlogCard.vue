<script setup lang="ts">
import { defineProps } from "vue";
import type { Blog } from "./blog";

const props = defineProps<{ blog: Blog }>();
</script>

<template>
  <div>
    <article
      :key="props.blog.id"
      class="blog-card border border-dashed border-neutral-900 rounded-sm text-black text-start min-h-[480px]"
    >
      <img
        src="https://picsum.photos/400/200"
        :alt="blog.title"
        class="blog-image"
      />
      <div class="blog-content text-black">
        <h3 class="text-2xl text-black font-bold mb-4 text-start">
          {{ props.blog.title }}
        </h3>
        <p class="excerpt">
          {{ props.blog.meta_description.substring(0, 70) }}...
        </p>
        <div class="meta">
          <span class="date">{{ blog.category.name }}</span>
          <span class="author border border-b-black cursor-pointer"
            >READ MORE</span
          >
        </div>
      </div>
    </article>
  </div>
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
