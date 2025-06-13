<template>
	<!-- Sidebar -->
	<aside
		class="relative flex h-full flex-shrink-0 flex-col border-r-2 border-white bg-gray-900 p-4 text-white"
		:class="!isToggled ? 'w-64' : ''"
	>
		<!-- Round button on the right border -->
		<button
			class="absolute top-1/2 right-0 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow transition-transform duration-200 hover:scale-110"
			@click="isToggled = !isToggled"
		>
			<UIcon
				:name="
					isToggled
						? 'heroicons-solid:arrow-circle-right'
						: 'heroicons-solid:arrow-circle-left'
				"
				class="size-8"
			/>
		</button>

		<!-- Navigation -->
		<Navigation :is-toggled="isToggled" />

		<!-- User Profile Section at the bottom -->
		<div
			v-if="loggedIn && user"
			class="pt-4 mt-auto border-t border-gray-800"
			:class="
				isToggled
					? 'flex flex-col items-center gap-2'
					: 'flex justify-between items-center'
			"
		>
			<div class="flex items-center gap-2">
				<UAvatar :src="user.picture" :alt="user.first_name" />
				<div v-if="!isToggled">
					<p class="text-sm font-medium">{{ user.first_name }} {{ user.last_name }}</p>
					<p class="text-xs text-gray-500">{{ user.username }}</p>
				</div>
			</div>
			<UButton
				size="md"
				:label="!isToggled ? 'Logout' : ''"
				:icon="isToggled ? 'heroicons:arrow-right-end-on-rectangle-20-solid' : undefined"
				:class="isToggled ? 'w-full justify-center' : ''"
				@click="handleLogout"
			/>
		</div>
	</aside>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { DropdownMenuItem } from '@nuxt/ui';
	import { useActiveUser } from '~/composables/useActiveUser';
	// useUserSession is auto-imported by Nuxt Auth Utils

	const isToggled = ref(false);
	const { user, loggedIn, clear } = useActiveUser();

	const dropitems = ref<DropdownMenuItem[]>([
		{
			label: 'Profile',
			icon: 'i-lucide-user',
		},
		{
			label: 'Themes',
			icon: 'ic:twotone-brightness-medium',
		},
		{
			label: 'Settings',
			icon: 'i-lucide-cog',
		},
	]);

	const handleLogout = async () => {
		await clear();
		await navigateTo('/login');
	};
</script>
