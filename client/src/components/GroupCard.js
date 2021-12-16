/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Dialog } from "@material-ui/core";
import {
  DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import { joinGroup } from '../fetch';

const tags = ["Football", "Sports", "Entertainment"];

function GroupCard(props) {
  const {
    post, whetherIn, groupId,
  } = props;

  // confirm join group button
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinGroup = async () => {
    // Need to get user from session storage
    const userID = sessionStorage.getItem("id");
    console.log(userID);
    console.log(post.groupId);
    const res = await joinGroup(userID, post.groupId);
    const print = await res.json();
    console.log(print);
    setOpen(false);
  };

  // confirm quit group button
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const buttonsNotIn = [
    <Button key="one" href="./groupdetail" className="groupBtn1" style={{ textTransform: "none" }}>
      View Detail
    </Button>,

    <Button key="two" className="groupBtn2" style={{ textTransform: "none" }} onClick={handleClickOpen}>
      Join Group
    </Button>,
    <Button key="three" className="groupBtn3" style={{ textTransform: "none" }} href="./groupmembers">
      Members
    </Button>,
  ];
  const buttonsIn = [
    <Button key="one" href="./groupdetail" className="groupBtn1" style={{ textTransform: "none" }}>
      View Detail
    </Button>,
    <Button key="two" className="groupBtn4" style={{ textTransform: "none" }} onClick={handleClickOpen2}>
      Quit Group
    </Button>,
    <Button key="three" className="groupBtn3" style={{ textTransform: "none" }} href="./groupmembers">
      Members
    </Button>,
  ];

  return (
    <>
      <Grid item xs={9} md={9}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex", height: "200px" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {/* <img className="groupSizeIcon" src="../../groupSize.png" alt="gpsz" /> */}
                {post.size}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {tags.map((tag) => (
                  <Button key={tag} value={tag} className="tagsBtn">
                    {tag}
                  </Button>
                ))}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image={post.image}
              alt={post.imageLabel}
            />
          </Card>
        </CardActionArea>
      </Grid>
      <Grid item xs={3} md={3}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
            className="groupBtnGroup"
          >
            {whetherIn ? buttonsIn : buttonsNotIn}
          </ButtonGroup>
          {/* confirm join group */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Do you want to send a request to join this group?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                After joining the group, you will be able to view the posts and members in the group. While
                the request is pending, you may not send requests to join other groups.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleJoinGroup} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          {/* confirm quit group */}
          <Dialog
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Do you want to quit this group?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                After quitting the group, you will not be able to view the posts and members in the group anymore.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2}>No</Button>
              <Button onClick={handleClose2} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
    </>
  );
}

GroupCard.propTypes = {
  post: PropTypes.shape({
    size: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupCard;
