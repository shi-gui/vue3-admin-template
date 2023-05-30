import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import directives from './directives';

const app = createApp(App);

app.use(directives).use(createPinia()).use(router).mount('#app');
