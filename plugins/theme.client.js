export default defineNuxtPlugin(() => {
	const saved = localStorage.getItem('theme') || 'Client-Green';
	const themeClass = `theme-${saved.toLowerCase().replace(/\s+/g, '-')}`;

	const html = document.documentElement;
	html.classList.remove(
		'theme-client-green',
		'theme-client-blue',
		'theme-client-bpa',
		'theme-client-light'
	);
	html.classList.add(themeClass);
});
