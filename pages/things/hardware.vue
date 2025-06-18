<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Inner Header Content Area -->
		<main class="flex-1 overflow-auto p-6">
			<div class="flex px-4 py-3.5">
				<UInput
					v-model="globalFilter"
					class="max-w-sm"
					placeholder="Filter..."
				/>
			</div>
			<div>
				<UBadge
					color="primary"
					variant="outline"
					class="ml-4 flex justify-center rounded-lg"
				>
					<UTable
						ref="table"
						v-model:global-filter="globalFilter"
						v-model:pagination="pagination"
						:data="store.hardwareList"
						:columns="columns"
						:pagination-options="{
							getPaginationRowModel: getPaginationRowModel(),
						}"
						class="w-full"
					/>
				</UBadge>
			</div>
			<div class="flex justify-center pt-4">
				<UPagination />
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { h, resolveComponent, ref, useTemplateRef, computed } from 'vue';
	import { getPaginationRowModel } from '@tanstack/vue-table';
	import type { TableColumn } from '@nuxt/ui';
	import type { Table } from '@tanstack/vue-table'; // or '@tanstack/table-core' if used directly
	import { useHardwareStore } from '@/store/hardwareStore';

	const table = useTemplateRef<Table<any>>('table');

	const UBadge = resolveComponent('UBadge');

	const store = useHardwareStore();

	type Hardware = typeof store.hardwareList extends (infer U)[] ? U : never;

	const columns: TableColumn<Hardware>[] = [
		{
			accessorKey: 'id',
			header: '#',
			cell: ({ row }) => `#${row.getValue('id')}`,
		},
		{
			accessorKey: 'date',
			header: 'Date',
			cell: ({ row }) => {
				return new Date(row.getValue('date')).toLocaleString('en-US', {
					day: 'numeric',
					month: 'short',
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				});
			},
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const color = {
					paid: 'success' as const,
					failed: 'error' as const,
					refunded: 'neutral' as const,
				}[row.getValue('status') as string];

				return h(
					UBadge,
					{ class: 'capitalize', variant: 'subtle', color },
					() => row.getValue('status')
				);
			},
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},
		{
			accessorKey: 'amount',
			header: () => h('div', { class: 'text-right' }, 'Amount'),
			cell: ({ row }) => {
				const amount = Number.parseFloat(row.getValue('amount'));

				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'EUR',
				}).format(amount);

				return h('div', { class: 'text-right font-medium' }, formatted);
			},
		},
		{
			id: 'action',
		},
	];

	const globalFilter = ref('');

	const pagination = ref({
		pageIndex: 0,
		pageSize: 8,
	});
</script>
