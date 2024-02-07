const userResource = '/users';
const profileResource = '/profiles';
const trailerResource = '/trailers';
const reviewResource = '/reviews';
const reservationResource = '/reservations';

const ENDPOINTS = {
  // Users
  CREATE_USER: `${userResource}/create-user`,
  CREATE_FIREBASE_USER: `${userResource}/create-firebase-user`,
  GET_USER_DETAILS: `${userResource}/get-user-details`,
  GET_STRIPE_ACCOUNT_DETAILS: `${userResource}/get-stripe-account-details`,
  UPDATE_USER: `${userResource}/update-user`,
  DELETE_USER: `${userResource}/delete-user`,

  // Profile
  GET_PROFILE_DETAILS: `${profileResource}/get-profile`,

  // Trailers
  CREATE_TRAILER: `${trailerResource}/create-trailer`,
  GET_TRAILER_DETAILS: `${trailerResource}/get-trailer-details`,
  GET_ALL_TRAILERS: `${trailerResource}/get-all-trailers`,
  GET_TRAILERS_OWNED_BY: `${trailerResource}/get-trailers-owned-by`,
  SEARCH_TRAILERS: `${trailerResource}/search-trailers`,
  UDPATE_TRAILER: `${trailerResource}/update-trailer`,
  DELETE_TRAILER: `${trailerResource}/delete-trailer`,

  // Reviews
  CREATE_REVIEW: `${reviewResource}//create-review`,
  GET_REVIEWS_WRITTEN_FOR: `${reviewResource}/get-reviews-written-for`,

  // Reservations
  GET_RESERVATIONS_ASSIGNED_TO_TRAILER: `${reservationResource}/get-reservations-assigned-trailer`,
  GET_RESERVATIONS_ASSIGNED_TO_OWNER: `${reservationResource}/get-reservations-assigned-owner`,
  GET_RESERVATIONS_ASSIGNED_TO_RENTER: `${reservationResource}/get-reservations-assigned-renter`,
  CREATE_RESERVATION: `${reservationResource}/create-reservation`,
  UPDATE_RESERVATION: `${reservationResource}/update-reservation`,
};

export default ENDPOINTS;
