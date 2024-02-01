import { useEffect } from 'react';

// MUI
import { Box, Container, Typography } from '@mui/material';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from 'store/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  // const userData = props.location.state?.userData;

  const { data, stripe, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUserProfile(data?.userId));
  }, []);

  const timestamp = data?.createdAt;
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const formattedDate = date.toLocaleString(); // Convert date to local time string

  return (
    <Box sx={{ minHeight: '80vh', py: 12 }}>
      <Container maxWidth='md'>
        <Typography variant='h6' component='h1' color='text.primary'>
          Profile
        </Typography>
        <Typography variant='body1' color='text.primary'>
          This will be a user's public profile, where other users can view
          things such as a bio, location, reviews/ratings, listed trailers, etc.
        </Typography>
        <Typography variant='body1' color='text.primary'>
          Joined on: {formattedDate}
        </Typography>
      </Container>
    </Box>
  );
};

export default Profile;
