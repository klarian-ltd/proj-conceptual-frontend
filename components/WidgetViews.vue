<template>
	<div class="ml-3 flex">
		<UTooltip text="Add a new chart widget">
			<UButton
				label="New Chart Widget"
				icon="i-lucide-plus"
				target="_blank"
				@click="addChartItem"
			/>
		</UTooltip>
		<UTooltip text="Add a new card widget">
			<UButton
				label="New Card Widget"
				icon="i-lucide-plus"
				target="_blank"
				class="ml-2"
				@click="addCardItem"
			/>
		</UTooltip>
	</div>

	<GridLayout
		:layout="layout"
		:col-num="12"
		:row-height="150"
		:is-draggable="true"
		:is-resizable="true"
		:vertical-compact="true"
		:margin="[10, 10]"
		:use-css-transforms="true"
		:auto-size="true"
		class="rounded p-4 shadow"
		@layout-updated="updateLayout"
	>
		<GridItem
			v-for="item in layout"
			:key="item.i"
			:x="item.x"
			:y="item.y"
			:w="item.w"
			:h="item.h"
			:i="item.i"
		>
			<!-- Top Content -->
			<div
				class="relative flex h-full flex-col justify-between rounded border border-gray-300 p-4"
			>
				<div class="mb-4 flex items-center justify-between">
					<span class="text-sm font-bold">{{ item.title }}</span>
					<div class="flex">
						<UTooltip text="Edit widget title">
							<button class="mr-2 text-sm" @click="openEditTitle(item.i)">
								<UIcon name="heroicons-solid:pencil" class="size-5" />
							</button>
						</UTooltip>
						<UTooltip text="Remove widget">
							<button
								class="text-sm text-red-400 transition-colors duration-200 hover:text-red-500"
								@click="removeItem(item.i)"
							>
								<UIcon name="heroicons-solid:x-mark" class="size-5" />
							</button>
						</UTooltip>
					</div>
				</div>

				<!-- Middle Content -->
				<UContextMenu size="xl" :items="getContextItems(item.i)">
					<div
						class="border-accented flex h-full items-center justify-center rounded-md border border-dashed text-sm"
					>
						Right Click Here To Add Content
					</div>
				</UContextMenu>

				<!-- Chart Modal -->
				<!-- <ChartSlideover v-model:isModalopen="isModalOpen" /> -->

				<div class="mt-2 text-xs text-gray-600">
					You can drag or resize this widget.
				</div>
			</div>
		</GridItem>
	</GridLayout>

	<!-- Edit Title Modal (only renders when button is selected) -->
	<UModal v-if="editingWidget" v-model:open="isEditingTitleOpen">
		<template #content>
			<Placeholder class="m-4 h-32">
				<div class="w-full">
					<h3 class="mb-4 text-lg font-semibold">New Widget Title</h3>

					<UInput
						v-model="editingWidget.title"
						placeholder="Enter new title"
						class="mb-4 w-full"
						autofocus
					/>

					<div class="flex justify-center gap-2">
						<UButton
							label="Save"
							color="primary"
							:disabled="!editingWidget.title.trim()"
							class="w-full"
							@click="saveTitle"
						/>
						<UButton
							label="Cancel"
							class="w-full bg-red-400 hover:bg-red-500"
							@click="cancelEditTitle"
						/>
					</div>
				</div>
			</Placeholder>
		</template>
	</UModal>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { ContextMenuItem } from '@nuxt/ui';

	// const isModalOpen = ref(false)

	// Editing widget title state
	const isEditingTitleOpen = ref(false);
	const editingWidget = ref<{ id: string; title: string } | null>(null);

	const layout = ref([
		{ x: 0, y: 0, w: 3, h: 2, i: '0', title: 'Card 1' },
		{ x: 3, y: 0, w: 3, h: 2, i: '1', title: 'Card 2' },
		{ x: 0, y: 0, w: 6, h: 4, i: '2', title: 'Chart 1' },
		{ x: 6, y: 0, w: 6, h: 4, i: '3', title: 'Chart 2' },
	]);

	const counter = ref(3);

	function getContextItems(id: string): ContextMenuItem[] {
		return [
			// {
			//   label: 'Add Chart',
			//   icon: 'heroicons-solid:plus-circle',
			//   onSelect() {
			//     isModalOpen.value = true
			//   },
			// },
			{
				label: 'Charts',
				type: 'label',
			},
			{
				label: 'Pie',
				icon: 'heroicons:chart-pie-20-solid',
			},
			{
				label: 'Line',
				icon: 'ic:round-line-axis',
			},
			{
				label: 'Bar',
				icon: 'ic:round-bar-chart',
			},
			{
				label: 'Card',
				type: 'label',
			},
			{
				label: 'Numbers',
				icon: 'ic:round-123',
			},
		];
	}

	function openEditTitle(id: string) {
		const widget = layout.value.find((item) => item.i === id);
		if (widget) {
			editingWidget.value = { id, title: widget.title };
			isEditingTitleOpen.value = true;
		}
	}

	function saveTitle() {
		const widget = layout.value.find(
			(item) => item.i === editingWidget.value?.id
		);
		if (widget && editingWidget.value) {
			widget.title = editingWidget.value.title;
		}
		editingWidget.value = null;
		isEditingTitleOpen.value = false;
	}

	function cancelEditTitle() {
		editingWidget.value = null;
		isEditingTitleOpen.value = false;
	}

	function findNextAvailablePosition(layout: any[], w = 3, h = 2, cols = 12) {
		const occupied = new Set();
		layout.forEach((item) => {
			for (let dx = 0; dx < item.w; dx++) {
				for (let dy = 0; dy < item.h; dy++) {
					occupied.add(`${item.x + dx},${item.y + dy}`);
				}
			}
		});

		for (let y = 0; y < 100; y++) {
			for (let x = 0; x <= cols - w; x++) {
				let fits = true;
				for (let dx = 0; dx < w; dx++) {
					for (let dy = 0; dy < h; dy++) {
						if (occupied.has(`${x + dx},${y + dy}`)) {
							fits = false;
							break;
						}
					}
					if (!fits) break;
				}
				if (fits) return { x, y };
			}
		}

		return { x: 0, y: 0 };
	}

	function addChartItem() {
		const w = 6,
			h = 4;
		const { x, y } = findNextAvailablePosition(layout.value, w, h);
		layout.value.push({
			x,
			y,
			w,
			h,
			i: String(counter.value),
			title: `Chart ${counter.value}`,
		});
		counter.value++;
	}

	function addCardItem() {
		const w = 3,
			h = 2;
		const { x, y } = findNextAvailablePosition(layout.value, w, h);
		layout.value.push({
			x,
			y,
			w,
			h,
			i: String(counter.value),
			title: `Card ${counter.value}`,
		});
		counter.value++;
	}

	function removeItem(id: string) {
		layout.value = layout.value.filter((item) => item.i !== id);
	}

	function updateLayout(newLayout: any[]) {
		const existingLayoutMap = new Map(
			layout.value.map((item) => [item.i, item])
		);

		const updatedLayout = newLayout.map((item) => {
			const existing = existingLayoutMap.get(item.i);
			return { ...item, title: existing?.title ?? `Widget ${item.i}` };
		});

		// Optional deep equality check before assignment
		const isSame =
			layout.value.length === updatedLayout.length &&
			layout.value.every(
				(item, index) =>
					JSON.stringify(item) === JSON.stringify(updatedLayout[index])
			);

		if (!isSame) {
			layout.value = updatedLayout;
		}
	}
</script>
