/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { demoteUser, getAllUsers, promoteUser } from '../fetch';

export default function GroupMembers(props) {
  const { groupID } = props;
  const userID = sessionStorage.getItem("id");

  const [groupMembers, setGroupMembers] = React.useState([]);

  React.useEffect(async () => {
    const allMembers = await getAllUsers();
    // const newGroupCards = allMembers.map((g) =>
    //   (
    //     {
    //       title: g.name,
    //       size: g.member_ids.length,
    //       description: g.description,
    //       image: "https://source.unsplash.com/random",
    //       imageLabel: "Image Text",
    //       topics: g.topic_ids,
    //       groupId: g._id,
    //       memberIds: g.member_ids,
    //       whetherIn: false,
    //     }
    //   ));
    const userInGroup = [];
    for (const each in allMembers) {
      if (each.group_ids.includes(groupID)) {
        userInGroup.push(each);
      }
    }
    setGroupMembers(allMembers);

    // const userInGroup = [];
    // for (const each in allMembers) {
    //   if (true) {
    //     userInGroup.push(each);
    //   }
    // }
    // setGroupMembers(userInGroup);
  }, []);

  // const groupMembers = [
  //   "user11111",
  //   "user2",
  //   "user3",
  //   "user4",
  //   "user5",
  //   "user6",
  //   "user1",
  //   "user2",
  //   "user3",
  //   "user4",
  //   "user5",
  //   "user6",
  // ];

  // Promote as admin icon button
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmPromote = async (userToPromoteID) => {
    const res = await promoteUser(userToPromoteID, userID, groupID);
    const print = await res.json();
    console.log(print);
    setOpen(false);
  };

  // Demote admin
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleConfirmDemote = async (userToDemoteID) => {
    const res = await demoteUser(userToDemoteID, userID, groupID);
    const print = await res.json();
    console.log(print);
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
          <>
            <CardHeader
              action={(
                <div>
                  <IconButton onClick={handleClickOpen}>
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton onClick={handleClickOpen2}>
                    <ArrowDownwardIcon />
                  </IconButton>
                </div>
          )}
              subheader={user}
            />

            {/* Promote Dialog */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Confirm to promote as administator?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure to set this user as a group administrator?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { handleConfirmPromote(user._id); }} autoFocus>
                  Confirm
                </Button>

              </DialogActions>
            </Dialog>

            {/* Demote Dialog */}
            <Dialog
              open={open2}
              onClose={handleClose2}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Confirm to demote as administator?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure to demote this user as a group administrator?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2}>Cancel</Button>
                <Button onClick={() => { handleConfirmDemote(user._id); }} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ))}

      </Card>
    </div>
  );
}
