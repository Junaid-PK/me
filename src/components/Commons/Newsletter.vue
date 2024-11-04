<template>
  <div class="animate-fade-in">
    <div class="animate-slide-up">
      <div class="text-center py-8">
        <h2 class="text-2xl font-bold mb-4">Subscribe to my Newsletter</h2>
        <p class="text-lg mb-6">
          Get the latest news, articles, and resources straight to your inbox.
          No spam, unsubscribe anytime.
        </p>
      </div>
      <form class="mb-12 max-w-md mx-auto">
        <div class="mb-4">
          <input
            type="email"
            placeholder="Your Email"
            class="w-full p-3 border border-neutral-800 rounded-sm bg-transparent"
          />
        </div>
        <button
          type="submit"
          class="w-full p-3 bg-primary text-white rounded-sm transition-all duration-300 hover:bg-primary-dark hover:scale-105 hover:shadow-lg capitalize"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
