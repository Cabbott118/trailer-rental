import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utility/firebase';

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        return userCredentials.user.getIdToken();
      }
    );
  } catch (err) {
    console.error(err);
  }
};
