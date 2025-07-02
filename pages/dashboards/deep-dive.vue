<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />
		<!-- Inner Header Content Area -->
		<main class="flex-1 overflow-auto p-6">
			<div class="m-4 flex items-center justify-between">
				<h1 class="text-3xl font-bold">Deep Dive Analysis</h1>
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
