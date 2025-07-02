<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />
		<!-- Inner Header Content Area -->
		<main class="flex-1 overflow-auto p-6">
			<!-- Inner Header Content Area -->
			<div class="m-4 flex items-center justify-between">
				<h1 class="text-primary text-3xl font-bold">
					{{ $route.meta.title }}
				</h1>
			</div>
			<USeparator icon="ic:baseline-hardware" class="px-3 pb-3" color="primary" />

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
	import { h, resolveComponent, ref } from 'vue';
	import { getPaginationRowModel } from '@tanstack/vue-table';
	import type { TableColumn } from '@nuxt/ui';
	import { useHardwareStore } from '@/store/hardwareStore';
	import { definePageMeta } from '#imports';

	definePageMeta({
		title: 'Hardware',
	});

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
