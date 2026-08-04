<script setup lang="ts">
import { projects } from "../../data/profile";
import AceternityBentoGrid from "../ui/AceternityBentoGrid.vue";
import AceternityCardSpotlight from "../ui/AceternityCardSpotlight.vue";

const tones = ["lime", "steel", "mint"] as const;
</script>

<template>
  <AceternityBentoGrid>
    <AceternityCardSpotlight
      v-for="(project, index) in projects"
      :key="project.name"
      :tone="tones[index]"
    >
      <p class="case-topline">{{ project.label }}</p>
      <h3>{{ project.name }}</h3>
      <p class="case-summary">{{ project.summary }}</p>
      <div class="tag-list" aria-label="Technologies used">
        <span v-for="item in project.stack" :key="item">{{ item }}</span>
      </div>
      <a class="case-link" :href="project.source" target="_blank" rel="noreferrer">
        {{ project.linkLabel }} <span class="sr-only">{{ project.name }}</span><span aria-hidden="true">↗</span>
      </a>
    </AceternityCardSpotlight>
  </AceternityBentoGrid>
</template>
