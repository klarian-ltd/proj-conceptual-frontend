<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />
		<!-- Inner Header Content Area -->
		<main class="flex-1 overflow-auto p-6">
			<div class="m-4 flex items-center justify-between">
				<h1 class="text-primary text-3xl font-bold">
					{{ $route.meta.title }}
				</h1>
				<DashboardHeader />
			</div>
			<USeparator
				icon="material-symbols-light:dashboard-customize-rounded"
				class="px-3 pb-3"
			/>
			<!-- Inner Main Content Area -->
			<DashboardContent />
		</main>
	</div>
</template>

<script setup lang="ts">
	import { definePageMeta } from '#imports';

	definePageMeta({
		title: 'Deep Dive Analysis',
	});
</script>
