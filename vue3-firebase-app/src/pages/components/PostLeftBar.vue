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
/* 컴포넌트 */
import StickyHideBar from '../../components/StickyHideBar.vue';

const categories = [
  { label: 'Q&A', value: 'qna' },
  { label: '커뮤니티', value: 'community' },
  { label: '공지사항', value: 'notice' },
  { label: '강의', value: 'lecture' },
];
</script>

<style lang="scss" scoped></style>
