import { useEffect, useState } from 'react';

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

import CloseIcon from '@mui/icons-material/Close';

const SearchWidgetDrawer = ({ open }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(open);
  const theme = useTheme();

  useEffect(() => {
    setIsDrawerOpen(open);
  }, [open]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <MuiDrawer anchor='top' open={isDrawerOpen} onClose={handleDrawerClose}>
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
        ></List>
      </Box>
    </MuiDrawer>
  );
};

export default SearchWidgetDrawer;
