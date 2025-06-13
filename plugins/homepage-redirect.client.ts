import { useUserPreferences } from '~/composables/useUserPreferences';

export default defineNuxtPlugin((nuxtApp) => {
  const { getHomepage } = useUserPreferences();
  if (process.client && window.location.pathname === '/') {
    const homepage = getHomepage();
    if (homepage && homepage !== '/') {
      navigateTo(homepage);
    }
  }
});
