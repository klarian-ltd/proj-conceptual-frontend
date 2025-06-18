<template>
	<div class="rounded-lg border p-4 shadow-sm">
		<div class="flex items-center justify-between">
			<h3 class="text-sm font-medium text-gray-500">{{ label }}</h3>
			<UIcon :name="icon" class="text-gray-400" />
		</div>
		<div class="mt-2">
			<p class="text-2xl font-semibold text-white">{{ value }}</p>
			<p
				v-if="change"
				class="text-sm"
				:class="change.startsWith('+') ? 'text-green-500' : 'text-red-500'"
			>
				{{ change }} vs last month
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps({
		label: String,
		value: String,
		change: String,
		icon: String,
	});
</script>
