<template>
	<div class="flex h-screen">
		<!-- Sidebar -->
		<aside
			class="relative flex h-screen w-150 flex-shrink-0 flex-col bg-gray-900 text-white"
		>
			<div class="flex min-h-screen items-center justify-center">
				<UCard class="w-full max-w-md rounded-2xl p-8 shadow-2xl">
					<h1 class="mb-6 text-center text-2xl font-bold">
						Login to your account
					</h1>

					<!-- Tabs -->
					<UTabs
						:unmount-on-hide="false"
						:items="productitems"
						class="w-full"
						size="xl"
						@click="isToggled = !isToggled"
					/>

					<!-- Product Logo on top -->
					<div
						class="m-8 flex flex-col items-center transition-transform duration-200 hover:scale-110"
					>
						<NuxtPicture
							:src="isToggled ? '/orkuslogowhite.png' : '/junologowhite.png'"
							width="120"
							:height="isToggled ? '33' : 'auto'"
							quality="80"
							alt="Juno Logo"
						/>
						<p v-if="isToggled" class="mt-2 text-xs">
							A GeoHazard & Risk Management Tool
						</p>
						<p v-else class="mt-2 text-xs">
							A Intelligent Pipeline Analysis Tool
						</p>
					</div>

					<UForm
						:validate="validate"
						:state="form"
						class="space-y-4"
						@submit="onSubmit"
					>
						<UFormField label="Username" name="username">
							<UInput
								v-model="form.username"
								type="text"
								placeholder="example"
								class="w-full"
							/>
						</UFormField>

						<UFormField label="Password" name="password">
							<UInput
								v-model="form.password"
								type="password"
								placeholder="••••••••"
								class="w-full"
							/>
						</UFormField>

						<div class="flex items-center justify-between">
							<ULink
								to="/forgot-password"
								class="text-sm text-blue-600 hover:underline"
							>
								Forgot password?
							</ULink>
						</div>

						<UButton type="submit" block>Sign In</UButton>
					</UForm>

					<p class="mt-6 text-center text-sm text-gray-600">
						Don’t have an account?
						<ULink to="/register" class="text-blue-600 hover:underline">
							Sign up
						</ULink>
					</p>

					<!-- Or Divider -->
					<USeparator class="my-4" label="or" />

					<!-- OAuth2 Sign-In Button -->
					<UButton
						color="neutral"
						block
						class="mb-4 flex items-center justify-center gap-3 border border-gray-300 text-gray-800 shadow-md hover:bg-gray-300"
						@click="
							() =>
								authClient.signIn.oauth2({
									providerId: 'django',
									callbackURL: '/home',
								})
						"
					>
						<UIcon name="devicon:oauth" class="size-8" />
						Sign in with OAuth2
					</UButton>

					<!-- Microsoft Sign-In Button -->
					<UButton
						color="neutral"
						block
						class="flex items-center justify-center gap-3 border border-gray-300 text-gray-800 shadow-md hover:bg-gray-300"
					>
						<UIcon name="logos:microsoft-icon" class="size-7" />
						Sign in with Microsoft
					</UButton>

					<!-- Product Logo on top -->
					<div class="mt-10 mb-6 flex flex-col items-center">
						<p class="mb-2">Powered By</p>
						<NuxtPicture
							src="/klarianlogo.png"
							width="250"
							height="auto"
							quality="80"
							alt="Product Logo"
						/>
					</div>
				</UCard>
			</div>
		</aside>
		<!-- Main Content Area -->
		<UCarousel
			v-slot="{ item }"
			dots
			:autoplay="{ delay: 2000 }"
			:items="items"
			:ui="{ item: 'basis-1/1', dots: 'bottom-10', dot: 'w-10 h-1' }"
		>
			<NuxtImg :src="item" class="h-screen w-screen rounded-lg" />
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
	import type { FormError, FormSubmitEvent, TabsItem } from '@nuxt/ui';
	import { reactive, ref } from 'vue';
	import { authClient } from '../lib/auth-client';
	import { navigateTo, useCookie, useRuntimeConfig } from 'nuxt/app';

	const isToggled = ref(false);

	const productitems = ref<TabsItem[]>([
		{
			label: 'Juno',
			slot: 'juno', // If you use slot content
		},
		{
			label: 'Orkus',
			slot: 'orkus',
		},
	]);

	const items = [
		'/mountains.png',
		'/pipelines.png',
		'/waterpipes.png',
		'/desert.png',
		'/quarry.png',
	];

	const form = reactive({
		username: '',
		password: '',
	});

	const validate = (state: any): FormError[] => {
		const errors = [];
		if (!state.username) errors.push({ name: 'username', message: 'Required' });
		if (!state.password) errors.push({ name: 'password', message: 'Required' });
		return errors;
	};

	const sessionData = authClient.useSession();
	const config = useRuntimeConfig();

	async function onSubmit(event: FormSubmitEvent<typeof form>) {
		// Handle login logic
		const response = await fetch('http://localhost:8000/o/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'password',
				username: event.data.username,
				password: event.data.password,
				client_id: String(config.public.djangocredentialsClientId),
				client_secret: String(config.djangocredentialsClientSecret),
				scope: 'profile',
			}),
		});

		// Parse the response as JSON to access tokens
		const data = await response.json();
		const token = data.access_token;
		const refreshToken = data.refresh_token;

		// Store securely (or use composables like useCookie, useAuth, etc.)
		useCookie('access_token').value = token;

		// Optionally fetch user info
		await $fetch('http://localhost:8000/api/user', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		try {
			await navigateTo('/home');
		} catch (err) {
			console.error('Login failed:', err);
		}
	}
</script>
