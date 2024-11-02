<template>
  <a :href="src">
    <img :src="src" :alt="alt" class="" />
  </a>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  src: String,
  alt: String,
});
</script>
