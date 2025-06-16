import jwt from 'jsonwebtoken';
import { z } from 'zod';
import type { User } from '~/types/user';

const bodySchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export default defineEventHandler(async (event: any) => {
  console.log('[API Social Callback] Received request.');
  const { accessToken, refreshToken } = await readValidatedBody(event, bodySchema.parse);
  console.log('[API Social Callback] Tokens received.');
  const tenantBackendUrl = event.context.tenantBackendUrl;
  console.log(`[API Social Callback] Tenant backend URL: ${tenantBackendUrl}`);

  try {
    // 1. Decode token to get user_id.
    const decodedToken = jwt.decode(accessToken) as { user_id: number; role?: string; };
    console.log('[API Social Callback] Token decoded:', decodedToken);
    if (!decodedToken?.user_id) {
      throw new Error('User ID not found in token');
    }

    // 2. Fetch the full user profile with the Bearer token.
    console.log(`[API Social Callback] Fetching user profile for user_id: ${decodedToken.user_id}`);
    const user = await $fetch<User>(`${tenantBackendUrl}/api/users/${decodedToken.user_id}/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('[API Social Callback] User profile fetched:', user);
    user.role = decodedToken.role;

    // 3. Set user session using nuxt-auth-utils
    console.log('[API Social Callback] Setting user session.');
    await setUserSession(event, {
      user,
      accessToken,
      refreshToken,
    });
    console.log('[API Social Callback] Session set successfully.');

    // Return tenant info as well
    return {
      user,
      tenantId: event.context.tenantId,
      tenantBackendUrl: event.context.tenantBackendUrl,
    };
  } catch (e: any) {
    console.error('[API Social Callback] Error:', e);
    const statusCode = e.response?.status || 500;
    const message = e.data?.detail || e.data?.message || 'An error occurred during social login session setup.';
    throw createError({ statusCode, statusMessage: message });
  }
});
