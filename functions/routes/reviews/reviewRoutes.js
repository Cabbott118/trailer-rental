// reviewRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const { Firestore } = require('firebase-admin/firestore');

const router = express.Router();

router.post('/create-review', async (req, res) => {
  try {
    const {
      writtenById,
      writtenByFirstName,
      writtenByLastName,
      writtenFor,
      reviewBody,
      reviewRating,
    } = req.body;
    const newReview = {
      writtenBy: {
        name: `${writtenByFirstName} ${writtenByLastName}`,
        id: writtenById,
      },
      writtenFor,
      reviewBody,
      reviewRating,
      createdAt: Firestore.FieldValue.serverTimestamp(),
    };
    const reviewRef = await admin
      .firestore()
      .collection('reviews')
      .add(newReview);

    const reviewId = reviewRef.id;
    await reviewRef.update({ reviewId });

    const createdReviewDoc = await admin
      .firestore()
      .collection('reviews')
      .doc(reviewId)
      .get();
    const createdReview = createdReviewDoc.data();
    return res.status(201).json({
      message: 'Review document created successfully',
      review: createdReview,
    });
  } catch (error) {
    console.error('Error creating review document', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message, // Include the error message in the response
    });
  }
});

router.get('/get-reviews-written-for', async (req, res) => {
  try {
    const userId = req.query.userId;
    const reviewsRef = admin.firestore().collection('reviews');
    const querySnapshot = await reviewsRef
      .where('writtenFor', '==', userId)
      .get();

    if (querySnapshot.empty) {
      return res.status(200).json({
        message: 'No reviews yet',
        length: 0,
        averageRating: null,
        reviews: [],
      });
    }

    let ratingTotal = 0;
    const reviewsData = querySnapshot.docs.map((doc) => {
      const review = doc.data();
      ratingTotal += review.reviewRating;
      return review;
    });

    return res.status(200).json({
      message: 'Reviews found',
      length: reviewsData.length,
      averageRating: ratingTotal / reviewsData.length,
      reviews: reviewsData,
    });
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
