/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import SendIcon from '@mui/icons-material/Send';
// import IconButton from '@mui/material/IconButton';
import { setupWSConnection } from './notifications';
import {
  getAllUsers, postMessage, getS3Url, sendS3,
} from '../fetch';

const theme = createTheme();
const Input = styled('input')({
  display: 'none',
});

function FromMessage(props) {
  const { msg } = props;
  if (msg.split(': ')[1].indexOf('(link-image)http') === 0) {
    return (
      <img src={msg.split(': ')[1].split('(link-image)')[1]} style={{ width: "40%", float: "right" }} />
    );
  }
  if (msg.split(': ')[1].indexOf('(link-video)http') === 0) {
    return (
      <video controls style={{ width: "40%", float: "right" }}>
        <source
          src={msg.split(': ')[1].split('(link-video)')[1]}
          type="video/mp4"
        />
        Sorry, your browser does not support embedded videos.
      </video>
    );
  }
  if (msg.split(': ')[1].indexOf('(link-audio)http') === 0) {
    return (
      <audio
        controls
        style={{ width: "40%", float: "right" }}
        src={msg.split(': ')[1].split('(link-audio)')[1]}
      >
        Your browser does not support the audio element.
      </audio>
    );
  }
  return (
    <ListItemText align="right" primary={msg.split(': ')[1]} />
  );
}
function ToMessage(props) {
  const { msg } = props;
  if (msg.split(': ')[1].indexOf('(link-image)http') === 0) {
    return (
      <img src={msg.split(': ')[1].split('(link-image)')[1]} style={{ width: "40%", float: "left" }} />
    );
  }
  if (msg.split(': ')[1].indexOf('(link-video)http') === 0) {
    return (
      <video controls style={{ width: "40%", float: "left" }}>
        <source
          src={msg.split(': ')[1].split('(link-video)')[1]}
          type="video/mp4"
        />
        Sorry, your browser does not support embedded videos.
      </video>
    );
  }
  if (msg.split(': ')[1].indexOf('(link-audio)http') === 0) {
    return (
      <audio
        controls
        style={{ width: "40%", float: "left" }}
        src={msg.split(': ')[1].split('(link-audio)')[1]}
      >
        Your browser does not support the audio element.
      </audio>
    );
  }
  return (
    <ListItemText primary={msg.split(': ')[1]} />
  );
}
function Chat(props) {
  const {
    messages, friends, setChat, sendMsg, currentChat,
  } = props;

  // event handler for file selection
  const updateFileInput = async (evt, type) => {
    const files = [...evt.target.files];
    const { url } = await getS3Url();
    await sendS3(url, files[0]);
    const imageUrl = url.split('?')[0];
    sendMsg(`(link-${type})${imageUrl}`);
  };
  // console.log("messages", messages);
  // this is the stype for the menu bar at the top
  const useStyles = makeStyles({
    // This group of buttons will be aligned to the right
    rightToolbar: {
      marginLeft: "auto",
      marginRight: -12,
    },
    menuButton: {
      marginRight: 16,
      marginLeft: -12,
    },
  });
  const classes = useStyles();

  // this is the stype for the entire message grid
  const useStyles2 = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '100%',
    },
    headBG: {
      backgroundColor: '#e0e0e0',
    },
    borderRight500: {
      borderRight: '1px solid #e0e0e0',
    },
    messageArea: {
      overflowY: 'auto',
      height: '80%',
    },
  });
  const classes2 = useStyles2();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (themes) => `1px solid ${themes.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 0.3 }}
          >
            <img className="barLogo" src="../../logo.png" alt="logo_pic" />
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 7 }}
              id="home"
            >
              Home
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 7 }}
              id="mygroups"
            >
              My Groups
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 7 }}
              id="myposts"
            >
              My Posts
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/message"
              fontWeight="600"
              sx={{ my: 1, mx: 7 }}
              id="messages"
            >
              Messages
            </Link>
          </nav>
          <section className={classes.rightToolbar}>
            <Button href="./profile">
              <Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />
            </Button>
          </section>
        </Toolbar>
      </AppBar>
      <Grid container style={{ position: "", bottom: "0", top: "65px" }}>
        <Grid container component={Paper} className={classes2.chatSection} style={{ height: "100%" }}>
          <Grid item xs={3} className={classes2.borderRight500}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ my: 1, mx: 3 }} className="header-message">Chats</Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField id="chatsearchbar" label="Search" variant="outlined" fullWidth />
            </Grid>
            <List style={{ height: "100%", overflowY: "auto" }}>
              {
                friends.map((f) => (
                  <ListItem button key={f} onClick={() => { setChat(f); }}>
                    <ListItemIcon>
                      <Avatar alt={f} src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={f} secondary="click to chat" />
                  </ListItem>
                ))
              }
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem style={{ marginRight: "-1px" }} />

          <Grid item xs={9} stype={{ height: '100%' }}>
            {currentChat
            && (
            <ListItem button key={currentChat}>
              <ListItemIcon>
                <Avatar alt={currentChat} src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary={currentChat} secondary="Online Now" />
            </ListItem>
            )}
            <Divider />
            <List className={classes2.messageArea}>
              {
                messages.filter((msg) => {
                  if (msg.split(':')[0] === currentChat || msg.split(':')[0] === `sent(${currentChat})`) {
                    return true;
                  }
                  return false;
                }).map((msg) => msg.indexOf('sent') === 0
                  ? (
                    <ListItem key={msg}>
                      <Grid container>
                        <Grid item xs={12}>
                          <FromMessage msg={msg} />
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText align="right" secondary="sent" />
                        </Grid>
                      </Grid>
                    </ListItem>
                  ) : (
                    <ListItem key={msg}>
                      <Grid container>
                        <ListItem>
                          <ListItemIcon>
                            <Avatar alt={msg.split(')')[0].split('(')[1]} src="https://material-ui.com/static/images/avatar/1.jpg" />
                          </ListItemIcon>
                          <ToMessage msg={msg} />
                        </ListItem>
                      </Grid>
                    </ListItem>
                  ))

              }
            </List>
            <Grid
              container
              style={{
                position: 'fixed', bottom: '0', padding: '30px', backgroundColor: 'white',
              }}
            >
              <Grid item xs={0.5}>
                <Fab color="primary" aria-label="add" size="small">
                  <label htmlFor="icon-button-image" style={{ lineHeight: "0px" }}>
                    <Input
                      accept="image/*"
                      id="icon-button-image"
                      type="file"
                      onChange={(e) => updateFileInput(e, 'image')}
                    />
                    <InsertPhotoIcon />
                  </label>
                </Fab>
              </Grid>
              <Grid item xs={0.5}>
                <Fab color="primary" aria-label="add" size="small">
                  <label htmlFor="icon-button-video" style={{ lineHeight: "0px" }}>
                    <Input
                      accept="video/mp4"
                      id="icon-button-video"
                      type="file"
                      onChange={(e) => updateFileInput(e, 'video')}
                    />
                    <VideoCameraBackIcon />
                  </label>
                </Fab>
              </Grid>
              <Grid item xs={0.5}>
                <Fab color="primary" aria-label="add" size="small">
                  <label htmlFor="icon-button-audio" style={{ lineHeight: "0px" }}>
                    <Input
                      accept="audio/*"
                      id="icon-button-audio"
                      type="file"
                      onChange={(e) => updateFileInput(e, 'audio')}
                    />
                    <KeyboardVoiceIcon />
                  </label>
                </Fab>
              </Grid>
              <Grid item xs={7}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth />
              </Grid>
              <Grid item xs={0.5} align="right">
                <Fab color="primary" aria-label="add" size="small"><SendIcon onClick={() => sendMsg()} /></Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

function Messages(props) {
  // const [contacts, setContacts] = useState(0); // number of connected users
  // const [messages, setMessages] = useState(0); // counts messages sent and received - lift up state
  // const texts = useRef([]); // mutable reference to store messages. Do not overuse!
  // const [friends, setFriends] = useState([]);
  const {
    contacts, messages, texts, friends,
  } = props;
  const [myUserName] = useState(sessionStorage.getItem('username'));
  const [currentChat, setCurrentChat] = useState('');

  // Put mutators in functions to avoid stale references to state
  // When mutating state inside [websocket] event handlers!
  // const updateContacts = () => setContacts((contacts) => contacts + 1);
  // const updateMessages = () => setMessages((messages) => messages + 1);
  // useEffect(() => {
  //   authenticate();
  // }, []);
  // useEffect(() => {
  //   getAllUsers().then((response) => {
  //     if (!response) { return; }
  //     const newFriends = response.map((r) => r.username).filter((r) => r !== sessionStorage.getItem('username'));
  //     setFriends(newFriends);
  //   });
  //   const cleanup = () => { sessionStorage.getItem('token'); };
  //   // we need to cleanup when leaving the tab
  //   window.addEventListener('beforeunload', cleanup);
  //   return () => {
  //     window.removeEventListener('beforeunload', cleanup);
  //   };
  // }, [contacts, messages, texts]);

  // const authenticate = async () => {
  //   setupWSConnection(updateContacts, updateMessages, texts); // setup ws connection -- pass the wrapper functions as parameters
  //   setContacts((contacts) => contacts + 1); // update state to trigger re-rendering and useEffect
  // };
  const sendMsg = (link) => {
    let text;
    if (link) {
      text = link;
    } else {
      text = (document.getElementById('outlined-basic-email') && document.getElementById('outlined-basic-email').value) || '';
    }
    const to = currentChat;
    const from = myUserName;
    // console.log('from, to, text', from, to, text);
    if (text.length > 0 && to.length > 0 && from.length > 0) {
      postMessage(from, to, text);
    }
  };

  // we pass the messages to the child as props
  // the .current property of a mutable reference
  // contains the messages
  return (
    <div className="Messages" style={{ position: "" }}>
      <Chat messages={texts.current} friends={friends} setChat={(to) => { setCurrentChat(to); }} sendMsg={sendMsg} currentChat={currentChat} />
    </div>
  );
}
export default Messages;
