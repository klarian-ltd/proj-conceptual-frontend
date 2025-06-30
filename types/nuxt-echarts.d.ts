import type { ScatterChartOption } from 'echarts/charts';
import type {
	DatasetComponentOption,
	GridComponentOption,
	LegendComponentOption,
	TitleComponentOption,
	TooltipComponentOption,
	VisualMapComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

declare global {
	type ECOption = ComposeOption<
		| DatasetComponentOption
		| GridComponentOption
		| TooltipComponentOption
		| ScatterChartOption
		| TitleComponentOption
		| LegendComponentOption
		| VisualMapComponentOption
	>;
}

export {};
