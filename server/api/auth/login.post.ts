import jwt from 'jsonwebtoken';
import { z } from 'zod';
import type { User } from '~/types/user';

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, bodySchema.parse);
  const { tenantId, tenantBackendUrl } = event.context;
  // http://acme.localhost:8000/_allauth/app/v1/auth/login
  const tokenUrl = `${tenantBackendUrl}/_allauth/app/v1/auth/login`;

  // Extra logging for debugging
  console.log('tokenUrl:', tokenUrl);
  console.log('username:', username);
  console.log('tenantBackendUrl:', tenantBackendUrl);

  try {
    // Step 1: Get tokens from the backend.
    const response = await $fetch<{ meta: { access_token: string; refresh_token: string } }>(tokenUrl, {
      method: 'POST',
      body: {
        username,
        password,
      },
    });

    console.log('response', response);

    const { access_token, refresh_token } = response.meta;

    console.log('access_token', access_token);
    console.log('refresh_token', refresh_token);

    // Step 2: Decode token to get user_id.
    const decodedToken = jwt.decode(access_token) as {
      user_id: number;
      role?: string;
    };

    console.log('decodedToken', decodedToken);

    if (!decodedToken?.user_id) {
      throw new Error('User ID not found in token');
    }

    // Step 3: Fetch the full user profile with the Bearer token.
    const user = await $fetch<User>(`${tenantBackendUrl}/api/users/${decodedToken.user_id}/`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    user.role = decodedToken.role;

    // Step 4: Set user session using nuxt-auth-utils
    await setUserSession(event, {
      user,
      accessToken: access_token,
      refreshToken: refresh_token,
    });

    return { user, tenantId, tenantBackendUrl };
  } catch (e: any) {
    console.error('Login error:', e);
    console.error('Login error (stringified):', JSON.stringify(e, null, 2));
    console.error('Login error keys:', Object.keys(e));
    const statusCode = e.response?.status || 500;
    const message = e.data?.detail || e.data?.message || e.message || 'An error occurred during login.';
    throw createError({ statusCode, statusMessage: message, data: e });
  }
});
