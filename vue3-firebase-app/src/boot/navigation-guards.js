import { boot } from 'quasar/wrappers';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

function requiresAuth(to) {
  const { isAuthenticated } = storeToRefs(useAuthStore());

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !isAuthenticated.value
  ) {
    alert('로그인이 필요한 페이지입니다.');
    return '/';
  }
  return true; //생략가능
}
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  router.beforeEach(requiresAuth);
  // something to do
});
