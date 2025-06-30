<template>
	<div class="mt-2 flex flex-row gap-2">
		<UCard class="border-primary w-full border-1">
			<h1 class="mb-4 text-xs font-bold">Display Options</h1>
			<UFormField label="Title">
				<UInput
					v-if="chartStore.chart.layout.title"
					v-model="chartStore.chart.layout.title"
					label="Chart Title"
					class="mb-4 w-full"
				/>
			</UFormField>
			<UFormField label="Background Color">
				<UInput
					v-if="chartStore.chart.layout.paper_bgcolor"
					v-model="chartStore.chart.layout.paper_bgcolor"
					label="Paper Background Color"
					class="mb-4 w-full"
				/>
			</UFormField>
			<UFormField
				v-if="chartStore.chart.layout.plot_bgcolor"
				label="Plot Background Color"
			>
				<UInput
					v-if="chartStore.chart.layout.plot_bgcolor"
					v-model="chartStore.chart.layout.plot_bgcolor"
					label="Plot Background Color"
					class="mb-4 w-full"
				/>
			</UFormField>
			<USwitch
				v-if="chartStore.chart.layout.showlegend"
				v-model="chartStore.chart.layout.showlegend"
				label="Legend"
				class="mt-4"
				size="lg"
			/>
		</UCard>
		<UCard
			v-if="chartStore.chart.layout.xaxis"
			class="border-primary w-full border-1"
		>
			<h1 class="mb-4 text-xs font-bold">X Axis Configuration</h1>
			<UFormField label="Title">
				<UInput
					v-model="chartStore.chart.layout.xaxis.title"
					label="X Axis Name"
					class="w-full"
				/>
			</UFormField>
			<USwitch
				v-if="chartStore.chart.layout.xaxis.showgrid"
				v-model="chartStore.chart.layout.xaxis.showgrid"
				label="Show Grid"
				class="mt-4"
				size="lg"
			/>
			<USwitch
				v-if="chartStore.chart.layout.xaxis.showline"
				v-model="chartStore.chart.layout.xaxis.showline"
				label="Show Line"
				class="mt-4"
				size="lg"
			/>
		</UCard>
		<UCard
			v-if="chartStore.chart.layout.yaxis"
			class="border-primary w-full border-1"
		>
			<h1 class="mb-4 text-xs font-bold">Y Axis Configuration</h1>
			<UFormField label="Title">
				<UInput
					v-model="chartStore.chart.layout.yaxis.title"
					label="Y Axis Name"
					class="w-full"
				/>
			</UFormField>
			<USwitch
				v-if="chartStore.chart.layout.yaxis.showgrid"
				v-model="chartStore.chart.layout.yaxis.showgrid"
				label="Show Grid"
				class="mt-4"
				size="lg"
			/>
			<USwitch
				v-if="chartStore.chart.layout.yaxis.showline"
				v-model="chartStore.chart.layout.yaxis.showline"
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
