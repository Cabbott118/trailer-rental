// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import { CardMedia, Grid, Typography, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// React Router
import { useNavigate } from 'react-router-dom';

export default function SearchResults({ filteredList }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigateToTrailer = (trailer) => {
    navigate(ROUTES.VIEW_TRAILER.replace(':uid', trailer?.trailerId));
  };

  return (
    <Grid container sx={{ py: 3 }}>
      {filteredList.map((trailer) => (
        <Grid item key={trailer?.trailerId} xs={12} sx={{ mb: 6 }}>
          <Grid
            container
            spacing={1}
            onClick={() => handleNavigateToTrailer(trailer)}
            sx={{
              cursor: 'pointer',
              position: 'relative', // Ensure relative positioning for absolute text
            }}
          >
            <Grid item xs={12} container>
              <CardMedia
                component='img'
                height='300'
                image={trailer.imageURL}
                alt={trailer.type}
                sx={{ borderRadius: 3 }}
              />
              {/* Text overlay */}

              <Typography
                variant='body1'
                color='text.primary'
                sx={{
                  position: 'absolute',
                  bottom: 89,
                  left: 8,
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '0 0 0 8px',
                }}
              >
                <LocationOnIcon color='primary' fontSize='sm' />{' '}
                {trailer?.location?.city}, {trailer?.location?.state}
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={10}>
                <Typography
                  gutterBottom
                  variant='h5'
                  color='text.primary'
                  sx={{ fontWeight: 500 }}
                >
                  {trailer?.type}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align='right' color='text.primary' sx={{ pt: 1 }}>
                  ${trailer?.dailyRate}/Day
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  {trailer.owner.ownerName.firstName}{' '}
                  {trailer.owner.ownerName.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  {formatCreatedAt(trailer?.createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
