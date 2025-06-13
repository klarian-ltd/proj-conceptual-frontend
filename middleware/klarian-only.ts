import { useTenant } from '~/composables/useTenant';

export default defineNuxtRouteMiddleware(() => {
  const { tenant } = useTenant();
  if (tenant.value?.name?.toLowerCase() !== 'klarian') {
    return navigateTo('/forbidden');
  }
});
