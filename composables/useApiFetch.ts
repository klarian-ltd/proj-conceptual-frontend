import { useTenant } from '~/composables/useTenant';
import { useFetch, useNuxtApp, useRuntimeConfig } from '#app';
import type { UseFetchOptions } from '#app';

export const useApiFetch = <T>(request: string, opts?: UseFetchOptions<T>) => {
  const { session } = useUserSession();
  const { tenant } = useTenant();

  // For server-side requests, we get the URL from the context.
  // On the client, we rely on the state populated by the plugin.
  const tenantBackendUrl = process.server
    ? useNuxtApp().ssrContext?.event.context.tenantBackendUrl
    : tenant.value?.backendUrl;

  const config = useRuntimeConfig();

  const options: UseFetchOptions<T> = {
    ...opts,
    baseURL: tenantBackendUrl || config.public.apiBase,
    headers: {
      ...opts?.headers,
    },
  };

  if (session.value?.accessToken) {
    options.headers = { ...options.headers, Authorization: `Bearer ${session.value.accessToken}` };
  }

  return useFetch(request, options);
};
