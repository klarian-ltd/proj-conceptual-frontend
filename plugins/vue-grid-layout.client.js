import { GridItem, GridLayout } from 'vue3-grid-layout';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('GridLayout', GridLayout);
	nuxtApp.vueApp.component('GridItem', GridItem);
});
