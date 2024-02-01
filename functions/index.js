const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_SECRET);

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

const userRoutes = require('./routes/users/userRoutes');
const profileRoutes = require('./routes/profiles/profileRoutes');
const trailerRoutes = require('./routes/trailers/trailerRoutes');
const reviewRoutes = require('./routes/reviews/reviewRoutes');

app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/trailers', trailerRoutes);
app.use('/reviews', reviewRoutes);

exports.createStripeAccount = functions.https.onRequest(async (req, res) => {
  try {
    // const frontFileUpload = await stripe.files.create({
    //   purpose: 'identity_document',
    //   file: {
    //     data: 'https://firebasestorage.googleapis.com/v0/b/trailer-rental-eca77.appspot.com/o/images%2FIMG_6774-800x600.jpg?alt=media&token=294d3be2-5ae5-4bd5-8a57-20d389ff22e3', // Read your front document file.
    //     //   name: 'front_identity_document', // Provide the file name.
    //   },
    // });

    // const backFileUpload = await stripe.files.create({
    //   purpose: 'identity_document',
    //   file: {
    //     data: fs.readFileSync('./success.png'), // Read your back document file.
    //     //   name: 'back_identity_document.pdf', // Provide the file name.
    //   },
    // });
    // Create a Custom Stripe Connect account for an individual.
    const account = await stripe.accounts.create({
      type: 'custom',
      country: 'US',
      business_type: 'individual',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      individual: {
        // Provide details about the individual.
        first_name: 'Caleb',
        last_name: 'Abbott',
        email: 'calebhaabbott94@gmail.com',
        phone: '863-245-5252',
        ssn_last_4: '0000',
        dob: {
          day: 18,
          month: 1,
          year: 1994,
        },
        address: {
          line1: 'address_full_match',
          city: 'Polk City',
          state: 'FL',
          postal_code: '33868',
          country: 'US',
        },
        // Verify identity and provide any required documents or information for identity verification.
        // verification: {
        //   document: {
        //     front: frontFileUpload.id,
        //     back: backFileUpload.id,
        //   },
        // },
        // You may need to provide additional information like social security number or personal ID.
      },
      business_profile: {
        name: 'Caleb Abbott',
        support_phone: '863-245-5252',
        mcc: '5734',
        url: 'https://trailer-rental-eca77.web.app/',
        // Additional business profile information (e.g., MCC and business URL) may be required.
      },
      company: {
        name: 'Trailer Rental',
        tax_id: '000-00-0000',
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000), // Acceptance date
        ip: '192.168.0.115', // IP address of the individual accepting the terms
      },

      // More settings specific to your use case.
    });

    // Save the Stripe account information to your Firebase Realtime Database or Firestore.
    // For simplicity, let's store the account ID. You'll use this to link the bank account details later.
    // Make sure to securely store this ID.

    // You can use Firestore, for example:
    const accountRef = admin
      .firestore()
      .collection('stripe_accounts')
      .doc(account.id);
    await accountRef.set({ id: account.id });

    res.status(200).json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

exports.collectBankAccount = functions.https.onRequest(async (req, res) => {
  try {
    // Assuming you receive the bank account details from the client.
    const {
      account_number,
      routing_number,
      account_holder_name,
      customAccountId,
    } = req.body;

    // Create a bank account token with Stripe
    const bankAccountToken = await stripe.tokens.create({
      bank_account: {
        account_number,
        routing_number,
        account_holder_name,
        country: 'US',
      },
    });

    // Link the bank account token to the custom Stripe Connect account
    await stripe.accounts.createExternalAccount(
      customAccountId, // Custom account ID
      {
        external_account: bankAccountToken.id,
      }
    );

    res
      .status(200)
      .json({ message: 'Bank account added successfully.', bankAccountToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

exports.processPayment = functions.https.onRequest(async (req, res) => {
  try {
    // const { token } = req.body;
    const amount = 1000;
    // Create a Payment Intent with the provided token
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., $10)
      currency: 'usd',
      statement_descriptor: 'Trailer Rental',
      //   payment_method_types: ['card'],
      application_fee_amount: 100, // Your application's fee in cents (e.g., $1)
      transfer_data: {
        // amount: amount - 800, // Cannot have both this value and application_fee_amount
        destination: 'acct_1OAaKkPG54LxaUNr', // Service provider's Stripe account ID
      },
      //   confirm: true,
      //   payment_method: token,
    });

    // Handle the success of the payment and send a response
    res.status(200).json({ message: 'Payment successful', paymentIntent });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

exports.deleteStripeAccount = functions.https.onRequest(async (req, res) => {
  const { accountId } = req.body;

  try {
    // Deactivate the Stripe Connect account
    await stripe.accounts.update(accountId, {
      individual: {
        first_name: 'Deactivated',
        last_name: 'Account',
      },
      business_profile: {
        name: 'Deactivated Account',
      },
      metadata: {
        status: 'deleted',
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: '0.0.0.0', // Replace with the actual IP address.
      },
      capabilities: {
        transfers: 'none', // Remove the ability to transfer funds
      },
      legal_entity: {
        type: 'individual',
      },
      settings: {
        payouts: {
          schedule: {
            interval: 'manual', // Disable automatic payouts
          },
        },
      },
    });

    res.status(200).send('Stripe Connect account has been deactivated.');
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send('An error occurred while deactivating the Stripe Connect account.');
  }
});

// exports.createPayment = functions.https.onRequest(async (req, res) => {
//   const { customer_id, service_provider_id, amount } = req.body;

//   try {
//     // Calculate the amount to be transferred to the service provider
//     const appFee = Math.floor(amount * 0.1); // 10% fee for the app
//     const providerAmount = amount - appFee;

//     // Create a payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd',
//       application_fee_amount: appFee,
//       transfer_data: {
//         destination: service_provider_id, // Service provider's Stripe account ID
//       },
//     });

//     // Save payment details to your database
//     const paymentRecord = {
//       customer_id,
//       service_provider_id,
//       providerAmount,
//       amount,
//       app_fee: appFee,
//       payment_intent_id: paymentIntent.id,
//       created_at: admin.firestore.FieldValue.serverTimestamp(),
//     };

//     const paymentRef = await db.collection('payments').add(paymentRecord);

//     res.status(200).json({ payment_id: paymentRef.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred.');
//   }
// });

exports.api = functions.https.onRequest(app);
