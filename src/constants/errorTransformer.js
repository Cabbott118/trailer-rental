const errorTransformer = (error) => {
  switch (error) {
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'Email is already in use';
      break;

    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      return 'Password must be at least 6 characters long';
      break;

    case 'Firebase: Error (auth/user-not-found).':
      return 'Incorrect email or password';
      break;

    case 'Firebase: Error (auth/wrong-password).':
      return 'Incorrect email or password';
      break;

    case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
      return 'Too many log in attempts - account locked';
      break;

    default:
      break;
  }
};

export default errorTransformer;
