<script setup lang="ts">
import { Loading } from '@/components';

Loading.show();
setTimeout(() => Loading.hide(), 1000);
</script>

<template>
  <h1 class="text-3xl font-bold underline bg-slate-400">Hello world!</h1>
</template>
