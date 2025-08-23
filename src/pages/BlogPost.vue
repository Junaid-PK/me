<template>
  <div class="blog-post-page">
    <div v-if="loading" class="loading">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p class="mt-4 text-muted-foreground">Loading post...</p>
    </div>

    <div v-else-if="error" class="error">
      <h1 class="text-2xl font-bold text-destructive">Error</h1>
      <p class="text-muted-foreground">{{ error }}</p>
    </div>

    <article v-else-if="post" class="blog-post">
      <!-- Header -->
      <header class="post-header">
        <div class="post-meta">
          <span class="category">{{ post.category }}</span>
          <span class="date">{{ formatDate(post.date) }}</span>
          <span class="read-time">{{ post.readTime }}</span>
        </div>
        
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        
        <div class="author">
          <span class="author-label">By</span>
          <span class="author-name">{{ post.author }}</span>
        </div>
      </header>

      <!-- Content -->
      <div class="post-content" v-html="post.html"></div>

      <!-- Footer -->
      <footer class="post-footer">
        <div class="post-tags">
          <span class="tag">{{ post.category }}</span>
        </div>
        
        <div class="post-share">
          <button class="share-button" @click="sharePost">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
            </svg>
            Share
          </button>
        </div>
      </footer>
    </article>

    <div v-else class="not-found">
      <h1 class="text-2xl font-bold">Post Not Found</h1>
      <p class="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
      <router-link to="/blog" class="back-link">← Back to Blog</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlog } from '../composables/useBlog'

const route = useRoute()
const { posts, loading, error, loadPosts, getPostBySlug } = useBlog()

const post = computed(() => {
  const slug = route.params.slug as string
  return getPostBySlug(slug)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const sharePost = async () => {
  if (navigator.share && post.value) {
    try {
      await navigator.share({
        title: post.value.title,
        text: post.value.excerpt,
        url: window.location.href
      })
    } catch (error) {
      console.log('Error sharing:', error)
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    } catch (error) {
      console.log('Error copying to clipboard:', error)
    }
  }
}

onMounted(() => {
  if (posts.value.length === 0) {
    loadPosts()
  }
})
</script>

<style scoped>
.blog-post-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #ede8dc;
  min-height: 100vh;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.blog-post {
  line-height: 1.7;
  background: #ede8dc;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.post-header {
  margin-bottom: 3rem;
  text-align: center;
}

.post-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #374151;
  font-family: "IBM Plex Mono", monospace;
}

.category {
  background: #ede8dc;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  font-weight: 500;
  border: 1px dashed #374151;
  font-family: "IBM Plex Mono", monospace;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-family: "IBM Plex Mono", monospace;
}

.post-excerpt {
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: "IBM Plex Mono", monospace;
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.author-label {
  color: #374151;
  font-family: "IBM Plex Mono", monospace;
}

.author-name {
  font-weight: 500;
  color: #2c3e50;
  font-family: "IBM Plex Mono", monospace;
}

.post-content {
  margin-bottom: 3rem;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.post-content :deep(h1) { font-size: 2rem; }
.post-content :deep(h2) { font-size: 1.75rem; }
.post-content :deep(h3) { font-size: 1.5rem; }
.post-content :deep(h4) { font-size: 1.25rem; }

.post-content :deep(p) {
  margin-bottom: 1.5rem;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.post-content :deep(li) {
  margin-bottom: 0.5rem;
}

.post-content :deep(blockquote) {
  border-left: 4px dashed #374151;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #374151;
  background: rgba(55, 65, 81, 0.05);
  padding: 1rem;
  border-radius: 0.125rem;
}

.post-content :deep(code) {
  background: rgba(55, 65, 81, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: "IBM Plex Mono", monospace;
  color: #374151;
  word-break: break-word;
}

.post-content :deep(pre) {
  background: #1e1e1e;
  padding: 1.25rem;
  padding-top: 2.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
}

.post-content :deep(pre::before) {
  content: '';
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  height: 12px;
  width: 12px;
  background: #ff5f56;
  border-radius: 50%;
  box-shadow: 1.4em 0 0 #ffbd2e, 2.8em 0 0 #27c93f;
}

.post-content :deep(pre code) {
  background: none;
  padding: 0;
  border-radius: 0;
  color: #e4e4e4;
  font-size: 0.9em;
  line-height: 1.7;
  tab-size: 2;
  -moz-tab-size: 2;
}

.post-content :deep(a) {
  color: #374151;
  text-decoration: underline;
  text-decoration-color: #374151;
  font-weight: 500;
}

.post-content :deep(a:hover) {
  color: #2c3e50;
  text-decoration-color: #2c3e50;
}

.post-footer {
  border-top: 1px solid hsl(var(--border));
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ede8dc;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 0.125rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px dashed #374151;
  font-family: "IBM Plex Mono", monospace;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.share-button:hover {
  background: rgba(55, 65, 81, 0.1);
  transform: scale(1.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  font-family: "IBM Plex Mono", monospace;
  padding: 0.5rem 1rem;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.back-link:hover {
  background: rgba(55, 65, 81, 0.1);
  transform: scale(1.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .blog-post-page {
    padding: 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .post-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style> 