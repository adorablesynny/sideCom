<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" />

      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>

      <PostRightBar class="col-3" @open-write-dialog="openWriteDialog" />
    </div>
    <PostWriteDialog v-model="postDialog" />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

/* 컴포너트  */
import PostList from '../components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from '../components/apps/post/PostWriteDialog.vue';

const router = useRouter();

const goPostDetails = id => {
  router.push(`/posts/${id}`);
};

const posts = Array.from(Array(20), (_, index) => ({
  id: index + 1,
  title: 'Vue3 Firebase 강의 ✏️',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus quisquam excepturi vitae tempore error nobis asperiores, alias dignissimos aut perspiciatis velit impedit ipsa assumenda, ea saepe, ratione cumque quis expedita.',
  readCount: 15,
  commentCount: 1,
  likeCount: 3,
  bookmarkCount: 5,
  category: '카테고리' + index,
  tags: ['html', 'css', 'javaSciprt'],
  uid: '김단감',
}));

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};
</script>

<style lang="scss" scoped></style>
