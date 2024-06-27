<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{ minWidth: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        @submit="
          execute(1000, {
            ...form,
            uid: authStore.uid,
          })
        "
        :loading="isLoading"
      >
      </PostForm>
    </q-card>
  </q-dialog>
</template>

<script>
const getInitialForm = () => ({
  // 여기서 초기화
  title: '',
  contents: '',
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
import { getCategories } from 'src/service/category.js';
import PostForm from './PostForm.vue';
import { createPost } from '../../../service';
import { useAsyncState } from '@vueuse/core';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const form = ref(getInitialForm()); // 여기 넣어줌

const onHide = () => {
  // form.value.title = '';  ...
  form.value = getInitialForm();
  // tagField.value = '';
};

const { isLoading, execute } = useAsyncState(createPost, null, {
  immediate: false,
  throwError: true,
  onSuccess: postId => {
    router.push(`/posts/${postId}`);
  },
});
// const handleSubmit = async () => {
//   await execute(1000, {
//     ...form.value,
//     uid: authStore.uid,
//   });
// };
</script>

<style lang="scss" scoped></style>
