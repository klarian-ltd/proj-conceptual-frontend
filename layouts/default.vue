<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Main Content Area -->
		<main class="flex-1 overflow-auto p-6">
			<slot />
		</main>
	</div>
</template>
