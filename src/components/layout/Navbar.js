import { useEffect, useState } from 'react';

// Components
import Drawer from 'components/layout/Drawer';
import Logout from 'components/common/Logout';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
// import { fetchNotifications } from 'store/slices/notificationsSlice';

export default function Navbar() {
  const theme = useTheme();
  const auth = getAuth();
  // const db = getFirestore();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(null);

  const { data: userData } = useSelector((state) => state.user);

  // const { data: notificationsData } = useSelector(
  //   (state) => state.notifications
  // );

  // useEffect(() => {
  //   const filteredNotifications = notificationsData?.filter(
  //     (notification) => !notification?.hasBeenRead
  //   );
  //   setUnreadNotifications(filteredNotifications?.length);
  // }, [notificationsData]);

  // useEffect for gathering new notis
  // useEffect(() => {

  //     const q = query(
  //       collection(db, 'notifications'),
  //       where('notificationOwner', '==', userData.uid),
  //       orderBy('createdAt', 'desc')
  //     );

  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const notificationData = snapshot.docs.map((doc) => doc.data());
  //       dispatch(fetchNotifications(userData.uid));
  //     });

  //     return () => unsubscribe();
  //   }
  // }, [db]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { route: routes.DASHBOARD, label: 'Your dashboard' },
    { route: routes.ACCOUNT, label: 'Account settings' },
    { route: routes.NOTIFICATIONS, label: 'Notifications' },
    { route: routes.ADD_ITEM, label: 'Add item' },
    { route: routes.VIEW_ITEMS, label: 'View item' },
  ];

  const renderMenu = (anchorEl, handleClose, items) => {
    const showLogoutCondition = items.length > 1;

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          mt: 1.5,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.label}
            component={Link}
            to={item.route}
            sx={{ fontSize: 18 }}
          >
            {item.label}
          </MenuItem>
        ))}
        {showLogoutCondition && <Logout />}
      </Menu>
    );
  };

  return (
    <>
      <AppBar position='sticky' color='transparent' sx={{ boxShadow: 'none' }}>
        <Container maxWidth='md'>
          <Toolbar>
            <Grid
              container
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Grid item>
                <MenuItem
                  component={Link}
                  to={routes.HOME}
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                  }}
                >
                  Home
                </MenuItem>
              </Grid>
              <Grid item>
                {userData ? (
                  isMobile ? (
                    <>
                      <Drawer sx={{ position: 'relative' }} />
                      <Badge
                        badgeContent={unreadNotifications}
                        color='error'
                        sx={{
                          position: 'absolute',
                          top: 20,
                          right: 25,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Tooltip title='Account menu'>
                        <IconButton
                          onClick={handleClick}
                          size='small'
                          sx={{
                            ml: 2,
                            position: 'relative',
                          }}
                          aria-controls={open ? 'account-menu' : undefined}
                          aria-haspopup='true'
                          aria-expanded={open ? 'true' : undefined}
                        >
                          <Grid
                            container
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            sx={{
                              bgcolor: 'lightgrey',
                              borderRadius: 5,
                            }}
                          >
                            <Grid item>
                              <Avatar sx={{ bgcolor: '#333' }}>
                                <Typography sx={{ fontWeight: 500 }}>
                                  {getUserInitials(userData?.fullName)}
                                </Typography>
                              </Avatar>
                              <Badge
                                badgeContent={unreadNotifications}
                                color='error'
                                sx={{
                                  position: 'absolute',
                                  top: 10,
                                  right: 10,
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <ArrowDropDownIcon />
                            </Grid>
                          </Grid>
                        </IconButton>
                      </Tooltip>
                    </>
                  )
                ) : (
                  <Grid container>
                    <Grid item>
                      <MenuItem
                        component={Link}
                        to={routes.SIGNUP}
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}
                      >
                        Sign up
                      </MenuItem>
                    </Grid>
                    <Grid item>
                      <MenuItem
                        component={Link}
                        to={routes.LOGIN}
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}
                      >
                        Login
                      </MenuItem>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>

      {renderMenu(anchorEl, handleClose, menuItems)}

      <Outlet />
    </>
  );
}
