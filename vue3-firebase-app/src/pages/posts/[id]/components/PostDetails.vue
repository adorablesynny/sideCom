<template>
  <BaseCard class="q-pa-lg">
    <div class="flex q-mb-md">
      <q-btn
        icon="sym_o_arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
      ></q-btn>
      <q-space></q-space>
      <q-btn
        icon="sym_o_ favorite"
        flat
        round
        dense
        color="red"
        size="16px"
      ></q-btn>
      <q-btn
        icon="sym_o_bookmark"
        flat
        round
        dense
        color="blue"
        size="16px"
      ></q-btn>
    </div>

    <div class="flex items-center q-mb-md">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
      </q-avatar>
      <div class="q-ml-md">
        <div>김단감</div>
        <div class="text-grey-6">3일전</div>
      </div>
      <q-space></q-space>
      <q-btn icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="g-mt-md text-h5 text-weight-bold">나는야 강아지 김단감!</div>
    <div
      class="row items-center q-gutter-x-md q-mt-md justify-end"
      style="height: 27px"
    >
      <PostIcon name="sym_o_visibility" label="1" tooltip="조회수" />
      <PostIcon name="sym_o_sms" label="4" tooltip="댓글수" />
      <PostIcon name="sym_o_favorite" label="2" tooltip="좋아요" />
      <PostIcon name="sym_o_bookmark" label="3" tooltip="북마크" />
    </div>
    <q-separator class="q-my-lg" />
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aut
      distinctio, corporis esse eveniet, totam non nisi dolorum quidem
      consectetur, porro repudiandae doloremque. Doloribus iusto cupiditate
      deserunt asperiores repellendus voluptatibus. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Maiores aut distinctio, corporis esse
      eveniet, totam non nisi dolorum quidem consectetur, porro repudiandae
      doloremque. Doloribus iusto cupiditate deserunt asperiores repellendus
      voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Maiores aut distinctio, corporis esse eveniet, totam non nisi dolorum
      quidem consectetur, porro repudiandae doloremque. Doloribus iusto
      cupiditate deserunt asperiores repellendus voluptatibus. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Maiores aut distinctio, corporis
      esse eveniet, totam non nisi dolorum quidem consectetur, porro repudiandae
      doloremque. Doloribus iusto cupiditate deserunt asperiores repellendus
      voluptatibus.
    </div>
  </BaseCard>
</template>

<script setup>
/* 컴포넌트 */
import PostIcon from '../../../../components/apps/post/PostIcon.vue';
import BaseCard from '../../../../components/base/BaseCard.vue';
</script>

<style lang="scss" scoped></style>
