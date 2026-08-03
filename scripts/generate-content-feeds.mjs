import { readdir, readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://hijunaid.com";
const contentDirectory = new URL("../src/content/blog/", import.meta.url);
const publicDirectory = new URL("../public/", import.meta.url);

const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

function parseFrontmatter(source, filename) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error(`${filename} is missing frontmatter`);

  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^("|')|("|')$/g, "");
    metadata[key] = value;
  }

  for (const key of ["title", "excerpt", "date"]) {
    if (!metadata[key]) throw new Error(`${filename} is missing ${key}`);
  }

  const date = new Date(`${metadata.date}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`${filename} has an invalid date`);

  return {
    slug: filename.replace(/\.md$/, ""),
    title: metadata.title,
    excerpt: metadata.excerpt,
    date: metadata.date,
    publishedAt: date,
  };
}

const filenames = (await readdir(contentDirectory)).filter((filename) => filename.endsWith(".md"));
const posts = await Promise.all(filenames.map(async (filename) => {
  const source = await readFile(new URL(filename, contentDirectory), "utf8");
  return parseFrontmatter(source, filename);
}));

posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

const sitemapEntries = posts.map((post) => [
  "  <url>",
  `    <loc>${siteUrl}/blog/${escapeXml(post.slug)}</loc>`,
  `    <lastmod>${post.date}</lastmod>`,
  "    <priority>0.7</priority>",
  "  </url>",
].join("\n"));

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <url><loc>${siteUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
  `  <url><loc>${siteUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
  ...sitemapEntries,
  "</urlset>",
  "",
].join("\n");

const rssItems = posts.map((post) => {
  const url = `${siteUrl}/blog/${post.slug}`;
  return [
    "  <item>",
    `    <title>${escapeXml(post.title)}</title>`,
    `    <link>${url}</link>`,
    `    <guid isPermaLink="true">${url}</guid>`,
    `    <pubDate>${post.publishedAt.toUTCString()}</pubDate>`,
    `    <description>${escapeXml(post.excerpt)}</description>`,
    "  </item>",
  ].join("\n");
});

const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0">',
  "<channel>",
  "  <title>Junaid Hussnain — Engineering Notes</title>",
  `  <link>${siteUrl}/blog</link>`,
  "  <description>Practical notes on backend systems, open source, architecture, delivery, and engineering leadership.</description>",
  "  <language>en</language>",
  ...rssItems,
  "</channel>",
  "</rss>",
  "",
].join("\n");

await Promise.all([
  writeFile(new URL("sitemap.xml", publicDirectory), sitemap),
  writeFile(new URL("rss.xml", publicDirectory), rss),
]);

console.log(`Generated sitemap and RSS for ${posts.length} posts.`);
