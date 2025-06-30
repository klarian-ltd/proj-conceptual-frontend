<template>
	<div>
		<div class="flex flex-row py-4">
			<div class="border-primary-500 flex w-full flex-col rounded-md border">
				<h1 class="mt-2 flex justify-center text-2xl font-bold">Preview</h1>
				<USeparator class="p-4" color="primary" />
				<VChart :option="option" />
			</div>
			<div class="ml-4 flex w-full flex-col gap-2">
				<chartsExpand icon="i-lucide-chevron-up" label="Change Data">
					<UButton class="mt-2 w-full justify-center" @click="changeData">
						Change Data
					</UButton>
				</chartsExpand>
				<chartsExpand icon="i-lucide-chevron-up" label="Change Layout">
					<chartsEchartsConfigLayout :chart="option" />
				</chartsExpand>
				<chartsExpand icon="i-lucide-chevron-up" label="Change Properties">
					<chartsEchartsConfigProperties :chart="option" />
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

	const option = reactive<ECOption>({
		title: {
			text: 'test',
			left: 'center',
			textStyle: {
				fontSize: 20,
				fontWeight: 'bold',
			},
		},
		legend: {
			right: 'left',
			top: 'top',
			padding: [50, 0, 0, 0],
			textStyle: {
				fontSize: 14,
				fontWeight: 'bold',
				fontFamily: '',
			},
			data: [
				{
					name: 'test',
				},
			],
		},
		dataset: {
			dimensions: ['x', 'y'],
			source: [
				{
					x: 1.5,
					y: 1.5,
				},
				{
					x: 1.8,
					y: 1.8,
				},
				{
					x: 2.2,
					y: 2.2,
				},
				{
					x: 2.5,
					y: 2.5,
				},
				{
					x: 3.3,
					y: 3.3,
				},
				{
					x: 3.5,
					y: 3.5,
				},
				{
					x: 2.8,
					y: 2.8,
				},
			],
		},
		xAxis: {
			type: 'category',
			name: 'test',
			nameLocation: 'middle',
			nameTextStyle: {
				fontSize: 17,
				fontWeight: 100,
			},
			nameGap: 45,
			splitLine: {
				show: false,
			},
			axisLine: {
				show: true,
			},
		},
		yAxis: {
			name: 'test',
			nameLocation: 'middle',
			nameTextStyle: {
				fontSize: 17,
				fontWeight: 100,
			},
			nameGap: 45,
			splitLine: {
				show: false,
			},
			axisLine: {
				show: true,
			},
		},
		series: [{ type: 'scatter', name: 'test' }],
		animation: false,
		grid: {
			left: '15%',
			top: 60,
			right: '15%',
			bottom: 70,
			containLabel: true,
		},
	});

	function changeData() {
		console.log('changeData');
	}

	function applyChart() {
		console.log('applyChart');
	}
</script>
