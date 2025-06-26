export default defineAppConfig({
	ui: {
		modal: {
			slots: {
				title: 'text-primary',
				body: 'text-primary',
				overlay: 'bg-primary/10 backdrop-blur-xs',
			},
			variants: {
				fullscreen: {
					false: {
						content: 'max-w-6xl',
					},
				},
			},
		},
		selectMenu: {
			slots: {
				placeholder: 'text-white',
				label: 'text-primary',
			},
		},
	},
});
