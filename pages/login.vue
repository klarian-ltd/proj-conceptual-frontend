<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">Login</h1>
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
import { ref } from 'vue';
// useUserSession is auto-imported by Nuxt Auth Utils

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref<{ message: string } | null>(null);

const { fetch } = useUserSession();

const handleLogin = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    });
    await fetch();
    await navigateTo('/');
  } catch (e: any) {
    error.value = { message: e.data?.message || 'An unexpected error occurred.' };
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: 'public',
});
</script>
