import { doc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../utility/firebase';

// id is now an attribute of the user obj

const updateUserDetails = async (recordId, updatedFields) => {
  try {
    const recordRef = doc(db, 'users', recordId);
    await updateDoc(recordRef, updatedFields);
    console.log('Record updated successfully!');
  } catch (error) {
    console.error('Error updating record:', error);
  }
};
