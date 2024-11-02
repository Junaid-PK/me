<script setup lang="ts">
const contacts = [
  {
    icon: '📧',
    label: 'Email',
    value: 'john.doe@example.com',
    href: 'mailto:john.doe@example.com'
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: '/in/johndoe',
    href: 'https://linkedin.com/in/johndoe'
  },
  {
    icon: '👨‍💻',
    label: 'GitHub',
    value: '@johndoe',
    href: 'https://github.com/johndoe'
  }
]
</script>

<template>
  <section id="contact" class="text-center py-16">
    <h2 class="text-3xl font-semibold mb-12">Get in Touch</h2>
    <div class="flex justify-center gap-8">
      <a 
        v-for="contact in contacts"
        :key="contact.label"
        :href="contact.href"
        target="_blank"
        class="group relative p-6 bg-card hover:bg-card/80 rounded-2xl transition-all duration-300 hover:scale-105 border border-border/50"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span class="text-3xl mb-3 block transform transition-transform group-hover:scale-110 group-hover:rotate-12">
          {{ contact.icon }}
        </span>
        <span class="block text-sm font-medium text-muted-foreground mb-1">{{ contact.label }}</span>
        <span class="text-sm text-foreground group-hover:text-primary transition-colors">
          {{ contact.value }}
        </span>
      </a>
    </div>
  </section>
</template>