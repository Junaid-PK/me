// Form validation and submission utilities

export interface NewsletterForm {
  email: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface FormResponse {
  success: boolean
  message: string
}

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Newsletter form validation
export const validateNewsletterForm = (form: NewsletterForm): string | null => {
  if (!form.email.trim()) {
    return 'Email is required'
  }
  
  if (!isValidEmail(form.email)) {
    return 'Please enter a valid email address'
  }
  
  return null
}

// Contact form validation
export const validateContactForm = (form: ContactForm): string | null => {
  if (!form.name.trim()) {
    return 'Name is required'
  }
  
  if (!form.email.trim()) {
    return 'Email is required'
  }
  
  if (!isValidEmail(form.email)) {
    return 'Please enter a valid email address'
  }
  
  if (!form.message.trim()) {
    return 'Message is required'
  }
  
  if (form.message.trim().length < 10) {
    return 'Message must be at least 10 characters long'
  }
  
  return null
}

// Newsletter subscription
export const subscribeToNewsletter = async (_email: string): Promise<FormResponse> => {
  try {
    // For now, we'll simulate an API call
    // In a real application, you would send this to your backend
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
    
    // Simulate success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1
    
    if (isSuccess) {
      return {
        success: true,
        message: 'Successfully subscribed to newsletter! Check your email for confirmation.'
      }
    } else {
      return {
        success: false,
        message: 'Email already subscribed or invalid email address.'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    }
  }
}

// Contact form submission
export const submitContactForm = async (_form: ContactForm): Promise<FormResponse> => {
  try {
    // For now, we'll simulate an API call
    // In a real application, you would send this to your backend
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
    
    // Simulate success/failure (95% success rate)
    const isSuccess = Math.random() > 0.05
    
    if (isSuccess) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      }
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send message. Please try again later.'
    }
  }
}

// Copy to clipboard utility
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
} 