const express = require("express");
const router = express.Router();
const Comments = require("../DBOperations/comments");
const Posts = require("../DBOperations/posts");
const Users = require("../DBOperations/users");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const Ajv = require("ajv");

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    content: { type: "string" },
    post_id: { type: "string" },
    author_id: { type: "string" },
  },
  required: ["content", "post_id", "author_id"],
};

// get all comments
// add "all" in url to differentiate with get a comment by id
router.route("/all/:postId").get(async (req, res) => {
  try {
    const post = await Posts.getPostById(Post, req.params.postId);
    const comments = post.comment_ids;
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new comment
router.route("/").post(async (req, res) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    const result = await Comments.addComment(Comment, req.body);
    const user = await Users.getUserById(User, result.author_id);
    const userCommentIds = user.comment_ids;
    userCommentIds.push(result._id);
    await Users.updateUserById(User, result.author_id, {
      comment_ids: userCommentIds,
    });
    const post = await Posts.getPostById(Post, result.post_id);
    const postCommentIds = post.comment_ids;
    postCommentIds.push(result._id);
    await Posts.updatePostById(Post, result.post_id, { comment_ids: postCommentIds });
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a comment by id
router.route("/:id").get(async (req, res) => {
  try {
    const comment = await Comments.getCommentById(Comment, req.params.id);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a comment by id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    // const { _id, ...rest } = obj;
    const comment = await Comments.getCommentById(Comment, req.params.id);
    if (obj.user_id == comment.author_id) {
      const updatedObject = { content: obj.content };
      const response = await Comments.updateCommentById(
        Comment,
        req.params.id,
        updatedObject
      );
      res.status(200).send(response);
    } else {
      res
        .status(400)
        .json({ error: "You are not authorized to edit this comment!" });
      return;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a comment by comment id
router.route("/:id").delete(async (req, res) => {
  try {
    const comment = await Comments.getCommentById(Comment, req.params.id);
    const curUser = await Users.getUserById(User, req.body.userId);
    if (req.body.userId == comment.author_id || curUser.admin) {
      await Comments.deleteCommentById(Comment, req.params.id);
      const user = await Users.getUserById(User, comment.author_id);
      const userCommentIds = user.comment_ids.filter(
        (id) => id != req.params.id
      );
      await Users.updateUserById(User, comment.author_id, {
        comment_ids: userCommentIds,
      });
      const post = await Posts.getPostById(Post, comment.post_id);
      const postCommentIds = post.comment_ids.filter(
        (id) => id != req.params.id
      );
      await Posts.updatePostById(Post, comment.post_id, {
        comment_ids: postCommentIds,
      });
    } else {
      res
        .status(400)
        .json({ error: "You are not authorized to delete this comment!" });
      return;
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
