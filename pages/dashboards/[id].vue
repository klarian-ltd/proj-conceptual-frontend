<template>
	<div v-if="!pending && screenData">
		<!-- Inner Header Content Area -->
		<div class="m-4 flex items-center justify-between">
			<div class="flex items-center gap-4">
				<h1 class="text-3xl font-bold">{{ screenData.title }} D</h1>
			</div>
			<DashHeader />
		</div>
		<UButton @click="setMyHomepage(`/dashboards/${dashboardId}`)" size="sm" color="primary" variant="soft">
					Set as my homepage
				</UButton>
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
import { useUserPreferences } from '~/composables/useUserPreferences';

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
const { setHomepage } = useUserPreferences();

const screenData = await $fetch<ScreenData>(`/api/dashboards/${dashboardId}`);

function setMyHomepage(path: string) {
	console.log('setting homepage to', path);
	setHomepage(path);
}

</script>
