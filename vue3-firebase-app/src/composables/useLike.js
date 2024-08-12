import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { readonly, ref, watch } from 'vue';
import { addLike, hasLike, removeLike } from '../service/post';

export const useLike = (id, options) => {
  const { initialCount } = options || {}; // error를 피하기 위해 빈 객체 넣어줌
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());
  const isLike = ref(false);
  const likeCount = ref(initialCount);
  const postId = ref(id);

  const toggleLike = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용가능합니다.');
      return;
    }
    if (isLike.value) {
      await removeLike(uid.value, postId.value);
      likeCount.value--;
    } else {
      await addLike(uid.value, postId.value);
      likeCount.value++;
    }
    isLike.value = !isLike.value;
  };

  const initLike = async () => {
    if (isAuthenticated.value === false) {
      isLike.value = false;
      return;
    }
    isLike.value = await hasLike(uid.value, postId.value);
  };

  watch(isAuthenticated, () => initLike(), { immediate: true });

  return {
    isLike,
    likeCount: readonly(likeCount),
    updateLikeCount: count => (likeCount.value = count),
    toggleLike,
  };
};
