## vue3-admin-template 项目简介

## 技术体系

- TypeScript(5x) + Vue(3x) + VueRouter(4x) + Pinia(4x)
- UI：Ant Design Vue(4x)
- CSS：tailwind(3x)
- HTTP 请求：Axios
- 可视化：echarts(5x) + vue-echarts(6x)
- 依赖管理：Yarn
- 构建系统：Vite(3x)

## 三方插件

- 自动导入组件和第三方插件：[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- 自动导入 vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core：[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
- Cookie：[js-cookie](https://github.com/js-cookie/js-cookie)

## 目录规划

```js
|- dist // 构建成果
|- public
|- src
  |- api // api接口管理
  |- assets  // 静态资源
  |- components // 全局组件
  |- config // 全局配置
  |- directives // 自定义指令
  |- enums // 枚举值
  |- hooks // 全局hooks，用于抽离公用逻辑
  |- lang // 国际化资源
  |- layout // 布局组件
  |- libs // 第三方插件
  |- request // axios封装
  |- router  // 路由
  |- store   // 状态
  |- utils   // 工具函数
  |- views   // 页面
  |- App.vue  // 根组件
  |- main.ts
|-type // ts类型
```

## 使用说明

```bash
# 安装依赖
yarn

# 开发环境启动
yarn run dev
# 或
yarn run serve

# 测试环境打包
yarn run build:test
# 正式环境打包
yarn run build:prod

```

## 项目规范

- 代码规范：eslint + pritter
- 提交规范：githooks（husky）
- api 接口约定（按照 views 页面分组进行接口抽离）
- git 分支策略

## 性能优化
