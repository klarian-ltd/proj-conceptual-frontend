import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('VueFlow', VueFlow);
	nuxtApp.vueApp.component('Background', Background);
	nuxtApp.vueApp.component('MiniMap', MiniMap);
	nuxtApp.vueApp.component('Controls', Controls);
});
