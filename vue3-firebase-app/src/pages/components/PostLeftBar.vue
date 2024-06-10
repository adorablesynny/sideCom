<template>
  <StickyHideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple :active="true">
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="category in categories"
          :key="category.value"
          clickable
          v-ripple
        >
          <q-item-section>{{ category.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickyHideBar>
</template>

<script setup>
import { getCategories } from 'src/service/category.js';
/* 컴포넌트 */
import StickyHideBar from '../../components/StickyHideBar.vue';

const categories = getCategories();
</script>

<style lang="scss" scoped></style>
