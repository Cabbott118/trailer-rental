const ROUTES = {
  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',

  // General
  HOME: '/',
  ABOUT_US: '/about-us',
  CONTACT_US: '/contact-us',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_CONFRIMATION: '/forgot-password-confirmation',

  // User
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  NOTIFICATIONS: '/dashboard/notifications',
  NOTIFICATION: '/dashboard/notifications/:notificationId',
  VERIFY_IDENTITY: '/dashboard/verify-identity',
  VERIFY_EMAIL: '/dashboard/verify-email',
  ADD_BANK_ACCOUNT: '/dashboard/add-bank-account',

  // Trailer
  TRAILERS: '/trailers',
  ADD_TRAILER: '/trailers/add-trailer',
  FIND_TRAILERS: '/trailers/find-trailers',
  VIEW_TRAILER: '/trailers/find-trailers/view-trailer/:uid',
  ADD_TRAILER_SUCCESS: '/trailers/add-trailer-success',

  // Test
  TEST: '/',
};

export default ROUTES;
