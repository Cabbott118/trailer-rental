import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utility/firebase';

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
  }
};
