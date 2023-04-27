import * as React from 'react';

// Firebase
import { auth } from '../utility/base';
import { onAuthStateChanged } from 'firebase/auth';

// MUI
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;
const unauthNavItems = [
  {
    name: 'Home',
    route: '/',
  },
  {
    name: 'Login',
    route: '/login',
  },
  { name: 'Sign Up', route: '/signup' },
];

const authNavItems = [
  {
    name: 'Home',
    route: '/',
  },
  {
    name: 'Profile',
    route: '/profile',
  },
];

function Navbar(props) {
  const theme = useTheme();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      console.log('User is not logged in');
    }
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant='h6'
        sx={{ my: 2, color: theme.palette.primary.main }}
      >
        Trailer Rental
      </Typography>
      <Divider />
      <List>
        {user
          ? authNavItems?.map((page) => (
              <ListItem key={page.name} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link
                    href={page.route}
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.text.primary,
                    }}
                  >
                    <ListItemText primary={page.name} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))
          : unauthNavItems?.map((page) => (
              <ListItem key={page.name} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link
                    href={page.route}
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.text.primary,
                    }}
                  >
                    <ListItemText primary={page.name} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
      </List>{' '}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component='nav'
        color='transparent'
        position='static'
        sx={{ boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              color: theme.palette.primary.main,
            }}
          >
            Trailer Rental
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user
              ? authNavItems.map((page) => (
                  <Button
                    key={page.name}
                    href={page.route}
                    sx={{
                      color: theme.palette.text.primary,
                      textTransform: 'none',
                    }}
                  >
                    {page.name}
                  </Button>
                ))
              : unauthNavItems.map((page) => (
                  <Button
                    key={page.name}
                    href={page.route}
                    sx={{
                      color: theme.palette.text.primary,
                      textTransform: 'none',
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Navbar;
