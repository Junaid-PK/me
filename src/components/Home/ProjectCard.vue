<script setup lang="ts">
import { projects } from "../../data/profile";
</script>

<template>
  <div class="project-list">
    <article
      v-for="(project, index) in projects"
      :key="project.name"
      class="project-row"
    >
      <span class="project-row__index">{{ String(index + 1).padStart(2, "0") }}</span>
      <div class="project-row__title">
        <p>{{ project.label }}</p>
        <h3>{{ project.name }}</h3>
      </div>
      <div class="project-row__detail">
        <p>{{ project.summary }}</p>
        <div class="tag-list" aria-label="Technologies used">
          <span v-for="item in project.stack" :key="item">{{ item }}</span>
        </div>
      </div>
      <a class="case-link" :href="project.source" target="_blank" rel="noreferrer">
        {{ project.linkLabel }} <span class="sr-only">{{ project.name }}</span><span aria-hidden="true">↗</span>
      </a>
    </article>
  </div>
</template>
