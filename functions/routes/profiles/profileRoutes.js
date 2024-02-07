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
    const profileDetails = extractProfileDetails(userDoc);

    const trailersData = await fetchTrailersData(userId);
    const reviewsData = await fetchReviewsData(userId);

    return res.status(200).json({
      profile: profileDetails,
      trailers: trailersData,
      reviews: reviewsData,
    });
  } catch (error) {
    console.error('Error retrieving profile details: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Helper function to extract profile details
function extractProfileDetails(userDoc) {
  return {
    fullName: userDoc.get('fullName'),
    userType: userDoc.get('userType'),
    userId: userDoc.get('userId'),
    createdAt: userDoc.get('createdAt'),
  };
}

// Helper function to fetch trailers data
async function fetchTrailersData(userId) {
  const trailersRef = admin.firestore().collection('trailers');
  const trailersQuerySnapshot = await trailersRef
    .where('owner.ownerId', '==', userId)
    .get();

  if (trailersQuerySnapshot.empty) {
    return {
      message: 'No trailers found for the specified owner',
      length: 0,
      trailers: [],
    };
  } else {
    const trailersData = trailersQuerySnapshot.docs.map((doc) => doc.data());
    return {
      message: 'Trailers found',
      length: trailersData.length,
      trailers: trailersData,
    };
  }
}

// Helper function to fetch reviews data
async function fetchReviewsData(userId) {
  const reviewsRef = admin.firestore().collection('reviews');
  const reviewsQuerySnapshot = await reviewsRef
    .where('writtenFor', '==', userId)
    .get();

  if (reviewsQuerySnapshot.empty) {
    return {
      message: 'No reviews yet',
      length: 0,
      averageRating: null,
      reviews: [],
    };
  } else {
    let ratingTotal = 0;
    const reviewsData = reviewsQuerySnapshot.docs.map((doc) => {
      const review = doc.data();
      ratingTotal += review.reviewRating;
      return review;
    });
    return {
      message: 'Reviews found',
      length: reviewsData.length,
      averageRating: ratingTotal / reviewsData.length,
      reviews: reviewsData,
    };
  }
}

module.exports = router;
