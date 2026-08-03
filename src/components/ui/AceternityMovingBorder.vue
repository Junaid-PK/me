<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
}>();

const component = computed(() => props.to ? RouterLink : "a");
</script>

<template>
  <component
    :is="component"
    class="moving-border"
    :href="href"
    :to="to"
    :target="target"
    :rel="rel"
  >
    <span class="moving-border__track" aria-hidden="true"></span>
    <span class="moving-border__content"><slot /></span>
  </component>
</template>
