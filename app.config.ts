export default defineAppConfig({
	ui: {
		input: {
			slots: {
				variants: {
					variant: {
						none: 'text-primary',
						},
					},
				},
			},
		navigationMenu: {
			slots: {
				label: 'text-primary',
			},
		},
		card: {
			variants: {
				variant: {
					outline: {
						root: 'ring-primary',
					},
				},
			},
		},
		modal: {
			slots: {
				title: 'text-primary',
				body: 'text-primary',
				overlay: 'bg-primary/10 backdrop-blur-xs',
				close: 'bg-primary hover:bg-primary/80 text-black',
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
