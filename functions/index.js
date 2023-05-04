const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// GET all items
exports.getAllItems = functions.https.onRequest(async (req, res) => {
  try {
    await db
      .collection('items')
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
        return res.status(200).send(items);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// GET one item
exports.getItemById = functions.https.onRequest(async (req, res) => {
  const itemId = req.params[0];
  try {
    await db
      .collection('items')
      .doc(itemId)
      .get()
      .then((data) => {
        return res.status(200).send(data.data());
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

exports.addItem = functions.https.onRequest(async (req, res) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No Token Found!');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.email = data.docs[0].data().email;
      return next();
    })
    .catch((err) => {
      console.error('Error while verifying token ', err);
      return res.status(403).json(err);
    });

  const userId = req.get('Authorization').split('Bearer ')[1];
  const newItem = {
    title: req.body.title,
    ownerId: userId,
  };

  try {
    await db
      .collection('items')
      .add(newItem)
      .then((data) => {
        const resNewItem = newItem;
        resNewItem.itemId = data.id;
        return res.status(200).send(resNewItem);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});
