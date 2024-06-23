<template>
  <q-page padding>
    <div class="text-h4">
      useAsyncState
      <q-separator spaced />
      <p>1 {{ state }}</p>
      <p>2 {{ isLoading }}</p>
      <p>3 {{ error }}</p>
      <p>4 {{ isReady }}</p>
      <button @click="handleButton">execute</button>
    </div>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const { state, isLoading, error, isReady, execute } = useAsyncState(
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.data),
  { name: '김단감' },
  {
    immediate: false,
  },
);

const handleButton = () => {
  execute(1000);
};
</script>

<style lang="scss" scoped></style>
