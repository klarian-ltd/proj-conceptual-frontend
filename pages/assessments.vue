<script setup lang="ts">
import { usePaginatedApi } from '~/composables/usePaginatedApi';

interface Assessment {
  id: number;
  approval_status: string;
  assessment_date: string;
  created_by: { first_name: string; last_name: string };
  assessment_type: { name: string };
}

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'approval_status', header: 'Status' },
  { accessorKey: 'assessment_date', header: 'Date' },
  {
    accessorKey: 'created_by',
    header: 'Created By',
    cell: (info: any) => {
      const value = info.row.original.created_by;
      return value ? `${value.first_name} ${value.last_name}` : '';
    }
  },
  {
    accessorKey: 'assessment_type',
    header: 'Type',
    cell: (info: any) => info.row.original.assessment_type?.name || ''
  }
];

const {
  items,
  count,
  page,
  pageSize,
  loading,
} = usePaginatedApi<Assessment>('/api/assessments');

function handlePageChange(newPage: number) {
  page.value = newPage;
}

definePageMeta({
  layout: 'table',
  title: 'Assessments',
});
</script>

<template>
  <CommonPaginatedTable
    :columns="columns"
    :data="items"
    :loading="loading"
    :total="count"
    :page="page"
    :pageSize="pageSize"
    :onPageChange="handlePageChange"
  />
</template>
