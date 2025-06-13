import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
								compatibilityDate: '2025-05-15',
								devtools: { enabled: true },
								modules: [
								  '@nuxt/ui',
								  '@nuxt/icon',
								  '@nuxt/image',
								  '@pinia/nuxt',
								  '@nuxt/eslint',
								  'nuxt-auth-utils',
								],
								css: ['~/assets/css/main.css'],
								alias: {
																'@': new URL('.', import.meta.url).pathname,
								},
								image: {
																format: ['webp'],
								},
});