<template>
  <PostList :items="posts"> </PostList>
</template>

<script setup>
import { getUserBookmark } from 'src/service/post';
import PostList from 'src/components/apps/post/PostList.vue';
import { useAuthStore } from '../../stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();

// const posts = Array.from(Array(3), (_, index) => ({
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

const posts = ref([]);
getUserBookmark(authStore.uid).then(result => (posts.value = result));
</script>

<style lang="scss" scoped></style>
