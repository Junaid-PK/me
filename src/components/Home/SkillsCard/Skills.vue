<template>
  <a :href="props.src">
    <img :src="props.src" :alt="props.alt" class="" />
  </a>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  src: String,
  alt: String,
});
</script>
