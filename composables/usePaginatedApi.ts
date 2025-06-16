import { ref, watchEffect } from 'vue';
import { useTenantStore } from '~/stores/tenant';
import { useActiveUser } from '~/composables/useActiveUser';

interface PaginatedResponse<T> {
  items: T[];
  count: number;
  [key: string]: any;
}

export function usePaginatedApi<T>(endpoint: string, initialParams = {}) {
  const items = ref<T[]>([]);
  const count = ref(0);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  // Pagination state
  const page = ref(1);
  const pageSize = ref(5);

  // Tenant and Auth
  const tenantStore = useTenantStore();
  const { session } = useActiveUser();

  // Debug logging
  console.log('[usePaginatedApi] tenant at start:', tenantStore.$state, 'process.server:', process.server, 'process.client:', process.client);

  // Fetch function
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const params = new URLSearchParams({
        ...initialParams,
        limit: pageSize.value,
        page: page.value,
      } as any).toString();

      const baseURL = tenantStore.backendUrl || '';
      const accessToken = session.value?.accessToken;
      const headers: Record<string, string> = {};
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      console.log('tenant', tenantStore.$state);
      console.log('baseURL', baseURL);

      const res = await $fetch<PaginatedResponse<T>>(`${baseURL}${endpoint}?${params}`, {
        headers,
      });
      items.value = res.items;
      count.value = res.count;
    } catch (e: any) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  // Refetch on page/pageSize change
  watchEffect(fetchData);

  return { items, count, page, pageSize, loading, error, fetchData };
}
