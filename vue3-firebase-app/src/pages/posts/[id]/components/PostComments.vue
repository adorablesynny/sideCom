<template>
  <div>
    <div class="text-subtitle1 text-weight-bold q-mb-lg">댓글 6</div>

    <div v-if="isActive">
      <q-input type="textarea" class="bg-white" outlined></q-input>
      <div class="flex justify-end q-gutter-x-sm q-mt-sm">
        <q-btn
          label="취소"
          color="dark"
          unelevated
          @click="toggleActive"
        ></q-btn>
        <q-btn label="등록" color="primary" unelevated></q-btn>
      </div>
    </div>

    <q-card v-else @click="toggleActive" class="cursorP">
      <q-card-section class="flex items-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </q-card>

    <q-list class="q-mt-lg bg-white" bordered separator>
      <q-item>
        <q-item-section side top>
          <q-avatar size="md">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <div class="flex text-caption">
            <span>김단감</span>
            <span class="q-mx-xs">&middot;</span>
            <span class="text-grey-6">3일 전</span>
          </div>
          <div class="q-mt-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            saepe facilis facere et. Dolores fugit deserunt expedita, ex odio
            quae. Pariatur voluptate cumque aut fugit reiciendis iusto
            dignissimos dolores ab!
          </div></q-item-section
        >

        <q-item-section side top>
          <q-btn icon="sym_o_delete" flat color="gray" round dense></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isActive = ref(false);
const toggleActive = () => {
  isActive.value = !isActive.value;
};
</script>

<style lang="scss" scoped></style>
