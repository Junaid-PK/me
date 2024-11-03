<script setup lang="ts">
defineProps<{
  posts: Array<{
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
  }>;
  isVisible: boolean;
}>();
</script>

<template></template>
