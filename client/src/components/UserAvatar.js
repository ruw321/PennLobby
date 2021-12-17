import React from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  IconButton, Avatar, Menu, MenuItem,
} from '@mui/material';
import Button from "@mui/material/Button";
import NotificationsNoneIcon from '@mui/icons-material/Notifications';
import { logout } from '../fetch';

export default function UserAvatar({ setLoggedin, updateStatus }) {
  // const classes = useStyles();
  // const navigate = useNavigate();
  // const username = sessionStorage.getItem('username');
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

  return (
    <div>
      <IconButton aria-label="delete" onClick={() => updateStatus('lobby')}>
        <NotificationsNoneIcon />
      </IconButton>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
      </Button>

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
