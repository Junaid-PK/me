<script setup lang="ts">
import { computed, onMounted, onServerPrefetch } from "vue";
import { useBlog } from "../../composables/useBlog";
import { parseBlogDate } from "../../utils/blog";

const { posts, loadPosts } = useBlog();
const selectedPosts = computed(() => posts.value.filter((post) => post.featured).slice(0, 3));

const formatDate = (value: string) => {
  const date = parseBlogDate(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "Asia/Karachi" });
};

onMounted(loadPosts);
onServerPrefetch(loadPosts);
</script>

<template>
  <section class="section notes" aria-labelledby="notes-title">
    <div class="section-heading section-heading--split">
      <div>
        <p class="eyebrow">Engineering notes</p>
        <h2 id="notes-title">Writing down the decisions.</h2>
      </div>
      <RouterLink class="text-link" to="/blog">View all notes <span aria-hidden="true">→</span></RouterLink>
    </div>

    <div class="notes-list">
      <RouterLink v-for="post in selectedPosts" :key="post.slug" class="note-row" :to="`/blog/${post.slug}`">
        <span class="note-meta">{{ post.category }} · {{ formatDate(post.date) }}</span>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
        <span class="note-arrow" aria-hidden="true">↗</span>
      </RouterLink>
    </div>
  </section>
</template>
