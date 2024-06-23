<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        :rules="[validateRequired]"
        v-model="form.nickname"
        placeholder="닉네임"
        outlined
        hide-bottom-space
        dense
      ></q-input>
      <q-input
        :rules="[validateRequired, validateEmail]"
        v-model="form.email"
        placeholder="이메일"
        hide-bottom-space
        outlined
        dense
      ></q-input>
      <q-input
        :rules="[validateRequired, validatePassword]"
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
        hide-bottom-space
        outlined
        dense
      ></q-input>
      <q-input
        :rules="[
          validateRequired,
          val => validatePasswordConfirm(form.password, val),
        ]"
        v-model="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        hide-bottom-space
        outlined
        dense
      ></q-input>
      <q-btn
        @click="$emit('changeView', 'SignUpForm')"
        type="submit"
        label="가입하기"
        class="full-width"
        unelevated
        color="primary"
        :loading="isLoading"
      ></q-btn>

      <q-separator />
      <q-btn
        @click="$emit('changeView', 'SignInForm')"
        label="로그인하기"
        class="full-width"
        unelevated
        flat
      ></q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signUpWithEamil } from '../../service';
import { useQuasar } from 'quasar';

import {
  validateEmail,
  validateRequired,
  validatePassword,
  validatePasswordConfirm,
} from '../../utils/validate-rules';
import { useAsyncState } from '@vueuse/core';
import { getErrorMessage } from '../../utils/firebase/error-message';

// import { signUpWithEamil } from '../../service/auth';

const $q = useQuasar();

const emits = defineEmits(['changeView', 'closeDialog']);

const form = ref({
  nickname: '',
  email: '',
  password: '',
});
const passwordConfirm = ref('');

const { isLoading, execute } = useAsyncState(signUpWithEamil, null, {
  immediate: false,
  onSuccess: () => {
    $q.notify('가입을 환영합니다. 💘');
    $q.notify('이메일에서 인증 링크를 확인해주세요. 🤭');
    emits('closeDialog');
  },
  onError: err => {
    $q.notify({
      type: 'negaitve',
      message: getErrorMessage(err.code),
    });
  },
});

const handleSubmit = () => {
  execute(1000, form.value);
};
// const handleSubmit = async () => {
//   await signUpWithEamil(form.value);
//   $q.notify('가입을 환영합니다. 💘');
//   $q.notify('이메일에서 인증 링크를 확인해주세요. 🤭');
//   emits('closeDialog');
// };
</script>

<style lang="scss" scoped></style>
