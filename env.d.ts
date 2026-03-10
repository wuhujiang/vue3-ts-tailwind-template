/// <reference types="vite/client" />

// Vue 3.3+ 推荐的 .vue 模块声明（自动推导组件类型）
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent;
  export default component;
}
