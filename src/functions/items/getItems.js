import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../utility/firebase';

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, 'items'));
  let items = [];
  querySnapshot.forEach((doc) => {
    items.push(doc.data());
  });
  console.log(items);
  return items;
};
