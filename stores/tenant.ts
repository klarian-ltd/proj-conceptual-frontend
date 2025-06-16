import { defineStore } from 'pinia';
import { useCookie } from '#app';

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

export const useTenantStore = defineStore('tenant', {
  state: (): Tenant => ({
    name: 'Default',
    backendUrl: '',
    theme: { colors: {}, font: {} },
    features: {},
  }),
  actions: {
    setTenant(newTenant: Tenant) {
      this.$patch(newTenant);
      useCookie('tenant', { sameSite: 'lax' }).value = { ...this.$state };
      console.log('[PiniaTenant] setTenant, cookie set:', this.$state);
    },
    hydrateFromCookie() {
      const cookie = useCookie<Tenant>('tenant', { sameSite: 'lax' }).value;
      if (cookie) {
        this.$patch(cookie);
        console.log('[PiniaTenant] hydrateFromCookie, state set from cookie:', cookie);
      }
    },
  },
});
