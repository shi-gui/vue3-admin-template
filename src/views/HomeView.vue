<script setup lang="ts">
import Log from '@/assets/img/log.jpg';
import IconTest from '@/assets/img/IconTest.svg?component';
import { version } from '../../package.json';
</script>

<template>
  <!-- 在模板中使用 -->
  <img :src="Log" alt="" srcset="" />
  <IconTest fill="red" />
  {{ version }}
</template>

<style>
/* 在css中使用 */
div {
  background: url('@/assets/img/log.jpg') no-repeat;
}
</style>
