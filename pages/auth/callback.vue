<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div v-if="loading">Signing you in...</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTenantStore } from '~/stores/tenant'
import { useUserSession } from '#imports'
import { useUserPreferences } from '~/composables/useUserPreferences'

const loading = ref(true)
const error = ref<string | null>(null)
const { fetch: fetchUserSession } = useUserSession()
const tenantStore = useTenantStore()
const { setHomepage } = useUserPreferences()
const { fetch } = useUserSession();

onMounted(async () => {
  console.log('[Callback] Mounted. Starting social login flow...');
  try {
    // 1. Determine the backend URL
    let backendUrl = tenantStore.$state.backendUrl
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
    console.log(`[Callback] Step 1: Determined backend URL: ${backendUrl}`);

    // 2. Call the new endpoint to get tokens from the session cookie
    console.log('[Callback] Step 2: Fetching tokens from /api/auth/session/');
    const tokenResponse = await $fetch(`${backendUrl}/api/auth/session/`, {
      method: 'POST',
      credentials: 'include',
    }) as { access: string; refresh: string };
    console.log('[Callback] Step 2: Successfully fetched tokens.', tokenResponse);

    // 3. POST tokens to our own API to set the session
    console.log('[Callback] Step 3: Posting tokens to /api/auth/social-callback');
    const socialCallbackResponse = await $fetch('/api/auth/social-callback', {
      method: 'POST',
      body: {
        accessToken: tokenResponse.access,
        refreshToken: tokenResponse.refresh,
      },
    }) as { user: any; tenantId: string; tenantBackendUrl: string };
    console.log('[Callback] Step 3: Successfully posted tokens and got tenant info:', socialCallbackResponse);

    // This is the key fix: Synchronize the global tenant state
    tenantStore.setTenant({
      ...tenantStore.$state,
      name: socialCallbackResponse.tenantId,
      backendUrl: socialCallbackResponse.tenantBackendUrl,
    });

    // 4. Fetch the session state into the composable
    console.log('[Callback] Step 4: Fetching user session state.');
    await fetchUserSession();
    console.log('[Callback] Step 4: Session state fetched.', useUserSession().user.value);

    // 5. Determine the user's homepage and redirect
    console.log("[Callback] Step 5: Determining user's homepage.");
    const tenantName = socialCallbackResponse.tenantId?.toLowerCase();
    let homepage = '/';
    if (tenantName && tenantName !== 'default') {
      try {
        const homepageOptions = await $fetch<{ label: string; path: string }[]>(`/api/tenants/${tenantName}`)
        if (homepageOptions.length > 0) {
          homepage = homepageOptions[0].path
        }
      } catch (e) {
        console.error(`Could not fetch homepage for tenant ${tenantName}`, e)
      }
    }
    console.log(`[Callback] Step 5: Homepage is '${homepage}'. Redirecting...`);
    setHomepage(homepage)
    await navigateTo(homepage, { replace: true })

  } catch (e) {
    console.error('Social login callback failed:', e)
    error.value = 'Could not sign you in. Redirecting to login...'
    setTimeout(() => navigateTo('/login', { replace: true }), 2000)
  } finally {
    loading.value = false
  }
})
</script>
