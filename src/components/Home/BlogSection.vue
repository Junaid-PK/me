<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlog } from '../../composables/useBlog'

const router = useRouter()
const { featuredPosts, loadPosts } = useBlog()

const props = defineProps<{
  isVisible: boolean;
}>()

const posts = computed(() => featuredPosts.value.slice(0, 3))

const navigateToPost = (slug: string) => {
  router.push(`/blog/${slug}`)
}

const navigateToBlog = () => {
  router.push('/blog')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Load posts when component is mounted and visible
onMounted(() => {
  if (props.isVisible) {
    loadPosts()
  }
})
</script>

<template>
  <section v-if="isVisible" class="blog-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Latest Blog Posts</h2>
        <p class="section-subtitle">Insights and tutorials from my development journey</p>
      </div>

      <div class="blog-grid">
        <article 
          v-for="post in posts"
          :key="post.slug"
          class="blog-card"
          @click="navigateToPost(post.slug)"
        >
          <div class="blog-card-content">
            <div class="blog-card-meta">
              <span class="blog-category">{{ post.category }}</span>
              <span class="blog-date">{{ formatDate(post.date) }}</span>
            </div>
            
            <h3 class="blog-card-title">{{ post.title }}</h3>
            <p class="blog-card-excerpt">{{ post.excerpt }}</p>
            
            <div class="blog-card-footer">
              <span class="blog-read-time">{{ post.readTime }}</span>
              <span class="blog-author">By {{ post.author }}</span>
            </div>
          </div>
        </article>
      </div>

      <div class="section-footer">
        <button class="view-all-btn" @click="navigateToBlog">
          View All Posts
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-section {
  padding: 4rem 0;
  background: #ede8dc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-family: "IBM Plex Mono", monospace;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #374151;
  max-width: 600px;
  margin: 0 auto;
  font-family: "IBM Plex Mono", monospace;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: #ede8dc;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.blog-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.blog-card-content {
  padding: 1.5rem;
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.blog-category {
  background: #ede8dc;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px dashed #374151;
  font-family: "IBM Plex Mono", monospace;
}

.blog-date {
  font-size: 0.875rem;
  color: #374151;
  font-family: "IBM Plex Mono", monospace;
}

.blog-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-family: "IBM Plex Mono", monospace;
}

.blog-card-excerpt {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: "IBM Plex Mono", monospace;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #374151;
  font-family: "IBM Plex Mono", monospace;
}

.section-footer {
  text-align: center;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ede8dc;
  color: #374151;
  padding: 0.75rem 1.5rem;
  border-radius: 0.125rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px dashed #374151;
  font-family: "IBM Plex Mono", monospace;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.view-all-btn:hover {
  background: rgba(55, 65, 81, 0.1);
  transform: scale(1.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .blog-section {
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
