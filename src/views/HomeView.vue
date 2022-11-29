<script setup lang="ts">
import { getCurrentInstance } from 'vue';
// import { Loading } from '@/components';

// Loading.show();
// setTimeout(() => {
//   Loading.hide();
// }, 6000);
const ctx = getCurrentInstance();
ctx?.appContext.config.globalProperties.$loading.show();
</script>

<template>
  <h1>home页面</h1>
</template>
