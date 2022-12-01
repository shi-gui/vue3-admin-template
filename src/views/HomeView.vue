<script setup lang="ts">
import { Loading } from '@/components';

Loading.show();
setTimeout(() => Loading.hide(), 1000);
</script>

<template>
  <div class="text-green-500">home页面</div>
</template>
