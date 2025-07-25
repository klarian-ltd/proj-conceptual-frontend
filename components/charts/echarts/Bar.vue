<template>
	<div>
		<div class="flex flex-row py-4">
			<div class="border-primary-500 flex w-full flex-col rounded-md border">
				<h1 class="mt-2 flex justify-center text-2xl font-bold">Preview</h1>
				<USeparator class="p-4" color="primary" />
				<VChart :option="barChart" />
			</div>
			<div class="ml-4 flex w-full flex-col gap-2">
				<chartsExpand icon="i-lucide-chevron-up" label="Change Data">
					<UButton class="mt-2 w-full justify-center" @click="changeData">
						Change Data
					</UButton>
				</chartsExpand>
				<chartsExpand icon="i-lucide-chevron-up" label="Change Layout">
					<chartsEchartsConfigLayout :chart="barChart" />
				</chartsExpand>
				<chartsExpand icon="i-lucide-chevron-up" label="Change Properties">
					<chartsEchartsConfigProperties :chart="barChart" />
				</chartsExpand>
			</div>
		</div>
		<UButton class="w-full justify-center" @click="applyChart">
			Apply Chart
		</UButton>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';

	const barChart = reactive<ECOption>({
		title: {
			text: 'test',
			left: 'center',
			textStyle: {
				fontSize: 20,
				fontWeight: 'bold',
			},
		},
		tooltip: {
			trigger: 'axis',
		},
		grid: {
			left: '5%',
			top: '60',
			right: '0%',
			bottom: '70',
			containLabel: true,
		},
		legend: {
			right: 'left',
			top: 'top',
			padding: [20, 0, 0, 0],
			textStyle: {
				fontSize: 14,
				fontWeight: 'bold',
				fontFamily: '',
			},
			data: ['Sales'],
		},
		xAxis: {
			name: 'test',
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisLine: {
				show: true,
			},
			splitLine: {
				show: false,
			},
		},
		yAxis: {
			name: 'test',
			type: 'value',
			axisLine: {
				show: true,
			},
			splitLine: {
				show: false,
			},
		},
		series: [
			{
				name: 'Sales',
				type: 'bar',
				data: [120, 200, 150, 80, 70, 110, 130],
			},
		],
		animation: false,
	});

	function changeData() {
		console.log('changeData');
	}

	function applyChart() {
		console.log('applyChart');
	}
</script>
