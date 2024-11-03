<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  progress: number;
}>();

const emit = defineEmits<{
  (e: "seek", percentage: number): void;
}>();

const progressBar = ref<HTMLDivElement | null>(null);

const seek = (event: MouseEvent) => {
  if (!progressBar.value) return;

  const rect = progressBar.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = (x / rect.width) * 100;

  emit("seek", percentage);
};

// Generate random heights for visualization
const bars = Array.from({ length: 65 }, () => Math.floor(Math.random() * 100));
</script>

<template>
  <div ref="progressBar" class="progress-bar" @click="seek">
    <div class="progress-fill" :style="{ width: `${progress}%` }">
      <div class="progress-handle"></div>
    </div>

    <div class="waveform">
      <div
        v-for="(height, i) in bars"
        :key="i"
        class="bar"
        :style="{
          height: `${height}%`,
          opacity: i * (100 / bars.length) <= progress ? 1 : 0.3,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  position: relative;
  height: 40px;
  width: 100%;
  cursor: pointer;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: transparent;
  z-index: 2;
}

.progress-handle {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 12px;
  background: #141416ff;
  border-radius: 50%;
}

.waveform {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2px;
}

.bar {
  flex: 1;
  background: #2a2c2fff;
  min-height: 2px;
  border-radius: 2px;
  transition: opacity 0.2s ease;
}
</style>
