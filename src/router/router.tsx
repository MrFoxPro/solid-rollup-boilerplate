import createSolidRouter from 'solid-typefu-router5';
import createRouter from 'router5';
import browserPluginFactory from 'router5-plugin-browser';
const routes = [
  {
    name: 'landing',
    path: '/',
  },
  {
    name: 'workspace',
    path: '/workspace',
  },
] as const;

export const { Link, Router, Provider, router } = createSolidRouter({
  routes,
  createRouter5: (routes) => {
    const router = createRouter(routes, {
      allowNotFound: true,
      autoCleanUp: true,
    });
    router.usePlugin(browserPluginFactory({ useHash: false }));
    return router;
  },
});
