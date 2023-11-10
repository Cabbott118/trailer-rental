import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import reportWebVitals from './reportWebVitals';

// Importing reactfire providers
import { AuthProvider, FirebaseAppProvider } from 'reactfire';
import { auth, firebaseApp } from 'providers/firebase';

// Redux
import { Provider } from 'react-redux';
import store from 'store/store';

// Stripe
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//   'pk_test_51O9pHPAtJ0spbFRQQ2HIqFzHDMumgH5Oob38q1pVFCXaXlwnB7dwszrK81ZHVg4kPKSlqJDxNpYxMHBsqhyXPvEn00Dz78ekU5'
// );

// const options = {
//   // passing the client secret obtained in step 3
//   clientSecret: 'pi_1Gt0Mi2eZvKYlo2C5JxhMqP7_secret_lFjClKSx2qIrwp5OhaR8uuuoK',
//   // Fully customizable with appearance API.
//   // appearance: {/*...*/},
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <AuthProvider sdk={auth}>
        <Provider store={store}>
          {/* <Elements stripe={stripePromise} options={options}> */}
          <App />
          {/* </Elements> */}
        </Provider>
      </AuthProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
