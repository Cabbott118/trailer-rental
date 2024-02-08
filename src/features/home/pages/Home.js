import { useEffect } from 'react';

// Components
import HomeBanner from 'features/home/components/HomeBanner';
import SearchWidget from 'features/home/components/SearchWidget';
import SearchWidgetLoader from 'features/home/loaders/SearchWidgetLoader';
import TestSearch from '../components/TestSearch';

// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import { Box, Button, Container, useTheme } from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { clearTrailerData } from 'store/slices/trailerSlice';

export default function Home() {
  document.title = 'Trailer Rental';

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.userId) {
      dispatch(fetchUser(user.userId));
    }
  }, []);

  const clearDataClick = () => {
    dispatch(clearTrailerData());
  };

  if (error) {
    return navigate(ROUTES.ERROR);
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth='md' sx={{ minHeight: '100vh' }}>
        <HomeBanner />
        <TestSearch />
        {loading ? <SearchWidgetLoader /> : <SearchWidget />}
      </Container>
      <Button onClick={clearDataClick}>Clear Trailer Data</Button>
    </Box>
  );
}
