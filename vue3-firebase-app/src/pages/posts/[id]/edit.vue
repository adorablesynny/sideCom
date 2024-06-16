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
      >
        <template #actions>
          <q-btn flat label="취소" v-close-popup />
          <q-btn type="submit" flat label="수정" color="primary" />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>
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
import BaseCard from '../../../components/base/BaseCard.vue';
import PostForm from '../../../components/apps/post/PostForm.vue';

const form = ref(getInitialForm()); // 여기 넣어줌
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 800px
</route>
