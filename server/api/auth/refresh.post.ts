import jwt from 'jsonwebtoken';
import type { User } from '~/types/user';

export default defineEventHandler(async (event) => {
  console.log('[/api/auth/refresh] Received request to refresh token.');
  // Get session if present
  let session;
  try {
    session = await requireUserSession(event);
  } catch {
    session = null;
  }
  const refreshToken = session?.refreshToken;
  const accessToken = session?.accessToken;
  const tenantBackendUrl = event.context.tenantBackendUrl;

  if (!refreshToken) {
    console.log('[/api/auth/refresh] No refresh token found in session.');
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Missing refresh token',
    });
  }

  try {
    // Proxy the refresh token to the actual backend to get a new access token.
    const tokenResponse = await $fetch<{ access: string; refresh?: string }>(`${tenantBackendUrl}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: {
        refresh: refreshToken,
      },
    });

    const newAccessToken = tokenResponse.access;
    const newRefreshToken = tokenResponse.refresh || refreshToken;

    // Decode the new token to get the user info to send to the client.
    const decodedToken = jwt.decode(newAccessToken) as {
      user_id: number;
      role?: string;
    };

    if (!decodedToken?.user_id) {
      throw new Error('User ID not found in token');
    }

    // Fetch the full user profile from the backend using the new access token
    const user = await $fetch<User>(`${tenantBackendUrl}/api/users/${decodedToken.user_id}/`, {
      headers: {
        'Authorization': `Bearer ${newAccessToken}`,
      }
    });

    user.role = decodedToken.role;

    // Update session with new tokens and user
    await setUserSession(event, {
      user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return { user };
  } catch (error) {
    console.error('[/api/auth/refresh] Error during token refresh:', error);
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Failed to refresh token',
    });
  }
});
