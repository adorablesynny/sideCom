<template>
  <q-list bordered separator>
    <PostItem v-for="item in items" :item="item" />
  </q-list>
</template>

<script setup>
/* 컴포넌트 */
import PostItem from './PostItem.vue';
const props = defineProps({
  items: Array,
  default: () => [],
});
</script>

<style lang="scss" scoped></style>
