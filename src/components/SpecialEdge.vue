<template>
  <div class="special-edge" @mouseover="changeColor" @mouseout="resetColor">
    <p>{{ edge && edge.data.hello }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  edge: Object,
});

// Change the edge's color when the mouse hovers over it
const changeColor = () => {
  if (props.edge) {
    props.edge.style = { stroke: "red" };
  }
};

// Reset the edge's color when the mouse stops hovering over it
const resetColor = () => {
  if (props.edge) {
    props.edge.style = { stroke: "black" };
  }
};
</script>

<style scoped>
.special-edge {
  /* Add your custom styles here */
}
</style>
