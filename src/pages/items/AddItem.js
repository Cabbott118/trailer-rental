import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';

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

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createItem, clearErrors } from 'store/slices/itemSlice';

const AddItem = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);
  const {
    userId,
    fullName: { firstName, lastName },
  } = data;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { title } = data;
    dispatch(createItem({ title, userId, firstName, lastName })).then(
      (action) => {
        if (!action?.payload?.itemId) {
          setErrorMessage(action.payload);
          setIsAlertShowing(true);
          setTimeout(() => {
            dispatch(clearErrors());
            setIsAlertShowing(false);
          }, 5000);
        } else {
          navigate(routes.ADD_ITEM_SUCCESS);
        }
      }
    );
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant='h4'
        component='h1'
        align='center'
        sx={{ py: 3, fontSize: 32 }}
      >
        Add item
      </Typography>
      <Container maxWidth='xs'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label='Title'
              fullWidth
              {...register('title', { required: true })}
              error={errors.title?.type === 'required'}
              helperText={
                errors.title?.type === 'required' && 'Title is required'
              }
            />
          </Grid>
          {isAlertShowing && (
            <Grid item xs={12}>
              <Alert text={errorMessage} severity='error' />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Add item
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddItem;
