<script setup lang="ts">
import { ref, reactive } from 'vue'
import { validateContactForm, submitContactForm, copyToClipboard } from '../../utils/forms'
import Notification from '../Commons/Notification.vue'

const contacts = [
  {
    icon: "📧",
    label: "Email",
    href: "mailto:junaidhussnain369@gmail.com",
    value: "junaidhussnain369@gmail.com"
  },
  {
    icon: "💼",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/junaid-hussnain-a951791bb/",
    value: "https://www.linkedin.com/in/junaid-hussnain-a951791bb/"
  },
  {
    icon: "👨‍💻",
    label: "GitHub",
    href: "https://github.com/Junaid-PK",
    value: "https://github.com/Junaid-PK"
  },
];

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const errors = reactive({
  name: '',
  email: '',
  message: ''
})
const successMessage = ref('')
const showNotification = ref(false)
const notificationType = ref<'success' | 'error'>('success')
const notificationTitle = ref('')
const notificationMessage = ref('')

const clearErrors = () => {
  errors.name = ''
  errors.email = ''
  errors.message = ''
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  // Reset previous states
  clearErrors()
  successMessage.value = ''
  
  // Validate form
  const validationError = validateContactForm(form)
  if (validationError) {
    // Show general error
    notificationType.value = 'error'
    notificationTitle.value = 'Validation Error'
    notificationMessage.value = validationError
    showNotification.value = true
    return
  }
  
  isSubmitting.value = true
  
  try {
    const response = await submitContactForm(form)
    
    if (response.success) {
      // Show success notification
      notificationType.value = 'success'
      notificationTitle.value = 'Message Sent!'
      notificationMessage.value = response.message
      showNotification.value = true
      
      // Clear form
      form.name = ''
      form.email = ''
      form.message = ''
      successMessage.value = 'Thank you for your message!'
    } else {
      // Show error notification
      notificationType.value = 'error'
      notificationTitle.value = 'Error'
      notificationMessage.value = response.message
      showNotification.value = true
    }
  } catch (err) {
    notificationType.value = 'error'
    notificationTitle.value = 'Error'
    notificationMessage.value = 'Something went wrong. Please try again.'
    showNotification.value = true
  } finally {
    isSubmitting.value = false
  }
}

const handleContactClick = async (contact: any, e: Event) => {
  e.preventDefault()
  
  const success = await copyToClipboard(contact.value)
  
  if (success) {
    notificationType.value = 'success'
    notificationTitle.value = 'Copied!'
    notificationMessage.value = `${contact.label} copied to clipboard`
    showNotification.value = true
  } else {
    notificationType.value = 'error'
    notificationTitle.value = 'Error'
    notificationMessage.value = 'Failed to copy to clipboard'
    showNotification.value = true
  }
}
</script>

<template>
  <section id="contact" class="text-center py-16">
    <h2 class="text-3xl font-semibold mb-12 capitalize tracking-tighter">
      GET IN TOUCH
    </h2>
    
    <form @submit="handleSubmit" class="contact-form">
      <div class="form-group">
        <input
          v-model="form.name"
          type="text"
          placeholder="Your Name"
          :class="['form-input', { 'form-input-error': errors.name }]"
          :disabled="isSubmitting"
        />
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
      </div>
      
      <div class="form-group">
        <input
          v-model="form.email"
          type="email"
          placeholder="Your Email"
          :class="['form-input', { 'form-input-error': errors.email }]"
          :disabled="isSubmitting"
        />
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
      </div>
      
      <div class="form-group">
        <textarea
          v-model="form.message"
          placeholder="Your Message"
          :class="['form-textarea', { 'form-input-error': errors.message }]"
          :disabled="isSubmitting"
          rows="4"
        ></textarea>
        <div v-if="errors.message" class="error-message">{{ errors.message }}</div>
      </div>
      
      <button
        type="submit"
        :disabled="isSubmitting"
        :class="['submit-btn', { 'submit-btn-loading': isSubmitting }]"
      >
        <span v-if="isSubmitting" class="loading-spinner"></span>
        <span v-else>SEND MESSAGE</span>
      </button>
    </form>
    
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <div class="contact-links">
      <div
        v-for="contact in contacts"
        :key="contact.label"
        @click="handleContactClick(contact, $event)"
        class="contact-link"
      >
        <div class="contact-link-content">
          <span class="contact-icon">{{ contact.icon }}</span>
          <span class="contact-label">{{ contact.label }}</span>
        </div>
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
  </section>
</template>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

.form-input,
.form-textarea {
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

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2c3e50;
  border-style: solid;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-input:disabled,
.form-textarea:disabled {
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
  color: #10b981;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  font-family: "IBM Plex Mono", monospace;
  font-weight: 500;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-link {
  cursor: pointer;
  padding: 1.5rem;
  border: 1px dashed #374151;
  border-radius: 0.125rem;
  transition: all 0.3s ease;
  background: #ede8dc;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  min-width: 150px;
}

.contact-link:hover {
  transform: scale(1.05);
  border-style: solid;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.contact-link-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.contact-icon {
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.contact-link:hover .contact-icon {
  transform: scale(1.1) rotate(12deg);
}

.contact-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  font-family: "IBM Plex Mono", monospace;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .contact-form {
    padding: 0 1rem;
  }
  
  .contact-links {
    gap: 1rem;
  }
  
  .contact-link {
    min-width: 120px;
    padding: 1rem;
  }
}
</style>
