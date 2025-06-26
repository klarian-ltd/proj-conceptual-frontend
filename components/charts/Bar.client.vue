<template>
	<div>
		<div class="flex flex-row py-4">
			<div
				class="flex h-full w-full flex-col rounded-md border border-gray-500"
			>
				<h1 class="m-4 flex justify-center text-2xl font-bold">Preview</h1>
				<nuxt-plotly
					:data="barChart.data"
					:layout="barChart.layout"
					:config="barChart.config"
				></nuxt-plotly>
			</div>
			<div class="ml-4 flex w-full flex-col gap-2">
				<chartsConfigExpand icon="i-lucide-chevron-up" label="Change Data">
					<UButton class="mt-2 w-full justify-center" @click="changeData">
						Change Data
					</UButton>
				</chartsConfigExpand>
				<chartsConfigExpand icon="i-lucide-chevron-up" label="Change Layout">
					<chartsConfigLayout :chart="barChart" />
				</chartsConfigExpand>
				<chartsConfigExpand
					icon="i-lucide-chevron-up"
					label="Change Properties"
				>
					<chartsConfigProperties :chart="barChart.config" />
				</chartsConfigExpand>
			</div>
		</div>
		<UButton class="w-full justify-center" @click="applyChart">
			Apply Chart
		</UButton>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';

	const barChart = reactive({
		data: [
			{
				x: [1, 2, 3, 4, 5],
				y: [1, 2, 3, 4, 5],
				type: 'bar',
			},
		],
		layout: {
			title: 'Example Bar Chart',
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
			xaxis: {
				title: 'X Axis',
				showgrid: true,
				showline: true,
			},
			yaxis: {
				title: 'Y Axis',
				showgrid: true,
				showline: true,
			},
		},
		config: {
			scrollZoom: false,
			displayModeBar: false,
		},
	});

	function changeData() {
		console.log('changeData');
	}

	function applyChart() {
		console.log(barChart);
	}
</script>
