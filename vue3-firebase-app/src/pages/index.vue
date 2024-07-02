<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />

      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="items" />
        <!-- <q-btn
          v-if="isLoadMore"
          class="full-width q-mt-md"
          label="더보기"
          outline
          @click="loadMore"
        /> -->
        <div v-intersection-observer="handleIntersectionObserver"></div>
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
import { formatRelativeTime } from '../utils/relative-time-format';
import { vIntersectionObserver } from '@vueuse/components';

/* 컴포너트  */
import PostList from '../components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from '../components/apps/post/PostWriteDialog.vue';

const time = formatRelativeTime();
const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
  limit: 7,
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
const items = ref([]);
const start = ref(null);
const isLoadMore = ref(true);

const { execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
  onSuccess: result => {
    if (start.value) {
      items.value = items.value.concat(result.items); // 더보기라면
    } else {
      items.value = result.items;
    }
    isLoadMore.value = result.items.length >= params.value.limit;
    start.value = result.lastItem;
  },
});

watch(
  () => params,
  newval => {
    // 카테고리나 정렬이 바뀐다면
    start.value = null;
    execute(0, params.value);
  },
  {
    deep: true,
    // immediate: true, // 이건 useAsyncState에서 써도 되지만 일관성을 위해 여기에 작성
  },
);

const completeRegistPost = () => {
  postDialog.value = false;
  start.value = null;
  execute(0, params.value);
};

const loadMore = () => {
  execute(0, { ...params.value, start: start.value });
};

// const vIntersectionObserver = {
//   beforeMount: (el, binding) => {
//     const observer = new IntersectionObserver(binding.value);
//     observer.observe(el);
//   },
// };

const handleIntersectionObserver = ([{ isIntersecting }]) => {
  if (isIntersecting && isLoadMore.value) {
    //화면에 보일 때
    console.log('### 화면에 노출');
    loadMore();
  }
};
</script>

<style lang="scss" scoped></style>
