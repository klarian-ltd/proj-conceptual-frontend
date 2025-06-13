<template>
	<div v-if="!pending && screenData">
		<!-- Inner Header Content Area -->
		<div class="m-4 flex items-center justify-between">
			<h1 class="text-3xl font-bold">{{ screenData.title }}</h1>
			<DashHeader />
		</div>
		<USeparator
			icon="material-symbols-light:dashboard-customize-rounded"
			class="px-3 pb-3"
		/>
		<!-- Inner Main Content Area -->
		<WidgetViews :initial-layout="screenData.layout" />
	</div>
	<div v-else-if="pending">Loading screen...</div>
	<div v-else-if="error" class="text-red-500">
		Error loading screen: {{ error.message }}
	</div>
</template>

<script setup lang="ts">
import { useRoute } from '#app';
import { useApiFetch } from '~/composables/useApiFetch';

interface LayoutItem {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	title: string;
}

interface ScreenData {
	title: string;
	layout: LayoutItem[];
}

const route = useRoute();
const dashboardId = route.params.id;

const { data: screenData, pending, error } = await useApiFetch<ScreenData>(`/api/dashboards/${dashboardId}`);
</script>
