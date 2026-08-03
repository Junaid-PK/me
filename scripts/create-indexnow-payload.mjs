import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const key = process.env.INDEXNOW_KEY;
const outputDirectory = process.env.RUNNER_TEMP;

if (!key) throw new Error("INDEXNOW_KEY is required");
if (!outputDirectory) throw new Error("RUNNER_TEMP is required");

const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) throw new Error("The built sitemap does not contain any URLs");

const payload = {
  host: "hijunaid.com",
  key,
  keyLocation: `https://hijunaid.com/${key}.txt`,
  urlList,
};

await writeFile(join(outputDirectory, "indexnow.json"), `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Prepared IndexNow payload for ${urlList.length} URLs.`);
