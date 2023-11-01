// itemRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const { Firestore } = require('firebase-admin/firestore');

const router = express.Router();

router.post('/create-item', async (req, res) => {
  try {
    const { title, userId, firstName, lastName } = req.body;
    const newItem = {
      title,
      owner: {
        ownerId: userId,
        ownerName: {
          firstName,
          lastName,
        },
      },
      createdAt: Firestore.FieldValue.serverTimestamp(),
    };
    const itemRef = await admin.firestore().collection('items').add(newItem);

    const itemId = itemRef.id;
    await itemRef.update({ itemId });

    const createdItemDoc = await admin
      .firestore()
      .collection('items')
      .doc(itemId)
      .get();
    const createdItem = createdItemDoc.data();
    return res.status(201).json({
      message: 'Item document created successfully',
      item: createdItem,
    });
  } catch (error) {
    console.error('Error creating item document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-all-items', async (req, res) => {
  try {
    const itemsRef = admin.firestore().collection('items');
    let query = itemsRef; // Initialize the query

    const querySnapshot = await query.orderBy('createdAt', 'desc').get(); // Execute the query
    const itemsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(itemsData);
  } catch (error) {
    console.error('Error retrieving items:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.get('/get-user-details', async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     const userRef = admin.firestore().collection('users').doc(userId);
//     const userDoc = await userRef.get();

//     if (!userDoc.exists) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userDetails = userDoc.data();
//     return res.status(200).json(userDetails);
//   } catch (error) {
//     console.error('Error retrieving user details:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// router.patch('/update-user', async (req, res) => {
//   try {
//     const { userId, updateData } = req.body;
//     await admin.firestore().collection('users').doc(userId).update(updateData);
//     // Retrieve the updated user data from Firestore
//     const updatedUserDoc = await admin
//       .firestore()
//       .collection('users')
//       .doc(userId)
//       .get();
//     const updatedUser = updatedUserDoc.data();
//     return res.status(200).json({
//       message: 'User document updated successfully',
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error('Error updating user document', error);
//     return res.status(500).json({ message: 'Internal Server Error', error });
//   }
// });

// router.delete('/delete-user', async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const userRef = admin.firestore().collection('users').doc(userId);

//     // Delete the user record from Firestore
//     await userRef.delete();

//     return res
//       .status(200)
//       .json({ message: 'User record deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user record', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

module.exports = router;
