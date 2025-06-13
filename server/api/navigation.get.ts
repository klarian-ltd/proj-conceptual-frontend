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
						to: '/dashboards/1',
					},
					{
						label: 'Pumpset Performance',
						icon: 'ph:speedometer-bold',
						description: 'Fetched from API.',
						to: '/dashboards/2',
					},
					{
						label: 'Pump Health',
						icon: 'maki:defibrillator',
						description: 'Fetched from API.',
						to: '/dashboards/3',
					},
					{
						label: 'Network Performance',
						icon: 'ic:sharp-network-check',
						description: 'Fetched from API.',
						to: '/dashboards/4',
					},
				],
			},
		],
		[
			{
				label: 'Data Tables',
				icon: 'i-heroicons-table-cells-20-solid',
				children: [
					{
						label: 'Assessments',
						icon: 'i-heroicons-document-text',
						to: '/assessments',
					},
					{
						label: 'Attachments',
						icon: 'i-heroicons-paper-clip',
						to: '/attachments',
					},
				],
			},
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
