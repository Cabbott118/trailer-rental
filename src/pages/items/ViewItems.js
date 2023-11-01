import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, clearErrors } from 'store/slices/itemSlice';

const ViewItems = () => {
  const dispatch = useDispatch();

  const { data, items, loading } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);
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
        <Container maxWidth='md'>
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item key={item?.itemId} xs={12} md={6}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image={item.imageURL}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {item?.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Created by {item?.owner?.ownerName?.firstName}{' '}
                        {item?.owner?.ownerName?.lastName} at{' '}
                        {formatCreatedAt(item?.createdAt)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size='small'
                      color='primary'
                      sx={{ textTransform: 'none' }}
                    >
                      View item
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Typography variant='h4' component='h1' align='center'>
        No items found.
      </Typography>
    </div>
  );
};

export default ViewItems;
