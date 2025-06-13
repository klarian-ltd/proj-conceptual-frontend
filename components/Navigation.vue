<template>
	<div class="flex flex-col h-full">
		<div v-if="pending">Loading navigation...</div>
		<UNavigationMenu
			v-else-if="items"
			popover
			:collapsed="isToggled"
			orientation="vertical"
			:items="items"
			class="flex-grow"
		/>

	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { NavigationMenuItem } from '@nuxt/ui';

	defineProps({
		isToggled: Boolean,
	});

	const { data: items, pending } = await useFetch<NavigationMenuItem[][]>('/api/navigation');
	const { loggedIn, user } = useUserSession();
</script>
