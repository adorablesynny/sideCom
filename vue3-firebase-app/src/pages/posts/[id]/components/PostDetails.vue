<template>
  <BaseCard class="q-pa-lg">
    <div class="flex q-mb-md">
      <q-btn
        icon="sym_o_arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
        @click="$router.back()"
      ></q-btn>
      <q-space></q-space>
      <q-btn
        :icon="isLike ? 'favorite' : 'sym_o_favorite'"
        flat
        round
        dense
        color="red"
        size="16px"
        @click="toggleLike"
      ></q-btn>
      <q-btn
        icon="sym_o_bookmark"
        flat
        round
        dense
        color="blue"
        size="16px"
      ></q-btn>
    </div>

    <div class="flex items-center q-mb-md">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
      </q-avatar>
      <div class="q-ml-md">
        <div>김단감</div>
        <div class="text-grey-6">
          {{ date.formatDate(post.createdAt, 'YYYY/MM/DD HH:mm:ss') }}
        </div>
      </div>
      <q-space></q-space>
      <q-btn v-if="hasOwnContent(post.uid)" icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              clickable
              v-close-popup
              :to="`/posts/${$route.params.id}/edit`"
            >
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item @click="handleDeletePost" clickable v-close-popup>
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="g-mt-md text-h5 text-weight-bold">{{ post?.title }}</div>
    <div class="text-teal">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}&nbsp;</span>
      {{ post.category }}
    </div>
    <div
      class="row items-center q-gutter-x-md q-mt-md justify-end"
      style="height: 27px"
    >
      <PostIcon
        name="sym_o_visibility"
        :label="post.readCount"
        tooltip="조회수"
      />
      <PostIcon name="sym_o_sms" :label="post.commentCount" tooltip="댓글수" />
      <PostIcon name="sym_o_favorite" :label="likeCount" tooltip="좋아요" />
      <PostIcon
        name="sym_o_bookmark"
        :label="post.bookmarkCount"
        tooltip="북마크"
      />
    </div>
    <q-separator class="q-my-lg" />
    <TiptapViewer v-if="post.content" :content="post.content" />
  </BaseCard>
</template>

<script setup>
import { ref } from 'vue';
import { date, useQuasar } from 'quasar';
import { useAsyncState } from '@vueuse/core';
import { getPost, deletePost, getPostDetails } from '../../../../service/post';

import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../../stores/auth';
import { useLike } from '../../../../composables/useLike';

/* 컴포넌트 */
import PostIcon from '../../../../components/apps/post/PostIcon.vue';
import BaseCard from '../../../../components/base/BaseCard.vue';
import TiptapViewer from '../../../../components/tiptap/TiptapViewer.vue';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const { hasOwnContent } = useAuthStore();

const post = ref({});
const { error } = useAsyncState(
  () => getPostDetails(route.params.id),
  {},
  {
    onSuccess: result => {
      post.value = result.post;
      updateLikeCount(result.post.likeCount);
    },
  },
);

const { execute: executeDeletePost } = useAsyncState(
  deletePost,
  {},
  {
    immediate: false,
    onSuccess: () => {
      $q.notify('삭제가 완료되었습니다. 🤚');
      router.push('/');
    },
  },
);
const handleDeletePost = async () => {
  if (confirm('삭제 하시겠습니까?') === false) {
    return;
  }
  await executeDeletePost(0, route.params.id);
};

const { isLike, likeCount, toggleLike, updateLikeCount } = useLike(
  route.params.id,
);
</script>

<style lang="scss" scoped></style>
