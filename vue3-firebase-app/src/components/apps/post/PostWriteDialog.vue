<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{ width: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
      </q-toolbar>
      <q-separator />
      <q-form class="q-pa-md q-gutter-y-sm">
        <q-input v-model="form.title" outlined placeholder="제목" />
        <q-select v-model="form.category" outlined :options="categories">
          <template v-if="!form.category" #selected>
            <span class="text-grey-7">카테고리를 선택하세요.</span>
          </template>
        </q-select>
        <q-input
          v-model="form.content"
          type="textarea"
          outlined
          placeholder="내용을 작성해주세요."
        />
        <q-input
          v-model="tagField"
          outlined
          placeholder="태그를 입력해주세요. 입력 후 Enter!"
          prefix="#"
        />
        <q-chip outline dense removable color="teal" @remove="removeTag"
          >vuejs</q-chip
        >
      </q-form>
      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn type="submit" flat label="저장하기" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

//
<script>
const getInitialForm = () => ({
  // 여기서 초기화
  title: '',
  contents: '',
  category: '',
  tags: [],
});
// export default {
//   inheritAttrs: false,
// };
//
</script>
<script setup>
import { ref } from 'vue';
import { getCategories } from 'src/service/category.js';

const form = ref(getInitialForm()); // 여기 넣어줌

const tagField = ref('');

const removeTag = () => {};

const categories = getCategories();

const onHide = () => {
  // form.value.title = '';  ...
  form.value = getInitialForm();
  tagField.value = '';
};
</script>

<style lang="scss" scoped></style>
