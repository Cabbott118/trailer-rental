import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from 'providers/firebase';

// Function to sign in a user with email and password
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // You can customize the user object to include any additional data you need
    return { uid: user.uid, email: user.email };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

// Function to create a user with email and password
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // You can customize the user object to include any additional data you need
    return { uid: user.uid, email: user.email };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to sign out the current user
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};
