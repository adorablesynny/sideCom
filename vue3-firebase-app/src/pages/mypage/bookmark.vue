<template>
  <PostList :items="posts"> </PostList>
</template>

<script setup>
import PostList from 'src/components/apps/post/PostList.vue';

const posts = Array.from(Array(3), (_, index) => ({
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
</script>

<style lang="scss" scoped></style>
