<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />

      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="posts" />
      </section>

      <PostRightBar
        class="col-3"
        v-model:tags="params.tags"
        @open-write-dialog="openWriteDialog"
      />
    </div>
    <PostWriteDialog v-model="postDialog" @complete="completeRegistPost" />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
import { getPosts } from '../service/post';
import { useAsyncState } from '@vueuse/core';

/* 컴포너트  */
import PostList from '../components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from '../components/apps/post/PostWriteDialog.vue';

const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
});
const router = useRouter();

const goPostDetails = id => {
  router.push(`/posts/${id}`);
};

// const posts = Array.from(Array(20), (_, index) => ({
//   id: index + 1,
//   title: 'Vue3 Firebase 강의 ✏️',
//   content:
//     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus quisquam excepturi vitae tempore error nobis asperiores, alias dignissimos aut perspiciatis velit impedit ipsa assumenda, ea saepe, ratione cumque quis expedita.',
//   readCount: 15,
//   commentCount: 1,
//   likeCount: 3,
//   bookmarkCount: 5,
//   category: '카테고리' + index,
//   tags: ['html', 'css', 'javaSciprt'],
//   uid: '김단감',
// }));

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

const { state: posts, execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
});

watch(
  () => params,
  newval => {
    execute(0, params.value);
  },
  {
    deep: true,
    immediate: true, // 이건 useAsyncState에서 써도 되지만 일관성을 위해 여기에 작성
  },
);

const completeRegistPost = () => {
  postDialog.value = false;
  execute(0, params.value);
};
</script>

<style lang="scss" scoped></style>
