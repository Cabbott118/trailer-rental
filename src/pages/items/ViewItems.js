import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import { CardMedia, Container, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, clearErrors } from 'store/slices/itemSlice';

const ViewItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const handleNavigateToItem = (item) => {
    navigate(routes.VIEW_ITEM, { state: { item } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data && data.length > 0) {
    return (
      <div>
        <Typography
          variant='h4'
          component='h1'
          align='center'
          sx={{ py: 3, fontSize: 32 }}
        >
          View items
        </Typography>
        <Container maxWidth='md' sx={{ mb: 3 }}>
          <Grid container spacing={6}>
            {data.map((item) => (
              <Grid item key={item?.itemId} xs={12} md={6}>
                <Grid
                  container
                  spacing={1}
                  onClick={() => handleNavigateToItem(item)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Grid item xs={12}>
                    <CardMedia
                      component='img'
                      height='300'
                      image={item.imageURL}
                      alt={item.title}
                      sx={{ borderRadius: 3 }}
                    />
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={10}>
                      <Typography
                        gutterBottom
                        variant='h5'
                        sx={{ fontWeight: 500 }}
                      >
                        {item?.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography align='right' sx={{ pt: 1 }}>
                        $499.00
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body2' color='text.secondary'>
                        {item.owner.ownerName.firstName}{' '}
                        {item.owner.ownerName.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body2' color='text.secondary'>
                        {formatCreatedAt(item?.createdAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Typography
        variant='h4'
        component='h1'
        align='center'
        sx={{ py: 3, fontSize: 32 }}
      >
        No items found
      </Typography>
    </div>
  );
};

export default ViewItems;
