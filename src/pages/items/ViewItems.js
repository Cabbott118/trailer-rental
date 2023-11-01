import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, clearErrors } from 'store/slices/itemSlice';

const ViewItems = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (data && data.length > 0) {
    return (
      <div>
        <Typography variant='h4' component='h1' align='center'>
          View Items
        </Typography>
        <Container maxWidth='md'>
          <Grid container spacing={2}>
            {data.map((item) => (
              <Grid item key={item.itemId} xs={12}>
                <Box border={1} p={2}>
                  <Typography variant='h6'>{item.title}</Typography>
                  {/* Render other item details here */}
                </Box>
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
