import { useState } from 'react';

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { deleteUser } from 'store/slices/userSlice';

const DeleteDialog = ({ userId }) => {
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUser(userId));
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
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            color='error'
            onClick={handleDeleteAccount}
            sx={{ textTransform: 'none' }}
            autoFocus
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
