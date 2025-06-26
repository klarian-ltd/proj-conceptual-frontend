import type { ComposeOption } from 'echarts/core'
import type { ScatterChartOption } from 'echarts/charts'
import type {
    DatasetComponentOption,
    GridComponentOption,
    TooltipComponentOption,
  } from 'echarts/components'

declare global {
    type EChartsOption = ComposeOption<
        DatasetComponentOption | GridComponentOption | TooltipComponentOption | ScatterChartOption
    >
}

export {}