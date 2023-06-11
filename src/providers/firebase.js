// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Adding necessary sdks including auth
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFCyjP3pqxHG_4OUS7xf9nFuUCxhtkC5E',
  authDomain: 'cha-template.firebaseapp.com',
  projectId: 'cha-template',
  storageBucket: 'cha-template.appspot.com',
  messagingSenderId: '678006086833',
  appId: '1:678006086833:web:1a2279d62bed01fca31690',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
