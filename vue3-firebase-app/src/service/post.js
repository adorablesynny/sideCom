import { db } from 'boot/firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  updateDoc,
  startAfter,
  limit,
} from 'firebase/firestore';

export async function createPost(data) {
  // id 지정
  // await setDoc(doc(db, 'posts', 'post-id'), {
  //   title: 'hello world!',
  //     ...data,
  //     readCount: 0,
  //     likeCount: 0,
  //     commentCount: 0,
  //     bookmarkCount: 0,
  //     createdAt: serverTimestamp(),
  //   },
  //   {
  //     merge: true,
  // });
  const docRef = await addDoc(collection(db, 'posts'), {
    ...data,
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getPosts(params) {
  // 컬렉션에 있는 모든 문서 조회
  // const querySnapshot = await getDocs(collection(db, 'posts'));
  // const posts = [];
  // querySnapshot.forEach(docs => {
  //   console.log(docs.id, '=>', docs.data());
  //   posts.push(docs.data());
  // });
  // const posts = querySnapshot.docs.map(docs => {
  //   const data = docs.data();
  //   return {
  //     ...data,
  //     id: docs.id,
  //     createdAt: data.createdAt?.toDate(),
  //   };
  // });
  // console.log('posts', posts);

  // 컬렉션에 있는 문서를 쿼리해서 조회
  const conditions = [];
  if (params?.category) {
    conditions.push(where('category', '==', params?.category));
  }
  if (params?.tags && params?.tags.length > 0) {
    conditions.push(where('tags', 'array-contains-any', params?.tags));
  }
  if (params?.sort) {
    conditions.push(orderBy(params.sort, 'desc'));
  }
  if (params?.start) {
    conditions.push(startAfter(params.start));
  }
  if (params?.limit) {
    conditions.push(limit(params.limit));
  }
  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(docs => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  const lastestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    items: posts,
    lastItem: lastestDoc,
  };
}

export async function getPost(id) {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (!docSnap.exists()) {
    throw new Error('no such document.');
  }

  const data = docSnap.data();
  return {
    ...data,
    createdAt: data.createdAt?.toDate(),
  };
}

export async function updatePost(id, data) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id));
}
