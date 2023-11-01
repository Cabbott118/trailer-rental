// userRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-user', async (req, res) => {
  try {
    const { userId, email, firstName, lastName } = req.body;
    const newUser = {
      userId: userId,
      email,
      fullName: {
        firstName,
        lastName,
      },
      userType: 'normal',
    };
    await admin.firestore().collection('users').doc(userId).set(newUser);
    // Retrieve the created user data from Firestore
    const createdUserDoc = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();
    const createdUser = createdUserDoc.data();
    return res.status(201).json({
      message: 'User document created successfully',
      user: createdUser,
    });
  } catch (error) {
    console.error('Error creating user document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/create-firebase-user', async (req, res) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Now, create a record in the Firestore "users" collection
    const userRecordData = {
      userId: userRecord.uid,
      email,
      fullName: {
        firstName,
        lastName,
      },
      userType,
      // Add other user details as needed
    };

    await admin
      .firestore()
      .collection('users')
      .doc(userRecord.uid)
      .set(userRecordData);

    return res.status(201).json({
      message: 'User created successfully',
      user: userRecord,
    });
  } catch (error) {
    console.error('Error creating Firebase user', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-user-details', async (req, res) => {
  try {
    const userId = req.query.userId;
    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDetails = userDoc.data();
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error retrieving user details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/update-user', async (req, res) => {
  try {
    const { userId, updateData } = req.body;
    await admin.firestore().collection('users').doc(userId).update(updateData);
    // Retrieve the updated user data from Firestore
    const updatedUserDoc = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();
    const updatedUser = updatedUserDoc.data();
    return res.status(200).json({
      message: 'User document updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user document', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.delete('/delete-user', async (req, res) => {
  try {
    const { userId } = req.query;
    const userRef = admin.firestore().collection('users').doc(userId);

    // Delete the user record from Firestore
    await userRef.delete();

    return res
      .status(200)
      .json({ message: 'User record deleted successfully' });
  } catch (error) {
    console.error('Error deleting user record', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
