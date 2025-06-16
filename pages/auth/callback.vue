<template>
  <div>Finalizing authentication... Please wait.</div>
</template>

<script setup lang="ts">
const { fetch } = useUserSession();
const router = useRouter();

onMounted(async () => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('token');
  if (token) {
    await $fetch('/api/auth/social-callback', { method: 'POST', body: { token } });
    await fetch();
    router.push('/');
  } else {
    // Optionally handle error or listen for postMessage if needed
    router.push('/login?error=social_failed');
  }
});
</script>
