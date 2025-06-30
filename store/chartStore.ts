import { defineStore } from 'pinia';
import { reactive, toRaw } from 'vue';

export const useChartStore = defineStore('chart', () => {
	const chart = reactive<Record<string, any>>({});

	function setChart(newChart: Record<string, any>) {
		Object.assign(chart, toRaw(newChart));
	}

	function updateChartField(key: string, value: any) {
		chart[key] = value;
	}

	function getSortedChartByKey(sortKey: string) {
		return Object.entries(chart)
			.sort((a, b) => a[1][sortKey] - b[1][sortKey])
			.reduce(
				(acc, [k, v]) => {
					acc[k] = v;
					return acc;
				},
				{} as Record<string, any>
			);
	}

	return {
		chart,
		setChart,
		updateChartField,
		getSortedChartByKey,
	};
});
