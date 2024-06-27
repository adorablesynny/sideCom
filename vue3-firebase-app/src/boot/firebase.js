import { boot } from 'quasar/wrappers';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '../stores/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDbBmZQPQG_0WLh-GV2On3LlMVy1hRFadg',
  authDomain: 'harper-vue3-firebase-app.firebaseapp.com',
  projectId: 'harper-vue3-firebase-app',
  storageBucket: 'harper-vue3-firebase-app.appspot.com',
  messagingSenderId: '352921353392',
  appId: '1:352921353392:web:831c950e0d8e8bf2074f75',
  measurementId: 'G-Q4R4KVHRMT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  const authStore = useAuthStore();

  onAuthStateChanged(auth, user => {
    console.log('##user', user);
    authStore.setUser(user);
  });
});
