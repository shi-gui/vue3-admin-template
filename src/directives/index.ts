import type { App, Plugin } from 'vue';
import focus from './focus';
import throttle from './throttle';

const directives: Plugin = {
  install(app: App) {
    app.directive('focus', focus);
    app.directive('throttle', throttle);
  }
};

export default directives;
