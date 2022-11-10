import { Component, createApp } from 'vue';

export default function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent);
  const root = document.createElement('div');
  document.body.appendChild(root);

  return {
    // app.mount() 返回根组件实例
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}
