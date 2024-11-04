<script setup lang="ts">
import { ref } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { ControlButton, Controls } from "@vue-flow/controls";
import { initialEdges, initialNodes, skillImages } from "../../../data";
import Icon from "./Icon.vue";
import Skills from "./Skills.vue";

const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } =
  useVueFlow();

const nodes = ref(initialNodes);

const edges = ref(initialEdges);

// our dark mode toggle flag
const dark = ref(false);

onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView();
});

onNodeDragStop(({ event, nodes, node }) => {
  console.log("Node Drag Stop", { event, nodes, node });
});

onConnect((connection) => {
  addEdges(connection);
});

function updatePos() {
  nodes.value = nodes.value.map((node: any) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };
  });
}

function logToObject() {
  console.log(toObject());
}

function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 });
}

function toggleDarkMode() {
  dark.value = !dark.value;
}
</script>

<template>
  <div class="max-w-[688px] h-[500px] animate-slide-up">
    <VueFlow :nodes="nodes" :edges="edges" :zoom-on-scroll="false">
      <Background pattern-color="#aaa" :gap="16" />
    </VueFlow>
  </div>
  <div
    class="flex max-w-[688px] animate-slide-up flex-wrap gap-4 mt-4 items-center justify-center text-balance"
  >
    <Skills
      v-for="(image, index) in skillImages"
      :key="index"
      :src="image.src"
      :alt="image.alt"
    />
  </div>
</template>
<style scoped>
.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.basic-flow.dark {
  background: #2d3748;
  color: #fffffb;
}

.basic-flow.dark .vue-flow__node {
  background: #4a5568;
  color: #fffffb;
}

.basic-flow.dark .vue-flow__node.selected {
  background: #333;
  box-shadow: 0 0 0 2px #2563eb;
}

.basic-flow .vue-flow__controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.basic-flow.dark .vue-flow__controls {
  border: 1px solid #fffffb;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button {
  border: none;
  border-right: 1px solid #eee;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button svg {
  height: 100%;
  width: 100%;
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button {
  background: #333;
  fill: #fffffb;
  border: none;
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button:hover {
  background: #4d4d4d;
}

.basic-flow.dark .vue-flow__edge-textbg {
  fill: #292524;
}

.basic-flow.dark .vue-flow__edge-text {
  fill: #fffffb;
}
</style>
