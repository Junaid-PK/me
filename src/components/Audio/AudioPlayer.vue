<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import TimeDisplay from "./TimeDisplay.vue";

const props = defineProps<{
  messageText: string;
}>();

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const utterance = ref<SpeechSynthesisUtterance | null>(null);
const intervalId = ref<number | null>(null);

const progress = computed(() => {
  return (currentTime.value / duration.value) * 100 || 0;
});

onMounted(() => {
  utterance.value = new SpeechSynthesisUtterance(props.messageText);
  utterance.value.onend = () => {
    isPlaying.value = false;
    currentTime.value = 0;
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };
  const wordCount = props.messageText.split(/\s+/).length;
  duration.value = wordCount * 0.4;
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  window.speechSynthesis.cancel();
});

const togglePlay = () => {
  if (isPlaying.value) {
    window.speechSynthesis.cancel();
    isPlaying.value = false;
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
    currentTime.value = 0;
  } else {
    if (utterance.value) {
      window.speechSynthesis.speak(utterance.value);
      isPlaying.value = true;
      currentTime.value = 0;
      // Update progress every 100ms
      intervalId.value = setInterval(() => {
        if (currentTime.value < duration.value) {
          currentTime.value += 0.1;
        }
      }, 100) as unknown as number;
    }
  }
};

const onSeek = (percentage: number) => {
  const newTime = (percentage / 100) * duration.value;
  currentTime.value = newTime;

  if (isPlaying.value) {
    window.speechSynthesis.cancel();
    if (utterance.value) {
      const words = props.messageText.split(/\s+/);
      const wordsToSpeak = words.slice(
        Math.floor((words.length * percentage) / 100)
      );
      utterance.value = new SpeechSynthesisUtterance(wordsToSpeak.join(" "));
      utterance.value.onend = () => {
        isPlaying.value = false;
        currentTime.value = 0;
        if (intervalId.value) {
          clearInterval(intervalId.value);
          intervalId.value = null;
        }
      };
      window.speechSynthesis.speak(utterance.value);
    }
  }
};
</script>

<template>
  <div class="audio-player">
    <slot
      :is-playing="isPlaying"
      :progress="progress"
      :on-seek="onSeek"
      :toggle-play="togglePlay"
    ></slot>
    <TimeDisplay :current-time="currentTime" :duration="duration" />
  </div>
</template>

<style scoped>
.audio-player {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
