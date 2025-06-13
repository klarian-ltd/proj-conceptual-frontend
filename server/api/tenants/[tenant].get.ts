interface HomepageOption {
  label: string;
  path: string;
}

const tenantHomepages: Record<string, HomepageOption[]> = {
  klarian: [
    { label: 'Orkus Map', path: '/orkus/map' },
  ],
  acme: [
    { label: 'Juno Stats', path: '/juno/stats' },
  ],
};

export default defineEventHandler((event) => {
  const tenant = event.context.params?.tenant as string;
  return tenantHomepages[tenant?.toLowerCase()] || [];
});
