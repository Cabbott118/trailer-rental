import { useState } from 'react';

// Components
import Drawer from 'components/layout/Drawer';
import ThemeSwitch from 'components/common/ThemeSwitch';
import Logout from 'components/common/Logout';

// Constants
import ROUTES from 'resources/routes-constants';

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Grid,
  IconButton,
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
import { useSelector } from 'react-redux';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = useSelector((state) => state.user);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { route: ROUTES.DASHBOARD, label: 'Your dashboard' },
    { route: ROUTES.ACCOUNT, label: 'Account settings' },
    { route: ROUTES.NOTIFICATIONS, label: 'Notifications' },
    // { route: ROUTES.ADD_TRAILER, label: 'Add trailer' },
    { route: ROUTES.FIND_TRAILERS, label: 'Find trailers' },
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
        <ThemeSwitch />
        {showLogoutCondition && <Logout />}
      </Menu>
    );
  };

  return (
    <Box>
      <AppBar
        position='fixed'
        sx={{ boxShadow: 1, bgcolor: theme.palette.background.default }}
      >
        <Container maxWidth='lg'>
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
                  to={ROUTES.HOME}
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                  }}
                >
                  Home
                </MenuItem>
              </Grid>
              <Grid item>
                {user ? (
                  isMobile ? (
                    <>
                      <Drawer sx={{ position: 'relative' }} />
                      <Badge
                        // badgeContent={unreadNotifications}
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
                              <Avatar
                                sx={{ bgcolor: theme.palette.primary.dark }}
                              >
                                <Typography
                                  sx={{
                                    color: theme.palette.secondary.contrastText,
                                    fontWeight: 500,
                                  }}
                                >
                                  {getUserInitials(user?.fullName)}
                                </Typography>
                              </Avatar>
                              <Badge
                                // badgeContent={unreadNotifications}
                                color='error'
                                sx={{
                                  position: 'absolute',
                                  top: 10,
                                  right: 10,
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <ArrowDropDownIcon sx={{ color: '#333' }} />
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
                        to={ROUTES.SIGNUP}
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
                        to={ROUTES.LOGIN}
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
    </Box>
  );
}
