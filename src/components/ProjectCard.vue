<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tech: string[]
  stats: string
  image: string
  delay: number
  isVisible: boolean
}>()
</script>

<template>
  <div 
    class="group backdrop-blur-lg bg-white/40 dark:bg-gray-900/40 rounded-2xl shadow-lg transition-all duration-500 overflow-hidden border border-white/20"
    :class="isVisible ? 'animate-slide-up' : ''"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <div class="relative h-64 overflow-hidden">
      <img 
        :src="image" 
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <span class="absolute bottom-4 right-4 text-sm font-medium text-white backdrop-blur-md bg-white/20 px-4 py-2 rounded-full border border-white/20">
        {{ stats }}
      </span>
    </div>
    <div class="p-8">
      <h3 class="text-2xl font-medium group-hover:text-primary transition-colors mb-4">
        {{ title }}
      </h3>
      <p class="text-muted-foreground leading-relaxed mb-6">{{ description }}</p>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="item in tech" 
          :key="item"
          class="px-4 py-2 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 text-secondary-foreground rounded-full text-sm
                hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>