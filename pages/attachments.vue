<script setup lang="ts">
import { usePaginatedApi } from '~/composables/usePaginatedApi';

interface Attachment {
  filename: string;
  caption: string;
  content_type: string;
  extension: string;
  created_at: string;
}

const columns = [
  { accessorKey: 'filename', header: 'Filename' },
  { accessorKey: 'caption', header: 'Caption' },
  { accessorKey: 'content_type', header: 'Content Type' },
  { accessorKey: 'extension', header: 'Extension' },
  { accessorKey: 'created_at', header: 'Created At' }
];

const {
  items,
  count,
  page,
  pageSize,
  loading,
} = usePaginatedApi<Attachment>('/api/attachments');

function handlePageChange(newPage: number) {
  page.value = newPage;
}

definePageMeta({
  layout: 'table',
  title: 'Attachments',
});
</script>

<template>
  <PaginatedTable
    :columns="columns"
    :data="items"
    :loading="loading"
    :total="count"
    :page="page"
    :pageSize="pageSize"
    :onPageChange="handlePageChange"
  />
</template>
