const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// GET all items
exports.getAllItems = functions.https.onRequest((req, res) => {
  db.collection('items')
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          itemId: doc.id,
          ownerId: doc.data().ownerId,
          title: doc.data().title,
        });
      });
      return res.json(items);
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ error: error.code });
    });
});

// GET one item
exports.getOneItem = functions.https.onRequest((req, res) => {
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({
          error: 'Could not find item!',
        });
      }

      let itemData = doc.data();
      itemData.itemId = doc.id;
      return res.json(itemData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: error.code });
    });
});
