import type { Directive, DirectiveBinding } from 'vue';

const focus: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.focus();
  }
};

export default focus;
