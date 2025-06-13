import jwt from 'jsonwebtoken';
import { z } from 'zod';
import type { User } from '~/types/user';

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, bodySchema.parse);
  const tenantBackendUrl = event.context.tenantBackendUrl;
  const tokenUrl = `${tenantBackendUrl}/api/auth/token/`;

  try {
    // Step 1: Get tokens from the backend.
    const { access: access_token, refresh: refresh_token } = await $fetch<{ access: string; refresh: string }>(tokenUrl, {
      method: 'POST',
      body: {
        username,
        password,
      },
    });

    // Step 2: Decode token to get user_id.
    const decodedToken = jwt.decode(access_token) as {
      user_id: number;
      role?: string;
    };

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

    return { user };
  } catch (e: any) {
    console.error('Login error:', e);
    const statusCode = e.response?.status || 500;
    const message = e.data?.detail || e.data?.message || 'An error occurred during login.';
    throw createError({ statusCode, statusMessage: message });
  }
});
