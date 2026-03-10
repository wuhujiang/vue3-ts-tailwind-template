import { createRouter, createWebHistory } from 'vue-router';

import { setupRouterGuards } from './guards.js';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

setupRouterGuards(router);

export default router;
