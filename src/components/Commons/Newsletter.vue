<template>
  <div class="animate-fade-in max-w-[720px] mx-auto px-4 py-32 shadow-sm">
    <div class="animate-slide-up">
      <div class="text-center py-8">
        <h2 class="text-2xl font-bold mb-4">Subscribe to my Newsletter</h2>
        <p class="text-lg mb-6 text-balance">
          Get the latest news, articles, and resources straight to your inbox.
          No spam, unsubscribe anytime.
        </p>
      </div>
      <form class="flex items-center space-x-4">
        <div class="flex-grow">
          <input
            type="email"
            placeholder="Your Email"
            class="w-full p-3 border border-neutral-800 rounded-sm bg-transparent"
          />
        </div>
        <button
          type="submit"
          class="bg-primary p-3 text-white rounded-sm transition-all duration-300 hover:bg-primary-dark hover:scale-105 hover:shadow-lg capitalize"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  </div>
</template>
