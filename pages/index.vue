<template>
	<div class="p-4 sm:p-6 lg:p-8">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-3xl font-bold">Home</h1>
				<p class="text-gray-500">Welcome back, {{ user?.username || 'Guest' }}!</p>
			</div>
			<div v-if="isAuthenticated && user" class="flex items-center gap-4">
				<span class="text-sm">Logged in as {{ user.username }}</span>
				<UButton @click="handleLogout" color="red" variant="soft">
					Logout
				</UButton>
			</div>
			<div v-else>
				<UButton to="/login">Login</UButton>
			</div>
		</div>

		<!-- Stat Cards -->
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard label="Customers" value="773" change="+12%" icon="i-heroicons-user-group" />
			<StatCard label="Conversions" value="1,127" change="+14%" icon="i-heroicons-arrows-right-left" />
			<StatCard label="Revenue" value="$304,678" change="-9%" icon="i-heroicons-chart-bar" />
			<StatCard label="Orders" value="1,630" change="+0%" icon="i-heroicons-shopping-cart" />
		</div>

		<!-- Main Content Area (Chart and Table) -->
		<div class="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
			<!-- Chart Placeholder -->
			<div class="p-6 bg-white border rounded-lg shadow-sm lg:col-span-2">
				<h3 class="mb-4 text-lg font-semibold">Revenue</h3>
				<div class="flex items-center justify-center w-full h-64 bg-gray-100 rounded-md">
					<p class="text-gray-500">[Chart Placeholder]</p>
				</div>
			</div>

			<!-- Table -->
			<div class="p-6 bg-white border rounded-lg shadow-sm">
				<h3 class="mb-4 text-lg font-semibold">Recent Orders</h3>
				<UTable :rows="recentOrders" />
			</div>
		</div>

		<!-- Navigation Links for POC -->
		<div class="p-4 mt-8 border-t">
			<h3 class="mb-4 text-lg font-semibold">POC Navigation</h3>
			<div class="flex flex-wrap gap-4">
				<UButton to="/admin" variant="link">Go to Admin Page</UButton>
				<UButton to="/dashboard" variant="link">Go to Dynamic Widget Demo</UButton>
				<UButton to="/dashboards/pump-health" variant="link">Go to Pump Health Dashboard</UButton>
				<UButton to="/dashboards/network-performance" variant="link">Go to Network Performance</UButton>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import StatCard from '~/components/StatCard.vue';

const { loggedIn, user, logout } = useUserSession();

const handleLogout = async () => {
	await logout();
};

const recentOrders = [
	{ id: '#4597', date: 'Jun 13, 07:38', status: 'failed', amount: '€416.00' },
	{ id: '#4598', date: 'Jun 12, 21:38', status: 'paid', amount: '€282.00' },
	{ id: '#4599', date: 'Jun 12, 15:38', status: 'paid', amount: '€853.00' },
	{ id: '#4596', date: 'Jun 12, 05:38', status: 'failed', amount: '€787.00' },
	{ id: '#4600', date: 'Jun 11, 13:38', status: 'failed', amount: '€779.00' },
]
</script>
