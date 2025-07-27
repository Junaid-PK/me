<template>
  <Teleport to="body">
    <div v-if="isOpen" class="crypto-popup-overlay" @click="closePopup">
      <div class="crypto-popup" @click.stop>
        <div class="crypto-popup-header">
          <h3 class="crypto-popup-title">Buy me a coffee ☕</h3>
          <button class="crypto-popup-close" @click="closePopup">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="crypto-popup-content">
          <p class="crypto-popup-description">
            If you enjoy my content and want to support my work, you can send me a coffee via crypto (ARB, BNB, ERC20, TRC20, SOL) ! ☕
          </p>
          
          <div class="crypto-options">
            <div class="crypto-option">
              <div class="crypto-header">
                <span class="crypto-icon">₿</span>
                <h4 class="crypto-name">Arbitrum (ARB) - USDT</h4>
              </div>
              <div class="crypto-address-container">
                <code class="crypto-address">{{ arbAddress }}</code>
                <button class="copy-btn" @click="copyToClipboard(arbAddress, 'Arbitrum')">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="crypto-option">
              <div class="crypto-header">
                <span class="crypto-icon">Ξ</span>
                <h4 class="crypto-name">BNB BEP20 - USDT</h4>
              </div>
              <div class="crypto-address-container">
                <code class="crypto-address">{{ bep20Address }}</code>
                <button class="copy-btn" @click="copyToClipboard(bep20Address, 'BNB BEP20')">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="crypto-option">
              <div class="crypto-header">
                <span class="crypto-icon">Ł</span>
                <h4 class="crypto-name">ERC20 - USDT</h4>
              </div>
              <div class="crypto-address-container">
                <code class="crypto-address">{{ erc20Address }}</code>
                <button class="copy-btn" @click="copyToClipboard(erc20Address, 'ERC20')">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="crypto-option">
              <div class="crypto-header">
                <span class="crypto-icon">₮</span>
                <h4 class="crypto-name">Tron TRC20 - USDT</h4>
              </div>
              <div class="crypto-address-container">
                <code class="crypto-address">{{ trc20Address }}</code>
                <button class="copy-btn" @click="copyToClipboard(trc20Address, 'Tron TRC20')">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="crypto-note">
            <p class="note-text">
              💡 <strong>Note:</strong> Make sure to double-check the address before sending. 
              Crypto transactions are irreversible!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Copy Notification Toast -->
    <div v-if="showCopyNotification" class="copy-notification">
      <div class="copy-notification-content">
        <span class="copy-notification-icon">✓</span>
        <span class="copy-notification-text">{{ copyNotificationText }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Replace these with your actual crypto addresses
const arbAddress = '0x34bd374698e7dcb0351f5d0f0161deb3b753e32b'
const bep20Address = '0x34bd374698e7dcb0351f5d0f0161deb3b753e32b'
const erc20Address = '0x34bd374698e7dcb0351f5d0f0161deb3b753e32b'
const trc20Address = 'TS76eD25Pk3dmmq5AkDf1Fcs1C4RCMECDX'
const solanaAddress = 'FbzyPBFGb4GmZRVxeeh3zRGHBUBHVksFXxq13dVcWXNK'

// Copy notification state
const showCopyNotification = ref(false)
const copyNotificationText = ref('')

const copyToClipboard = async (text: string, cryptoName: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copyNotificationText.value = `${cryptoName} address copied!`
    showCopyNotification.value = true
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      showCopyNotification.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    copyNotificationText.value = 'Failed to copy address'
    showCopyNotification.value = true
    
    setTimeout(() => {
      showCopyNotification.value = false
    }, 3000)
  }
}

const closePopup = () => {
  emit('close')
}
</script>

<style scoped>
.crypto-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.crypto-popup {
  background: #ede8dc;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  font-family: "IBM Plex Mono", monospace;
}

.crypto-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px dashed #374151;
}

.crypto-popup-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.crypto-popup-close {
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.125rem;
  transition: all 0.2s;
}

.crypto-popup-close:hover {
  background: rgba(55, 65, 81, 0.1);
}

.crypto-popup-content {
  padding: 1.5rem;
}

.crypto-popup-description {
  color: #374151;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.crypto-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.crypto-option {
  background: rgba(55, 65, 81, 0.05);
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  padding: 1rem;
  transition: all 0.2s;
}

.crypto-option:hover {
  background: rgba(55, 65, 81, 0.1);
}

.crypto-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.crypto-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
}

.crypto-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.crypto-address-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ede8dc;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  padding: 0.75rem;
}

.crypto-address {
  flex: 1;
  font-size: 0.875rem;
  color: #374151;
  word-break: break-all;
  font-family: "IBM Plex Mono", monospace;
}

.copy-btn {
  background: #374151;
  color: #ede8dc;
  border: none;
  padding: 0.5rem;
  border-radius: 0.125rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.copy-btn:hover {
  background: #2c3e50;
  transform: scale(1.05);
}

.crypto-note {
  background: rgba(55, 65, 81, 0.05);
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  padding: 1rem;
}

.note-text {
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 640px) {
  .crypto-popup {
    width: 95%;
    margin: 1rem;
  }
  
  .crypto-address-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .copy-btn {
    align-self: flex-end;
  }
}

/* Copy Notification Toast */
.copy-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  animation: slideInRight 0.3s ease-out;
}

.copy-notification-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #374151;
  color: #ede8dc;
  padding: 0.75rem 1rem;
  border-radius: 0.125rem;
  border: 1px dashed #2c3e50;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.875rem;
}

.copy-notification-icon {
  color: #10b981;
  font-weight: bold;
  font-size: 1rem;
}

.copy-notification-text {
  font-weight: 500;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 