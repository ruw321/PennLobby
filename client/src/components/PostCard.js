/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { deletePost, addComment, getAllComments } from "../fetch";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props) {
  const { hide, updateHide, post } = props;

  const userID = sessionStorage.getItem('id');
  const postID = post._id;

  // get all comments
  const [allComments, setAllComments] = React.useState([]);

  React.useEffect(async () => {
    // To Do
    // const allCommentsDB = await getAllComments(postID);
    const comments = [{
      postID: "61b82519446d6c20ca33f30a",
      authorID: "61b8222e311a421f9026e54d",
      content: "This is my first comment",
    }];
    // const comments = allCommentsDB.map((g) =>
    //   (
    //     {
    //       postID: "61b82519446d6c20ca33f30a",
    //       authorID: "61b8222e311a421f9026e54d",
    //       content: "This is my first comment",
    //     }
    //   ));
    setAllComments(comments);
  }, []);

  // comment toggle down
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // delete a post
  const [openDeletePost, setOpenDeletePost] = React.useState(false);

  const handleClickOpenDeletePost = () => {
    setOpenDeletePost(true);
  };

  const handleCloseDeletePost = () => {
    setOpenDeletePost(false);
  };

  const handleConfirmDeletePost = async () => {
    const temp = "61b8222e311a421f9026e54d";
    // const userID = sessionStorage.getItem("id");
    const res = await deletePost(temp, props.post._id, props.post.group_id);
    const print = await res.json();
    console.log(print);
    setOpenDeletePost(false);
  };

  // hide a post
  const [openHidePost, setOpenHidePost] = React.useState(false);

  const handleClickOpenHidePost = () => {
    setOpenHidePost(true);
  };

  const handleCloseHidePost = () => {
    setOpenHidePost(false);
  };

  const handleConfirmHidePost = () => {
    hide.push(props.post._id);
    console.log(props.post._id);
    updateHide(hide);
    setOpenHidePost(false);
  };

  // flag a post as inappropriate
  const [openFlagPost, setOpenFlagPost] = React.useState(false);

  const handleClickOpenFlagPost = () => {
    setOpenFlagPost(true);
  };

  const handleCloseFlagPost = () => {
    setOpenFlagPost(false);
  };

  const handleConfirmFlagPost = () => {

  };

  // post analytics
  const [openAnalytics, setOpenAnalytics] = React.useState(false);

  const handleClickOpenAnalytics = () => {
    setOpenAnalytics(true);
  };

  const handleCloseAnalytics = () => {
    setOpenAnalytics(false);
  };

  // const handleConfirmAnalytics = () => {
  //   setOpenAnalytics(false);
  // };

  // delete a comment
  const [openDeleteComment, setOpenDeleteComment] = React.useState(false);

  const handleClickOpenDeleteComment = () => {
    console.log("check1");
    setOpenDeleteComment(true);
  };

  const handleCloseDeleteComment = () => {
    setOpenDeleteComment(false);
  };

  const handleConfirmDeleteComment = async () => {
    // const temp = "61b8222e311a421f9026e54d";
    // // const userID = sessionStorage.getItem("id");
    // const res = await deletePost(temp, props.post._id, props.post.group_id);
    // const print = await res.json();
    // console.log(print);
    setOpenDeleteComment(false);
  };

  // send a reply(comments) to a post
  const [reply, setReply] = React.useState('');
  const handleChangeReply = (event) => {
    setReply(event.target.value);
  };

  const handleSendReply = async () => {
    const res = await addComment(reply, userID, postID);
    const print = await res.json();
    console.log(print);
  };

  return (
    <Card sx={{
      marginY: 2, width: '100%',
    }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.post.title.charAt(0)}
          </Avatar>
        }
        action={
          <div>
            {/* delete a post */}
            <IconButton aria-label="settings" onClick={handleClickOpenDeletePost}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={openDeletePost}
              onClose={handleCloseDeletePost}
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Do you want to delete this post?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You have to be the author or the group administrator to delete this post.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeletePost}>Cancel</Button>
                <Button onClick={handleConfirmDeletePost} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            {/* hide a post */}
            <IconButton aria-label="settings" onClick={handleClickOpenHidePost}>
              <VisibilityOffIcon />
            </IconButton>

            <Dialog
              open={openHidePost}
              onClose={handleClickOpenHidePost}
            >
              <DialogTitle id="alert-dialog-title">
                Do you want to hide this post?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You will no longer see this post and its comment in this group.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseHidePost}>Cancel</Button>
                <Button onClick={handleConfirmHidePost} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            {/* flag as inappropriate */}
            <IconButton aria-label="settings" onClick={handleClickOpenFlagPost}>
              <FlagIcon />
            </IconButton>

            <Dialog
              open={openFlagPost}
              onClose={handleClickOpenFlagPost}
            >
              <DialogTitle id="alert-dialog-title">
                Do you want to flag this post as inappropriate?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You flag will be reported to the group administrator.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseFlagPost}>Cancel</Button>
                <Button onClick={handleConfirmFlagPost} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            {/* post analytics */}
            <IconButton aria-label="settings" onClick={handleClickOpenAnalytics}>
              <EqualizerIcon />
            </IconButton>

            <Dialog
              open={openAnalytics}
              onClose={handleClickOpenAnalytics}
            >
              <DialogTitle id="alert-dialog-title">
                Post Analytics
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The number of replies for this post:
                  The post was created:
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAnalytics}>Close</Button>
              </DialogActions>
            </Dialog>

          </div>
        }
        title={props.post.title}
        subheader={props.post.created_at}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
  
      {/* Below is comment section */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>

        {/* TODO: add real comments */}
        {allComments.map((comment) => (
          <div className="comments">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#ffaa00" }} aria-label="recipe">
                  R
                </Avatar>
            }
              action={
                <div>
                  {/* Delete a comment */}
                  <IconButton aria-label="settings" onClick={handleClickOpenDeleteComment}>
                    <DeleteIcon />
                  </IconButton>

                  <Dialog
                    open={openDeleteComment}
                    onClose={handleCloseDeleteComment}
                  >
                    <DialogTitle id="alert-dialog-title">
                      Do you want to delete this reply?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        You have to be the author or the group administrator to delete this post.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDeleteComment}>Cancel</Button>
                      <Button onClick={handleConfirmDeleteComment} autoFocus>
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* Edit a comment */}
                  <IconButton aria-label="settings" onClick={handleClickOpenDeleteComment}>
                    <EditIcon />
                  </IconButton>
                </div>
            }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
          
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {comment.content}
              </Typography>
            </CardContent>
          </div>
        ))}
        {/* TODO: add real comments */}
        <div className="comments">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#ffaa00" }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <div>
                {/* Delete a comment */}
                <IconButton aria-label="settings" onClick={handleClickOpenDeleteComment}>
                  <DeleteIcon />
                </IconButton>

                <Dialog
                  open={openDeleteComment}
                  onClose={handleCloseDeleteComment}
                >
                  <DialogTitle id="alert-dialog-title">
                    Do you want to delete this reply?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You have to be the author or the group administrator to delete this post.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteComment}>Cancel</Button>
                    <Button onClick={handleConfirmDeleteComment} autoFocus>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* Edit a comment */}
                <IconButton aria-label="settings" onClick={handleClickOpenDeleteComment}>
                  <EditIcon />
                </IconButton>
              </div>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Comment Comment Comment Comment Comment Comment Comment Comment
            </Typography>
          </CardContent>
        </div>

        {/* repetition */}
        <div className="comments">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#00aa7f" }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <DeleteIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </div>

        <div className="reply">
          <TextField
            id="outlined-multiline-static"
            label="Reply"
            multiline
            fullWidth
            rows={4}
            onChange={handleChangeReply}
          />
          <div className="replyButton">
            <Button variant="contained" startIcon={<ReplyIcon />} onClick={handleSendReply}>
              Reply
            </Button>
          </div>
        </div>
      </Collapse>
    </Card>
  );
}
