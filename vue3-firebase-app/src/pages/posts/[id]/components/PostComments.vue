<template>
  <div>
    <div class="text-subtitle1 text-weight-bold q-mb-lg">댓글</div>

    <div v-if="isActive">
      <q-form @submit.prevent="handleAddComment">
        <q-input
          type="textarea"
          :rules="[validateRequired]"
          outlined
          v-model="message"
          hide-bottom-space
        ></q-input>
        <div class="flex justify-end q-gutter-x-sm q-mt-sm">
          <q-btn
            label="취소"
            color="dark"
            unelevated
            @click="toggleActive"
          ></q-btn>
          <q-btn
            :loading="isLoading"
            type="submit"
            label="등록"
            color="primary"
            unelevated
          ></q-btn>
        </div>
      </q-form>
    </div>

    <BaseCard v-else @click="toggleActive" class="cursorP">
      <q-card-section class="flex items-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </BaseCard>

    <CommentList
      @deleted="deletedComment"
      :postId="route.params.id"
      :items="comments"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import { useAuthStore } from '../../../../stores/auth';
import { addComment, getComments } from '../../../../service/comment';
import { validateRequired } from '../../../../utils/validate-rules';

/* 컴포넌트 */
import CommentList from 'src/components/apps/post/comment/CommentList.vue';
import BaseCard from 'src/components/base/BaseCard.vue';

const route = useRoute();
const isActive = ref(false);
const toggleActive = () => {
  isActive.value = !isActive.value;
};

const authStore = useAuthStore();

const { state: comments, execute: executeGetComments } = useAsyncState(
  () => getComments(route.params.id),
  [],
  {
    resetOnExecute: false, // false를 하지 않으면 addComments 실행 이후 리렌더링 할 때 기본값 []으로 반짝 나타나게 됨.
  },
);

const message = ref('');
const { isLoading, execute: executeAddComment } = useAsyncState(
  addComment,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: () => {
      message.value = '';
      (isActive.value = false), executeGetComments(0);
    },
  },
);

const handleAddComment = async () => {
  const result = await executeAddComment(0, route.params.id, {
    message: message.value,
    uid: authStore.uid,
  });
};
// const comments = ref([{ id: 1 }, { id: 2 }, { id: 3 }]);

const deletedComment = () => {
  executeGetComments(0);
};
</script>

<style lang="scss" scoped></style>
