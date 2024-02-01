const userResource = '/users';
const trailerResource = '/trailers';

const ENDPOINTS = {
  // Users
  CREATE_USER: `${userResource}/create-user`,
  CREATE_FIREBASE_USER: `${userResource}/create-firebase-user`,
  GET_USER_DETAILS: `${userResource}/get-user-details`,
  GET_USER_PROFILE_DETAILS: `${userResource}/get-user-profile`,
  GET_STRIPE_ACCOUNT_DETAILS: `${userResource}/get-stripe-account-details`,
  UPDATE_USER: `${userResource}/update-user`,
  DELETE_USER: `${userResource}/delete-user`,

  // Trailers
  CREATE_TRAILER: `${trailerResource}/create-trailer`,
  GET_TRAILER_DETAILS: `${trailerResource}/get-trailer-details`,
  GET_ALL_TRAILERS: `${trailerResource}/get-all-trailers`,
  SEARCH_TRAILERS: `${trailerResource}/search-trailers`,
  UDPATE_TRAILER: `${trailerResource}/update-trailer`,
  DELETE_TRAILER: `${trailerResource}/delete-trailer`,
};

export default ENDPOINTS;
