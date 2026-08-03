<script setup lang="ts">
const props = withDefaults(defineProps<{
  tone?: "lime" | "mint" | "steel" | "canvas";
  featured?: boolean;
}>(), {
  tone: "canvas",
  featured: false,
});

const moveSpotlight = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
  card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
};
</script>

<template>
  <article
    class="spotlight-card"
    :class="[`spotlight-card--${props.tone}`, { 'spotlight-card--featured': props.featured }]"
    @pointermove="moveSpotlight"
  >
    <span class="spotlight-card__light" aria-hidden="true"></span>
    <div class="spotlight-card__content"><slot /></div>
  </article>
</template>
