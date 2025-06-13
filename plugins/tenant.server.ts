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
  const tenantId = nuxtApp.ssrContext.event.context.tenantId;
  const tenantBackendUrl = nuxtApp.ssrContext.event.context.tenantBackendUrl;

  const tenantState = useState<Tenant>('tenant');

  if (tenantId) {
    try {
      const data = await $fetch<Tenant>('/api/v1/theme/', {
        baseURL: tenantBackendUrl,
      });
      data.backendUrl = tenantBackendUrl;
      tenantState.value = data;
    } catch (error) {
      if (error.statusCode === 404) {
        console.warn(`Tenant theme not found for ${tenantId}. Using fallback theme.`);
        tenantState.value = {
          name: tenantId,
          backendUrl: tenantBackendUrl,
          theme: { colors: {}, font: {} }, // Use default/fallback theme
          features: { dashboard: true, reports: true, admin: true }, // Assume all features for testing
        };
      } else {
        // For other errors, we might still want to redirect or show an error page
        console.error(`Error fetching config for ${tenantId}. Redirecting to login.`, error.message);
        return navigateTo('/login');
      }
    }
  } else {
    tenantState.value = {
      name: 'Error: Tenant not found',
      backendUrl: '',
      theme: {
        colors: {},
        font: {},
      },
      features: {},
    };
  }
});
