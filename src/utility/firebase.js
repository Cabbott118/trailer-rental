// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCfnPqhmtfeaKzlk4kjn1grKcpB4bAvn24',
  authDomain: 'trailer-rental-facce.firebaseapp.com',
  databaseURL: 'https://trailer-rental-facce-default-rtdb.firebaseio.com',
  projectId: 'trailer-rental-facce',
  storageBucket: 'trailer-rental-facce.appspot.com',
  messagingSenderId: '1002679932971',
  appId: '1:1002679932971:web:4a047ac226edc56fa6726e',
  measurementId: 'G-1TMJRYDTMT',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(auth);
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (
  firstName,
  lastName,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      firstName,
      lastName,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

const getUserDetails = async () => {
  // try {
  const user = auth.currentUser;
  //   const docs = await query(
  //     collection(db, 'users'),
  //     where('uid', '==', user.uid)
  //   );
  //   const res = await getDocs(docs);
  //   console.log(res.docs);
  // } catch (err) {
  //   console.error(err);
  // }

  const querySnapshot = await getDocs(
    collection(db, 'users'),
    where('uid', '==', user.uid)
  );
  querySnapshot.forEach((doc) => {
    return doc.data();
  });
};

export {
  auth,
  db,
  signInWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getUserDetails,
};
