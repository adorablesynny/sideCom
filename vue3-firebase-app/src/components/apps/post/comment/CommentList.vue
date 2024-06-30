<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <CommentItem
      @delete="handleDeleteComment"
      v-for="item in items"
      :key="item.id"
      v-bind="item"
    />
  </q-list>
</template>

<script setup>
/* 컴포넌트 */
import { useAsyncState } from '@vueuse/core';
import CommentItem from './CommentItem.vue';
import { deleteComment } from '../../../../service/comment';

const props = defineProps({
  postId: {
    type: String,
  },
  items: Array,
});

const emits = defineEmits(['deleted']);
const { execute } = useAsyncState(deleteComment, null, {
  immediate: false,
  onSuccess: () => {
    emits('deleted');
  },
});
const handleDeleteComment = async commentId => {
  if (confirm('삭제 하시겠습니까?') === false) return;
  execute(0, props.postId, commentId);
};
</script>

<style lang="scss" scoped></style>
