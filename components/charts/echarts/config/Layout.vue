<template >
    <div class="mt-2 flex flex-row gap-2">
        <UCard class="border-primary w-full border-1">
            <h1 class="mb-4 text-xs font-bold">Display Options</h1>
			<UFormField label="Title">
				<UInput
					v-model="chartStore.chart.title.text"
					label="Chart Title"
					class="mb-4 w-full"
				/>
            </UFormField>
            <USwitch
				v-model="chartStore.chart.legend.show"
				label="Legend"
				class="mt-4"
				size="lg"
			/>
        </UCard>
        <UCard
			class="border-primary w-full border-1"
		>
			<h1 class="mb-4 text-xs font-bold">X Axis Configuration</h1>
			<UFormField label="Title">
				<UInput
					v-model="chartStore.chart.xAxis.name"
					label="X Axis Name"
					class="w-full"
				/>
			</UFormField>
			<USwitch
				v-model="chartStore.chart.xAxis.splitLine.show"
				label="Show Grid"
				class="mt-4"
				size="lg"
			/>
			<USwitch
				v-model="chartStore.chart.xAxis.axisLine.show"
				label="Show Line"
				class="mt-4"
				size="lg"
			/>
		</UCard>
        <UCard
			class="border-primary w-full border-1"
		>
			<h1 class="mb-4 text-xs font-bold">Y Axis Configuration</h1>
			<UFormField label="Title">
				<UInput
					v-model="chartStore.chart.yAxis.name"
					label="Y Axis Name"
					class="w-full"
				/>
			</UFormField>
			<USwitch
				v-model="chartStore.chart.yAxis.splitLine.show"
				label="Show Grid"
				class="mt-4"
				size="lg"
			/>
			<USwitch
				v-model="chartStore.chart.yAxis.axisLine.show"
				label="Show Line"
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