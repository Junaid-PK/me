<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed, onMounted, onServerPrefetch, ref } from "vue";
import { useBlog } from "../composables/useBlog";
import { parseBlogDate } from "../utils/blog";

const { posts, loading, error, loadPosts, categories } = useBlog();
const selectedCategory = ref("all");
const filteredPosts = computed(() => selectedCategory.value === "all" ? posts.value : posts.value.filter((post) => post.category === selectedCategory.value));
const formatDate = (dateString: string) => parseBlogDate(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Karachi" });
const blogUrl = "https://hijunaid.com/blog";
const blogSchema = computed(() => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${blogUrl}#collection-page`,
      url: blogUrl,
      name: "Engineering Notes — Junaid Hussnain",
      description: "Practical notes from Junaid Hussnain on backend systems, software architecture, delivery, and engineering leadership.",
      inLanguage: "en",
      isPartOf: { "@id": "https://hijunaid.com/#website" },
      author: { "@id": "https://hijunaid.com/#junaid-hussnain" },
      mainEntity: { "@id": `${blogUrl}#notes` },
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#notes`,
      name: "Junaid Hussnain's engineering notes",
      numberOfItems: posts.value.length,
      itemListElement: posts.value.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${blogUrl}/${post.slug}`,
        name: post.title,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${blogUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://hijunaid.com/" },
        { "@type": "ListItem", position: 2, name: "Engineering notes", item: blogUrl },
      ],
    },
  ],
}));

onMounted(loadPosts);
onServerPrefetch(loadPosts);

useHead(() => ({
  title: "Engineering Notes — Junaid Hussnain",
  meta: [
    { name: "description", content: "Practical notes from Junaid Hussnain on backend systems, software architecture, delivery, and engineering leadership." },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Engineering Notes — Junaid Hussnain" },
    { property: "og:description", content: "Practical field notes on backend systems, open source, architecture, delivery, and engineering leadership." },
    { property: "og:url", content: blogUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Engineering Notes — Junaid Hussnain" },
    { name: "twitter:description", content: "Practical field notes on backend systems, open source, architecture, delivery, and engineering leadership." },
  ],
  link: [{ rel: "canonical", href: blogUrl }],
  script: [{ type: "application/ld+json", textContent: JSON.stringify(blogSchema.value) }],
}));
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
            <p class="article-meta">{{ post.category }} · {{ post.updated ? "Updated" : "Published" }} {{ formatDate(post.updated || post.date) }} · {{ post.readTime }}</p>
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
.notes-index { width: min(1180px, calc(100% - 3rem)); min-height: 70vh; margin: 0 auto; padding: clamp(3.5rem, 7vw, 6.5rem) 0 clamp(4rem, 8vw, 8rem); }
.notes-header { display: grid; grid-template-columns: 1.5fr 0.5fr; align-items: end; gap: 5rem; padding-bottom: clamp(2.5rem, 5vw, 4rem); border-bottom: 3px solid var(--ink); }
.notes-header h1 { max-width: 900px; margin: 0; font-size: clamp(3.5rem, 7.5vw, 7rem); font-weight: 720; line-height: 0.92; letter-spacing: -0.07em; }
.notes-header > p { max-width: 360px; margin: 0 0 0.25rem; color: var(--muted); font-size: 0.9rem; line-height: 1.65; }
.filter-bar { display: flex; flex-wrap: wrap; gap: 0 1.2rem; padding: 1rem 0; border-bottom: 1px solid var(--rule-strong); }
.filter-bar button { min-height: 2.3rem; padding: 0; color: var(--muted); background: transparent; border: 0; border-bottom: 2px solid transparent; cursor: pointer; font-size: 0.66rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
.filter-bar button span { margin-left: 0.25rem; color: var(--blueprint); }
.filter-bar button[aria-pressed="true"] { color: var(--ink); border-bottom-color: var(--ink); }
.article-list { border-top: 1px solid var(--ink); }
.article-row { display: grid; grid-template-columns: 54px 1fr 24px; gap: 2rem; padding: clamp(1.6rem, 3vw, 2.6rem) 0; border-bottom: 1px solid var(--rule-strong); text-decoration: none; }
.article-row:hover h2 { color: var(--blueprint); }
.article-index, .article-meta { color: var(--muted); font-size: 0.65rem; font-weight: 700; line-height: 1.6; letter-spacing: 0.05em; text-transform: uppercase; }
.article-index { color: var(--signal-text); }
.article-meta { margin: 0 0 0.8rem; }
.article-copy h2 { max-width: 850px; margin: 0; font-size: clamp(1.75rem, 3.7vw, 3rem); font-weight: 700; line-height: 1.03; letter-spacing: -0.05em; }
.article-copy > p:last-child { max-width: 750px; margin: 0.9rem 0 0; color: var(--muted); font-size: 0.88rem; line-height: 1.65; }
.article-open { justify-self: end; color: var(--blueprint); }
.page-state { padding: 5rem 0; color: var(--muted); }
.page-state h2 { color: var(--ink); font-size: 2rem; line-height: 1.1; letter-spacing: -0.04em; }
.page-state button { padding: 0; color: var(--blueprint); background: none; border: 0; text-decoration: underline; cursor: pointer; }
.page-state--error { color: #9d2f1e; }
@media (max-width: 760px) {
  .notes-index { width: min(100% - 2rem, 1180px); }
  .notes-header { grid-template-columns: 1fr; gap: 1.5rem; }
  .notes-header h1 { font-size: clamp(3.2rem, 16vw, 5.4rem); }
  .article-row { grid-template-columns: 28px 1fr 16px; gap: 0.8rem; }
  .article-copy > p:last-child { font-size: 0.82rem; }
}
</style>
