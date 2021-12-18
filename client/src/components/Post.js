/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { useState, useEffect } from "react";
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
import TrendingTopics from "./TrendingTopics";
import PostCard from "./PostCard";
import { getAllPosts, postMessage } from "../fetch";

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

const trendingTopicsToday = [
  "Music",
  "Football",
  "Sports",
  "Ivy Leagues",
  "Arts",
  "Musical",
  "Residential",
  "Rent",
  "Living",
  "News",
];

const trendingTopicsWeekly = [
  "Sports",
  "Ivy Leagues",
  "Arts",
  "Musical",
  "Residential",
  "Rent",
  "Living",
  "News",
  "Music",
  "Football",
];

function MyPost(props) {
  const [allPosts, setAllPosts] = useState([]);
  const [refresh, setRefresh] = React.useState(props.refresh);
  const userID = sessionStorage.getItem('id');

  React.useEffect(() => {
    setRefresh(props.refresh);
    const loadData = async () => {
      const postCards = await getAllPosts();
      console.log("userID = ", userID);
      // console.log(postCards);
      const myPosts = [];
      for (const post of postCards) {
        // console.log(post);
        if (post.author_id === userID) {
          myPosts.push(post);
        }
      }
      // console.log("myPosts=");
      // console.log(myPosts);
      setAllPosts(myPosts);
    };
    loadData();
  }, [props.refresh]);

  // Yang: conflicts with Miaoyan
  // React.useEffect(async () => {
  //   const postCards = await getAllPosts();
  //   const myPosts = [];
  //   for (const post of postCards) {
  //     // console.log(post);
  //     if (post.author_id === userID) {
  //       myPosts.push(post);
  //     }
  //   }
  //   console.log(myPosts);
  //   setAllPosts(myPosts);
  // }, []);

  React.useEffect(() => {
    const loadData = async () => {
      const postCards = await getAllPosts();
      // console.log(postCards);
      setAllPosts(postCards);
    };
    loadData();
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

  // hide a post

  const [hide, setHide] = React.useState([]);

  const updateHide = (post) => {
    console.log(post);
    setAllPosts(allPosts.filter((p) => !post.includes(p._id)));
    setHide(post);
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        {/* Filter and Sort options */}
        <Container maxWidth="lg" justify="flex-end">
          <Grid container spacing={2}>
            <Grid item key={1} xs={6} md={9}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  pt: 4,
                  pb: 2,
                }}
              />
              {/* Groups */}
              <Container sx={{ pt: 2 }} maxWidth="lg">
                <Grid container rowSpacing={3} columnSpacing={0}>
                  {/* {allPosts.filter((p) => !hide.includes(p._id)).map((post) => ( */}
                  {allPosts.map((post) => (
                    <PostCard key={post._id} post={post} hide={hide} updateHide={updateHide} whetherIn />
                  ))}
                </Grid>
              </Container>
            </Grid>
            <Grid item key={2} xs={6} md={3}>
              <TrendingTopics />
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default MyPost;
