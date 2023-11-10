// userRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_SECRET);
const fetch = require('node-fetch');
const router = express.Router();

router.post('/create-user', async (req, res) => {
  try {
    let newUser;
    const {
      userId,
      email,
      firstName,
      lastName,
      userType,
      phoneNumber,
      day,
      month,
      year,
    } = req.body;
    if (userType === 'host') {
      const account = await stripe.accounts.create({
        type: 'custom',
        country: 'US',
        business_type: 'individual',
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
        individual: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phoneNumber,
          dob: {
            day,
            month,
            year,
          },
        },
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: '192.168.0.115',
        },
      });

      newUser = {
        userId,
        email,
        fullName: {
          firstName,
          lastName,
        },
        phoneNumber,
        dob: {
          day,
          month,
          year,
        },
        userType,
        stripeAccountId: account.id,
      };
    } else if (userType === 'renter') {
      newUser = {
        userId,
        email,
        fullName: {
          firstName,
          lastName,
        },
        phoneNumber,
        dob: {
          day,
          month,
          year,
        },
        userType,
      };
    }

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

// router.post('/create-firebase-user', async (req, res) => {
//   try {
//     const { email, password, firstName, lastName, userType } = req.body;

//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//     });

//     // Now, create a record in the Firestore "users" collection
//     const userRecordData = {
//       userId: userRecord.uid,
//       email,
//       fullName: {
//         firstName,
//         lastName,
//       },
//       userType,
//       // Add other user details as needed
//     };

//     await admin
//       .firestore()
//       .collection('users')
//       .doc(userRecord.uid)
//       .set(userRecordData);

//     return res.status(201).json({
//       message: 'User created successfully',
//       user: userRecord,
//     });
//   } catch (error) {
//     console.error('Error creating Firebase user', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

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
    console.error('Error retrieving user details: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-stripe-account-details', async (req, res) => {
  try {
    const stripeAccountId = req.query.stripeAccountId;
    const stripeAccount = await stripe.accounts.retrieve(stripeAccountId);

    return res.status(200).json(stripeAccount);
  } catch (error) {
    console.error('Error retrieving Stripe account details: ', error);
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
    const { userId, stripeAccountId } = req.query;
    const userRef = admin.firestore().collection('users').doc(userId);

    // Delete the user record from Firestore
    await userRef.delete();

    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/accounts/${stripeAccountId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_STRIPE_TEST_SECRET}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Assuming the Stripe API responds with a 200 status for a successful deletion
    if (stripeResponse.status === 200) {
      // Parse the Stripe response if needed
      const stripeData = await stripeResponse.json();
      console.log('Stripe Response:', stripeData);
    } else {
      // Handle errors from the Stripe API
      console.error(
        'Failed to delete Stripe account:',
        stripeResponse.statusText
      );
      return res.status(500).json({ message: 'Failed to delete user data' });
    }

    return res
      .status(200)
      .json({ message: 'User record and Stripe account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user record', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
