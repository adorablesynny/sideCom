import { boot } from 'quasar/wrappers';
import { getErrorMessage } from '../utils/firebase/error-message';
import { Notify } from 'quasar';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.config.errorHandler = (err, instance, info) => {
    console.log(err);
    console.log(instance);
    console.log(info);
    Notify.create(getErrorMessage(err.code));
  };
});
