<template>
  <div class="animate-fade-in max-w-[720px] mx-auto px-4 py-32 shadow-sm">
    <div class="animate-slide-up">
      <div class="text-center py-8">
        <h2 class="text-2xl font-bold mb-4">Become a Sponsor</h2>
        <p class="text-lg mb-6 text-balance">
          Support my journey as a engineer by becoming a sponsor. Your
          contribution will make a significant impact!
        </p>
      </div>
      
      <div class="flex flex-col md:flex-row justify-center items-center gap-6">
        <div class="flex flex-col items-center gap-4">
          <span class="text-sm text-gray-600 font-mono">or</span>
          
          <button 
            @click="showCryptoPopup = true"
            class="buy-coffee-btn"
          >
            <span class="coffee-icon">☕</span>
            <span class="btn-text">Buy me a coffee</span>
          </button>
          
          <p class="text-xs text-gray-500 font-mono max-w-xs text-center">
            Support with crypto - Bitcoin, Ethereum, Litecoin, or USDT
          </p>
        </div>
      </div>
    </div>
    
    <!-- Crypto Popup -->
    <CryptoPopup 
      :is-open="showCryptoPopup" 
      @close="showCryptoPopup = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CryptoPopup from './CryptoPopup.vue'

const showCryptoPopup = ref(false)
</script>

<style scoped>
.buy-coffee-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ede8dc;
  color: #374151;
  padding: 0.75rem 1.5rem;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  font-family: "IBM Plex Mono", monospace;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.buy-coffee-btn:hover {
  background: rgba(55, 65, 81, 0.1);
  transform: scale(1.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.coffee-icon {
  font-size: 1.25rem;
}

.btn-text {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .flex-col.md\\:flex-row {
    flex-direction: column;
  }
  
  .gap-6 {
    gap: 1.5rem;
  }
}
</style>
