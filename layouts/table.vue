<script setup lang="ts">
import { useRoute } from '#app';
const route = useRoute();
</script>

<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Main Content Area -->
		<main class="flex-1 overflow-auto p-6">
            <h1 v-if="route.meta.title" class="text-2xl font-bold mb-4">{{ route.meta.title }}</h1>
			<slot />
		</main>
	</div>
</template>
