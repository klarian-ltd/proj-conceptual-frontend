import { useState } from '#app';

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
  const tenant = useState<Tenant>('tenant', () => ({
    name: 'Default',
    backendUrl: '',
    theme: {
      colors: {},
      font: {}
    },
    features: {},
  }));

  const hasFeature = (feature: string): boolean => {
    // Ensure features object exists before checking
    return tenant.value?.features?.[feature] === true;
  };

  return {
    tenant,
    hasFeature,
  };
};
