import {
  App,
  computed,
  defineComponent,
  onUnmounted,
  ref,
  Teleport,
  Transition,
  watch
} from 'vue';

import style from './index.module.less';
import imgUrl from './assets/imgs/loading.gif';

const Loading = defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    // loading 分割
    const createLoading = 'loading...'
      .split('')
      .map(_ => <div class={`${style['loading-dot-wrapper__dot']}`}>{_}</div>);

    const run = ref<boolean>(false);
    const clsRun = computed(() => (run.value ? `${style['run']}` : ''));

    let t1: number, t2: number;
    const loop = () => {
      run.value = true;
      t1 = setTimeout(() => {
        run.value = false;
        t2 = setTimeout(() => {
          loop();
        }, 400);
        // 10* 200 + 600
      }, 2600);
    };

    const unmount = () => {
      clearTimeout(t2);
      clearTimeout(t1);
      run.value = false;
    };

    watch(
      () => props.visible,
      (val: boolean) => {
        if (!val) {
          unmount();
        } else {
          loop();
        }
      },
      {
        immediate: true
      }
    );

    onUnmounted(unmount);

    return () => (
      <Teleport to={'body'}>
        <Transition name="loading-fade">
          {props.visible ? (
            <div class={`${style.loading}`}>
              <div class={`${style['loading-fade-wrapper']}`}>
                <img
                  src={imgUrl}
                  class={`${style['loading-img']}`}
                  alt="loading"
                />
                <div class={`${style['loading-dot-wrapper']} ${clsRun.value}`}>
                  {createLoading}
                </div>
              </div>
            </div>
          ) : null}
        </Transition>
      </Teleport>
    );
  }
});

console.log(typeof Loading);

export default Loading as typeof Loading & {
  install: (app: App, ...options: any[]) => any;
};
