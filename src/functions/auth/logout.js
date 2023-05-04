import { signOut } from 'firebase/auth';
import { auth } from '../../utility/firebase';

export const logout = async () => {
  await signOut(auth);
};
