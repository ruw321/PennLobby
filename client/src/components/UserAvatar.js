/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  IconButton, Avatar, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import Button from "@mui/material/Button";
import NotificationsNoneIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {
  logout, getAllNotifications, getAllUsers, getAllGroups, joinGroup, deleteNotification, sendNotification, postMessage,
} from '../fetch';

function NotificationCard(props) {
  const {
    msg, allUsers, allGroups, resetAllNotifications 
  } = props;
  const acceptJoin = async () => {
    await joinGroup(msg.sender_id, msg.content.split(')')[1]);
    const data = { content: `(join accept)${msg.content.split(')')[1]}`, sender_id: sessionStorage.getItem('id'), receiver_ids: [msg.sender_id] };
    await sendNotification(data);
    await deleteNotification(msg._id);
    await postMessage(sessionStorage.getItem('username'), sessionStorage.getItem('username'), 'update');
    resetAllNotifications();
  };
  const rejectJoin = async () => {
    const data = { content: `(join declined)${msg.content.split(')')[1]}`, sender_id: sessionStorage.getItem('id'), receiver_ids: [msg.sender_id] };
    await sendNotification(data);
    await deleteNotification(msg._id);
    await postMessage(sessionStorage.getItem('username'), sessionStorage.getItem('username'), 'update');
    resetAllNotifications();
  };
  const ok = async () => {
    await deleteNotification(msg._id);
    resetAllNotifications();
  };
  const acceptInvite = async () => {
    await joinGroup(msg.content.split('(invite group)')[1].split('(user)')[1], msg.content.split('(invite group)')[1].split('(user)')[0]);
    const data = { content: `(invite accept)${msg.content.split('(invite group)')[1].split('(user)')[0]}`, sender_id: sessionStorage.getItem('id'), receiver_ids: [msg.sender_id] };
    await sendNotification(data);
    await deleteNotification(msg._id);
    await postMessage(sessionStorage.getItem('username'), sessionStorage.getItem('username'), 'update');
    resetAllNotifications();
  };
  const rejectInvite = async () => {
    const data = { content: `(invite declined)${msg.content.split('(invite group)')[1].split('(user)')[0]}`, sender_id: sessionStorage.getItem('id'), receiver_ids: [msg.sender_id] };
    await sendNotification(data);
    await deleteNotification(msg._id);
    await postMessage(sessionStorage.getItem('username'), sessionStorage.getItem('username'), 'update');
    resetAllNotifications();
  };
  if (msg.content.indexOf('(join group)') === 0) {
    return (
      <div>
        {`${allUsers.find((u) => u._id === msg.sender_id).username} request to join group '${allGroups.find((u) => u._id === msg.content.split(')')[1]).name}'`}
        <Button onClick={acceptJoin}>Accept</Button>
        <Button onClick={rejectJoin}>Cancel</Button>
      </div>
    );
  }
  if (msg.content.indexOf('(join accept)') === 0) {
    return (
      <div>
        {`Congratulations, you are accepted to join group '${allGroups.find((u) => u._id === msg.content.split(')')[1]).name}'`}
        <Button onClick={ok}>Ok</Button>
      </div>
    );
  }
  if (msg.content.indexOf('(join declined)') === 0) {
    return (
      <div>
        {`Sorry, you are declined to join group '${allGroups.find((u) => u._id === msg.content.split(')')[1]).name}'`}
        <Button onClick={ok}>Ok</Button>
      </div>
    );
  }
  if (msg.content.indexOf('(invite group)') === 0) {
    return (
      <div>
        {`${allUsers.find((u) => u._id === msg.sender_id).username} request to invite ${allUsers.find((u) => u._id === msg.content.split('(invite group)')[1].split('(user)')[1]).username} join group '${allGroups.find((u) => u._id === msg.content.split('(invite group)')[1].split('(user)')[0]).name}'`}
        <Button onClick={acceptInvite}>Accept</Button>
        <Button onClick={rejectInvite}>Cancel</Button>
      </div>
    );
  }
  if (msg.content.indexOf('(invite accept)') === 0) {
    return (
      <div>
        {`Congratulations, your invitation to join group '${allGroups.find((u) => u._id === msg.content.split(')')[1]).name}' is permitted.`}
        <Button onClick={ok}>Ok</Button>
      </div>
    );
  }
  if (msg.content.indexOf('(invite declined)') === 0) {
    return (
      <div>
        {`Sorry, your invitation to join group '${allGroups.find((u) => u._id === msg.content.split(')')[1]).name}' is declined.`}
        <Button onClick={ok}>Ok</Button>
      </div>
    );
  }
  return (
    <div>
      {msg.content}
    </div>
  );
}

export default function UserAvatar(props) {
  // const classes = useStyles();
  // const navigate = useNavigate();
  // const username = sessionStorage.getItem('username');
  const { setLoggedin, updateStatus } = props;
  // eslint-disable-next-line no-unused-vars
  const [allNotification, setAllNotification] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  React.useEffect(async () => {
    const notifications = await getAllNotifications();
    setAllNotification(notifications);
    const users = await getAllUsers();
    setAllUsers(users);
    const groups = await getAllGroups();
    setAllGroups(groups);
  }, [props.refresh]);
  const resetAllNotifications = async () => {
    const notifications = await getAllNotifications();
    setAllNotification(notifications);
  };
  const userID = sessionStorage.getItem("id");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    updateStatus('profile');
  };

  const handleLogout = async () => {
    handleClose();
    sessionStorage.removeItem('username');
    await logout();
    setLoggedin(false);
    updateStatus('lobby');
  };

  // For admin user, the invitation list display
  const [openInvitation, setOpenInvitation] = React.useState(false);

  const handleClickOpenInvitation = () => {
    setOpenInvitation(true);
  };

  const handleCloseInvitation = () => {
    setOpenInvitation(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpenInvitation}>
        {allNotification.find((n) => n.receiver_ids.includes(sessionStorage.getItem('id'))) ?
          <NotificationsActiveIcon /> :
          <NotificationsNoneIcon />}
      </IconButton>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src={(allUsers.find((u) => u._id === sessionStorage.getItem("id")) && allUsers.find((u) => u._id === sessionStorage.getItem("id")).avatar_url) || ''} />
      </Button>

      {/* Invitation / Request Dialog */}
      <Dialog
        open={openInvitation}
        onClose={handleCloseInvitation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          The invitation & requests
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Need to map invitation & requests
          </DialogContentText> */}
          {allNotification.filter((n) => n.receiver_ids.includes(sessionStorage.getItem('id'))).map((msg) =>
            <NotificationCard msg={msg} allUsers={allUsers} allGroups={allGroups} resetAllNotifications={resetAllNotifications} />)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvitation}>Cancel</Button>
          {/* <Button onClick={() => { handleConfirmPromote(user._id); }} autoFocus>
            Confirm
          </Button> */}

        </DialogActions>
      </Dialog>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            width: 150,
          },
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
    // <Container sx={{ display: 'flex', marginLeft: "180px" }}>
    //   <div className={classes.icon}>
    //     <Badge badgeContent={notificationNumber} color="secondary">
    //       <NotificationsIcon
    //         sx={{
    //           color: '#FFF5E1',
    //           '&:hover': {
    //             color: "#ffffff",
    //             cursor: "pointer",
    //           },
    //         }}
    //         size="large"
    //       />
    //     </Badge>
    //   </div>
    //   <div className={classes.icon}>
    //     <IconButton onClick={handleClick}>
    //       <Avatar />
    //     </IconButton>
    //   </div>
    //   <Menu
    //     id="userMenu"
    //     anchorEl={anchor}
    //     open={Boolean(anchor)}
    //     onClose={handleClose}
    //     anchorOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     transformOrigin={{
    //       vertical: 'bottom',
    //       horizontal: 'left',
    //     }}
    //   >
    //     <div className={classes.username}>
    //       <Typography
    //         variant="subtitle1"
    //         color="secondary"
    //         align="center"
    //       >
    //         {username}
    //       </Typography>
    //     </div>
    //     <MenuItem onClick={handleClickHome}> Home </MenuItem>
    //     <MenuItem onClick={handleClickMessage}> Message </MenuItem>
    //     <MenuItem onClick={handleLogout}> Logout </MenuItem>
    //   </Menu>
    // </Container>
  );
}
