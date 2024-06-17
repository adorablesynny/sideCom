<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md">
      <q-input placeholder="이메일" outlined dense></q-input>
      <q-input placeholder="비밀번호" outlined dense></q-input>
      <div>
        <q-btn
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
        ></q-btn>
        <div class="flex justify-between">
          <q-btn
            @click="$emit('changeView', 'FindPasswordForm')"
            label="비밀번호 찾기"
            flat
            dense
            size="13px"
          ></q-btn>
          <q-btn
            @click="$emit('changeView', 'SignUpForm')"
            label="이메일 가입 하기"
            flat
            dense
            size="13px"
          ></q-btn>
        </div>
      </div>
      <q-separator />
      <q-btn
        label="구글 계정으로 로그인"
        class="full-width"
        unelevated
        color="primary"
        outline
        @click="handleSignInGoogle"
      ></q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { signInWithGoogle } from '../../service/auth';

const emits = defineEmits(['changeView']);

// 로그인 (구글)
const handleSignInGoogle = async () => {
  await signInWithGoogle();
};
</script>

<style lang="scss" scoped></style>
