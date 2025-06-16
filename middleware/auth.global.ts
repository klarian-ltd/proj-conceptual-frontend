export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();
  // Allow access to the login page and the auth callback page
  if (to.path === '/login' || to.path === '/auth/callback') return;
  if (!loggedIn.value) {
    return navigateTo('/login');
  }
});
