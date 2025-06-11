<template>
	<!-- Modal (initially hidden, opens on context menu select) -->
	<USlideover v-model:open="internalVisible" side="right" title="Select Chart">
		<template #body>
			<div class="flex h-full flex-col justify-center">
				<UButton
					color="neutral"
					variant="outline"
					class="mb-6 w-full justify-center"
				>
					<div class="flex-col">
						<UIcon name="heroicons:chart-pie-20-solid" class="size-50" />
						<h2 class="mb-4 font-bold">Pie Chart</h2>
					</div>
				</UButton>
				<UButton
					color="neutral"
					variant="outline"
					class="mb-6 w-full justify-center"
				>
					<div class="flex-col">
						<UIcon name="ic:round-line-axis" class="size-50" />
						<h2 class="mb-4 font-bold">Line Chart</h2>
					</div>
				</UButton>
				<UButton
					color="neutral"
					variant="outline"
					class="mb-6 w-full justify-center"
				>
					<div class="flex-col">
						<UIcon name="ic:round-bar-chart" class="size-50" />
						<h2 class="mb-4 font-bold">Bar Chart</h2>
					</div>
				</UButton>
			</div>
		</template>
	</USlideover>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';

	const props = defineProps<{
		isModalopen: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'update:isModalopen', value: boolean): void;
	}>();

	const internalVisible = ref(props.isModalopen);

	watch(
		() => props.isModalopen,
		(newVal) => {
			internalVisible.value = newVal;
		}
	);

	watch(internalVisible, (newVal) => {
		emit('update:isModalopen', newVal);
	});
</script>
