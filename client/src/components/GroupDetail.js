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
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, List, ListItemText, TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import TrendingTopics from "./TrendingTopics";
import PostCard from "./PostCard";
import Menu from "./Menu";
import GroupMembers from "./GroupMembers";

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

const groupMembers = [
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
];

function GroupDetail(props) {
  const { currGroup } = props;
  console.log(currGroup);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for inviate someone dialog
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  // for levae grou dialog
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  // for upload button
  const Input = styled('input')({
    display: 'none',
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <main>
        {/* Hero unit */}
        {/* Filter and Sort options */}

        <Container maxWidth="lg" justify="flex-end">

          <Box sx={{
            pt: 2, pl: 2, pb: 2, display: 'flex', justifyContent: 'space-between', margin: '10px', borderBottom: 1, borderColor: 'grey.500',
          }}
          >
            <Typography variant="h4">
              {currGroup}
              <Typography variant="h6">
                Group description Group description Group description Group description
              </Typography>
            </Typography>
            <Button variant="contained" sx={{ m: 1, height: 50, width: 262 }} onClick={handleClickOpen2}>Invite Someone</Button>
            <Button variant="contained" sx={{ m: 1, height: 50, width: 262 }} onClick={handleClickOpen3}>Leave Group</Button>
            <Button variant="contained" sx={{ m: 1, height: 50, width: 262 }} onClick={handleClickOpen}>New Post</Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create a new post</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please type the new post content here. Your group is waiting for your input!
                </DialogContentText>
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
                  sx={{ pb: 8 }}
                />
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" />
                  <Button variant="contained" component="span">
                    Upload Media
                  </Button>
                </label>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Send</Button>
              </DialogActions>
            </Dialog>

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

            <Dialog
              open={open3}
              onClose={handleClose3}
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
                <Button onClick={handleClose3}>Cancel</Button>
                <Button onClick={handleClose3} autoFocus>
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
                <CardHeader subheader="Number of members:" />
                <CardHeader subheader="Number of posts:" />
                <CardHeader subheader="Number of posts deleted:" />
                <CardHeader subheader="Number of post flagged:" />
                <CardHeader subheader="Number of post hidden:" />
              </Card>

              <GroupMembers />
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
}

export default GroupDetail;
