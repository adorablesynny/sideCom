import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../boot/firebase';

const DEFAULT_PHOTO_URL =
  'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=';

//로그인
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log('user: ', result.user);
}

export async function logout() {
  await signOut(auth);
}

export async function signUpWithEamil({ email, password, nickname }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: nickname,
    photoURL: getenrateDefaultPhotoURL(user.uid),
  });
  console.log('useruser', user);
}

export function getenrateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}
