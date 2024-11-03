<script setup lang="ts">
const data = [
  {
    id: 1,
    title: "Medicare Data Visualization",
    description: `A project focused on visualizing Medicare data to provide insights into
        healthcare trends and statistics.Over 10,000 data points analyzed,
        resulting in 5 interactive charts.`,
    stack: ["Vue.js", "D3.js", "JavaScript"],
  },
  {
    id: 5,
    title: "AI-powered code completion tool",
    description: `A project focused on developing an AI-powered code completion tool for a startup company.
        The goal was to improve the efficiency of the development process by
        automating the code completion process.`,
    stack: ["Python", "TensorFlow", "JavaScript"],
  },
  {
    id: 2,
    title: "Hiring Process Optimization",
    description: `A project focused on optimizing the hiring process for a startup company.
        The goal was to reduce the time it takes to find the right candidate by
        automating the process.`,
    stack: ["Python", "Django", "JavaScript"],
  },
  {
    id: 6,
    title: "Email Marketing Automation System",
    description: `A project focused on developing an email marketing automation system for a startup company.
        The goal was to improve the efficiency of the marketing process by
        automating the email marketing process.`,
    stack: ["Laravel", "PHP", "JavaScript"],
  },
  {
    id: 3,
    title: "E-commerce Website Optimization",
    description: `A project focused on optimizing the e-commerce website for a startup company.
        The goal was to increase conversions and reduce bounce rates by improving
        the user experience.`,
    stack: ["React", "Redux", "JavaScript"],
  },
  {
    id: 4,
    title: "Social Media Management System",
    description: `A project focused on developing a social media management system for a startup company.
        The goal was to improve the organization and efficiency of the team by
        streamlining the social media management process.`,
    stack: ["Laravel", "PostgreSQL", "JavaScript"],
  },
];

const projects = data;
</script>

<template>
  <div class="flex flex-wrap justify-between gap-4 w-[688px] animate-slide-up">
    <div
      v-for="project in projects"
      :key="project.id"
      class="flex flex-col rounded-sm border border-dashed border-neutral-800 shadow-sm transition-all duration-300 p-6 ease-in-out hover:scale-105 hover:shadow-lg max-w-[336px] text-start"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold">{{ project.title }}</h3>
      </div>
      <p class="text-gray-500 text-sm text-start mt-2">
        {{ project.description }}
      </p>
      <div class="flex items-center gap-2 mt-2">
        <span
          v-for="tech in project.stack"
          :key="tech"
          class="px-2 border border-neutral-800 rounded-sm text-xs"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>
