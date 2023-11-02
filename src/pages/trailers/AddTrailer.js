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
  LinearProgress,
  Paper,
  Step,
  Stepper,
  StepContent,
  StepLabel,
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
import { createTrailer, clearErrors } from 'store/slices/trailerSlice';

const AddTrailer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
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
        createTrailer({ title, userId, firstName, lastName, imageURL })
      ).then((action) => {
        if (!action?.payload?.trailerId) {
          setErrorMessage(action.payload);
          setIsAlertShowing(true);
          setTimeout(() => {
            dispatch(clearErrors());
            setIsAlertShowing(false);
          }, 5000);
        } else {
          navigate(routes.ADD_TRAILER_SUCCESS);
        }
      });
    }
  };

  const steps = [
    {
      label: 'Upload images of your trailer',
      description: (
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
        </Grid>
      ),
    },
    {
      label: 'Provide details about your trailer',
      description: (
        <TextField
          label='Title'
          fullWidth
          {...register('title', { required: true })}
          error={errors.title?.type === 'required'}
          helperText={errors.title?.type === 'required' && 'Title is required'}
          sx={{ my: 1 }}
        />
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container
      maxWidth='md'
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Typography
        variant='h4'
        component='h1'
        align='center'
        sx={{ mb: 3, fontSize: 32 }}
      >
        Add trailer
      </Typography>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.description}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    disabled={!file}
                    onClick={
                      index === steps.length - 1
                        ? handleNext
                        : !imageURL
                        ? handleFileUpload
                        : handleNext
                    }
                    fullWidth
                    variant='contained'
                    sx={{ mt: 1, mr: 1, textTransform: 'none' }}
                  >
                    {index === steps.length - 1
                      ? 'Continue'
                      : !imageURL
                      ? 'Upload image'
                      : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    fullWidth
                    variant='outlined'
                    sx={{ mt: 1, mr: 1, textTransform: 'none' }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <>
          <Paper elevation={3} sx={{ my: 3, p: 3 }}>
            <Typography>Review (work in progress)</Typography>
          </Paper>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={loading}
            sx={{ mt: 1, mr: 1, textTransform: 'none' }}
          >
            Add trailer
          </Button>
          <Button
            onClick={handleBack}
            fullWidth
            variant='outlined'
            disabled={loading}
            sx={{ mt: 1, mr: 1, textTransform: 'none' }}
          >
            Back
          </Button>
        </>
      )}
    </Container>
  );
};

export default AddTrailer;
