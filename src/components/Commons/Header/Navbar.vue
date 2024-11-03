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
      <div class="flex items-center gap-6">
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
    </div>
  </nav>
</template>
