import { marked } from 'marked'

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

function parseFrontmatter(source: string): { meta: BlogMeta; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)

  if (!match) {
    throw new Error('Blog post is missing frontmatter')
  }

  const values: Record<string, string | boolean> = {}

  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':')
    if (separator === -1) continue

    const key = line.slice(0, separator).trim()
    const rawValue = line.slice(separator + 1).trim()
    const unquoted = rawValue.replace(/^("|')|("|')$/g, '')
    values[key] = unquoted === 'true' ? true : unquoted === 'false' ? false : unquoted
  }

  const required = ['title', 'excerpt', 'date', 'readTime', 'category', 'author'] as const
  for (const key of required) {
    if (typeof values[key] !== 'string' || !values[key]) {
      throw new Error(`Blog post frontmatter is missing ${key}`)
    }
  }

  return {
    meta: values as unknown as BlogMeta,
    body: source.slice(match[0].length),
  }
}

export async function parseMarkdownFile(content: string, slug: string): Promise<BlogPost> {
  const { meta, body: markdownContent } = parseFrontmatter(content)
  
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

export function parseBlogDate(value: string): Date {
  return new Date(value.includes('T') ? value : `${value}T00:00:00+05:00`)
}

export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    return parseBlogDate(b.date).getTime() - parseBlogDate(a.date).getTime()
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
