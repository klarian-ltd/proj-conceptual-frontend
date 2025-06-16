import { defineNuxtPlugin, useState } from '#app';

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

export default defineNuxtPlugin(async (nuxtApp) => {
  // const tenantId = nuxtApp.ssrContext.event.context.tenantId;
  // const tenantBackendUrl = nuxtApp.ssrContext.event.context.tenantBackendUrl;

  const tenantState = useState('tenant');

  // Disabled theme fetching for now. Set a default/fallback tenant config.
  tenantState.value = {
    name: 'Default',
    backendUrl: '',
    theme: {
      colors: {},
      font: {},
    },
    features: {},
  };
});
