<script setup lang="ts">
import { computed } from 'vue';
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useTemplateRef('table')

const props = defineProps<{
  columns: any[];
  data: any[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}>();

const pagination = ref({
  pageIndex: 0,
  pageSize: props.pageSize
})

</script>

<template>
  <div>
    <UTable
      ref="table"
      :columns="props.columns"
      v-model:pagination="pagination"
      :data="props.data"
      :loading="props.loading"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
      class="flex-1 shadow-md border border-gray-700 rounded-md"
    />
    <div class="flex justify-end mt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="props.total"
        @update:page="(p) => props.onPageChange(p)"
      />
    </div>
  </div>
</template>
