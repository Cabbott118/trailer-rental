// MUI
import { Switch, ListItem, ListItemText } from '@mui/material';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from 'store/slices/uiSlice';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);

  const handleThemeToggle = () => {
    dispatch(switchTheme());
  };

  return (
    <ListItem>
      <ListItemText
        primary={'Dark Mode'}
        primaryTypographyProps={{
          variant: 'body1',
          fontWeight: 'bold',
        }}
      />
      <Switch
        checked={theme === 'dark'}
        onChange={handleThemeToggle}
        color='primary'
        inputProps={{ 'aria-label': 'toggle light or dark mode' }}
      />
      {theme === 'light' ? (
        <Brightness7OutlinedIcon />
      ) : (
        <Brightness4OutlinedIcon />
      )}
    </ListItem>
  );
};

export default ThemeSwitch;
