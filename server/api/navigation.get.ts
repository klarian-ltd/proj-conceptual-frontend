export default defineEventHandler(() => {
  return [
		[
			{
				label: 'Links',
				type: 'label',
			},
			{
				label: 'Home',
				to: '/',
				icon: 'ph:house-fill',
			},
			{
				label: 'Dashboards',
				icon: 'material-symbols-light:dashboard-customize-rounded',
				children: [
					{
						label: 'Network Utilisation',
						icon: 'ph:share-network',
						description: 'Fetched from API.',
						to: '/dashboards/network-utilisation',
					},
					{
						label: 'Pumpset Performance',
						icon: 'ph:speedometer-bold',
						description: 'Fetched from API.',
						to: '/dashboards/pumpset-performance',
					},
					{
						label: 'Pump Health',
						icon: 'maki:defibrillator',
						description: 'Fetched from API.',
						to: '/dashboards/pump-health',
					},
					{
						label: 'Network Performance',
						icon: 'ic:sharp-network-check',
						description: 'Fetched from API.',
						to: '/dashboards/network-performance',
					},
				],
			},
		],
		[
			{
				label: 'Things',
				icon: 'material-symbols:layers-outline',
				children: [
					{
						label: 'Hardware',
						icon: 'ic:baseline-hardware',
						to: '/things/hardware',
					},
				],
			},
			{
				label: 'Help',
				icon: 'i-lucide-circle-help',
				disabled: true,
			},
		],
	];
})
