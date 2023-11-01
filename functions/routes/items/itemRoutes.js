// itemRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const { Firestore } = require('firebase-admin/firestore');

const router = express.Router();

router.post('/create-item', async (req, res) => {
  try {
    const { title, userId, firstName, lastName, imageURL } = req.body;
    const newItem = {
      title,
      owner: {
        ownerId: userId,
        ownerName: {
          firstName,
          lastName,
        },
      },
      imageURL,
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

module.exports = router;
