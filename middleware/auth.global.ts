export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();
  // Allow access to the login page (and optionally other public pages)
  if (to.path === '/login') return;
  if (!loggedIn.value) {
    return navigateTo('/login');
  }
});
