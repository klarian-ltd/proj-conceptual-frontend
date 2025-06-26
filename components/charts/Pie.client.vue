<template>
	<div>
		<div class="flex flex-row py-4">
			<div class="flex w-full flex-col rounded-md border border-gray-500">
				<h1 class="m-4 flex justify-center text-2xl font-bold">Preview</h1>
				<nuxt-plotly
					:data="pieChart.data"
					:layout="layout.layout"
					:config="pieChart.config"
				></nuxt-plotly>
			</div>
			<div class="ml-4 flex w-full flex-col gap-2">
				<chartsConfigExpand
					icon="i-lucide-chevron-up"
					label="Change Data"
				>
					<UButton class="mt-2 w-full justify-center" @click="changeData">Change Data</UButton>
				</chartsConfigExpand>
				<chartsConfigExpand
					icon="i-lucide-chevron-up"
					label="Change Layout"
				>
					<chartsConfigLayout :chart="layout" />
				</chartsConfigExpand>
				<chartsConfigExpand
					icon="i-lucide-chevron-up"
					label="Change Properties"
				>
					<chartsConfigProperties :chart="config" />
				</chartsConfigExpand>
			</div>
		</div>
		<UButton class="w-full justify-center" @click="applyChart">
			Apply Chart
		</UButton>
	</div>
</template>

<script setup>
	import { reactive } from 'vue';

	const data = [
		[
			{
				values: [19, 26, 55],
				labels: ['Residential', 'Non-Residential', 'Utility'],
				type: 'pie',
			},
		],
		[
			{
				values: [16, 15, 12, 6, 5, 4, 42],
				labels: [
					'US',
					'China',
					'European Union',
					'Russian Federation',
					'Brazil',
					'India',
					'Rest of World',
				],
				domain: { column: 0 },
				name: 'GHG Emissions',
				hoverinfo: 'label+percent+name',
				hole: 0.4,
				type: 'pie',
			},
			{
				values: [27, 11, 25, 8, 1, 3, 25],
				labels: [
					'US',
					'China',
					'European Union',
					'Russian Federation',
					'Brazil',
					'India',
					'Rest of World',
				],
				text: 'CO2',
				textposition: 'inside',
				domain: { column: 1 },
				name: 'CO2 Emissions',
				hoverinfo: 'label+percent+name',
				hole: 0.4,
				type: 'pie',
			},
		],
	];

	const layout = reactive({
		data: data[0],
		layout: {
			title: 'Example Pie Chart',
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
		},
	});

	const config = [
		{ scrollZoom: true, displayModeBar: false },
	];

	const pieChart = reactive({
		changeDataNo: 1,
		data: data[0],
		changeConfigNo: 1,
		config: config[0],
		changeLayoutNo: 1,
		layout: layout[0],
	});

	function changeData() {
		pieChart.data = data[pieChart.changeDataNo];
		pieChart.changeDataNo = pieChart.changeDataNo == 1 ? 0 : 1;
	}

	function applyChart() {
		console.log(pieChart);
	}
</script>
