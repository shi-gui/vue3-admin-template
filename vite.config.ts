import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ command, mode }) => {
  return {
    build: {
      outDir: 'dist', // 输出目录
      assetsDir: 'assets', // 静态资源存放目录
      assetsInlineLimit: 4096, // 资源内联阈值
      cssCodeSplit: true, // 开启css拆分
      sourcemap: false, // 开启sourcemap
      minify: 'esbuild' // 压缩工具, terser压缩率更高1%-2%,esbuild压缩更快20-40 倍
    },
    esbuild: {
      /*
        打包生产环境移除 console、debugger
        https://www.cnblogs.com/guangzan/p/16633753.html
      */
      drop: mode === 'prod' ? ['console', 'debugger'] : []
    },
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      /**
       * 支持vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core等自动引入
       * https://github.com/antfu/unplugin-auto-import
       */
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'types/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        // ui库解析器，支持多个
        // resolvers: [VantResolver()],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ],

        // 自定义组件 https://github.com/antfu/unplugin-vue-components
        dirs: ['src/components'],
        extensions: ['vue'], // 组件有效扩展文件名
        dts: 'types/components.d.ts' // 配置文件生成位置
      })
    ],
    css: {
      /**
       * 全局引入index.less
       * 全局引入无效参考
       *  https://github.com/vitejs/vite/issues/5682#issuecomment-968713998
       *  https://www.jianshu.com/p/4918f8d9f2b4
       */
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: `@import '@asset/css/index.less';`
        }
      }
    },
    base: './',
    // 配置别名
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
          target: '',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/cloud/, '/cloud')
        },
        '/group': {
          target: '',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/group/, '/group')
        }
      },
      cors: true
    }
  };
});
