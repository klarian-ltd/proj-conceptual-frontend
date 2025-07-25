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
		['nuxt-plotly', { inject: true }],
		'nuxt-echarts',
		'nuxt-mapbox',
	],
	css: ['~/assets/css/main.css', '@vue-flow/core/dist/style.css'],
	tailwindcss: {
		exposeConfig: true,
		viewer: true,
	},
	mapbox: {
		accessToken: process.env.MAPBOX_ACCESS_TOKEN,
	},
	echarts: {
		renderer: 'svg',
		charts: ['ScatterChart', 'HeatmapChart', 'BarChart'],
		components: [
			'DatasetComponent',
			'GridComponent',
			'TooltipComponent',
			'TitleComponent',
			'LegendComponent',
			'VisualMapComponent',
		],
		features: ['LabelLayout', 'UniversalTransition'],
	},
	alias: {
		'@@': resolve(__dirname, '/'),
		'@/types': resolve(__dirname, 'types'),
		'@/store': resolve(__dirname, 'store'),
		'@/composables': resolve(__dirname, 'composables'),
	},
	image: {
		format: ['webp'],
	},
	vite: {
		optimizeDeps: {
			include: ['plotly.js-dist-min'],
		},
	},
	runtimeConfig: {
		// Private variables, only available on the server
		microsoftClientSecret: process.env.MICROSOFT_CLIENT_SECRET,
		djangooauthClientSecret: process.env.DJANGO_OAUTH_CLIENT_SECRET,
		djangocredentialsClientSecret: process.env.DJANGO_CREDENTIAL_CLIENT_SECRET,

		// Public variables, available on both client and server
		public: {
			microsoftClientId: process.env.MICROSOFT_CLIENT_ID,
			djangooauthClientId: process.env.DJANGO_OAUTH_CLIENT_ID,
			djangocredentialsClientId: process.env.DJANGO_CREDENTIAL_CLIENT_ID,
		},
	},
	ui: {
		theme: {
			colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
		},
	},
});
