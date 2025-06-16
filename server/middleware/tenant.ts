import { defineEventHandler, getQuery, getRequestHost } from 'h3';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const host = getRequestHost(event);

  let tenantId: string | undefined;

  if (host) {
    const hostname = host.split(':')[0];
    const parts = hostname.split('.');
    if (parts.length > 1 && parts[0] !== 'www') {
      tenantId = parts[0];
    }
  }

  if (query.tenant) {
    tenantId = query.tenant as string;
  }

  // Default to 'juno' if no tenant can be determined from the host or query.
  if (!tenantId) {
    tenantId = 'juno';
  }

  // Construct the dynamic backend URL based on the tenant.
  const tenantBackendUrl = `https://${tenantId}.localhost`;

  event.context.tenantId = tenantId;
  event.context.tenantBackendUrl = tenantBackendUrl;
});
