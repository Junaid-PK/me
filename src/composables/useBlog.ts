import { ref, computed } from 'vue'
import type { BlogPost } from '../utils/blog'
import { parseMarkdownFile, sortBlogPosts, getBlogPostsByCategory, getFeaturedPosts, getRecentPosts } from '../utils/blog'

// Import all markdown files
const blogModules = import.meta.glob('../content/blog/*.md', { as: 'raw' })

export function useBlog() {
  const posts = ref<BlogPost[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  // Load all blog posts
  const loadPosts = async () => {
    try {
      loading.value = true
      error.value = null
      
      const postPromises = Object.entries(blogModules).map(async ([path, importFn]) => {
        const content = await (importFn as () => Promise<string>)()
        const slug = path.split('/').pop()?.replace('.md', '') || ''
        return parseMarkdownFile(content, slug)
      })
      
      const loadedPosts = await Promise.all(postPromises)
      posts.value = sortBlogPosts(loadedPosts)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load blog posts'
    } finally {
      loading.value = false
    }
  }

  // Get a specific post by slug
  const getPostBySlug = (slug: string) => {
    return posts.value.find(post => post.slug === slug)
  }

  // Get posts by category
  const getPostsByCategory = (category: string) => {
    return getBlogPostsByCategory(posts.value, category)
  }

  // Get featured posts
  const featuredPosts = computed(() => getFeaturedPosts(posts.value))

  // Get recent posts
  const recentPosts = computed(() => getRecentPosts(posts.value, 5))

  // Get all categories
  const categories = computed(() => {
    const categorySet = new Set(posts.value.map((post: BlogPost) => post.category))
    return Array.from(categorySet).sort()
  })

  return {
    posts: computed(() => posts.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    loadPosts,
    getPostBySlug,
    getPostsByCategory,
    featuredPosts,
    recentPosts,
    categories
  }
} 