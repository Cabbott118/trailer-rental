// trailerRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const { Firestore } = require('firebase-admin/firestore');
const functions = require('firebase-functions');
const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const axios = require('axios');

const router = express.Router();

router.post('/create-trailer', async (req, res) => {
  try {
    const {
      type,
      address,
      city,
      state,
      userId,
      firstName,
      lastName,
      imageURL,
    } = req.body;

    // Call the Google Maps Geocoding API to convert address to coordinates
    const apiKey = functions.config().googlemaps.apikey;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      `${address}, ${city}, ${state}`
    )}&key=${googleApiKey}`;
    const response = await axios.get(geocodingUrl);

    if (response.data.results.length === 0) {
      throw new Error(JSON.stringify(response.data));
    }

    const { lat, lng } = response.data.results[0].geometry.location;

    const newTrailer = {
      type,
      location: {
        address,
        city,
        state,
        coordinates: { lat, lng },
      },
      owner: {
        ownerId: userId,
        ownerName: {
          firstName,
          lastName,
        },
      },
      searchableTerms: [city.toLowerCase(), type.toLowerCase()],
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
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
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

router.get('/get-trailer-details', async (req, res) => {
  try {
    const trailerId = req.query.trailerId;
    const trailerRef = admin.firestore().collection('trailers').doc(trailerId);
    const trailerDoc = await trailerRef.get();

    if (!trailerDoc.exists) {
      return res.status(404).json({ message: 'Trailer not found' });
    }

    const trailerDetails = trailerDoc.data();
    return res.status(200).json(trailerDetails);
  } catch (error) {
    console.error('Error retrieving trailer details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-trailers-owned-by', async (req, res) => {
  try {
    const userId = req.query.userId;
    const trailersRef = admin.firestore().collection('trailers');
    const querySnapshot = await trailersRef
      .where('owner.ownerId', '==', userId)
      .get();

    if (querySnapshot.empty) {
      return res.status(200).json({
        message: 'No trailers found for the specified owner',
        length: 0,
        trailers: [],
      });
    }

    const trailersData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      message: 'Trailers found',
      length: trailersData.length,
      trailers: trailersData,
    });
  } catch (error) {
    console.error('Error retrieving trailers:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.get('/search-trailers', async (req, res) => {
//   try {
//     const location = req.query.location;
//     const trailersRef = admin.firestore().collection('trailers');

//     const querySnapshot = await trailersRef
//       .where('searchableTerms', 'array-contains', location.toLowerCase())
//       .orderBy('createdAt', 'desc')
//       .get();

//     if (querySnapshot.empty) {
//       return res.status(200).json({
//         message: 'No trailers were found in our search',
//       });
//     }

//     const trailersData = querySnapshot.docs.map((doc) => doc.data());

//     return res.status(200).json(trailersData);
//   } catch (error) {
//     console.error('Error retrieving trailers:', error);
//     return res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// });

module.exports = router;
