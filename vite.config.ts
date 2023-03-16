import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@asset': path.resolve(__dirname, './src/assets')
    }
  },
  // 配置代理
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    proxy: {
      '/cloud': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/cloud/, '/cloud')
      }
    },
    cors: true
  }
});
