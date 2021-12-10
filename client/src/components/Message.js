/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import Menu from "./Menu";

const theme = createTheme();

function Chat() {
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
      <Menu />
      <Grid container style={{ position: "fixed", bottom: "0", top: "65px" }}>
        <Grid container component={Paper} className={classes2.chatSection} style={{ height: "100%" }}>
          <Grid item xs={3} className={classes2.borderRight500}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ my: 1, mx: 3 }} className="header-message">Chats</Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField id="chatsearchbar" label="Search" variant="outlined" fullWidth />
            </Grid>
            <List style={{ height: "100%", overflowY: "auto" }}>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary="Remy Sharp" secondary="Mutual Group: penn engineers" />
              </ListItem>
              <ListItem button key="Alice">
                <ListItemIcon>
                  <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                </ListItemIcon>
                <ListItemText primary="Alice" secondary="Mutual Group: bio lovers" />
              </ListItem>
              <ListItem button key="CindyBaker">
                <ListItemIcon>
                  <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                </ListItemIcon>
                <ListItemText primary="Cindy Baker" secondary="Mutual Group: pet owners" />
              </ListItem>
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem style={{ marginRight: "-1px" }} />

          <Grid item xs={9} stype={{ height: '100%' }}>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp" secondary="Online Now" />
            </ListItem>
            <Divider />
            <List className={classes2.messageArea}>
              <ListItem key="1">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="right" primary="Hey man, What's up?" />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="right" secondary="Monday 09:30" />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="2">
                <Grid container>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Hey, I am Good! What about you?" secondary="Monday 09:31" />
                  </ListItem>
                </Grid>
              </ListItem>
              <ListItem key="3">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="right" primary="Cool. i am good, let's catch up!" />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="right" secondary="Monday 10:30" />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Grid
              container
              style={{
                position: 'fixed', bottom: '0', padding: '30px', backgroundColor: 'white',
              }}
            >
              <Grid xs={0.5}>
                <Fab color="primary" aria-label="add" size="small"><InsertPhotoIcon /></Fab>
              </Grid>
              <Grid xs={0.5}>
                <Fab color="primary" aria-label="add" size="small"><UploadFileIcon /></Fab>
              </Grid>
              <Grid xs={0.5}>
                <Fab color="primary" aria-label="add" size="small"><VideoCameraBackIcon /></Fab>
              </Grid>
              <Grid item xs={7}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth />
              </Grid>
              <Grid xs={0.5} align="right">
                <Fab color="primary" aria-label="add" size="small"><KeyboardVoiceIcon /></Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Chat;
