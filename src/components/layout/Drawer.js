import { useState } from 'react';

// Components
import ThemeSwitch from 'components/common/ThemeSwitch';
import Logout from 'components/common/Logout';

// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  useTheme,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CloseIcon from '@mui/icons-material/Close';

// React Router
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, primaryText, to, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={to} onClick={onClick}>
        {icon}
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: 500,
          }}
          sx={{ pl: 1 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const Drawer = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <MuiDrawer anchor='top' open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            pt: 1,
            minHeight: '100vh',
            bgcolor: theme.palette.background.default,
          }}
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List sx={{ height: 50 }}>
            <ListItem
              secondaryAction={
                <IconButton edge='end' sx={{ mr: 2, mt: 1 }}>
                  <CloseIcon />
                </IconButton>
              }
            />
          </List>
          <Divider />
          <List
            dense
            subheader={
              <ListSubheader
                component='div'
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  bgcolor: theme.palette.background.default,
                }}
              >
                Menu
              </ListSubheader>
            }
            sx={{ pt: 3 }}
          >
            <MenuItem
              icon={<HomeOutlinedIcon />}
              primaryText='Home'
              to={ROUTES.HOME}
              onClick={toggleDrawer}
            />
            {/* <MenuItem
              icon={<AddBoxOutlinedIcon />}
              primaryText='Add trailer'
              to={ROUTES.ADD_TRAILER}
              onClick={toggleDrawer}
            /> */}
            <MenuItem
              icon={<GridViewOutlinedIcon />}
              primaryText='Find trailers'
              to={ROUTES.FIND_TRAILERS}
              onClick={toggleDrawer}
            />
          </List>
          <Divider variant='middle' sx={{ my: 3 }} />
          <List
            dense
            subheader={
              <ListSubheader
                component='div'
                sx={{
                  textTransform: 'uppercase',
                  bgcolor: theme.palette.background.default,
                }}
              >
                Account
              </ListSubheader>
            }
            sx={{ flexGrow: 1 }}
          >
            <MenuItem
              icon={<AccountCircleOutlinedIcon />}
              primaryText='Your dashboard'
              to={ROUTES.DASHBOARD}
              onClick={toggleDrawer}
            />
          </List>
          <Divider variant='middle' sx={{ my: 3 }} />
          <List
            dense
            subheader={
              <ListSubheader
                component='div'
                sx={{
                  textTransform: 'uppercase',
                  bgcolor: theme.palette.background.default,
                }}
              >
                Resources & Support
              </ListSubheader>
            }
            sx={{ flexGrow: 1 }}
          >
            <MenuItem
              icon={<GroupsOutlinedIcon />}
              primaryText='About us'
              to={ROUTES.ABOUT_US}
              onClick={toggleDrawer}
            />
            <MenuItem
              icon={<ContactSupportOutlinedIcon />}
              primaryText='Contact us'
              to={ROUTES.CONTACT_US}
              onClick={toggleDrawer}
            />
          </List>
          <Divider variant='middle' sx={{ mt: 3, mb: 1 }} />
          <List>
            <ThemeSwitch />
            <ListItem>
              <Logout />
            </ListItem>
          </List>
        </Box>
      </MuiDrawer>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawer;
