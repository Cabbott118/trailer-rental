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
exports.getItemById = functions.https.onRequest(async (req, res) => {
  const itemId = req.path.substring(1); // assuming path parameter is passed as /{id}
  const itemRef = db.collection('items').doc(itemId);
  try {
    const itemDoc = await itemRef.get();
    if (itemDoc.exists) {
      res.json(itemDoc.data());
    } else {
      res.status(404).json({ error: 'Item not found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});
