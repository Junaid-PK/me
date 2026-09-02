import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import 'vite-ssg'
import { readdirSync } from 'node:fs'

const githubEvidenceModuleId = 'virtual:github-evidence'
const resolvedGithubEvidenceModuleId = `\0${githubEvidenceModuleId}`
const githubSearchQuery = 'is:pr is:merged is:public author:Junaid-PK -user:Junaid-PK'
const githubSearchUrl = `https://github.com/search?q=${encodeURIComponent(githubSearchQuery)}&type=pullrequests`

interface GitHubEvidence {
  status: 'available' | 'partial' | 'unavailable'
  totalMerged: number | null
  generatedAt: string | null
  sourceUrl: string
}

let githubEvidencePromise: Promise<GitHubEvidence> | undefined

async function fetchGithubEvidence(): Promise<GitHubEvidence> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'hijunaid.com-build',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const endpoint = new URL('https://api.github.com/search/issues')
    endpoint.searchParams.set('q', githubSearchQuery)
    endpoint.searchParams.set('per_page', '1')

    const response = await fetch(endpoint, {
      headers,
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`)
    }

    const payload = await response.json() as {
      incomplete_results?: boolean
      total_count?: number
    }

    const totalCount = payload.total_count

    if (typeof totalCount !== 'number' || !Number.isInteger(totalCount) || totalCount < 0) {
      throw new Error('GitHub returned an invalid contribution count')
    }

    return {
      status: payload.incomplete_results ? 'partial' : 'available',
      totalMerged: totalCount,
      generatedAt: new Date().toISOString(),
      sourceUrl: githubSearchUrl,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error'
    console.warn(`GitHub contribution evidence is unavailable: ${message}`)

    return {
      status: 'unavailable',
      totalMerged: null,
      generatedAt: null,
      sourceUrl: githubSearchUrl,
    }
  }
}

function githubEvidencePlugin() {
  return {
    name: 'github-evidence',
    resolveId(id: string) {
      return id === githubEvidenceModuleId ? resolvedGithubEvidenceModuleId : undefined
    },
    async load(id: string) {
      if (id !== resolvedGithubEvidenceModuleId) return undefined

      githubEvidencePromise ??= fetchGithubEvidence()
      const evidence = await githubEvidencePromise

      return `export default ${JSON.stringify(evidence)}`
    },
  }
}

const blogRoutes = readdirSync(new URL('./src/content/blog/', import.meta.url))
  .filter((filename) => filename.endsWith('.md'))
  .map((filename) => `/blog/${filename.replace(/\.md$/, '')}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [githubEvidencePlugin(), vue()],
  ssgOptions: {
    includedRoutes: () => [
      '/',
      '/about',
      '/blog',
      '/404',
      ...blogRoutes,
    ],
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
})
