// Components
import Alert from 'components/common/Alert';

// Constants
import ROUTES from 'resources/routes-constants';
import { addBankAccount } from 'constants/alertContent';

// MUI
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from 'styles/theme';

// React Router
import { Link } from 'react-router-dom';

const CreateTrailerTile = ({ userData }) => {
  const renderAlert = (condition, severity, text, route) => {
    return condition ? (
      <Alert severity={severity} text={text} route={route} />
    ) : null;
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper variant='outlined'>
        <Grid container>
          <Grid item container xs={12} sx={{ borderRadius: 1 }}>
            <Grid item xs={12}>
              {renderAlert(
                !userData?.verified?.bankAccount,
                'warning',
                addBankAccount,
                ROUTES.ADD_BANK_ACCOUNT
              )}
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1} sx={{ p: 3 }}>
            <Grid item xs={12}>
              <Typography variant='h6'>List your trailer</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary'>
                Provide some details about the trailer you'll be renting out,
                and start making money!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='text'
                fullWidth
                disabled={!userData?.verified?.bankAccount}
                component={Link}
                to={ROUTES.PROFILE}
                sx={{ textTransform: 'none' }}
              >
                List trailer
                <ArrowForwardIcon fontSize='small' sx={{ ml: 1 }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CreateTrailerTile;
