module.exports = {
	darkMode: 'class',
	mode: 'jit',
	content: [
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.{vue,js,ts}',
		'./pages/**/*.{vue,js,ts}',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./nuxt.config.{js,ts}',
	],
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('tailwindcss'),
		require('autoprefixer'),
	],
};
