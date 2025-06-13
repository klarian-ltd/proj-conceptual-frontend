/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./app.vue',
	],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				text: 'rgb(var(--color-text) / <alpha-value>)',
				background: 'rgb(var(--color-background) / <alpha-value>)',
			},
			fontFamily: {
				sans: ['var(--font-family)', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [],
};
