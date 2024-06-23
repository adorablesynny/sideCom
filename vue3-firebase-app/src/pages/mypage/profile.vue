<template>
  <div class="q-gutter-y-md">
    <BaseCard>
      <q-form @submit.prevent="handleSubmitProfile">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">프로필 변경</div>
          <q-input
            v-model="displayName"
            outlined
            dense
            label="닉네임"
          ></q-input>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-space />
          <q-btn
            :loading="isLoaindgProfile"
            type="submit"
            label="저장하기"
            flat
            color="primary"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </BaseCard>
    <BaseCard>
      <q-form @submit.prevent="handleSubmitEmail">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">이메일 변경</div>
          <q-input v-model="email" outlined dense label="이메일"></q-input>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-space />
          <q-btn
            :loading="isLoadingEmail"
            type="submit"
            label="저장하기"
            flat
            color="primary"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from 'src/components/base/BaseCard.vue';
import { useQuasar } from 'quasar';
import { ref, watchEffect } from 'vue';
import { updateUserEmail, updateUserProfile } from '../../service/auth';
import { useAuthStore } from '../../stores/auth';
import { useAsyncState } from '@vueuse/core';
import { getErrorMessage } from '../../utils/firebase/error-message';

const { isLoading: isLoaindgProfile, execute: executeProfile } = useAsyncState(
  updateUserProfile,
  null,
  {
    immediate: false,
    onSuccess: () => {
      $q.notify('프로필 수정 완료! 😊');
    },
    onError: err => {
      $q.notify({
        type: 'negative',
        message: getErrorMessage + '프로필 수정에 실패헀어요. 🥲',
      });
    },
  },
);
const handleSubmitProfile = () => {
  executeProfile(1000, displayName.value);
};

const { isLoading: isLoadingEmail, execute: executeEmail } = useAsyncState(
  updateUserEmail,
  null,
  {
    immediate: false,
    onSuccess: () => {
      $q.notify('이메일 수정 완료! 😊');
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: getErrorMessage + '이메일 수정에 실패헀어요. 🥲',
      });
    },
  },
);

const handleSubmitEmail = () => {
  executeEmail(1000, email.value);
};
const authStore = useAuthStore();
const $q = useQuasar();
const displayName = ref('');
const email = ref('');

// const handleSubmitProfile = async () => {
//   await updateUserProfile(displayName.value);
//   $q.notify('프로필 수정 완료! 😊');
// };

// const handleSubmitEmail = async () => {
//   await updateUserEmail(email.value);
//   $q.notify('이메일 수정 완료! 😊');
// };

watchEffect(() => {
  displayName.value = authStore.user?.displayName;
  email.value = authStore.user?.email;
});
</script>

<style lang="scss" scoped></style>
