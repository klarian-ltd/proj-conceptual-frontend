import { useTenantStore } from '~/stores/tenant';
export default defineNuxtPlugin(() => {
  const tenantStore = useTenantStore();
  tenantStore.hydrateFromCookie();
});
