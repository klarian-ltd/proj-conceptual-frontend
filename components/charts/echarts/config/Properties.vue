<template>
	<div class="mt-2 flex flex-row gap-2">
		<UCard class="border-primary w-full border-1">
			<h1 class="text-xs font-bold">Properties</h1>
			<USwitch
				v-if="chartStore.chart.grid"
				v-model="chartStore.chart.grid.containLabel"
				label="Contain Label"
				class="mt-4"
				size="lg"
			/>
		</UCard>
	</div>
</template>

<script setup lang="ts">
	import { watch, toRaw } from 'vue';
	import { useChartStore } from '@/store/chartStore';

	const props = defineProps<{
		chart: Record<string, any>;
	}>();
	const emit = defineEmits<{
		(e: 'update:chart', value: any): void;
	}>();

	const chartStore = useChartStore();

	// Initialize from props
	chartStore.setChart(props.chart);

	// Sync if parent updates chart
	watch(
		() => props.chart,
		(newChart) => {
			chartStore.setChart(newChart);
		},
		{ deep: true }
	);

	// Emit updates back to parent if needed
	watch(
		() => chartStore.chart,
		(updatedChart) => {
			emit('update:chart', toRaw(updatedChart));
		},
		{ deep: true }
	);
</script>
