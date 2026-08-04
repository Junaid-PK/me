export interface Project {
  name: string;
  label: string;
  summary: string;
  stack: string[];
  source: string;
  linkLabel: string;
}

export const projects: Project[] = [
  {
    name: "Stackline",
    label: "Product",
    summary: "A private, browser-based resume builder that helps experienced professionals create ATS-friendly resumes.",
    stack: ["React", "TypeScript", "Vitest"],
    source: "https://github.com/Junaid-PK/stackline",
    linkLabel: "View project",
  },
  {
    name: "E-Manager",
    label: "Web application",
    summary: "A business operations platform for invoices, expenses, projects, banking, and workforce management.",
    stack: ["Laravel", "Livewire", "PHP"],
    source: "https://github.com/Junaid-PK/e_manager",
    linkLabel: "View project",
  },
  {
    name: "Verdict Evaluation CLI",
    label: "Open source · merged",
    summary: "A contribution to a Laravel security package for comparing evaluation results safely in CI.",
    stack: ["PHP", "Laravel", "Pest"],
    source: "https://github.com/fissible/verdict/pull/6",
    linkLabel: "View contribution",
  },
];
