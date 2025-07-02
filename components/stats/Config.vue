<template>
	<div>
		<div class="flex flex-row py-4">
			<div
				class="border-primary-500 flex w-full flex-col rounded-md border p-4"
			>
				<h1 class="mt-2 flex justify-center text-2xl font-bold">Preview</h1>
				<USeparator class="p-4" color="primary" />
				<StatsCard
					:label="label"
					:value="value"
					:change="change"
					:icon="icon"
				/>
			</div>
			<UCard class="border-primary ml-4 w-full border-1">
				<UFormField label="Label">
					<UInput v-model="label" placeholder="Label" class="w-full" />
				</UFormField>
				<UFormField label="Value" class="my-2">
					<UInput v-model="value" placeholder="Value" class="w-full" />
				</UFormField>
				<UFormField label="Change" class="my-2">
					<UInput v-model="change" placeholder="Change" class="w-full" />
				</UFormField>
				<UFormField label="Icon" class="my-2">
					<UInput v-model="icon" placeholder="Icon" class="w-full" />
				</UFormField>
			</UCard>
		</div>
		<UButton class="w-full justify-center" @click="applyStats">
			Apply Stats
		</UButton>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const label = ref('Total Downtime');
	const value = ref('12h 34m');
	const change = ref('-8.3%');
	const icon = ref('i-lucide-clock');

	function applyStats() {
		console.log(label.value, value.value, change.value, icon.value);
	}
</script>
