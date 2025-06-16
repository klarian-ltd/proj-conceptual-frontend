import { useState, useCookie } from '#app';

interface TenantTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
  };
  font?: {
    family?: string;
  };
}

interface Tenant {
  name: string;
  backendUrl: string;
  theme: TenantTheme;
  features: Record<string, boolean>;
}

export const useTenant = () => {
  const defaultTenant: Tenant = {
    name: 'Default',
    backendUrl: '',
    theme: {
      colors: {},
      font: {}
    },
    features: {},
  };

  // Use Nuxt's useCookie composable for SSR-friendly cookies
  const tenantCookie = useCookie<Tenant>('tenant', { sameSite: 'lax' });
  console.log('[useTenant] Cookie value on init:', tenantCookie.value);
  const tenant = useState<Tenant>('tenant', () => tenantCookie.value || defaultTenant);

  // Whenever tenant changes, update the cookie
  function setTenant(newTenant: Tenant) {
    console.log('[useTenant] Setting tenant and cookie:', newTenant);
    tenant.value = newTenant;
    tenantCookie.value = newTenant;
    console.log('[useTenant] Cookie after set:', tenantCookie.value);
  }

  const hasFeature = (feature: string): boolean => {
    // Ensure features object exists before checking
    return tenant.value?.features?.[feature] === true;
  };

  return {
    tenant,
    setTenant,
    hasFeature,
  };
};
