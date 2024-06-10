<template>
  <q-item class="q-py-md">
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima saepe
        facilis facere et. Dolores fugit deserunt expedita, ex odio quae.
        Pariatur voluptate cumque aut fugit reiciendis iusto dignissimos dolores
        ab!
      </div></q-item-section
    >

    <q-item-section side top>
      <q-btn icon="sym_o_delete" flat color="gray" round dense></q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped></style>
