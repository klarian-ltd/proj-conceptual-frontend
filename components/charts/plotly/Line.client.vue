<template>
	<div>
		<div class="flex flex-row py-4">
			<div class="border-primary-500 flex w-full flex-col rounded-md border">
				<h1 class="mt-2 flex justify-center text-2xl font-bold">Preview</h1>
				<USeparator class="p-4" color="primary" />
				<nuxt-plotly
					:data="lineChart.data"
					:layout="lineChart.layout"
					:config="lineChart.config"
				></nuxt-plotly>
			</div>
			<div class="ml-4 flex w-full flex-col gap-2">
				<chartsExpand icon="i-lucide-chevron-up" label="Change Data">
					<UButton class="mt-2 w-full justify-center" @click="changeData">
						Change Data
					</UButton>
				</chartsExpand>
				<chartsExpand icon="i-lucide-chevron-up" label="Change Layout">
					<chartsPlotlyConfigLayout :chart="lineChart" />
				</chartsExpand>
				<chartsExpand icon="i-lucide-chevron-up" label="Change Properties">
					<chartsPlotlyConfigProperties :chart="lineChart" />
				</chartsExpand>
			</div>
		</div>
		<UButton class="w-full justify-center" @click="applyChart">
			Apply Chart
		</UButton>
	</div>
</template>

<script setup>
	import { reactive } from 'vue';

	const lineChart = reactive({
		data: [
			{
				x: [1, 2, 3, 4, 5],
				y: [1, 2, 3, 4, 5],
				type: 'line',
			},
		],
		layout: {
			title: 'Example Line Chart',
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
			xaxis: {
				title: 'X Axis',
				showgrid: false,
				showline: true,
			},
			yaxis: {
				title: 'Y Axis',
				showgrid: false,
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
		console.log('applyChart');
	}
</script>
