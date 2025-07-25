<template>
	<!-- Sidebar -->
	<aside
		class="border-primary rainbow-right-border relative flex h-full flex-shrink-0 flex-col bg-zinc-900 p-4"
	>
		<!-- Wrapper zone containing both hover area and icon -->
		<div
			class="absolute top-0 left-0 h-100 w-55"
			@mouseenter="showToggleIcon = true"
			@mouseleave="showToggleIcon = false"
		>
			<!-- Toggle icon with smooth transition -->
			<div
				class="bg-primary absolute bottom-1/4 z-10 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full text-gray-900 shadow transition-opacity transition-transform duration-200 duration-300 ease-in-out hover:scale-110"
				:class="{
					'pointer-events-none opacity-0': !showToggleIcon,
					'opacity-100': showToggleIcon,
					'left-13': isToggled,
					'left-41': !isToggled,
				}"
				@click.stop="isToggled = !isToggled"
			>
				<UIcon
					:name="
						isToggled
							? 'mingcute:arrows-right-fill'
							: 'mingcute:arrows-left-fill'
					"
					class="size-10"
				/>
			</div>
		</div>

		<!-- Navigation -->
		<UNavigationMenu
			popover
			:collapsed="isToggled"
			orientation="vertical"
			:items="NavigationItems"
			class="z-30"
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
			<div
				:class="
					isToggled
						? 'bg-primary mb-4 rounded-sm p-2'
						: 'bg-primary mb-4 rounded-lg p-4'
				"
			>
				<NuxtPicture
					:src="isToggled ? '/junobrandicon.png' : '/junologowhite.png'"
					:width="isToggled ? '20' : '120'"
					height="auto"
					quality="80"
					alt="Juno Logo"
				/>
			</div>
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
	import type { DropdownMenuItem } from '@nuxt/ui';
	import { authClient } from '~/lib/auth-client';
	import { navigateTo } from 'nuxt/app';
	import { useNavigationStore } from '@/store/navigationStore';
	import { ref } from 'vue';

	const showToggleIcon = ref(false);

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
