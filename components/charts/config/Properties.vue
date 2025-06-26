<template>
    <div class="mt-2 flex flex-row gap-2">
        <UCard class="w-full border-1 border-primary">
            <h1 class="text-xs font-bold">Properties</h1>
            <USwitch
                v-model="localChart.displayModeBar"
                label="Display Mode Bar"
                class="mt-4"
                size="lg"
            />
            <USwitch
                v-model="localChart.scrollZoom"
                label="Scroll Zoom"
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