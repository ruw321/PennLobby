/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ListItem from '@mui/material/ListItem';
import {
  Card,
  CardHeader,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Input, List, ListItemText, TextField,
} from "@mui/material";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { styled } from "@mui/system";
import TrendingTopics from "./TrendingTopics";
import PostCard from "./PostCard";
import GroupMembers from "./GroupMembers";
import {
  addPost, getAllPostsByGroupID, sendS3, getS3Url, quitGroup, getAllPosts, getGroupByID, 
} from "../fetch";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PennLobby
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme();

const postCards = [
  {
    title: "Penn Football",
    size: "293",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

function PostMediaInput(props) {
  const { msg } = props;
  if (msg.indexOf('(link-image)http') === 0) {
    return (
      <img src={msg.split('(link-image)')[1]} style={{ width: "100%" }} />
    );
  }
  if (msg.indexOf('(link-video)http') === 0) {
    return (
      <video controls style={{ width: "100%" }}>
        <source
          src={msg.split('(link-video)')[1]}
          type="video/mp4"
        />
        Sorry, your browser does not support embedded videos.
      </video>
    );
  }
  // if (msg.indexOf('(link-audio)http') === 0) {
  return (
    <audio
      controls
      style={{ width: "100%" }}
      src={msg.split('(link-audio)')[1]}
    >
      Your browser does not support the audio element.
    </audio>
  );
}
function GroupDetail(props) {
  // currGroup is the group ID!!
  const { currGroup } = props;

  const [postCards, setPostCards] = React.useState([]);
  const [group, setGroup] = React.useState('');

  // const [numMembers, setNumMembers] = React.useState(0);
  // const [numPosts, setNumPosts] = React.useState(0);  
  // const [numTopics, setNumTopics] = React.useState(0);  

  React.useEffect(async () => {
    const postCards = await getAllPosts();
    const curGroupObj = await getGroupByID(currGroup);
    setGroup(curGroupObj);
    const groupPosts = [];
    for (const post of postCards) {
      if (post.group_id === currGroup) {
        groupPosts.push(post);
      }
    }
    setPostCards(groupPosts);
  }, []);

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

  // for new post dialog
  const [open, setOpen] = React.useState(false);
  const [titleText, setTitleText] = React.useState('');
  const [postText, setPostText] = React.useState('');
  const [postMediaLink, setPostMediaLink] = React.useState(null);
  const userID = sessionStorage.getItem('id');
  // To Do: how to get groupID?
  // const groupID = sessionStorage.getItem('id');
  // event handler for file selection
  
  const updateFileInput = async (evt, type) => {
    const files = [...evt.target.files];
    const { url } = await getS3Url();
    await sendS3(url, files[0]);
    const imageUrl = url.split('?')[0];
    setPostMediaLink(`(link-${type})${imageUrl}`);
  };
  
  const handleChangeTitleText = (event) => {
    setTitleText(event.target.value);
  };

  const handleChangePostText = (event) => {
    setPostText(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPostMediaLink(null);
  };

  const handleSubmitNewPost = async () => {
    const input = {
      title: titleText,
      content: postMediaLink || postText,
      author_id: userID,
      group_id: currGroup,
    };
    const res = await addPost(input);
    const print = await res.json();
    setOpen(false);
    setPostMediaLink(null);
  };

  // for invite someone dialog
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  // for leave a group dialog
  const [openLeaveGroup, setOpenLeaveGroup] = React.useState(false);

  const handleClickOpenLeaveGroup = () => {
    setOpenLeaveGroup(true);
  };

  const handleCloseLeaveGroup = () => {
    setOpenLeaveGroup(false);
  };

  const handleConfirmLeaveGroup = async () => {
    const userID = sessionStorage.getItem("id");
    const res = await quitGroup(userID, currGroup);
    const print = await res.json();
    setOpenLeaveGroup(false);
  };

  // for upload button
  const Input = styled('input')({
    display: 'none',
  });

  if (group) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          {/* Filter and Sort options */}

          <Container maxWidth="lg" justify="flex-end">

            <Box sx={{
              pt: 2, pl: 2, pb: 2, display: 'flex', justifyContent: 'space-between', margin: '10px', borderBottom: 1, borderColor: 'grey.500',
            }}
            >
              <Typography variant="h4">
                {group.name}
                <Typography variant="h6">
                  {group.description}
                </Typography>
              </Typography>
              <Button variant="contained" sx={{ m: 1, height: 50, width: 262 }} onClick={handleClickOpen2}>Invite Someone</Button>
              <Button variant="contained" sx={{ m: 1, height: 50, width: 262 }} onClick={handleClickOpenLeaveGroup}>Leave Group</Button>
              <Button variant="contained" sx={{ m: 1, height: 50, width: 262 }} onClick={handleClickOpen}>New Post</Button>

              {/* Create a New Post Dialog */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new post</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Title
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    multiline
                    label="title (max 30 words)"
                    type="email"
                    fullWidth
                    variant="standard"
                    sx={{ pb: 3 }}
                    onChange={handleChangeTitleText}
                  />
                  {!postMediaLink && 
                  <DialogContentText>
                    Please type the new post content here. Your group is waiting for your input!
                  </DialogContentText>}
                  {!postMediaLink && 
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    multiline
                    rows={8}
                    label="new post (max 300 words)"
                    type="email"
                    fullWidth
                    variant="standard"
                    sx={{ pb: 3 }}
                    onChange={handleChangePostText}
                  />}
                  {/* 3 Media Upload Buttons */}
                  <DialogContentText>
                    Or upload picture, video, or audio media.
                  </DialogContentText>
                  {postMediaLink && 
                  <PostMediaInput msg={postMediaLink} />}
                  <Grid
                    container
                    style={{
                      bottom: '0', padding: '10px', backgroundColor: 'white',
                    }}
                    justifyContent="space-evenly"
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
                  </Grid>
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubmitNewPost}>Send</Button>
                </DialogActions>
              </Dialog>

              {/* Invite Someone to Group Dialog */}
              <Dialog open={open2} onClose={handleClose2}>
                <DialogTitle>Invite Someone to Join the Group</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter the username of the person you want to invite.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    rows={1}
                    label="username"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose2}>Cancel</Button>
                  <Button onClick={handleClose2}>Confirm</Button>
                </DialogActions>
              </Dialog>

              {/* Leave Group Dialog */}
              <Dialog
                open={openLeaveGroup}
                onClose={handleCloseLeaveGroup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Confirm to leave this group?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    By confirming, you will leave this group and will not be able to
                    view the posts within.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseLeaveGroup}>Cancel</Button>
                  <Button onClick={handleConfirmLeaveGroup} autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>

            <Grid container spacing={2}>
              <Grid item key={1} xs={6} md={9}>
                <Container sx={{ pt: 2 }} maxWidth="lg">
                  <Grid container rowSpacing={3} columnSpacing={0}>
                    {postCards.map((post) => (
                      <PostCard key={post.title} post={post} whetherIn />
                    ))}
                  </Grid>
                </Container>
              </Grid>
              <Grid
                item
                xs={3}
                md={3}
                direction="column"
                alignItems="center"
                justify="center"
              >
                {/* Group Analysis */}
                <Card elevetion={1} sx={{ mt: 2, mb: 2 }}>
                  <Typography
                    centered
                    variant="h6"
                    sx={{
                      padding: 2, color: 'white', bgcolor: 'primary.main', textAlign: "center",
                    }}
                  >
                    Group Analytics
                  </Typography>

                  <CardHeader subheader={`Number of members: ${group.member_ids.length}`} />
                  <CardHeader subheader={`Number of posts: ${group.post_ids.length}`} />
                  <CardHeader subheader={`Last active: ${group.last_active}`} />
                  <CardHeader subheader={`Created at: ${group.created_at}`} />

                  {/* <CardHeader subheader="Number of members:" />
                <CardHeader subheader="Number of posts:" />
                <CardHeader subheader="Number of posts deleted:" />
                <CardHeader subheader="Number of post flagged:" />
                <CardHeader subheader="Number of post hidden:" /> */}
                </Card>

                <GroupMembers groupID={currGroup} />
                {/* {groupMembers.map((topic, index) => (
                <ListItem key={topic}>
                  {`${(index + 1)}.  ${topic}`}
                </ListItem>
              ))} */}

              </Grid>
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    );
  } return (<div />); 
} 

export default GroupDetail;
