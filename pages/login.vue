<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">Login</h1>
      <!-- Microsoft Login Button and Form -->
      <client-only>
        <form
          ref="msForm"
          :action="providerRedirectUrl"
          method="POST"
          style="display: none"
        >
          <input type="hidden" name="provider" :value="provider" />
          <input type="hidden" name="callback_url" :value="callbackUrl" />
          <input type="hidden" name="process" value="login" />
        </form>
        <UButton @click="signInWithMicrosoft" color="primary" block class="mb-4" :disabled="isMsLoading">
          <span v-if="isMsLoading">Preparing...</span>
          <span v-else>Sign in with Microsoft</span>
        </UButton>
      </client-only>
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div v-if="error" class="p-4 text-sm text-red-700 bg-red-100 rounded-md">
          {{ error.message }}
        </div>
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <div class="mt-1">
            <input id="username" v-model="username" name="username" type="text" autocomplete="username" required
              class="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input id="password" v-model="password" name="password" type="password" autocomplete="current-password"
              required
              class="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div>
          <button type="submit" :disabled="isLoading"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// useUserSession is auto-imported by Nuxt Auth Utils
import { useTenantStore } from '~/stores/tenant';
import { useUserPreferences } from '~/composables/useUserPreferences';
import type { User } from '~/types/user';

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref<{ message: string } | null>(null);
const isMsLoading = ref(false);

const { fetch } = useUserSession();
const tenantStore = useTenantStore();
const { setHomepage } = useUserPreferences();

// Microsoft login form logic
const msForm = ref<HTMLFormElement | null>(null);
const provider = 'microsoft';
const providerRedirectUrl = computed(() => {
  // Use plugin state if available
  if (tenantStore.backendUrl) {
    return `${tenantStore.backendUrl}/_allauth/browser/v1/auth/provider/redirect`;
  }
  // Fallback: extract subdomain from window.location.host
  if (process.client) {
    const host = window.location.host.split(':')[0];
    const parts = host.split('.');
    if (parts.length > 1 && parts[0] !== 'www') {
      const subdomain = parts[0];
      return `https://${subdomain}.localhost/_allauth/browser/v1/auth/provider/redirect`;
    }
  }
  // Final fallback
  return '';
});
const callbackUrl = computed(() => process.client ? `${window.location.origin}/auth/callback` : '');

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
}

async function signInWithMicrosoft() {
  isMsLoading.value = true;
  try {
    // Always fetch CSRF token before submitting the form
    let backendUrl = tenantStore.backendUrl;
    if (!backendUrl && process.client) {
      const host = window.location.host.split(':')[0];
      const parts = host.split('.');
      if (parts.length > 1 && parts[0] !== 'www') {
        const subdomain = parts[0];
        backendUrl = `https://${subdomain}.localhost`;
      } else {
        backendUrl = 'https://localhost';
      }
    }
    // await fetch(`${backendUrl}/csrf/`, { credentials: 'include' });

    // Add CSRF token to the form as a hidden input
    const csrfToken = getCookie('csrftoken');
    if (msForm.value && csrfToken) {
      let csrfInput = msForm.value.querySelector('input[name="csrfmiddlewaretoken"]') as HTMLInputElement | null;
      if (!csrfInput) {
        csrfInput = document.createElement('input') as HTMLInputElement;
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        msForm.value.appendChild(csrfInput);
      }
      csrfInput.value = csrfToken;
    }

    // Now submit the form
    msForm.value?.submit();
  } catch (e) {
    console.error('Failed to fetch CSRF token before Microsoft login:', e);
    // Optionally show an error to the user
  } finally {
    isMsLoading.value = false;
  }
}

const handleLogin = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { tenantId, tenantBackendUrl } = await $fetch<{ user: User, tenantId: string, tenantBackendUrl: string }>('/api/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    });
    // Synchronize the global tenant state using Pinia
    tenantStore.setTenant({
      ...tenantStore.$state,
      name: tenantId,
      backendUrl: tenantBackendUrl,
    });
    await fetch();
    // Fetch allowed homepages for the tenant
    const tenantName = tenantStore.name?.toLowerCase();
    let homepage = '/';
    if (tenantName) {
      const homepageOptions = await $fetch<{ label: string; path: string }[]>(`/api/tenants/${tenantName}`);
      console.log('Tenant:', tenantName, 'Homepage options:', homepageOptions);
      homepage = homepageOptions[0]?.path || '/';
    } else {
      console.log('No tenant name found:', tenantStore.$state);
    }
    setHomepage(homepage);
    await navigateTo(homepage);
  } catch (e: any) {
    error.value = { message: e.data?.message || 'An unexpected error occurred.' };
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (process.client) {
    let backendUrl = tenantStore.backendUrl;
    if (!backendUrl) {
      const host = window.location.host.split(':')[0];
      const parts = host.split('.');
      if (parts.length > 1 && parts[0] !== 'www') {
        const subdomain = parts[0];
        backendUrl = `https://${subdomain}.localhost`;
      } else {
        backendUrl = 'https://localhost';
      }
    }
    await fetch(`${backendUrl}/csrf/`, { credentials: 'include' });
  }
});

definePageMeta({
  layout: 'public',
});
</script>
