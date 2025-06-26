<template>
    <div class="mt-2 flex flex-row gap-2">
        <UCard class="w-full border-1 border-primary">
            <h1 class="mb-4 text-xs font-bold">Display Options</h1>
            <UFormField label="Title">
                <UInput
                    v-model="localChart.layout.title"
                    label="Chart Title"
                    class="mb-4 w-full"
                />
            </UFormField>
            <UFormField label="Background Color">
                <UInput
                    v-model="localChart.layout.paper_bgcolor"
                    label="Paper Background Color"
                    class="mb-4 w-full"
                />
            </UFormField>
            <UFormField v-if="chart.data[0].type !== 'pie'" label="Plot Background Color">
                <UInput
                    v-model="localChart.layout.plot_bgcolor"
                    label="Plot Background Color"
                    class="mb-4 w-full"
                />
            </UFormField>
            <USwitch
                v-model="localChart.layout.showlegend"
                label="Legend"
                class="mt-4"
                size="lg"
            />
        </UCard>
        <UCard v-if="chart.data[0].type !== 'pie'" class="w-full border-1 border-primary">
            <h1 class="mb-4 text-xs font-bold">X Axis Configuration</h1>
            <UFormField label="Title">
                <UInput
                    v-model="localChart.layout.xaxis.title" 
                    label="X Axis Name"
                    class="w-full"
                />
            </UFormField>
            <USwitch
                v-model="localChart.layout.xaxis.showgrid"
                label="Show Grid"
                class="mt-4"
                size="lg"
            />
            <USwitch
                v-model="localChart.layout.xaxis.showline"
                label="Show Line"
                class="mt-4"
                size="lg"
            />
        </UCard>
        <UCard v-if="chart.data[0].type !== 'pie'" class="w-full border-1 border-primary">
            <h1 class="mb-4 text-xs font-bold">Y Axis Configuration</h1>
            <UFormField label="Title">
                <UInput
                    v-model="localChart.layout.yaxis.title"
                    label="Y Axis Name"
                    class="w-full"
                />
            </UFormField>
            <USwitch
                v-model="localChart.layout.yaxis.showgrid"
                label="Show Grid"
                class="mt-4"
                size="lg"
            />
            <USwitch
                v-model="localChart.layout.yaxis.showline"
                label="Show Line"
                class="mt-4"
                size="lg"
            />
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRaw, watch } from 'vue';

const props = defineProps<{
  chart: Record<string, any>;
}>();
const emit = defineEmits<{
  (e: 'update:chart', value: any): void;
}>();

// Clone the prop into a local reactive copy
const localChart = reactive({ ...toRaw(props.chart) });

// Optional: Watch for external changes to chart prop and sync
watch(
  () => props.chart,
  (newChart) => {
    Object.assign(localChart, toRaw(newChart));
  },
  { deep: true }
);

// Optional: Emit changes back to parent (if needed)
watch(
  () => localChart,
  (updatedChart) => {
    emit('update:chart', updatedChart);
  },
  { deep: true }
);
</script>