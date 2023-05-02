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
  const itemId = req.params[0];
  console.log(itemId);
  try {
    const snapshot = await admin
      .firestore()
      .collection('items')
      .doc(itemId)
      .get();
    const data = snapshot.data();

    if (!data) {
      return res.status(404).send('Item not found');
    }

    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

exports.addItem = functions.https.onRequest(async (req, res) => {
  const newItem = {
    title: req.body.title,
  };

  db.collection('items')
    .add(newItem)
    .then((data) => {
      const resNewItem = newItem;
      resNewItem.itemId = data.id;
      res.json(resNewItem);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    });
});
