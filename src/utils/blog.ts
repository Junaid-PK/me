import { marked } from 'marked'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author: string
  featured: boolean
  content: string
  html: string
}

export interface BlogMeta {
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author: string
  featured: boolean
}

// Configure marked for security and customization
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
})

// Custom renderer for code blocks with syntax highlighting
const renderer = new marked.Renderer()
renderer.code = ({ text, lang }) => {
  const validLanguage = lang || 'text'
  return `<pre><code class="language-${validLanguage}">${text}</code></pre>`
}

marked.use({ renderer })

export async function parseMarkdownFile(content: string, slug: string): Promise<BlogPost> {
  const { data, content: markdownContent } = matter(content)
  const meta = data as BlogMeta
  
  // Convert markdown to HTML
  const html = await marked(markdownContent)
  
  return {
    slug,
    title: meta.title,
    excerpt: meta.excerpt,
    date: meta.date,
    readTime: meta.readTime,
    category: meta.category,
    author: meta.author,
    featured: meta.featured,
    content: markdownContent,
    html
  }
}

export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    // Sort by featured first, then by date (newest first)
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getBlogPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase())
}

export function getFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => post.featured)
}

export function getRecentPosts(posts: BlogPost[], limit: number = 5): BlogPost[] {
  return sortBlogPosts(posts).slice(0, limit)
} 