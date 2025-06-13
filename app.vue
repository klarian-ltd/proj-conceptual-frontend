<script setup lang="ts">
import { useTenant } from '~/composables/useTenant';
import { computed } from 'vue';

const { tenant } = useTenant();

const themeStyle = computed(() => {
	const theme = tenant.value.theme;
	if (!theme || !theme.colors) {
		// Fallback theme
		return `
			:root {
				--color-primary: #6366f1;
				--color-secondary: #818cf8;
				--color-text: #111827;
				--color-background: #ffffff;
			}
		`;
	}

	const colorVars = Object.entries(theme.colors)
		.map(([key, value]) => `--color-${key}: ${value};`)
		.join('\n');

	let fontVars = '';
	if (theme.font?.family) {
		fontVars = `--font-family: "${theme.font.family}", sans-serif;`;
	}

	return `
		:root {
			${colorVars}
			${fontVars}
		}
	`;
});

useHead({
	style: [
		{
			innerHTML: themeStyle,
		},
	],
});
</script>

<template>
	<div>
		<UApp>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</UApp>
	</div>
</template>
