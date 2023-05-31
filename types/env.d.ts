/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
