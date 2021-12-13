import * as React from 'react';
import Button from "@mui/material/Button";
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@mui/material';
import { userChangePassword } from '../../fetch';

export default function PasswordChange() {
  // change password dialog
  const [open, setOpen] = React.useState(false);
  const [pass, setPass] = React.useState("");
  const userID = sessionStorage.getItem("id");
  const valueRef = React.useRef('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setPass(valueRef.current.value);
  };

  React.useEffect(async () => {
    if (pass) {
      const response = await userChangePassword(userID, pass);
      if (response.ok) {
        setOpen(false);
      }
    }
  }, [pass]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input the new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            inputRef={valueRef}
            label="new password"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
