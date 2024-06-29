<template>
  <q-page padding>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        @submit="handleSubmit"
      >
        <template #actions>
          <q-btn flat label="취소" v-close-popup />
          <q-btn
            type="submit"
            flat
            label="수정"
            color="primary"
            :loading="isLoading"
          />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>
</template>

<script>
const getInitialForm = () => ({
  // 여기서 초기화
  title: '',
  content: '',
  category: '',
  tags: [],
});
// export default {
//   inheritAttrs: false,
// };
//
</script>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPost, updatePost } from '../../../service/post';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';
/* 컴포넌트 */
import BaseCard from '../../../components/base/BaseCard.vue';
import PostForm from '../../../components/apps/post/PostForm.vue';

const route = useRoute();
const $q = useQuasar();
const form = ref(getInitialForm()); // 여기 넣어줌

const {} = useAsyncState(
  () => getPost(route.params.id),
  {},
  {
    onSuccess: post => {
      console.log('post', post);
      form.value.title = post.title;
      form.value.category = post.category;
      form.value.content = post.content;
      form.value.tags = post.tags;
    },
  },
);

const { isLoading, execute: executeUpdatePost } = useAsyncState(
  updatePost,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: () => {},
  },
);

const handleSubmit = async () => {
  if (confirm('수정 하시겠어요?') === false) {
    return;
  }
  await executeUpdatePost(1000, route.params.id, form.value);
};
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 800px
</route>
