import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import autoRegisterComponents from './plugins/autoImportComponents';
import router from './router';
import './styles/main.css';

async function bootstrap() {
  if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  autoRegisterComponents(app);

  app.mount('#app');
}

bootstrap();
