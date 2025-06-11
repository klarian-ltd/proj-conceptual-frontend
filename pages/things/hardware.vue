<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />

		<div class="flex w-full flex-1 flex-col">
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
						:data="data"
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
		</div>
	</div>
</template>

<script setup lang="ts">
	import { h, resolveComponent, ref, useTemplateRef, computed } from 'vue';
	import { getPaginationRowModel } from '@tanstack/vue-table';
	import type { TableColumn } from '@nuxt/ui';
	import type { Table } from '@tanstack/vue-table'; // or '@tanstack/table-core' if used directly

	const table = useTemplateRef<Table<any>>('table');

	const UBadge = resolveComponent('UBadge');

	type Hardware = {
		id: string;
		date: string;
		status: 'paid' | 'failed' | 'refunded';
		email: string;
		amount: number;
	};

	const data = ref<Hardware[]>([
		{
			id: '4600',
			date: '2024-03-11T15:30:00',
			status: 'paid',
			email: 'james.anderson@example.com',
			amount: 594,
		},
		{
			id: '4599',
			date: '2024-03-11T10:10:00',
			status: 'failed',
			email: 'mia.white@example.com',
			amount: 276,
		},
		{
			id: '4598',
			date: '2024-03-11T08:50:00',
			status: 'refunded',
			email: 'william.brown@example.com',
			amount: 315,
		},
		{
			id: '4597',
			date: '2024-03-10T19:45:00',
			status: 'paid',
			email: 'emma.davis@example.com',
			amount: 529,
		},
		{
			id: '4596',
			date: '2024-03-10T15:55:00',
			status: 'paid',
			email: 'ethan.harris@example.com',
			amount: 639,
		},
	]);

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

	const globalFilter = ref('45');

	const pagination = ref({
		pageIndex: 0,
		pageSize: 5,
	});
</script>
