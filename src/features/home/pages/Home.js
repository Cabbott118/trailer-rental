import { useEffect } from 'react';

// Components
import HomeBanner from 'features/home/components/HomeBanner';
import SearchWidget from 'features/home/components/SearchWidget';

// MUI
import { Box, Container, useTheme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';

export default function Home() {
  document.title = 'Trailer Rental';
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (data && data.userId) {
      dispatch(fetchUser(data.userId));
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        // bgcolor: theme.additionalPalette.secondary,
      }}
    >
      <Container maxWidth='sm' sx={{ minHeight: '100vh' }}>
        <HomeBanner />
        <SearchWidget />
      </Container>
    </Box>
  );
}
