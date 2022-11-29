import type { App } from 'vue';

// loading 组件实例
export interface Loading {
  show(): void;
  hide(): void;
  destroy(): void;
  install(app: App, ...options: any[]): any;
}
