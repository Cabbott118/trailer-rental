// profileRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.get('/get-profile', async (req, res) => {
  try {
    const userId = req.query.userId;
    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Extract only the specified fields from the document data
    const userDetails = {
      fullName: userDoc.get('fullName'),
      userType: userDoc.get('userType'),
      userId: userDoc.get('userId'),
      createdAt: userDoc.get('createdAt'),
    };

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error retrieving profile details: ', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
