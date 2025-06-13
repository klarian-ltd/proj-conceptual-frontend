<script setup lang="ts">
definePageMeta({
  middleware: 'klarian-only',
  title: 'Klarian Admin',
});
import PaginatedTable from '~/components/common/PaginatedTable.vue';
import { usePaginatedApi } from '~/composables/usePaginatedApi';

interface Tenancy {
  id: number;
  name: string;
  subdomain_prefix: string;
}

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'subdomain_prefix', header: 'Subdomain Prefix' },
];

const {
  items,
  count,
  page,
  pageSize,
  loading,
} = usePaginatedApi<Tenancy>('/api/tenancy');

function handlePageChange(newPage: number) {
  page.value = newPage;
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Klarian Admin</h1>
    <p class="mb-2">Welcome to the Klarian tenancy management area.</p>
    <p class="text-gray-500 mb-8">Here you can manage tenants, users, and other company-specific settings.</p>
    <PaginatedTable
      :columns="columns"
      :data="items"
      :loading="loading"
      :total="count"
      :page="page"
      :pageSize="pageSize"
      :onPageChange="handlePageChange"
    />
  </div>
</template>
