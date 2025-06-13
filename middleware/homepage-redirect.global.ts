import { useUserPreferences } from '~/composables/useUserPreferences';

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    const { getHomepage } = useUserPreferences();
    const homepage = getHomepage();
    if (homepage && homepage !== '/') {
      return navigateTo(homepage);
    }
  }
});
