<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="val => $emit('update:modelValue', val)"
    transition-show="none"
    transition-hide="none"
    @hide="changeViewMode('SignInForm')"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>

      <q-card-section class="q-px-xl q-pb-xl">
        <!-- v-if 를 활용한 조건부 렌더링 -->
        <!-- <SignInForm
          @change-view="changeViewMode"
          v-if="viewMode === 'SignInForm'"
        />
        <SignUpForm
          @change-view="changeViewMode"
          v-else-if="viewMode === 'SignUpForm'"
        />
        <FindPasswordForm @change-view="changeViewMode" v-else /> -->
        <!-- 동적 컴포넌트 -->
        <component
          :is="authViewComponents[viewMode]"
          @change-view="changeViewMode"
        ></component>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
/* 컴포넌트 */
// import SignInForm from './SignInForm.vue';
// import SignUpForm from './SignUpForm.vue';
// import FindPasswordForm from './FindPasswordForm.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:modelValue']);

const viewMode = ref('SignInForm');
const changeViewMode = mode => (viewMode.value = mode);

// const authViewComponents = {
//   SignInForm,
//   SignUpForm,
//   FindPasswordForm,
// };
const authViewComponents = {
  SignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
  SignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
  FindPasswordForm: defineAsyncComponent(() =>
    import('./FindPasswordForm.vue'),
  ),
};
</script>

<style lang="scss" scoped></style>
