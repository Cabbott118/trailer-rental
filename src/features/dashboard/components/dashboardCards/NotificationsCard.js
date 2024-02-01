// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';

// React Router
import { Link } from 'react-router-dom';

const NotificationsCard = ({ userData }) => {
  const theme = useTheme();
  // TODO: Pass in userData.userId to retrieve notifications
  const notifications = [
    {
      text: 'Logged in successfully- MOCK',
      timestamp: 'Nov. 6, 12:00pm',
      isRead: true,
      notificationId: '123',
    },
    {
      text: 'Logged out - MOCK',
      timestamp: 'Nov. 6, 12:01pm',
      isRead: false,
      notificationId: '456',
    },
    {
      text: 'Logged in successfully - MOCK',
      timestamp: 'Nov. 6, 12:03pm',
      isRead: false,
      notificationId: '789',
    },
  ];

  const notificationsList = () => {
    return (
      <List>
        {notifications.map((notification) => (
          <ListItem
            key={notification?.notificationId}
            component={Link}
            to={ROUTES.NOTIFICATION.replace(
              ':notificationId',
              notification?.notificationId
            )}
            sx={{
              bgcolor: notification?.isRead
                ? ''
                : theme.additionalPalette.secondary,
              borderRadius: 3,
              my: 1,
              color: 'text.primary',
            }}
          >
            {notification?.isRead ? (
              <NotificationsNoneIcon sx={{ mr: 2 }} />
            ) : (
              <NotificationsIcon color='primary' sx={{ mr: 2 }} />
            )}
            <ListItemText
              primary={notification.text}
              secondary={notification.timestamp}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{
                color: 'text.secondary',
              }}
              sx={{}}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper
        variant='outlined'
        sx={{ minHeight: '200px', bgcolor: theme.additionalPalette.primary }}
      >
        <Grid container>
          <Grid item container xs={12} sx={{ pt: 3, pl: 3, borderRadius: 1 }}>
            <Grid item xs={12}>
              <Typography variant='h6'>Notifications</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} sx={{ p: 3 }}>
            <Grid item xs={12}>
              {notificationsList()}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='text'
                fullWidth
                component={Link}
                to={ROUTES.NOTIFICATIONS}
                sx={{ textTransform: 'none' }}
              >
                View notifications{' '}
                <ArrowForwardIcon fontSize='small' sx={{ ml: 1 }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default NotificationsCard;
