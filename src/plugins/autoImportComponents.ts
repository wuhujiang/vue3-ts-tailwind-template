import type { App, Component } from 'vue';

export default function autoRegisterComponents(app: App) {
  const components = import.meta.glob<{ default: Component }>('../components/**/index.vue', {
    eager: true,
  });
  for (const path in components) {
    try {
      const component = components[path].default;
      // 因为glob已经固定为**/index.vue，所以组件名称就是倒数第二个路径段
      // 例如: /src/components/BaseChart/index.vue -> BaseChart
      // 组件文件夹都是 PascalCase 命名约定，直接使用即可
      const pathParts = path.split('/');
      const componentName = pathParts[pathParts.length - 2];

      const finalName = (component as any).name || componentName;

      // 注册组件
      app.component(finalName, component);
    } catch (error) {
      console.log(`cuowu:${error}`);
      console.error(`注册组件失败 ${path}:`, error);
    }
  }
}
