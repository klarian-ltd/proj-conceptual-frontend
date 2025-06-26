import { defineStore } from 'pinia';

export const useChartStore = defineStore('chart', {
  state: () => ({
    currentChart: null,
    savedChart: null,
  }),
  actions: {
    setCurrentChart(chart: any) {
      this.currentChart = chart;
    },
    applyChart() {
      this.savedChart = structuredClone(this.currentChart);
    },
  },
});