import { boot } from 'quasar/wrappers';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

function requiresAuth(to) {
  const $q = useQuasar();
  const { isAuthenticated } = storeToRefs(useAuthStore());

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !isAuthenticated.value
  ) {
    $q.notify({
      message: '로그인 후 이용할 수 있습니다.',
      color: 'negative',
    });
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
