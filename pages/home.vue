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
			<div class="grid grid-cols-3 gap-4">
				<StatCard
					label="Total Revenue"
					value="$12,345"
					change="+12.5%"
					icon="i-lucide-dollar-sign"
				/>
				<StatCard
					label="Total Downtime"
					value="12h 34m"
					change="-8.3%"
					icon="i-lucide-clock"
				/>
				<StatCard
					label="Total Assests"
					value="300"
					change="+20"
					icon="i-lucide-factory"
				/>
			</div>
		</main>
	</div>
</template>
