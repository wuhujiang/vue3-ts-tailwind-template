import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import autoRegisterComponents from './plugins/autoImportComponents';
import router from './router';
import './styles/reset.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 自动注册组件
autoRegisterComponents(app);

app.mount('#app');
