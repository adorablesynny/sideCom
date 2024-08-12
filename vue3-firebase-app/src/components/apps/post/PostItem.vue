<template>
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${item.id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <div class="flex items-center">
        <span
          >김단감&nbsp;&middot;&nbsp;{{
            formatRelativeTime(item.createdAt)
          }}</span
        >
        <q-chip
          class="q-ml-smw"
          color="primary"
          text-color="white"
          style="height: 1.3rem"
        >
          {{ item.category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ item.title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in item.tags" :key="tag" class="q-mr-sm"
          >#{{ item.tag }}</span
        >
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ item.content }}</div>
      <div class="row items-center" style="height: 27px">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="item.readCount"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_sms"
              :label="item.commentCount"
              tooltip="댓글수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent="toggleLike">
              <PostIcon
                :name="isLike ? 'favorite' : 'sym_o_favorite'"
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
                :label="item.bookmarkCount"
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
import { addLike, hasLike, removeLike } from '../../../service/post';
import { useAuthStore } from '../../../stores/auth';
import { storeToRefs } from 'pinia';
import { toRefs, ref, watch } from 'vue';
import { useLike } from '../../../composables/useLike';

/* 컴포넌트 */
import PostIcon from './PostIcon.vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const { uid, isAuthenticated } = storeToRefs(useAuthStore());

const { isLike, likeCount, toggleLike } = useLike(props.item.id, {
  initialCount: props.item.likeCount,
});
</script>

<style lang="scss" scoped></style>
