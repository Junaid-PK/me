<script setup lang="ts">
import { projects } from "../../data/profile";
import AceternityBentoGrid from "../ui/AceternityBentoGrid.vue";
import AceternityCardSpotlight from "../ui/AceternityCardSpotlight.vue";

const tones = ["lime", "steel", "mint", "canvas", "steel", "lime"] as const;
</script>

<template>
  <AceternityBentoGrid>
    <AceternityCardSpotlight
      v-for="(project, index) in projects"
      :key="project.name"
      :tone="tones[index % tones.length]"
      :featured="index < 2"
    >
      <div class="case-topline">
        <span>{{ project.label }}</span>
        <span>{{ project.status }}</span>
      </div>

      <div class="case-heading">
        <h3>{{ project.name }}</h3>
        <a :href="project.source" target="_blank" rel="noreferrer">
          Inspect <span class="sr-only">{{ project.name }} on GitHub</span><span aria-hidden="true">↗</span>
        </a>
      </div>

      <p class="case-summary">{{ project.summary }}</p>

      <div class="case-evidence">
        <p class="mono-label">Design pressure</p>
        <p>{{ project.problem }}</p>
        <ul>
          <li v-for="decision in project.decisions.slice(0, index < 2 ? 3 : 2)" :key="decision">{{ decision }}</li>
        </ul>
      </div>

      <div class="tag-list" aria-label="Technologies used">
        <span v-for="item in project.stack" :key="item">{{ item }}</span>
      </div>
    </AceternityCardSpotlight>
  </AceternityBentoGrid>
</template>
