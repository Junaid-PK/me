<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed, onMounted, onServerPrefetch, ref } from "vue";
import { useRoute } from "vue-router";
import { useBlog } from "../composables/useBlog";
import { parseBlogDate } from "../utils/blog";

const route = useRoute();
const { posts, loading, error, loadPosts, getPostBySlug } = useBlog();
const shareStatus = ref("");
const post = computed(() => getPostBySlug(route.params.slug as string));
const canonicalUrl = computed(() => `https://hijunaid.com/blog/${route.params.slug as string}`);
const formatDate = (dateString: string) => parseBlogDate(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Karachi" });

const sharePost = async () => {
  if (!post.value) return;
  try {
    if (navigator.share) {
      await navigator.share({ title: post.value.title, text: post.value.excerpt, url: window.location.href });
      shareStatus.value = "Shared";
    } else {
      await navigator.clipboard.writeText(window.location.href);
      shareStatus.value = "Link copied";
    }
  } catch (shareError) {
    if ((shareError as Error).name !== "AbortError") shareStatus.value = "Copy the URL from your browser to share";
  }
};

onMounted(async () => { if (posts.value.length === 0) await loadPosts(); });
onServerPrefetch(async () => { if (posts.value.length === 0) await loadPosts(); });

useHead(() => ({
  title: post.value ? `${post.value.title} — Junaid Hussnain` : "Engineering Note — Junaid Hussnain",
  meta: [
    { name: "description", content: post.value?.excerpt || "An engineering note by Junaid Hussnain." },
    { name: "author", content: "Junaid Hussnain" },
    { property: "og:type", content: "article" },
    { property: "og:title", content: post.value?.title || "Engineering Note" },
    { property: "og:description", content: post.value?.excerpt || "An engineering note by Junaid Hussnain." },
    { property: "og:url", content: canonicalUrl.value },
    { property: "article:published_time", content: post.value?.date || "" },
    { property: "article:modified_time", content: post.value?.updated || post.value?.date || "" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: post.value?.title || "Engineering Note — Junaid Hussnain" },
    { name: "twitter:description", content: post.value?.excerpt || "An engineering note by Junaid Hussnain." },
  ],
  link: [{ rel: "canonical", href: canonicalUrl.value }],
  script: post.value ? [{ type: "application/ld+json", textContent: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${canonicalUrl.value}#article`, headline: post.value.title, description: post.value.excerpt, image: "https://hijunaid.com/og-junaid.png", datePublished: post.value.date, dateModified: post.value.updated || post.value.date, inLanguage: "en", author: { "@type": "Person", "@id": "https://hijunaid.com/#junaid-hussnain", name: "Junaid Hussnain", url: "https://hijunaid.com/" }, publisher: { "@type": "Person", "@id": "https://hijunaid.com/#junaid-hussnain", name: "Junaid Hussnain", url: "https://hijunaid.com/" }, isPartOf: { "@type": "WebSite", "@id": "https://hijunaid.com/#website", name: "Junaid Hussnain", url: "https://hijunaid.com/" }, mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl.value } }) }] : [],
}));
</script>

<template>
  <div class="article-page">
    <div v-if="loading" class="article-state" role="status">Loading note…</div>
    <div v-else-if="error" class="article-state"><h1>This note could not be loaded.</h1><p>{{ error }}</p><RouterLink to="/blog">Back to engineering notes</RouterLink></div>

    <article v-else-if="post">
      <header class="post-header">
        <RouterLink class="back-link" to="/blog"><span aria-hidden="true">←</span> All engineering notes</RouterLink>
        <p class="post-meta">{{ post.category }} · {{ post.updated ? "Updated" : "Published" }} {{ formatDate(post.updated || post.date) }} · {{ post.readTime }}</p>
        <h1>{{ post.title }}</h1><p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="byline"><img src="https://avatars.githubusercontent.com/u/84363665?v=4" alt="" width="48" height="48" /><p><strong>Junaid Hussnain</strong><span>Software engineer · Lahore, Pakistan</span></p></div>
      </header>
      <div class="post-rule" aria-hidden="true"><span></span></div>
      <div class="post-content" v-html="post.html"></div>
      <footer class="post-footer">
        <div><p class="eyebrow">Keep the note moving</p><h2>Share it with someone building the next version.</h2></div>
        <div><button type="button" class="button button--primary" @click="sharePost">Share this note</button><p class="share-status" aria-live="polite">{{ shareStatus }}</p></div>
      </footer>
    </article>

    <div v-else class="article-state"><h1>That note does not exist.</h1><p>The URL may be outdated or mistyped.</p><RouterLink to="/blog">Browse engineering notes</RouterLink></div>
  </div>
</template>

<style scoped>
.article-page { width: min(1320px, calc(100% - 2rem)); min-height: 75vh; margin: 0 auto; padding: 0.35rem 0 clamp(3rem, 7vw, 7rem); }
.post-header { position: relative; overflow: hidden; width: 100%; margin: 0 auto; padding: clamp(3rem, 7vw, 6rem); background: var(--paper); border: 1px solid var(--rule); border-radius: 2rem; box-shadow: 0 24px 70px rgba(16, 37, 31, 0.08); text-align: center; }
.post-header::after { position: absolute; inset: 0; content: ""; opacity: 0.3; background-image: linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px); background-size: 44px 44px; mask-image: linear-gradient(90deg, transparent 15%, black 50%, transparent 85%); pointer-events: none; }
.post-header > * { position: relative; z-index: 1; }
.back-link { display: inline-flex; gap: 0.55rem; margin-bottom: 4rem; color: var(--blueprint); font: 500 0.72rem/1 "IBM Plex Mono", monospace; text-transform: uppercase; text-underline-offset: 0.35em; }
.post-meta { color: var(--signal-text); font: 500 0.72rem/1.5 "IBM Plex Mono", monospace; letter-spacing: 0.06em; text-transform: uppercase; }
.post-header h1 { margin: 1.2rem 0 1.5rem; font: 600 clamp(3rem, 7vw, 6.4rem)/0.95 "Newsreader", serif; letter-spacing: -0.055em; }
.post-excerpt { max-width: 760px; margin: 0 auto; color: var(--muted); font-size: clamp(1.05rem, 2vw, 1.25rem); line-height: 1.7; }
.byline { display: inline-flex; align-items: center; gap: 0.9rem; margin-top: 2.2rem; text-align: left; }
.byline img { width: 3rem; height: 3rem; object-fit: cover; border: 1px solid var(--ink); border-radius: 0.9rem; }
.byline p { display: grid; gap: 0.2rem; margin: 0; font-size: 0.78rem; }.byline span { color: var(--muted); }
.post-rule { display: flex; align-items: center; justify-content: center; margin: clamp(2rem, 5vw, 4rem) 0; }
.post-rule span { width: 3.5rem; height: 0.38rem; background: var(--mint); border-radius: 999px; }
.post-content { width: min(820px, 100%); margin: 0 auto; padding: clamp(1.5rem, 5vw, 4rem); color: var(--ink-soft); background: var(--paper); border: 1px solid var(--rule); border-radius: 1.5rem; font-size: 1.05rem; line-height: 1.85; }
.post-content :deep(h1), .post-content :deep(h2), .post-content :deep(h3), .post-content :deep(h4) { color: var(--ink); font-family: "Newsreader", serif; font-weight: 600; letter-spacing: -0.025em; line-height: 1.15; }
.post-content :deep(h2) { margin: 3.8rem 0 1.2rem; font-size: 2.5rem; }.post-content :deep(h3) { margin: 3rem 0 1rem; font-size: 1.8rem; }
.post-content :deep(p) { margin: 0 0 1.6rem; }.post-content :deep(ul), .post-content :deep(ol) { margin: 0 0 1.8rem; padding-left: 1.4rem; }.post-content :deep(li) { margin-bottom: 0.65rem; padding-left: 0.35rem; }
.post-content :deep(a) { color: var(--blueprint); text-underline-offset: 0.25em; }
.post-content :deep(blockquote) { margin: 2.5rem 0; padding: 1.5rem 1.8rem; color: var(--ink); background: var(--lime); border: 1px solid var(--rule-strong); border-radius: 1rem; font: 500 1.35rem/1.5 "Newsreader", serif; }
.post-content :deep(code) { padding: 0.16rem 0.35rem; color: var(--blueprint); background: var(--soft-blue); font: 400 0.88em/1.5 "IBM Plex Mono", monospace; }
.post-content :deep(pre) { overflow-x: auto; margin: 2.2rem 0; padding: 1.4rem; color: var(--canvas); background: var(--ink); border-radius: 1rem; box-shadow: 8px 8px 0 var(--mint); }.post-content :deep(pre code) { padding: 0; color: inherit; background: transparent; }
.post-content :deep(table) { display: block; width: 100%; overflow-x: auto; margin: 2.2rem 0; border-collapse: collapse; font-size: 0.9rem; line-height: 1.55; }
.post-content :deep(th), .post-content :deep(td) { min-width: 160px; padding: 0.85rem 1rem; text-align: left; vertical-align: top; border: 1px solid var(--rule); }
.post-content :deep(th) { color: var(--ink); background: var(--soft-blue); font-weight: 700; }
.post-footer { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; margin-top: clamp(4rem, 8vw, 7rem); padding: clamp(2.5rem, 6vw, 5rem); color: var(--ink); background: var(--steel); border: 1px solid var(--rule-strong); border-radius: 2rem; }
.post-footer h2 { margin: 0; font: 600 clamp(2rem, 4vw, 3.6rem)/1 "Newsreader", serif; letter-spacing: -0.04em; }.post-footer > div:last-child { align-self: end; }
.post-footer .eyebrow { color: var(--blueprint); }
.share-status { min-height: 1.3em; margin: 0.8rem 0 0; color: var(--ink-soft); font-size: 0.75rem; }
.article-state { padding: 5rem 0; color: var(--muted); }.article-state h1 { color: var(--ink); font: 600 3rem/1 "Newsreader", serif; }
@media (max-width: 720px) { .article-page { width: min(100% - 1rem, 1320px); }.post-header { padding: 3rem 1.1rem; border-radius: 1.45rem; }.back-link { margin-bottom: 2.5rem; }.post-header h1 { font-size: clamp(2.8rem, 14vw, 4.5rem); }.post-content { padding: 1.4rem 1.05rem; border-radius: 1.1rem; font-size: 1rem; line-height: 1.75; }.post-content :deep(h2) { font-size: 2rem; }.post-footer { grid-template-columns: 1fr; gap: 2rem; padding: 2rem 1.4rem; border-radius: 1.4rem; } }
</style>
