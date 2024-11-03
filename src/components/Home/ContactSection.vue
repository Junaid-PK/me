<script setup lang="ts">
const contacts = [
  {
    icon: "📧",
    label: "Email",
    href: "mailto:junaidhussnain369@gmail.com",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/junaid-hussnain-a951791bb/",
  },
  {
    icon: "👨‍💻",
    label: "GitHub",
    href: "https://github.com/Junaid-PK",
  },
];
</script>

<template>
  <section id="contact" class="text-center py-16">
    <h2 class="text-3xl font-semibold mb-12 capitalize tracking-tighter">
      GET IN TOUCH
    </h2>
    <form class="mb-12 max-w-md mx-auto">
      <div class="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          class="w-full p-3 border border-neutral-800 rounded-sm"
        />
      </div>
      <div class="mb-4">
        <input
          type="email"
          placeholder="Your Email"
          class="w-full p-3 border border-neutral-800 rounded-sm"
        />
      </div>
      <div class="mb-4">
        <textarea
          placeholder="Your Message"
          class="w-full p-3 border border-neutral-800 rounded-sm"
          rows="4"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full p-3 bg-primary text-white rounded-sm transition-all duration-300 hover:bg-primary-dark hover:scale-105 hover:shadow-lg capitalize"
      >
        SEND MESSAGE
      </button>
    </form>
    <div class="flex justify-center gap-8">
      <a
        v-for="contact in contacts"
        :key="contact.label"
        :href="contact.href"
        target="_blank"
        class="group relative p-6 rounded-sm transition-all duration-300 hover:scale-105 border border-neutral-800 border-dashed w-[150px]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
        <span
          class="text-3xl mb-3 block transform transition-transform group-hover:scale-110 group-hover:rotate-12"
        >
          {{ contact.icon }}
        </span>
        <span class="block text-sm font-medium text-muted-foreground mb-1">{{
          contact.label
        }}</span>
      </a>
    </div>
  </section>
</template>
<style scoped>
input:focus,
textarea:focus {
  outline: none;
  border-color: pink;
  border: 2px solid pink;
}
</style>
