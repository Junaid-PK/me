<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed, onMounted, onServerPrefetch, ref } from "vue";
import { useBlog } from "../composables/useBlog";

const { posts, loading, error, loadPosts, categories } = useBlog();
const selectedCategory = ref("all");
const filteredPosts = computed(() => selectedCategory.value === "all" ? posts.value : posts.value.filter((post) => post.category === selectedCategory.value));
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

onMounted(loadPosts);
onServerPrefetch(loadPosts);

useHead({
  title: "Engineering Notes — Junaid Hussnain",
  meta: [{ name: "description", content: "Practical notes from Junaid Hussnain on backend systems, software architecture, delivery, and engineering leadership." }],
  link: [{ rel: "canonical", href: "https://hijunaid.com/blog" }],
});
</script>

<template>
  <section class="notes-index" aria-labelledby="notes-index-title">
    <header class="notes-header">
      <div><p class="eyebrow">Engineering notes</p><h1 id="notes-index-title">Ideas worth carrying into the next build.</h1></div>
      <p>Notes on backend design, maintainable systems, technical decisions, and the human side of engineering work.</p>
    </header>

    <div v-if="loading" class="page-state" role="status">Loading notes…</div>
    <div v-else-if="error" class="page-state page-state--error"><h2>Notes could not be loaded.</h2><p>{{ error }}</p></div>

    <template v-else>
      <div class="filter-bar" aria-label="Filter notes by category">
        <button type="button" :aria-pressed="selectedCategory === 'all'" @click="selectedCategory = 'all'">All notes <span>{{ posts.length }}</span></button>
        <button v-for="category in categories" :key="category" type="button" :aria-pressed="selectedCategory === category" @click="selectedCategory = category">
          {{ category }} <span>{{ posts.filter((post) => post.category === category).length }}</span>
        </button>
      </div>

      <div class="article-list">
        <RouterLink v-for="(post, index) in filteredPosts" :key="post.slug" class="article-row" :to="`/blog/${post.slug}`">
          <span class="article-index">{{ String(index + 1).padStart(2, "0") }}</span>
          <div class="article-copy">
            <p class="article-meta">{{ post.category }} · {{ formatDate(post.date) }} · {{ post.readTime }}</p>
            <h2>{{ post.title }}</h2><p>{{ post.excerpt }}</p>
          </div>
          <span class="article-open" aria-hidden="true">↗</span>
        </RouterLink>
      </div>

      <div v-if="filteredPosts.length === 0" class="page-state"><h2>No notes in this category yet.</h2><button type="button" @click="selectedCategory = 'all'">Show all notes</button></div>
    </template>
  </section>
</template>

<style scoped>
.notes-index { width: min(1180px, calc(100% - 3rem)); min-height: 70vh; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) 0; }
.notes-header { display: grid; grid-template-columns: 1.4fr 0.6fr; align-items: end; gap: 5rem; padding-bottom: clamp(3rem, 6vw, 5rem); border-bottom: 1px solid var(--ink); }
.notes-header h1 { max-width: 850px; margin: 0; font: 600 clamp(3.2rem, 7vw, 6.8rem)/0.92 "Newsreader", serif; letter-spacing: -0.06em; }
.notes-header > p { margin: 0 0 0.5rem; color: var(--muted); line-height: 1.7; }
.filter-bar { display: flex; flex-wrap: wrap; gap: 0.6rem; padding: 1.4rem 0; border-bottom: 1px solid var(--ink); }
.filter-bar button { min-height: 2.45rem; padding: 0.55rem 0.75rem; color: var(--muted); background: transparent; border: 1px solid var(--rule); cursor: pointer; font: 500 0.68rem/1 "IBM Plex Mono", monospace; text-transform: uppercase; }
.filter-bar button span { margin-left: 0.35rem; color: var(--blueprint); }
.filter-bar button[aria-pressed="true"] { color: white; background: var(--blueprint); border-color: var(--blueprint); }
.filter-bar button[aria-pressed="true"] span { color: white; }
.article-row { display: grid; grid-template-columns: 75px 1fr 35px; gap: 2rem; padding: clamp(1.8rem, 4vw, 3.2rem) 0; border-bottom: 1px solid var(--rule); text-decoration: none; }
.article-row:hover h2 { color: var(--blueprint); }
.article-index, .article-meta { color: var(--muted); font: 400 0.68rem/1.6 "IBM Plex Mono", monospace; text-transform: uppercase; }
.article-index { color: var(--signal-text); }
.article-meta { margin: 0 0 0.8rem; }
.article-copy h2 { max-width: 850px; margin: 0; font: 600 clamp(1.8rem, 4vw, 3rem)/1.05 "Newsreader", serif; letter-spacing: -0.035em; }
.article-copy > p:last-child { max-width: 750px; margin: 1rem 0 0; color: var(--muted); line-height: 1.65; }
.article-open { color: var(--blueprint); font-size: 1.2rem; }
.page-state { padding: 5rem 0; color: var(--muted); }
.page-state h2 { color: var(--ink); font: 600 2rem/1.1 "Newsreader", serif; }
.page-state button { padding: 0; color: var(--blueprint); background: none; border: 0; text-decoration: underline; cursor: pointer; }
.page-state--error { color: #9d2f1e; }
@media (max-width: 760px) {
  .notes-index { width: min(100% - 2rem, 1180px); padding-top: 3rem; }
  .notes-header { grid-template-columns: 1fr; gap: 1.5rem; }
  .notes-header h1 { font-size: clamp(3rem, 15vw, 5rem); }
  .article-row { grid-template-columns: 35px 1fr 20px; gap: 0.8rem; }
  .article-copy > p:last-child { display: none; }
}
</style>
