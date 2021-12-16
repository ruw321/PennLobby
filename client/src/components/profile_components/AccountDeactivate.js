import * as React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import { deactivateAccount } from '../../fetch';

export default function AccountDeactivate({ updateStatus }) {
  // deactivate account dialog
  const [open2, setOpen2] = React.useState(false);
  const [userID, setUserID] = React.useState(null);
  // const navigate = useNavigate();
  // get the user id
  const uID = sessionStorage.getItem("id");
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleConfirm = async () => {
    if (uID) {
      setUserID(uID);
    }
  };

  React.useEffect(async () => {
    if (userID) {
      const response = await deactivateAccount(userID);
      if (response.ok) {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        // navigate('/login');
        updateStatus('login');
      } else {
        console.log("something went wrong");
      }
    }
  }, [userID]);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen2}>
        Deactivate account
      </Button>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm to deactivate your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By confirming, you will deactivate your account and cannot reverse the action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
