import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../utility/firebase';

export const addItem = async (title, desc) => {
  await addDoc(collection(db, 'items'), {
    title,
    desc,
    ownerId: auth.currentUser.uid,
  });
};
