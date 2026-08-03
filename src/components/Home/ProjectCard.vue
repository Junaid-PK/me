<script setup lang="ts">
import { projects } from "../../data/profile";
</script>

<template>
  <div class="case-list">
    <article v-for="(project, index) in projects" :key="project.name" class="case-study">
      <div class="case-rail">
        <span class="case-number">{{ String(index + 1).padStart(2, "0") }}</span>
        <span>{{ project.label }}</span>
      </div>

      <div class="case-main">
        <div class="case-title-row">
          <div>
            <p class="mono-label">{{ project.status }}</p>
            <h3>{{ project.name }}</h3>
          </div>
          <a :href="project.source" target="_blank" rel="noreferrer" :aria-label="`View ${project.name} source on GitHub`">
            View source <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p class="case-summary">{{ project.summary }}</p>

        <div class="case-details">
          <div>
            <p class="mono-label">The problem</p>
            <p>{{ project.problem }}</p>
          </div>
          <div>
            <p class="mono-label">Engineering decisions</p>
            <ul>
              <li v-for="decision in project.decisions" :key="decision">{{ decision }}</li>
            </ul>
          </div>
        </div>

        <div class="tag-list" aria-label="Technologies used">
          <span v-for="item in project.stack" :key="item">{{ item }}</span>
        </div>
      </div>
    </article>
  </div>
</template>
