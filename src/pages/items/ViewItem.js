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

const ViewItem = () => {
  const theme = useTheme();
  const location = useLocation();
  const item = location.state.item;

  const previousPages = [
    {
      name: 'View items',
      route: routes.VIEW_ITEMS,
    },
  ];

  return (
    <>
      <Container maxWidth='md'>
        <BreadcrumbNavigator
          previousPages={previousPages}
          currentPage={item.title}
        />
      </Container>
      <Container maxWidth='md' sx={{ mt: 3 }}>
        <CardMedia
          component='img'
          image={item.imageURL}
          alt={item.title}
          sx={{ maxWidth: '100%' }}
        />
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant='h3' component='h1'>
              {item.title}
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
              <b>This image is a great value.</b> Some additional info about
              values.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={10}>
            <Typography variant='h5'>
              Item posted by {item.owner.ownerName.firstName}
            </Typography>
            <Typography>{formatCreatedAt(item.createdAt)}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {getUserInitials(item.owner.ownerName)}
            </Avatar>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewItem;
