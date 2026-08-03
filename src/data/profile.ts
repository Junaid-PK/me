export interface Project {
  name: string;
  label: string;
  summary: string;
  problem: string;
  decisions: string[];
  stack: string[];
  source: string;
  status: string;
}

export const projects: Project[] = [
  {
    name: "Stackline",
    label: "Product / open source",
    summary: "An ATS-focused resume builder for experienced software professionals that keeps personal data in the browser.",
    problem: "Resume tools often hide their scoring, collect sensitive career data, or export layouts that parsing systems struggle to read.",
    decisions: [
      "Local-first data and autosave",
      "Explainable role and keyword checks",
      "Selectable-text DOCX and PDF exports",
      "Tested React domain logic with Docker delivery",
    ],
    stack: ["React", "TypeScript", "Vitest", "Docker"],
    source: "https://github.com/Junaid-PK/stackline",
    status: "Active build · 2026",
  },
  {
    name: "E-Manager",
    label: "Operations platform",
    summary: "A Laravel and Livewire system for finance, project, and workforce operations with granular access control.",
    problem: "Invoices, bank movements, expenses, worker payments, and monthly project reporting need one consistent operational model.",
    decisions: [
      "Role and module-level permissions",
      "Signed exports and auditable activity",
      "English and Spanish workflows",
      "Feature tests around visibility and financial rules",
    ],
    stack: ["Laravel", "Livewire", "PHP", "SQLite"],
    source: "https://github.com/Junaid-PK/e_manager",
    status: "Active build · 2026",
  },
  {
    name: "Laravel Development Workflow",
    label: "Developer tooling / open source",
    summary: "A reusable engineering workflow that turns Laravel feature requests and bug reports into verifiable delivery steps.",
    problem: "Fast framework work can skip edge cases, authorization boundaries, realistic data, and a reliable regression loop.",
    decisions: [
      "Acceptance criteria before implementation",
      "Failing tests before bug fixes",
      "Realistic factories and boundary states",
      "Explicit verification as the definition of done",
    ],
    stack: ["Laravel", "Testing", "Documentation", "Automation"],
    source: "https://github.com/Junaid-PK/laravel-development-workflow",
    status: "Public utility · 2026",
  },
  {
    name: "Verdict Evaluation CLI",
    label: "Open-source contribution",
    summary: "An upstream Laravel package contribution adding safe evaluation baselines and CI-ready regression reporting.",
    problem: "Security evaluation reports need repeatable baseline comparisons without copying unvalidated JSON, leaking model data, or hiding distinct failure categories.",
    decisions: [
      "Typed validation before baseline persistence",
      "Explicit, atomic baseline replacement",
      "Distinct findings and stable CI exit codes",
      "Escaped, redacted GitHub Actions annotations",
    ],
    stack: ["PHP", "Laravel", "Pest", "PHPStan", "GitHub Actions"],
    source: "https://github.com/fissible/verdict/pull/6",
    status: "Upstream PR open · 2026",
  },
];
