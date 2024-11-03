<script setup lang="ts">
import { ref, onMounted } from "vue";
import Footer from "./components/Commons/Footer/Footer.vue";
import Navbar from "./components/Commons/Header/Navbar.vue";

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
defineExpose({
  isVisible,
});
</script>

<template>
  <div>
    <div
      class="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    ></div>

    <main class="relative min-h-screen bg-[#EDE8DC]">
      <Navbar />
      <RouterView />
      <Footer />
    </main>
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
