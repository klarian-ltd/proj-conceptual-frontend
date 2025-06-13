interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
}

interface Dashboard {
  title: string;
  layout: LayoutItem[];
}

const mockDashboards: Record<string, Dashboard> = {
  'pump-health': {
    title: 'Pump Health Dashboard',
    layout: [
      { i: 'a', x: 0, y: 0, w: 6, h: 2, title: 'Pump Status Overview' },
      { i: 'b', x: 6, y: 0, w: 6, h: 2, title: 'Vibration Analysis' },
      { i: 'c', x: 0, y: 2, w: 12, h: 4, title: 'Pressure Trends' },
    ],
  },
  'network-performance': {
    title: 'Network Performance',
    layout: [
      { i: 'a', x: 0, y: 0, w: 12, h: 2, title: 'Overall Network Latency' },
      { i: 'b', x: 0, y: 2, w: 6, h: 3, title: 'Data Throughput' },
      { i: 'c', x: 6, y: 2, w: 6, h: 3, title: 'Packet Loss' },
    ],
  },
  default: {
    title: 'Dashboard Not Found',
    layout: [],
  },
};

export default defineEventHandler((event) => {
  const id = event.context.params?.id as string;
  return mockDashboards[id] || mockDashboards.default;
});
