// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
// const analytics = getAnalytics(fire);
const auth = getAuth(fire);

export { auth };
