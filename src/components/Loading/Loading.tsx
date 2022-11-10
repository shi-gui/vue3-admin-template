import {
  App,
  computed,
  defineComponent,
  onActivated,
  onUnmounted,
  ref,
  Teleport,
  Transition,
  watch
} from 'vue';

import style from './index.module.less';

const Loading = defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    const createLoading = 'loading...'.split('').map(_ => <div>{_}</div>);

    return () => (
      <div>
        <span>组件测试</span>
        <span>{createLoading}</span>
      </div>
    );
  }
});

console.log(typeof Loading);

export default Loading as typeof Loading & {
  install: (app: App, ...options: any[]) => any;
};
