import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { readonly, ref, watch } from 'vue';
import { addBookmark, hasBookmark, removeBookmark } from '../service/post';

export const useBookmark = (id, options) => {
  const { initialCount } = options || {}; // error를 피하기 위해 빈 객체 넣어줌
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());
  const isBookmark = ref(false);
  const bookmarkCount = ref(initialCount);
  const postId = ref(id);

  const toggleBookmark = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용가능합니다.');
      return;
    }
    if (isBookmark.value) {
      await removeBookmark(uid.value, postId.value);
      bookmarkCount.value--;
    } else {
      await addBookmark(uid.value, postId.value);
      bookmarkCount.value++;
    }
    isBookmark.value = !isBookmark.value;
  };

  const initBookmark = async () => {
    if (isAuthenticated.value === false) {
      isBookmark.value = false;
      return;
    }
    isBookmark.value = await hasBookmark(uid.value, postId.value);
  };

  watch(isAuthenticated, () => initBookmark(), { immediate: true });

  return {
    isBookmark,
    bookmarkCount: readonly(bookmarkCount),
    updateBookmarkCount: count => (bookmarkCount.value = count),
    toggleBookmark,
  };
};