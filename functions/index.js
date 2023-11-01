const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

const userRoutes = require('./routes/users/userRoutes');

app.use('/users', userRoutes);

exports.api = functions.https.onRequest(app);
