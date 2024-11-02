<script setup lang="ts">
import { ref } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { ControlButton, Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { initialEdges, initialNodes } from "./data.js";
import Icon from "./Icon.vue";

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
  <div class="w-[720px] h-[500px] animate-slide-up">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :class="{ dark }"
      class="basic-flow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <Background pattern-color="#aaa" :gap="16" />

      <!-- <MiniMap /> -->

      <Controls position="top-left">
        <ControlButton title="Reset Transform" @click="resetTransform">
          <Icon name="reset" />
        </ControlButton>

        <ControlButton title="Shuffle Node Positions" @click="updatePos">
          <Icon name="update" />
        </ControlButton>

        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>

        <ControlButton title="Log `toObject`" @click="logToObject">
          <Icon name="log" />
        </ControlButton>
      </Controls>
    </VueFlow>
  </div>
  <div class="flex w-[720px] animate-slide-up flex-wrap gap-4 mt-4">
    <img
      src="https://img.shields.io/badge/php-%23777BB4.svg?style=flat&logo=php&logoColor=white"
      alt="PHP"
      class="cursor-pointer"
    />
    <img
      src="https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54"
      alt="Python"
      class="cursor-pointer"
    />
    <img
      src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white"
      alt="TypeScript"
      class="cursor-pointer"
    />
    <img
      src="https://img.shields.io/badge/dart-%230175C2.svg?style=flat&logo=dart&logoColor=white"
      alt="Dart"
    />
    <img
      src="https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E"
      alt="JavaScript"
    />
    <img
      src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=flat&logo=google-cloud&logoColor=white"
      alt="Google Cloud"
    />
    <img
      src="https://img.shields.io/badge/vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white"
      alt="Vercel"
    />
    <img
      src="https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=flat&logo=digitalOcean&logoColor=white"
      alt="DigitalOcean"
    />
    <img
      src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white"
      alt="AWS"
    />
    <img
      src="https://img.shields.io/badge/azure-%230072C6.svg?style=flat&logo=microsoftazure&logoColor=white"
      alt="Azure"
    />
    <img
      src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase"
      alt="Firebase"
    />
    <img
      src="https://img.shields.io/badge/vue.js-%2335495e.svg?style=flat&logo=vuedotjs&logoColor=%234FC08D"
      alt="Vue.js"
    />
    <img
      src="https://img.shields.io/badge/django-%23092E20.svg?style=flat&logo=django&logoColor=white"
      alt="Django"
    />
    <img
      src="https://img.shields.io/badge/Flutter-%2302569B.svg?style=flat&logo=Flutter&logoColor=white"
      alt="Flutter"
    />
    <img
      src="https://img.shields.io/badge/laravel-%23FF2D20.svg?style=flat&logo=laravel&logoColor=white"
      alt="Laravel"
    />
    <img
      src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white"
      alt="Next JS"
    />
    <img
      src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"
      alt="React"
    />
    <img
      src="https://img.shields.io/badge/apache-%23D42029.svg?style=flat&logo=apache&logoColor=white"
      alt="Apache"
    />
    <img
      src="https://img.shields.io/badge/nginx-%23009639.svg?style=flat&logo=nginx&logoColor=white"
      alt="Nginx"
    />
    <img
      src="https://img.shields.io/badge/gunicorn-%298729.svg?style=flat&logo=gunicorn&logoColor=white"
      alt="Gunicorn"
    />
    <img
      src="https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white"
      alt="Postgres"
    />
    <img
      src="https://img.shields.io/badge/redis-%23DD0031.svg?style=flat&logo=redis&logoColor=white"
      alt="Redis"
    />
    <img
      src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white"
      alt="MongoDB"
    />
    <img
      src="https://img.shields.io/badge/firebase-a08021?style=flat&logo=firebase&logoColor=ffcd34"
      alt="Firebase"
    />
    <img
      src="https://img.shields.io/badge/github-%23121011.svg?style=flat&logo=github&logoColor=white"
      alt="GitHub"
    />
  </div>
</template>
