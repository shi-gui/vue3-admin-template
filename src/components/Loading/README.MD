# Loading

命令式组件（单例）

# Usage

```ts
// 用法1，哪里需要哪里引入
import { Loading } from '@/components';
// 显示
Loading.show();
// 关闭
Loading.hide();

// 用法2，main.ts中全局引入
import { Loading } from '@/components';
app.config.globalProperties.$loading = Loading;
// 组件中使用
import { getCurrentInstance } from 'vue';
const ctx = getCurrentInstance();
ctx?.appContext.config.globalProperties.$loading.show();
```
