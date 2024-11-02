<template>
  <div class="special-node">
    <h3>{{ node?.data?.label }}</h3>
    <p>{{ node?.data?.hello }}</p>
    <!-- Add a button that emits an event with the node's id when clicked -->
    <button @click="emitNodeEvent">Click me</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  node: Object,
});

// Emit an event with the node's id when the button is clicked
const emitNodeEvent = () => {
  emit("nodeEvent", props.node?.id);
};
</script>

<style scoped>
.special-node {
  /* Add your custom styles here */
}
</style>
