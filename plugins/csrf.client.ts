import { useTenant } from '~/composables/useTenant'

export default defineNuxtPlugin(async () => {
  // Get the current tenant's backend URL
  const { tenant } = useTenant()
  let backendUrl = tenant.value.backendUrl

  // Fallback: extract subdomain if backendUrl is not set
  if (!backendUrl && process.client) {
    const host = window.location.host.split(':')[0]
    const parts = host.split('.')
    if (parts.length > 1 && parts[0] !== 'www') {
      const subdomain = parts[0]
      backendUrl = `https://${subdomain}.localhost`
    } else {
      backendUrl = 'https://localhost'
    }
  }

  // Fetch the CSRF token from the backend
  try {
    await fetch(`${backendUrl}/csrf/`, {
      credentials: 'include', // Important: ensures cookie is set
    })
    // The csrftoken cookie is now set for your domain
  } catch (e) {
    // Handle error if needed
    console.error('Failed to fetch CSRF token:', e)
  }
})
