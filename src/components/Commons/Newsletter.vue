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
      
      <form @submit.prevent="handleSubmit" class="newsletter-form">
        <div class="form-group">
          <input
            v-model="form.email"
            type="email"
            placeholder="Your Email"
            :class="['form-input', { 'form-input-error': error }]"
            :disabled="isSubmitting"
          />
          <div v-if="error" class="error-message">{{ error }}</div>
        </div>
        
        <button
          type="submit"
          :disabled="isSubmitting"
          :class="['submit-btn', { 'submit-btn-loading': isSubmitting }]"
        >
          <span v-if="isSubmitting" class="loading-spinner"></span>
          <span v-else>SUBSCRIBE</span>
        </button>
      </form>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
    
    <!-- Notification -->
    <Notification
      :is-visible="showNotification"
      :type="notificationType"
      :title="notificationTitle"
      :message="notificationMessage"
      @close="showNotification = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { validateNewsletterForm, subscribeToNewsletter } from '../../utils/forms'
import Notification from './Notification.vue'

const form = reactive({
  email: ''
})

const isSubmitting = ref(false)
const error = ref('')
const successMessage = ref('')
const showNotification = ref(false)
const notificationType = ref<'success' | 'error'>('success')
const notificationTitle = ref('')
const notificationMessage = ref('')

const handleSubmit = async () => {
  // Reset previous states
  error.value = ''
  successMessage.value = ''
  
  // Validate form
  const validationError = validateNewsletterForm(form)
  if (validationError) {
    error.value = validationError
    return
  }
  
  isSubmitting.value = true
  
  try {
    const response = await subscribeToNewsletter(form.email)
    
    if (response.success) {
      // Show success notification
      notificationType.value = 'success'
      notificationTitle.value = 'Success!'
      notificationMessage.value = response.message
      showNotification.value = true
      
      // Clear form
      form.email = ''
      successMessage.value = 'Thank you for subscribing!'
    } else {
      // Show error notification
      notificationType.value = 'error'
      notificationTitle.value = 'Error'
      notificationMessage.value = response.message
      showNotification.value = true
      
      error.value = response.message
    }
  } catch (err) {
    notificationType.value = 'error'
    notificationTitle.value = 'Error'
    notificationMessage.value = 'Something went wrong. Please try again.'
    showNotification.value = true
    
    error.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  background: #ede8dc;
  color: #374151;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.form-input:focus {
  outline: none;
  border-color: #2c3e50;
  border-style: solid;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-input-error {
  border-color: #ef4444;
  border-style: solid;
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-family: "IBM Plex Mono", monospace;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #374151;
  color: #ede8dc;
  border: 1px dashed #2c3e50;
  border-radius: 0.125rem;
  font-family: "IBM Plex Mono", monospace;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
}

.submit-btn:hover:not(:disabled) {
  background: #2c3e50;
  transform: scale(1.02);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-btn-loading {
  cursor: wait;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.success-message {
  text-align: center;
  color: #10b981;
  font-size: 0.875rem;
  margin-top: 1rem;
  font-family: "IBM Plex Mono", monospace;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .newsletter-form {
    padding: 0 1rem;
  }
}
</style>
