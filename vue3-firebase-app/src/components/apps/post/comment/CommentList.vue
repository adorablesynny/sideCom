<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <CommentItem v-for="item in items" :key="item.id" v-bind="item" />
  </q-list>
</template>

<script setup>
/* 컴포넌트 */
import CommentItem from './CommentItem.vue';

const props = defineProps({
  items: Array,
});
</script>

<style lang="scss" scoped></style>
