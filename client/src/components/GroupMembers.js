/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

export default function GroupMembers(props) {
  const groupMembers = [
    "user11111",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
  ];

  // for set admin icon button
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // remove admin
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  return (
    <div>
      <Grid>
        <Typography
          centered
          variant="h6"
          sx={{
            padding: 2, color: 'white', bgcolor: 'primary.main', textAlign: "center",
          }}
        >
          Group Members
        </Typography>
      </Grid>
      <Card elevation={1}>
        {groupMembers.map((user) => (
          <CardHeader
            action={(
              <div>
                <IconButton onClick={handleClickOpen}>
                  <SupervisorAccountIcon />
                </IconButton>
                <IconButton onClick={handleClickOpen2}>
                  <PersonRemoveAlt1Icon />
                </IconButton>
              </div>
          )}
            subheader={user}
          />
        ))}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirm to set as administator?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to set this user as a group administrator?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirm to remove as administator?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to remove this user as a group administrator?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>Cancel</Button>
            <Button onClick={handleClose2} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
