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

  return (
    <div>
      <Grid>
        <Typography variant="h5" sx={{ padding: 2 }}>
          Group Members
        </Typography>
      </Grid>
      <Card elevation={1}>
        {groupMembers.map((user) => (
          <CardHeader
            action={(
              <IconButton onClick={handleClickOpen}>
                <SupervisorAccountIcon />
              </IconButton>
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
      </Card>
    </div>
  );
}
