import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// Constants
import routes from 'constants/routes';

// Firebase
import { storage } from 'providers/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  LinearProgress,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createItem, clearErrors } from 'store/slices/itemSlice';

const AddItem = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [percent, setPercent] = useState(0);
  const [imageURL, setImageURL] = useState(null);
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

  function handleChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreview(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  const handleFileUpload = () => {
    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageURL(url);
        });
      }
    );
  };

  const onSubmit = (data) => {
    if (!file) {
      setErrorMessage('An image must be uploaded.');
      setIsAlertShowing(true);
    } else {
      const { title } = data;
      dispatch(
        createItem({ title, userId, firstName, lastName, imageURL })
      ).then((action) => {
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
      });
    }
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
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Button
                variant='contained'
                component='label'
                onChange={handleChange}
                fullWidth
                sx={{ textTransform: 'none', mb: 3 }}
              >
                Select image
                <input type='file' hidden />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 350,
                  borderRadius: 1,
                  bgcolor: theme.additionalPalette.secondary,
                }}
              >
                <img
                  src={filePreview}
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
              </Box>
              <LinearProgress variant='determinate' value={percent} />
              <Typography variant='body1'>{file?.name}</Typography>
            </Grid>

            <Button
              onClick={handleFileUpload}
              disabled={!file}
              variant='outlined'
              fullWidth
              sx={{ textTransform: 'none', mt: 3 }}
            >
              Upload image
            </Button>
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
              disabled={loading || !imageURL}
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
