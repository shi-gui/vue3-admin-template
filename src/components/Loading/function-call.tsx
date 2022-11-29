import { reactive, App, toRefs } from 'vue';
import mountComponent from './mountComponent';
import UnityLoading from './Loading';
import type { Loading as LoadingType } from './types';

let queue: any[] = [];

const createInstance = () => {
  const { instance, unmount } = mountComponent({
    setup(props, ctx) {
      const state = reactive({
        visible: false
      });
      const emit = {};
      const show = () => {
        state.visible = true;
      };
      const hide = () => {
        state.visible = false;
      };
      const destroy = () => {
        unmount();
      };

      ctx.expose({
        ...toRefs(state),
        show,
        hide,
        destroy
      });

      // ✨ 方式 1，expose + h 函数
      // return () =>
      //   h(LoadingComp, {
      //     ...state,
      //     ...emits
      //   });

      // ✨ 方式 2，expose + jsx
      return () => <UnityLoading {...state} {...emit} />;

      // ✨ 方式 3，重写 render + 直接 return 暴露成员
      // const render = () => {
      //   return h(LoadingComp, {
      //     ...state,
      //     ...emits
      //   });
      // };
      // // @ts-ignore
      // getCurrentInstance()!.render = render;
      // return {
      //   show
      // };
    }
  });
  return instance;
};

/**
 * 获取当前组件实例
 */
const getInstance = () => {
  if (!queue.length) {
    const instance = createInstance();
    queue.push(instance);
  }
  return queue[queue.length - 1];
};

/**
 * Loading 主方法
 */
const Loading = () => {
  const loading = getInstance();
  return loading;
};

Object.assign(Loading, {
  show() {
    const loading = Loading();
    loading.show();
    return loading;
  },
  hide() {
    queue[0]?.hide();
  },
  destroy() {
    queue[0]?.destroy();
    queue = [];
  }
});

/**
 * 只暴露命令式
 */
Loading.install = (app: App) => {
  // app.config.globalProperties 一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。
  app.config.globalProperties.$loading = Loading;
};
export default Loading as unknown as LoadingType;
