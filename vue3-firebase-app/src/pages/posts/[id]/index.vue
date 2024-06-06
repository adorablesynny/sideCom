<template>
  <q-page padding>
    <PostDetails></PostDetails>

    <q-separator class="q-my-xl" />

    <PostComments></PostComments>
  </q-page>
</template>

<script setup>
/* 컴포넌트 */
import PostDetails from './components/PostDetails.vue';
import PostComments from './components/PostComments.vue';
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 800px
</route>
