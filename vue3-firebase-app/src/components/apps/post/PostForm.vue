<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input
        v-model="titleModel"
        outlined
        placeholder="제목"
        hide-bottom-space
        :rules="[validateRequired]"
      />
      <q-select
        v-model="categoryModel"
        outlined
        :options="categories"
        emit-value
        map-options
        hide-bottom-space
        :rules="[validateRequired]"
      >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <TiptapEditor v-model="contentModel" />
      <q-input
        outlined
        placeholder="태그를 입력해주세요. 입력 후 Enter!"
        prefix="#"
        @keypress.enter.prevent="addTag"
      />
      <q-chip
        v-for="(tag, index) in tags"
        :key="tag"
        @remove="removeTag(index)"
        outline
        dense
        removable
        color="teal"
        >{{ tag }}
      </q-chip>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn
          type="submit"
          flat
          label="저장하기"
          color="primary"
          :loading="loading"
        />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { computed, ref, toRef } from 'vue';
import { getCategories } from 'src/service/category.js';
import { validateRequired } from 'src/utils/validate-rules';
import TiptapEditor from '../../../components/tiptap/TiptapEditor.vue';
import { useQuasar } from 'quasar';
import { useTag } from '../../../composables/useTag';
import { useRoute } from 'vue-router';

const route = useRoute();
const $q = useQuasar();
const props = defineProps({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
  'submit',
]);

const titleModel = computed({
  get: () => props.title,
  set: val => emits('update:title', val),
});

const categoryModel = computed({
  get: () => props.category,
  set: val => emits('update:category', val),
});

const contentModel = computed({
  get: () => props.content,
  set: val => emits('update:content', val),
});

const categories = getCategories();

const handleSubmit = () => {
  if (!contentModel.value) {
    $q.notify('내용을 작성해주세요. 🥲');
    return;
  }
  emits('submit');

  if (!route.params.id) {
    $q.notify('게시글이 성공적으로 작성되었습니다. 🌱');
  } else {
    $q.notify('수정이 완료되었습니다. 🥰');
  }
};

const { addTag, removeTag } = useTag({
  updateTags: tags => emits('update:tags', tags),
  tags: toRef(props, 'tags'),
  maxLengthMessage: '태그는 10개 이상 등록할 수 없습니다. ✏️',
});
</script>

<style lang="scss" scoped></style>
