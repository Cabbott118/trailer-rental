// trailerRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const { Firestore } = require('firebase-admin/firestore');

const router = express.Router();

router.post('/create-trailer', async (req, res) => {
  try {
    const { title, userId, firstName, lastName, imageURL } = req.body;
    const newTrailer = {
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
    const trailerRef = await admin
      .firestore()
      .collection('trailers')
      .add(newTrailer);

    const trailerId = trailerRef.id;
    await trailerRef.update({ trailerId });

    const createdTrailerDoc = await admin
      .firestore()
      .collection('trailers')
      .doc(trailerId)
      .get();
    const createdTrailer = createdTrailerDoc.data();
    return res.status(201).json({
      message: 'Trailer document created successfully',
      trailer: createdTrailer,
    });
  } catch (error) {
    console.error('Error creating trailer document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-all-trailers', async (req, res) => {
  try {
    const trailersRef = admin.firestore().collection('trailers');
    let query = trailersRef; // Initialize the query

    const querySnapshot = await query.orderBy('createdAt', 'desc').get(); // Execute the query
    const trailersData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(trailersData);
  } catch (error) {
    console.error('Error retrieving trailers:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
