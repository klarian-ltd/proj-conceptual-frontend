export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const backendUrl = event.context.tenantBackendUrl;
  if (!backendUrl) {
    throw createError({ statusCode: 400, statusMessage: 'Missing tenant backend URL' });
  }
  // Exchange/validate token with the backend
  // Adjust the endpoint as needed for your backend
  const response = await $fetch<{ access: string; refresh: string; user: any }>(`${backendUrl}/api/auth/social/callback/`, {
    method: 'POST',
    body: { token },
  });
  await setUserSession(event, { user: response.user, accessToken: response.access, refreshToken: response.refresh });
  return { user: response.user };
});
