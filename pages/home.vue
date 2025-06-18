<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Main Content Area -->
		<main class="flex-1 overflow-auto p-6">
			<!-- Header Content Area -->
			<header>
				<div class="m-4 flex">
					<UTooltip text="Create a new dashboard">
						<UButton
							label="New Dashboard"
							icon="i-lucide-plus"
							target="_blank"
						/>
					</UTooltip>
				</div>
				<USeparator icon="ph:house-fill" class="px-3 pb-3" />
			</header>
		</main>
	</div>
</template>
