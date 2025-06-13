export default defineEventHandler(() => {
  // This is a mock response. In a real application, this would come
  // from a database and would likely be specific to the user or tenant.
  return {
    layout: [
      { i: 'a', x: 0, y: 0, w: 4, h: 2, component: 'WidgetA' },
      { i: 'b', x: 4, y: 0, w: 4, h: 4, component: 'WidgetB' },
      { i: 'c', x: 8, y: 0, w: 4, h: 2, component: 'WidgetC' },
      { i: 'd', x: 0, y: 2, w: 8, h: 2, component: 'WidgetD' },
    ],
  };
});
