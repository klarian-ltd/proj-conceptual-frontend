<template>
	<UNavigationMenu
		popover
		:collapsed="isToggled"
		orientation="vertical"
		:items="items"
	/>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { NavigationMenuItem } from '@nuxt/ui';

	defineProps({
		isToggled: Boolean,
	});

	const items = ref<NavigationMenuItem[][]>([
		[
			{
				label: 'Links',
				type: 'label',
			},
			{
				label: 'Home',
				to: '/home',
				icon: 'ph:house-fill',
			},
			{
				label: 'Dashboards',
				icon: 'material-symbols-light:dashboard-customize-rounded',
				children: [
					{
						label: 'Network Utilisation',
						icon: 'ph:share-network',
						description: 'Define shortcuts for your application.',
						to: '/dashboards/network-utilisation',
					},
					{
						label: 'Pumpset Performance',
						icon: 'ph:speedometer-bold',
						description: 'Display a modal/slideover within your application.',
						to: '/dashboards/pumpset-performance',
					},
					{
						label: 'Pump Health',
						icon: 'maki:defibrillator',
						description: 'Display a toast within your application.',
						to: '/dashboards/pump-health',
					},
					{
						label: 'Network Performance',
						icon: 'ic:sharp-network-check',
						description: 'Display a toast within your application.',
						to: '/dashboards/network-performance',
					},
					{
						label: 'Deep Data Analysis',
						icon: 'ic:outline-analytics',
						description: 'Display a toast within your application.',
						to: '/dashboards/deep-dive',
					},
					{
						label: 'Downtime',
						icon: 'mdi:sort-clock-ascending',
						description: 'Display a toast within your application.',
						to: '/dashboards/downtime',
					},
				],
			},
		],
		[
			{
				label: 'Things',
				icon: 'material-symbols:layers-outline',
				children: [
					{
						label: 'Hardware',
						icon: 'ic:baseline-hardware',
						to: '/things/hardware',
					},
					{
						label: 'API',
						icon: 'material-symbols:link',
					},
					{
						label: 'Data Source',
						icon: 'material-symbols:database-outline',
					},
				],
			},
			{
				label: 'Help',
				icon: 'i-lucide-circle-help',
				disabled: true,
			},
		],
	]);
</script>
