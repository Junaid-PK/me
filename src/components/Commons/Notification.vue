<template>
  <Teleport to="body">
    <div v-if="isVisible" class="notification-overlay">
      <div class="notification" :class="typeClass">
        <div class="notification-content">
          <div class="notification-icon">
            <svg v-if="type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else-if="type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="notification-text">
            <h4 class="notification-title">{{ title }}</h4>
            <p class="notification-message">{{ message }}</p>
          </div>
          <button class="notification-close" @click="close">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  duration?: number
  isVisible: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000
})

const emit = defineEmits<Emits>()

let timeoutId: number | null = null

const typeClass = computed(() => ({
  'notification-success': props.type === 'success',
  'notification-error': props.type === 'error',
  'notification-info': props.type === 'info'
}))

const close = () => {
  emit('close')
}

onMounted(() => {
  if (props.duration > 0) {
    timeoutId = window.setTimeout(() => {
      close()
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.notification-overlay {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  animation: slideInRight 0.3s ease-out;
}

.notification {
  background: #ede8dc;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  font-family: "IBM Plex Mono", monospace;
  max-width: 400px;
  min-width: 300px;
}

.notification-success {
  border-left: 4px solid #10b981;
}

.notification-error {
  border-left: 4px solid #ef4444;
}

.notification-info {
  border-left: 4px solid #3b82f6;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
}

.notification-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.notification-success .notification-icon {
  color: #10b981;
}

.notification-error .notification-icon {
  color: #ef4444;
}

.notification-info .notification-icon {
  color: #3b82f6;
}

.notification-text {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
}

.notification-message {
  font-size: 0.75rem;
  color: #374151;
  margin: 0;
  line-height: 1.4;
}

.notification-close {
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.125rem;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.notification-close:hover {
  background: rgba(55, 65, 81, 0.1);
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

@media (max-width: 640px) {
  .notification-overlay {
    top: 10px;
    right: 10px;
    left: 10px;
  }
  
  .notification {
    max-width: none;
    min-width: auto;
  }
}
</style> 