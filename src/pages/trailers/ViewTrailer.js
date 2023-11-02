// Components
import BreadcrumbNavigator from 'components/common/BreadcrumbNavigator';

// Constants
import routes from 'constants/routes';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

// React Router
import { useLocation } from 'react-router-dom';

const ViewTrailer = () => {
  const theme = useTheme();
  const location = useLocation();
  const trailer = location.state.trailer;

  const previousPages = [
    {
      name: 'View trailers',
      route: routes.VIEW_TRAILERS,
    },
  ];

  return (
    <>
      <Container maxWidth='md'>
        <BreadcrumbNavigator
          previousPages={previousPages}
          currentPage={trailer.type}
        />
      </Container>
      <Container maxWidth='md' sx={{ mt: 3 }}>
        <CardMedia
          component='img'
          image={trailer.imageURL}
          alt={trailer.type}
          sx={{ maxWidth: '100%' }}
        />
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant='h3' component='h1'>
              {trailer.type}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            5 stars | 100 reviews
          </Grid>
          <Grid item xs={12}>
            Polk City, Florida, United States
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container>
          <Grid item xs={12}>
            <Typography>
              <b>This trailer is a great value.</b> Some additional info about
              values.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={10}>
            <Typography variant='h5'>
              Trailer posted by {trailer.owner.ownerName.firstName}
            </Typography>
            <Typography>{formatCreatedAt(trailer.createdAt)}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {getUserInitials(trailer.owner.ownerName)}
            </Avatar>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewTrailer;
