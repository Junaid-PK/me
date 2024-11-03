<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentTime: number;
  duration: number;
}>();

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formattedCurrentTime = computed(() => formatTime(props.currentTime));
const formattedDuration = computed(() => formatTime(props.duration));
</script>

<template>
  <div class="time-display font-bold">
    {{ formattedCurrentTime }} / {{ formattedDuration }}
  </div>
</template>

<style scoped>
.time-display {
  font-size: 0.875rem;
  min-width: 100px;
  text-align: right;
}
</style>
