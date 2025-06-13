<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold">Admin Dashboard</h1>
    <p class="mt-4">
      Welcome, administrator. This page is only visible to users with the 'admin' role.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'public', // Or a new 'default' or 'admin' layout
  roles: ['admin'],
});
</script>
