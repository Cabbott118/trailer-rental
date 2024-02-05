// trailerRoutes.js
const express = require('express');
const admin = require('firebase-admin');
const { Firestore } = require('firebase-admin/firestore');

const router = express.Router();

router.post('/create-reservation', async (req, res) => {
  try {
    const { trailerId, ownerId, renterId, startDate, endDate } = req.body;
    const newReservation = {
      status: 'NEW',
      renterId,
      dates: {
        startDate,
        endDate,
      },
      trailer: {
        ownerId,
        trailerId,
      },
      createdAt: Firestore.FieldValue.serverTimestamp(),
    };
    const reservationRef = await admin
      .firestore()
      .collection('reservations')
      .add(newReservation);

    const reservationId = reservationRef.id;
    await reservationRef.update({ reservationId });

    const createdReservationDoc = await admin
      .firestore()
      .collection('reservations')
      .doc(reservationId)
      .get();
    const createdReservation = createdReservationDoc.data();
    return res.status(201).json({
      message: 'Reservation document created successfully',
      reservation: createdReservation,
    });
  } catch (error) {
    console.error('Error creating reservation document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-reservations-assigned-trailer', async (req, res) => {
  try {
    const trailerId = req.query.trailerId;
    const reservationsRef = admin.firestore().collection('reservations');
    const querySnapshot = await reservationsRef
      .where('trailer.trailerId', '==', trailerId)
      .get();

    if (querySnapshot.empty) {
      return res.status(200).json({
        message: 'No reservations found for the specified trailer',
        length: 0,
        reservations: [],
      });
    }

    const reservationsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      message: 'Reservations found',
      length: reservationsData.length,
      reservations: reservationsData,
    });
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-reservations-assigned-owner', async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const reservationsRef = admin.firestore().collection('reservations');
    const querySnapshot = await reservationsRef
      .where('trailer.ownerId', '==', ownerId)
      .get();

    if (querySnapshot.empty) {
      return res.status(200).json({
        message: 'No reservations found for the specified trailer owner',
        length: 0,
        reservations: [],
      });
    }

    const reservationsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      message: 'Reservations found',
      length: reservationsData.length,
      reservations: reservationsData,
    });
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-reservations-assigned-renter', async (req, res) => {
  try {
    const renterId = req.query.renterId;
    const reservationsRef = admin.firestore().collection('reservations');
    const querySnapshot = await reservationsRef
      .where('renterId', '==', renterId)
      .get();

    if (querySnapshot.empty) {
      return res.status(200).json({
        message: 'No reservations found for the specified renter',
        length: 0,
        reservations: [],
      });
    }

    const reservationsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      message: 'Reservations found',
      length: reservationsData.length,
      reservations: reservationsData,
    });
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
