import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../utility/firebase';

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, 'items'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};
