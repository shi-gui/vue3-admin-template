import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import directives from './directives';
import registCharts from './libs/registCharts';

const app = createApp(App);

app
  .use(directives)
  .use(createPinia())
  .use(registCharts)
  .use(router)
  .mount('#app');
