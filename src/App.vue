<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { setStorage, getStorage } from './utils/storage';

setStorage('test', '100');
setTimeout(() => {
  console.log(getStorage('test'));
}, 8000);
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <hr />
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
