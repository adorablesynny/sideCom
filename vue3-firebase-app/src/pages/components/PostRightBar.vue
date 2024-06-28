<template>
  <StickyHideBar>
    <q-btn
      padding="8px 12px"
      unelevated
      color="primary"
      text-color="white"
      class="full-width"
    >
      <q-avatar class="q-mr-sm" color="white" text-color="primary" size="22px">
        <q-icon name="edit" size="14px"></q-icon>
      </q-avatar>
      <span @click="$emit('openWriteDialog')" class="text-weight-bold"
        >새 포스트 작성하기</span
      >
    </q-btn>

    <q-card class="q-mt-md bg-grey-1" bordered flat>
      <q-card-section class="flex items-center q-pb-none">
        <div class="text-weight-bold">태그</div>
        <q-space></q-space>
        <q-btn icon="refresh" dense size="sm" flat round color="grey"> </q-btn>
      </q-card-section>
      <q-card-section class="q-pb=sm">
        <q-card class="q-px-sm" bordered flat square>
          <q-input
            borderless
            dense
            input-style="font-size: 12px"
            placeholder="태그로 검색하세요."
            @keypress.enter.prevent="addTag"
          >
          </q-input>
          <div class="q-gutter-sm q-pb-sm">
            <q-btn
              v-for="(tag, index) in tags"
              :key="tag"
              size="10px"
              padding="2px 4px 2px 7px"
              color="grey-3"
              text-color="dark"
              unelevated
              @click="removeTag(index)"
            >
              {{ tag }}
              <q-icon name="clear" size="12px" color="grey"></q-icon>
            </q-btn>
          </div>
        </q-card>
        <q-list padding>
          <q-item
            v-for="tag in tags"
            :key="tag.name"
            clickable
            dense
            @click="addTag('string')"
          >
            <q-item-section class="text-teal text-caption"
              ># {{ tag }}</q-item-section
            >
            <q-item-section side class="text-teal text-caption"
              >10</q-item-section
            >
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </StickyHideBar>
</template>

<script setup>
import { ref, toRef } from 'vue';
import { useTag } from '../../composables/useTag';

/* 컴포넌트 */
import StickyHideBar from '../../components/StickyHideBar.vue';

const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
});
// const tags = ref([
//   { name: 'vuejs', count: 10 },
//   { name: 'react', count: 8 },
//   { name: 'angular', count: 7 },
//   { name: 'html', count: 3 },
//   { name: 'css', count: 12 },
// ]);

const emits = defineEmits(['openWriteDialog', 'update:tags']);

const { addTag, removeTag } = useTag({
  updateTags: tags => emits('update:tags', tags),
  tags: toRef(props, 'tags'),
  maxLengthMessage: '태그는 10개 이상 등록할 수 없습니다. ✏️',
});
</script>

<style lang="scss" scoped></style>
