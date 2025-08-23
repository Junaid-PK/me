<template>
  <section class="blogs max-w-[720px] mx-auto">
    <div v-if="loading" class="loading">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p class="mt-4 text-muted-foreground">Loading blog posts...</p>
    </div>

    <div v-else-if="error" class="error">
      <h1 class="text-2xl font-bold text-destructive">Error</h1>
      <p class="text-muted-foreground">{{ error }}</p>
    </div>

    <div v-else>
      <header class="blog-header">
        <h1 class="blog-title">Blog Posts</h1>
        <p class="blog-subtitle">Thoughts, tutorials, and insights on Engineering</p>
      </header>

      <!-- Category Filter -->
      <div class="category-filter">
        <button 
          class="category-btn"
          :class="{ active: selectedCategory === 'all' }"
          @click="selectedCategory = 'all'"
        >
          All Posts
        </button>
        <button 
          v-for="category in categories"
          :key="category"
          class="category-btn"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Blog Posts Grid -->
      <div class="blog-grid">
        <article 
          v-for="post in filteredPosts"
          :key="post.slug"
          class="blog-card"
          @click="navigateToPost(post.slug)"
        >
          <div class="blog-card-content">
            <div class="blog-card-meta">
              <span class="blog-category">{{ post.category }}</span>
              <span class="blog-date">{{ formatDate(post.date) }}</span>
            </div>
            
            <h2 class="blog-card-title">{{ post.title }}</h2>
            <p class="blog-card-excerpt">{{ post.excerpt }}</p>
            
            <div class="blog-card-footer">
              <span class="blog-read-time">{{ post.readTime }}</span>
              <span class="blog-author">By {{ post.author }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="empty-state">
        <h3 class="empty-title">No posts found</h3>
        <p class="empty-text">No blog posts match the selected category.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlog } from '../composables/useBlog'

const router = useRouter()
const { posts, loading, error, loadPosts, categories } = useBlog()

const selectedCategory = ref('all')

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'all') {
    return posts.value
  }
  return posts.value.filter(post => post.category === selectedCategory.value)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const navigateToPost = (slug: string) => {
  router.push(`/blog/${slug}`)
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>

.loading, .error {
  text-align: center;
  padding: 4rem 1rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-family: "IBM Plex Mono", monospace;
}

.blog-subtitle {
  font-size: 1.125rem;
  color: #374151;
  max-width: 600px;
  margin: 0 auto;
  font-family: "IBM Plex Mono", monospace;
}

.category-filter {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.125rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: #ede8dc;
  color: #374151;
  border: 1px dashed #374151;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: "IBM Plex Mono", monospace;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.category-btn:hover {
  background: rgba(55, 65, 81, 0.1);
  transform: scale(1.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.category-btn.active {
  background: #374151;
  color: #ede8dc;
  border-color: #374151;
  border-style: solid;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
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

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-family: "IBM Plex Mono", monospace;
}

.empty-text {
  color: #374151;
  font-family: "IBM Plex Mono", monospace;
}

@media (max-width: 768px) {
  .blogs {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 2rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .category-filter {
    gap: 0.25rem;
  }
  
  .category-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
}
</style>
