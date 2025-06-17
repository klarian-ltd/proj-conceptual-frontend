import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';

const config = useRuntimeConfig();

export const auth = betterAuth({
	// ... other config options
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: 'django',
					clientId: config.public.djangoClientId,
					clientSecret: config.djangoClientSecret,
					discoveryUrl: 'http://localhost:8000/openid-configuration',
					scopes: ['profile'],
					pkce: true,
					// ... other config options
				},
				// Add more providers as needed
			],
		}),
	],
	socialProviders: {
		microsoft: {
			clientId: config.public.microsoftClientId,
			clientSecret: config.microsoftClientSecret,
			// Optional
			tenantId: 'common',
			prompt: 'select_account', // Forces account selection
		},
	},
});
