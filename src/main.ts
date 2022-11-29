import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Loading } from '@/components';

const app = createApp(App);
app.config.globalProperties.$loading = Loading;

app.use(createPinia());
app.use(router);

app.mount('#app');
