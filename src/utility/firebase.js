import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

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

export { auth, onAuthStateChanged, db };
