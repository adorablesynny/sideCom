<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        v-model="form.nickname"
        placeholder="닉네임"
        outlined
        dense
      ></q-input>
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
      ></q-input>
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
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

// import { signUpWithEamil } from '../../service/auth';

const $q = useQuasar();

const emits = defineEmits(['changeView', 'closeDialog']);

const form = ref({
  nickname: '',
  email: '',
  password: '',
});

const handleSubmit = async () => {
  await signUpWithEamil(form.value);
  $q.notify('가입을 환영합니다. 💘');
  emits('closeDialog');
};
</script>

<style lang="scss" scoped></style>
