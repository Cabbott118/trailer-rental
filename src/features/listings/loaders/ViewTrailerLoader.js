// MUI
import {
  Avatar,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const ViewTrailerLoader = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Container
        maxWidth='md'
        sx={{
          pt: isMobile ? 10 : 20,
          bgcolor: theme.palette.background.default,
        }}
      >
        <Skeleton height='30px' width='200px' />
      </Container>
      <Container
        maxWidth='md'
        sx={{
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
        }}
      >
        <Skeleton height={isMobile ? '250px' : '300px'} />
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Skeleton height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={24} width={200} />
          </Grid>
          <Grid item xs={12} container>
            <Skeleton height={24} width={250} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton height={24} />
          </Grid>
          <Grid item xs={12}>
            {/* Reserve Button */}
            <Skeleton
              height={48}
              sx={{ bgcolor: theme.palette.primary.main }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={10}>
            {/* Trailer posted by */}
            <Skeleton height={32} width={300} />
            {/*  Date */}
            <Skeleton height={24} width={200} />
          </Grid>
          <Grid item xs={2}>
            {/* Avatar */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewTrailerLoader;
