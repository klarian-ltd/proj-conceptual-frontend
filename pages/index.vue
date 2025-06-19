<template>
	<div class="flex h-screen items-center justify-center">
		<div class="flex min-h-screen w-150 flex-col items-center justify-center">
			<div class="absolute inset-0 -z-10">
				<NuxtImg
					src="/flow.svg"
					alt="Background"
					class="h-full w-full object-cover"
				/>
			</div>
			<!-- Circle in center -->
			<div
				class="absolute top-31 left-1/2 z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-gray-200 transition-transform duration-200 hover:scale-110"
			>
				<NuxtPicture
					src="/bpa.png"
					alt="Center Icon"
					class="rounded-full object-cover"
					quality="80"
				/>
			</div>
			<UCard
				class="w-full max-w-md rounded-2xl border-2 border-white p-8 shadow-2xl"
			>
				<h1 class="mb-6 text-center text-2xl font-bold">
					Log in to your account
				</h1>

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

				<!-- Or Divider -->
				<USeparator class="my-4" label="or" color="white" />

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

				<!-- Product Logo on bottom -->
				<div class="mt-10 mb-6 flex flex-col items-center">
					<p class="mb-2 text-xs">Powered By</p>
					<NuxtPicture
						src="/klarianlogowhite.png"
						width="110"
						height="auto"
						quality="80"
						alt="Product Logo"
					/>
				</div>
			</UCard>
			<div class="mt-2 text-center text-xs text-white/50">Version 0.0.1</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from '@nuxt/ui';
	import { reactive } from 'vue';
	import { authClient } from '../lib/auth-client';
	import { navigateTo, useCookie, useRuntimeConfig } from 'nuxt/app';

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
