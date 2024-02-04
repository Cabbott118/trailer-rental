// Components
import FilterTrailers from 'features/search/components/FilterTrailers';
import MapWithMarkers from 'features/map/components/MapWithMarkers';
import SearchResults from 'features/search/components/SearchResults';

// MUI
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Redux
import { useSelector } from 'react-redux';

export default function Search() {
  document.title = 'Trailer Rental';

  const { filteredList, searchedLocation, searchedType, loading } = useSelector(
    (state) => state.trailer
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      maxWidth='md'
      sx={{
        pt: isMobile ? 10 : 12,
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component='h1'
            color={theme.palette.primary.contrastText}
          >
            Search Trailers
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <FilterTrailers />
          <MapWithMarkers filteredList={filteredList} />
        </Grid>
        <Grid item xs={12} md={7}>
          {loading ? (
            <p>Loading...</p>
          ) : filteredList.length > 0 ? (
            <>
              <SearchResults filteredList={filteredList} />
            </>
          ) : (
            <Grid container justifyContent='center'>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography
                  variant='body1'
                  component='h1'
                  color='text.primary'
                  sx={{ py: 3 }}
                >
                  {searchedLocation
                    ? "We couldn't find any trailers that matched your search"
                    : ''}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
