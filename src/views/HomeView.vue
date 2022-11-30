<script setup lang="ts">
import { Loading } from '@/components';

Loading.show();
setTimeout(() => Loading.hide(), 5000);
</script>

<template>
  <h1>home页面</h1>
</template>
