<template>
  <StickyHideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          :active="category === null"
          @click="changeCategory(null)"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          @click="changeCategory(cate.value)"
          v-for="cate in categories"
          :key="cate.value"
          clickable
          v-ripple
          :active="category === cate.value"
        >
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickyHideBar>
</template>

<script setup>
import { getCategories } from 'src/service/category.js';
/* 컴포넌트 */
import StickyHideBar from '../../components/StickyHideBar.vue';

const props = defineProps({
  category: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['update:category']);

const changeCategory = value => {
  emits('update:category', value);
};

const categories = getCategories();
</script>

<style lang="scss" scoped></style>
