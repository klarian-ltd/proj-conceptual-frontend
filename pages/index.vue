<template>
	<div class="flex h-screen items-center justify-center">
		<div class="flex min-h-screen w-150 flex-col items-center justify-center">
			<div class="absolute inset-0 -z-10 opacity-50">
				<NuxtImg
					src="/klarianflow.svg"
					alt="Background"
					class="h-full w-full object-cover"
				/>
			</div>
			<UCard
				class="flex h-120 w-full max-w-md flex-col justify-center rounded-2xl p-6 opacity-95 shadow-2xl"
			>
				<!-- Circle in center -->
				<div
					v-if="theme === 'Client-BPA'"
					class="absolute top-34 left-1/2 z-10 flex h-30 w-30 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-gray-200 transition-transform duration-200 hover:scale-110"
				>
					<NuxtPicture
						src="/bpa.png"
						alt="Center Icon"
						class="rounded-full object-cover"
						quality="80"
					/>
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
						<UCheckbox label="Remember me?" />
						<ULink
							to="/forgot-password"
							class="text-sm text-blue-600 hover:underline"
						>
							Forgot password?
						</ULink>
					</div>

					<UButton
						type="submit"
						block
						class="bg-primary-300/20 hover:bg-primary-300/30 dark:bg-primary-400/20 dark:hover:bg-primary-400/30 text-primary-600 dark:text-primary-300 border-primary-400/20 border backdrop-blur-[1px]"
					>
						Sign In
					</UButton>
				</UForm>

				<!-- Or Divider -->
				<USeparator class="my-4 p-4" label="or" color="primary" />

				<!-- Mircrosoft Sign-In Button -->
				<UButton
					block
					class="bg-primary-300/20 hover:bg-primary-300/30 dark:bg-primary-400/20 dark:hover:bg-primary-400/30 text-primary-600 dark:text-primary-300 border-primary-400/20 flex items-center justify-center border backdrop-blur-[1px]"
					@click="
						() =>
							authClient.signIn.oauth2({
								providerId: 'django',
								callbackURL: '/home',
							})
					"
				>
					<UIcon name="logos:microsoft-icon" class="size-6" />
					Sign in with Microsoft 365
				</UButton>
			</UCard>
			<div class="mt-5 text-center text-xs">Platform Version 0.0.1 Beta</div>
			<!-- Product Logo on bottom -->
			<div class="mt-10 flex flex-col items-center">
				<p class="mb-2 text-xs">Powered By</p>
				<NuxtPicture
					:src="theme === 'BPA' ? '/klarianlogo.png' : '/klarianlogowhite.png'"
					width="110"
					height="auto"
					quality="80"
					alt="Product Logo"
				/>
			</div>
		</div>
		<!-- Theme Selector -->
		<div class="fixed top-4 left-4 z-50">
			<USelectMenu
				v-model="theme"
				icon="fluent:dark-theme-20-filled"
				:items="themes"
				class="text-primary w-48"
				@update:model-value="handleThemeChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from '@nuxt/ui';
	import { onMounted, reactive, ref } from 'vue';
	import { authClient } from '../lib/auth-client';
	import { navigateTo, useCookie, useRuntimeConfig } from 'nuxt/app';

	const theme = ref('Client-Green');
	const themes = ref([
		'Client-Green',
		'Client-Blue',
		'Client-BPA',
		'Client-Light',
	]);

	const themeClasses = [
		'theme-client-green',
		'theme-client-blue',
		'theme-client-bpa',
		'theme-client-light',
	];

	const handleThemeChange = (selected: string) => {
		theme.value = selected;
		localStorage.setItem('theme', selected);

		const html = document.documentElement;
		html.classList.remove(...themeClasses);

		const themeClass = `theme-${selected.toLowerCase().replace(/\s+/g, '-')}`;
		html.classList.add(themeClass);
	};

	// Load saved theme on mount
	onMounted(() => {
		const saved = localStorage.getItem('theme') || 'Client-Green';
		theme.value = saved;
		handleThemeChange(saved);
	});

	const form = reactive({
		username: '',
		password: '',
	});

	const validate = (state: typeof form): FormError[] => {
		const errors = [];
		if (!state.username) errors.push({ name: 'username', message: 'Required' });
		if (!state.password) errors.push({ name: 'password', message: 'Required' });
		return errors;
	};

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
		try {
			await $fetch('http://localhost:8000/api/user', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			await navigateTo('/home');
		} catch (err) {
			const toast = useToast();

			toast.add({
				title: 'Login failed',
				description: 'Please try again',
			});
		}
	}
</script>
