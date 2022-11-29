import { createApp } from 'vue';
import type { Component } from 'vue';

interface Extra {
  parent?: HTMLElement;
  createRoot?(): HTMLElement;
  insert?(root: HTMLElement): void;
  remove?(root: HTMLElement): void;
}
export default function mountComponent(
  RootComponent: Component,
  { parent = document.body, createRoot, insert, remove }: Extra = {}
) {
  // 返回RootComponent组件实例
  const app = createApp(RootComponent);
  const root = createRoot ? createRoot() : document.createElement('div');
  insert ? insert(root) : parent.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      remove ? remove(root) : parent.removeChild(root);
    }
  };
}
