import { getDocs, collection, where, query } from 'firebase/firestore';
import { auth, db } from '../../utility/firebase';

export const getUsersItems = async () => {
  const q = query(
    collection(db, 'items'),
    where('ownerId', '==', auth.currentUser?.uid)
  );
  const querySnapshot = await getDocs(q);
  const itemData = [];
  querySnapshot.forEach((doc) => {
    itemData.push(doc.data());
  });
  return itemData;
};
