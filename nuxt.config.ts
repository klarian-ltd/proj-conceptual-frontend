// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@nuxt/eslint',
	],
	css: ['~/assets/css/main.css'],
	tailwindcss: {
		exposeConfig: true,
		viewer: true,
	},
	alias: {
		'@': resolve(__dirname, '/'),
	},
	image: {
		format: ['webp'],
	},
	runtimeConfig: {
		// Private variables, only available on the server
		microsoftClientSecret: process.env.MICROSOFT_CLIENT_SECRET,
		djangoClientSecret: process.env.DJANGO_CLIENT_SECRET,

		// Public variables, available on both client and server
		public: {
			microsoftClientId: process.env.MICROSOFT_CLIENT_ID,
			djangoClientId: process.env.DJANGO_CLIENT_ID,
		},
	},
});
