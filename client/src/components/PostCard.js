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
import { deletePost } from "../fetch";

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
  const { hide, updateHide } = props;

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
    const userID = sessionStorage.getItem("id");
    const res = await deletePost(userID, props.post._id, props.post.group_id);
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

  return (
    <Card sx={{ maxWidth: 850, marginY: 2 }}>
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
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
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

            <IconButton aria-label="settings">
              <FlagIcon />
              {/* flag as inappropriate */}
            </IconButton>
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
        {/* <IconButton aria-label="comments" sx={{ fontSize: "10px" }}>
          <CommentIcon /> 25
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* TODO: add real comments */}
        <div className="comments">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#ffaa00" }} aria-label="recipe">
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
              cook sdfsdfsdfsdfs together with your guests. Add 1 cup of frozen
              peas along with the mussels, if you like.
            </Typography>
          </CardContent>
        </div>
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
          />
          <div className="replyButton">
            <Button variant="contained" startIcon={<ReplyIcon />}>
              Reply
            </Button>
          </div>
        </div>
      </Collapse>
    </Card>
  );
}
