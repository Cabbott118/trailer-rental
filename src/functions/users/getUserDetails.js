import { getDocs, collection, where, query } from 'firebase/firestore';
import { auth, db } from '../../utility/firebase';

export const getUserDetails = async () => {
  const q = query(
    collection(db, 'users'),
    where('uid', '==', auth.currentUser?.uid)
  );
  const querySnapshot = await getDocs(q);
  const userData = [];
  querySnapshot.forEach((doc) => {
    userData.push(doc.data());
  });
  return userData[0]; // assuming there's only one user with the specified UID
};
