import type { Router } from 'vue-router';

export function setupRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log(to, from);
    next();
  });
}
