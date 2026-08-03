<script setup lang="ts">
import Footer from "./components/Commons/Footer/Footer.vue";
import Navbar from "./components/Commons/Header/Navbar.vue";
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
