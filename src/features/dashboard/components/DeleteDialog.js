import { useState } from 'react';

// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from 'store/slices/userSlice';

const DeleteDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, stripe, loading } = useSelector((state) => state.user);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    const { userId, stripeAccountId } = data;
    dispatch(deleteUser({ userId, stripeAccountId })).then(() => {
      setDialogOpen(false);
      navigate(ROUTES.HOME, { replace: true });
    });
  };

  return (
    <>
      <Button
        fullWidth
        color='error'
        onClick={handleClickOpenDialog}
        sx={{ textTransform: 'none' }}
      >
        Delete Account
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you delete your account, you will lose all your stuff, bro.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            disabled={loading}
            sx={{ textTransform: 'none' }}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            color='error'
            variant='contained'
            onClick={handleDeleteAccount}
            disabled={loading}
            sx={{ textTransform: 'none' }}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
