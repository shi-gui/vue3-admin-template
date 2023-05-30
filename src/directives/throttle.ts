import type { Directive, DirectiveBinding } from 'vue';

const throttle: Directive = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    // 节流时间
    const throttleTime = binding.value || 2000;
    let timer: number | null;

    el.addEventListener(
      'click',
      event => {
        if (!timer) {
          // 第一次执行
          timer = setTimeout(() => {
            timer = null;
          }, throttleTime);
        } else {
          // 用于阻止事件在当前元素上进一步传播，并且可以防止任何其他事件处理程序被调用
          event && event.stopImmediatePropagation();
        }
      },
      true
    );
  }
};

export default throttle;
