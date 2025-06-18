<template>
	<div class="flex h-screen">
		<!-- Sidebar -->
		<aside
			class="relative flex h-screen w-150 flex-shrink-0 flex-col bg-gray-900 text-white"
		>
			<div class="flex min-h-screen items-center justify-center">
				<ULink to="/" class="text-blue-600 hover:underline">
					<UIcon name="material-symbols:arrow-back-ios" class="size-7" />
				</ULink>
				<UCard class="w-full max-w-md rounded-2xl p-8 shadow-2xl">
					<h1 class="mb-6 text-center text-2xl font-bold">
						Register a account
					</h1>

					<UForm class="space-y-4" @submit="onSubmit">
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

						<UButton type="submit" block>Register</UButton>
					</UForm>

					<!-- Or Divider -->
					<USeparator class="my-4" label="or" />

					<!-- OAuth2 Sign-In Button -->
					<UButton
						color="neutral"
						block
						class="mb-4 flex items-center justify-center gap-3 border border-gray-300 text-gray-800 shadow-md hover:bg-gray-300"
					>
						<UIcon name="devicon:oauth" class="size-8" />
						Sign Up with OAuth2
					</UButton>

					<!-- Microsoft Sign-In Button -->
					<UButton
						color="neutral"
						block
						class="flex items-center justify-center gap-3 border border-gray-300 text-gray-800 shadow-md hover:bg-gray-300"
					>
						<UIcon name="logos:microsoft-icon" class="size-7" />
						Sign Up with Microsoft
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
	import { reactive, ref } from 'vue';

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

	function onSubmit() {
		// Handle login logic
		console.log('Logging in with', form);
	}
</script>
