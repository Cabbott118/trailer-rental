import { useState } from 'react';

// Components
import SearchWidgetDrawer from 'features/home/components/SearchWidgetDrawer';

// MUI
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Container,
  Divider,
  Drawer as MuiDrawer,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Input from 'components/common/Input';

const TestSearch = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{
        bgcolor:
          theme.palette.mode === 'dark' && theme.additionalPalette.primary,
        borderRadius: 10,
        boxShadow: '1px 1px 3px black',
        py: 2,
        px: 3,
        mt: 3,
      }}
    >
      {!isMobile ? (
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='body2' color='text.primary'>
              Location
            </Typography>
            <Input placeholder={'Search locations...'} />
          </Grid>
          <Grid item>
            <Typography variant='body2' color='text.primary'>
              Trailer type
            </Typography>
            <Input placeholder={'Select a trailer type...'} />
          </Grid>
          <Grid item>
            <Typography variant='body2' color='text.primary'>
              Pick up
            </Typography>
            <Input placeholder={'Select a date...'} inputType='date' />
          </Grid>
          <Grid item>
            <Typography variant='body2' color='text.primary'>
              Drop off
            </Typography>
            <Input placeholder={'Select a date...'} inputType='date' />
          </Grid>
          <Grid item>
            <IconButton
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
              }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ cursor: 'pointer' }} onClick={toggleDrawer}>
          <Grid item sx={{ mr: 2, mt: 0.5 }}>
            <SearchIcon color='primary' fontSize='large' />
          </Grid>
          <Grid item>
            <Typography variant='body1' color='text.primary' fontWeight={600}>
              Search for trailers by location...
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Trailer types | Available dates
            </Typography>
          </Grid>
        </Grid>
      )}
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
                Search things
              </ListSubheader>
            }
            sx={{ pt: 3 }}
          ></List>
        </Box>
      </MuiDrawer>
    </Box>
  );
};

export default TestSearch;
