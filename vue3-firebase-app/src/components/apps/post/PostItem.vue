<template>
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <div class="flex items-center">
        <span
          >김단감&nbsp;&middot;&nbsp;{{ formatRelativeTime(createdAt) }}</span
        >
        <q-chip
          class="q-ml-smw"
          color="primary"
          text-color="white"
          style="height: 1.3rem"
        >
          {{ category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in tags" :key="tag" class="q-mr-sm">#{{ tag }}</span>
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ content }}</div>
      <div class="row items-center" style="height: 27px">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="readCount"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon name="sym_o_sms" :label="commentCount" tooltip="댓글수" />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <PostIcon
                name="sym_o_favorite"
                :label="likeCount"
                tooltip="좋아요"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <PostIcon
                name="sym_o_bookmark"
                :label="bookmarkCount"
                tooltip="북마크"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { date } from 'quasar';
import { formatRelativeTime } from '../../../utils/relative-time-format';

/* 컴포넌트 */
import PostIcon from './PostIcon.vue';

const props = defineProps({
  title: String,
  id: [Number, String],
  content: String,
  readCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  bookmarkCount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  tags: {
    type: Array,
    default: () => [], // 디폴트로는 빈 배열
  },
  uid: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
