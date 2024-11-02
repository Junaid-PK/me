<script setup lang="ts">
defineProps<{
  name: string;
  items: string[];
  icon: string;
  color: string;
  delay: number;
  isVisible: boolean;
}>();
</script>

<template>
  <div
    class="group relative backdrop-blur-lg bg-white/40 dark:bg-gray-900/40 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden"
    :style="{ animationDelay: `${delay}ms` }"
    :class="isVisible ? 'animate-fade-in' : ''"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity"
      :class="color"
    ></div>
    <div
      class="text-4xl mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-12"
    >
      {{ icon }}
    </div>
    <h3 class="font-medium text-xl mb-3">{{ name }}</h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="item in items"
        :key="item"
        class="text-sm text-muted-foreground bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>
