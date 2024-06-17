<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSignInEmail">
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
      ></q-input>
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        outlined
        dense
      ></q-input>
      <div>
        <q-btn
          type="submit"
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
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { signInWithEmail, signInWithGoogle } from '../../service/auth';

const emits = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

// 로그인 (구글)
const handleSignInGoogle = async () => {
  await signInWithGoogle();
  $q.notify('구글로 다시 돌아오셨네요! 반가워요. 💕');
  emits('closeDialog');
};

// 로그인 (이메일)
const form = ref({
  email: '',
  password: '',
});

const handleSignInEmail = async () => {
  await signInWithEmail(form.value);
  $q.notify('이메일로 다시 돌아오셨네요! 반가워요. 💕');
  emits('closeDialog');
};
</script>

<style lang="scss" scoped></style>
