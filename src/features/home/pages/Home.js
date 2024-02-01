import { useEffect } from 'react';

// Components
import HomeBanner from 'features/home/components/HomeBanner';
import SearchWidget from 'features/home/components/SearchWidget';

// MUI
import { Box, Button, Container, useTheme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { clearTrailerData } from 'store/slices/trailerSlice';

export default function Home() {
  document.title = 'Trailer Rental';

  const { data, loading } = useSelector((state) => state.user);

  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.userId) {
      dispatch(fetchUser(data.userId));
    }
  }, []);

  const clearDataClick = () => {
    dispatch(clearTrailerData());
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth='sm' sx={{ minHeight: '100vh' }}>
        <HomeBanner />
        <SearchWidget />
      </Container>
      <Button onClick={clearDataClick}>Clear Trailer Data</Button>
    </Box>
  );
}
