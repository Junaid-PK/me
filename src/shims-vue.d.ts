declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "virtual:github-evidence" {
  interface GitHubEvidence {
    status: "available" | "partial" | "unavailable";
    totalMerged: number | null;
    generatedAt: string | null;
    sourceUrl: string;
  }

  const evidence: GitHubEvidence;
  export default evidence;
}
