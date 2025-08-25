<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/20 dark:bg-gray-900/70 border-b border-border/5 supports-[backdrop-filter]:bg-white/10"
  >
    <div
      class="max-w-[720px] mx-auto flex items-center justify-between h-10 px-4"
    >
      <RouterLink
        to="/"
        class="text-xl text-blue-500 font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
      >
        🌟
      </RouterLink>
      <div class="hidden md:flex items-center gap-6">
        <RouterLink
          v-for="link in ['Blog']"
          :key="link"
          :to="`/${link.toLowerCase()}`"
          class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-[#27005D] px-2 rounded capitalize"
        >
          {{ link }}
        </RouterLink>
        <a
          v-for="link in ['About', 'Contact', 'Projects']"
          :key="link"
          :href="`/#${link.toLowerCase()}`"
          class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-[#27005D] px-2 rounded capitalize"
        >
          {{ link }}
        </a>
      </div>
      <!-- Add a button for mobile menu toggle -->
      <button @click="toggleMenu" class="block md:hidden text-neutral-800">
        <!-- Icon for menu toggle -->
        <svg
          class="w-6 h-6"
          fill="#27005D"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </div>
    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden">
      <div
        class="flex flex-col gap-2 bg-[#ede8dc] p-4 w-full sm:w-1/2 rounded-lg absolute top-0 right-0 h-full min-h-screen justify-center items-center"
      >
        <!-- Close button for mobile menu -->
        <button
          @click="toggleMenu"
          class="text-red-500 mb-4 border border-red-500 rounded-full p-2"
        >
          <!-- Icon for close -->
          <svg
            class="w-6 h-6"
            fill="#27005D"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <RouterLink
          v-for="link in ['Blog']"
          :key="link"
          :to="`/${link.toLowerCase()}`"
          @click="toggleMenu"
          class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-[#27005D] px-2 rounded capitalize"
        >
          {{ link }}
        </RouterLink>
        <a
          v-for="link in ['About', 'Contact', 'Projects']"
          :key="link"
          :href="`/#${link.toLowerCase()}`"
          @click="toggleMenu"
          class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-[#27005D] px-2 rounded capitalize"
        >
          {{ link }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
