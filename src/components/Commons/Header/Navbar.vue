<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const isOpen = ref(false);

const closeMenu = () => {
  isOpen.value = false;
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") closeMenu();
};

onMounted(() => window.addEventListener("keydown", handleEscape));
onBeforeUnmount(() => window.removeEventListener("keydown", handleEscape));
</script>

<template>
  <header class="site-header">
    <nav class="nav-shell" aria-label="Primary navigation">
      <RouterLink class="wordmark" to="/" @click="closeMenu">
        <span class="wordmark-mark">JH</span>
        <span class="wordmark-copy"><strong>Junaid Hussnain</strong><small>Software engineer</small></span>
        <span class="sr-only">home</span>
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="primary-menu"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">{{ isOpen ? "Close menu" : "Open menu" }}</span>
        <span aria-hidden="true">{{ isOpen ? "Close" : "Menu" }}</span>
      </button>

      <div id="primary-menu" class="nav-links" :class="{ 'nav-links--open': isOpen }">
        <a href="/#work" @click="closeMenu">Work</a>
        <RouterLink to="/about" @click="closeMenu">About</RouterLink>
        <RouterLink to="/blog" @click="closeMenu">Notes</RouterLink>
        <a href="/#contact" @click="closeMenu">Contact</a>
        <a href="https://github.com/Junaid-PK" target="_blank" rel="noreferrer" @click="closeMenu">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <span class="nav-availability"><i aria-hidden="true"></i> UTC+5</span>
      </div>
    </nav>
  </header>
</template>
