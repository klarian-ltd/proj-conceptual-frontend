<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Main Content Area -->
    <main class="flex-1 overflow-auto p-6">
      <div class="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-2xl border border-primary-400/20 bg-[var(--ui-bg)] bg-opacity-80 backdrop-blur-md text-[var(--ui-text)]">
        <form @submit.prevent="runTest" class="space-y-4">
          <div>
            <label for="apiAddress" class="block text-sm font-medium text-[var(--ui-text)]">API Address</label>
            <input
              id="apiAddress"
              v-model="apiAddress"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-[var(--color-secondary-50)] text-[var(--ui-text)]"
            />
          </div>
          <div>
            <button type="submit" class="w-full py-2 px-4 bg-primary-500 text-white rounded hover:bg-primary-600 transition">Tests</button>
          </div>
        </form>
        <div v-if="status !== null" class="mt-6">
          <div class="mb-2">
            <span class="font-semibold">Status: </span>
            <span :class="statusClass">{{ status }}</span>
          </div>
          <div>
            <span class="font-semibold">Results:</span>
            <pre class="bg-[var(--color-secondary-100)] p-2 rounded mt-1 overflow-x-auto text-[var(--ui-text)]">{{ results }}</pre>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Sidebar from '../components/Sidebar.vue';

// const defaultApi = 'https://platform-poc-backend.kindmoss-547a533c.uksouth.azurecontainerapps.io/api/things';
const defaultApi = 'http://localhost:8000/api/things';
const apiAddress = ref(defaultApi);
const status = ref<string|null>(null);
const results = ref<string>('');

const statusClass = computed(() => {
  if (!status.value) return '';
  if (status.value.startsWith('2')) return 'text-green-600';
  if (status.value.startsWith('4') || status.value.startsWith('5')) return 'text-red-600';
  return 'text-yellow-600';
});

async function runTest() {
  status.value = null;
  results.value = '';
  try {
    const res = await fetch(apiAddress.value);
    status.value = res.status.toString();
    const text = await res.text();
    try {
      results.value = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      results.value = text;
    }
  } catch (err: any) {
    status.value = 'Error';
    results.value = err.message || String(err);
  }
}
</script>

<style scoped>
.bg-primary-500 {
  background-color: var(--color-primary-500);
}
.bg-primary-600 {
  background-color: var(--color-primary-600);
}
</style>
