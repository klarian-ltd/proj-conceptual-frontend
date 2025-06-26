<template>
	<!-- Sidebar -->
	<aside
		class="border-primary bg-klarian-slate-800 relative flex h-full flex-shrink-0 flex-col border-r-2 p-4"
	>
		<!-- Round button on the right border -->
		<button
			class="bg-primary absolute top-1/2 right-0 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-gray-900 shadow transition-transform duration-200 hover:scale-110"
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
		<UNavigationMenu
			popover
			:collapsed="isToggled"
			orientation="vertical"
			:items="NavigationItems"
		/>

		<!-- Avatar Group at the bottom -->
		<div
			class="mt-auto"
			:class="
				isToggled
					? 'flex flex-col items-center space-y-2'
					: 'mt-auto flex flex-col items-center space-y-3'
			"
		>
			<!-- Juno Logo on top -->
			<NuxtPicture
				:src="isToggled ? '/junobrandicon.png' : '/junologowhite.png'"
				:width="isToggled ? '20' : '120'"
				height="auto"
				quality="80"
				alt="Juno Logo"
				class="mb-6"
			/>
			<USeparator class="mb-4" color="primary" />
			<!-- Avatar + Logout Button Row -->
			<div
				:class="
					isToggled
						? 'flex flex-col items-center space-y-2'
						: 'flex w-full flex-row items-center justify-around space-x-2'
				"
			>
				<UDropdownMenu size="xl" :items="dropitems">
					<UTooltip text="feyfeyy">
						<UChip inset color="success">
							<UAvatar
								src="https://github.com/fey-feyy.png"
								alt="Feyaaz Chishty"
								:class="isToggled ? 'mb-2 hover:scale-110' : 'hover:scale-110'"
							/>
						</UChip>
					</UTooltip>
				</UDropdownMenu>

				<UButton
					size="md"
					:label="!isToggled ? 'Logout' : ''"
					:icon="
						isToggled
							? 'heroicons:arrow-right-end-on-rectangle-20-solid'
							: undefined
					"
					:class="isToggled ? 'w-full justify-center' : ''"
					@click="handleLogout"
				/>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { DropdownMenuItem } from '@nuxt/ui';
	import { authClient } from '~/lib/auth-client';
	import { navigateTo } from 'nuxt/app';
	import { useNavigationStore } from '@/store/navigationStore';

	const navigationStore = useNavigationStore();

	const isToggled = ref(navigationStore.isToggled);
	const NavigationItems = ref(navigationStore.NavigationItems);

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

	const handleLogout = () => {
		authClient.signOut();
		navigateTo('/');
	};
</script>
