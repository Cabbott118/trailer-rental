const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

const userRoutes = require('./routes/users/userRoutes');
const itemRoutes = require('./routes/items/itemRoutes');

app.use('/users', userRoutes);
app.use('/items', itemRoutes);

exports.api = functions.https.onRequest(app);
