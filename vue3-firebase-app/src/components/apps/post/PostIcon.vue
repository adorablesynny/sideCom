<template>
  <div>
    <q-icon :name="name" color="grey" size="xs" v-bind="$attrs"></q-icon>
    <span class="text-grey q-ml-xs text-body3">{{ label }}</span>
    <q-tooltip v-if="tooltip" :offset="[0, 4]">{{ tooltip }}</q-tooltip>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  label: [String, Number],
  tooltip: String,
});
</script>

<style lang="scss" scoped></style>
