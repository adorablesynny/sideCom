<template>
  <router-view />
</template>

<script setup>
import { onErrorCaptured } from 'vue';

defineOptions({
  name: 'App',
});

onErrorCaptured(err => {
  console.log('err', err);
});
</script>

<style lang="scss">
@import './css/app.scss';
</style>
