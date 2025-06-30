import { computed, ref } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
	const renderer = ref('svg');

	const initOptions = computed(() => ({
		height: 450,
		width: 500,
		renderer: renderer.value,
	}));

	nuxtApp.vueApp.provide(INIT_OPTIONS_KEY, initOptions);
});
