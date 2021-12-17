const express = require("express");
const router = express.Router();
const Posts = require("../DBOperations/posts");
const Users = require("../DBOperations/users");
const Comments = require("../DBOperations/comments");
const Groups = require("../DBOperations/groups");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Group = require("../models/Group");
const Ajv = require("ajv");

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    author_id: { type: "string" },
    group_id: { type: "string" },
    comment_ids: { type: "array" },
  },
  required: ["title", "content", "author_id", "group_id"],
};

// get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await Posts.getPosts(Post);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new post
router.route("/").post(async (req, res) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    // const exists = await Posts.getPostById(Post, req.body._id);
    // if (exists) {
    //   res.status(409).json({ error: "post is already in the database" });
    //   return;
    // }
    const newPost = await Posts.addPost(Post, req.body);
    const group = await Groups.getGroupById(Group, newPost.group_id);
    const groupPostIds = group.post_ids;
    groupPostIds.push(newPost._id);
    await Groups.updateGroupById(Group, newPost.group_id, {
      post_ids: groupPostIds,
    });
    const user = await Users.getUserById(User, newPost.author_id);
    const userPostIds = user.post_ids;
    userPostIds.push(newPost._id);
    await Users.updateUserById(User, newPost.author_id, {
      post_ids: userPostIds,
    });
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a post by post id
router.route("/:id").get(async (req, res) => {
  try {
    const post = await Posts.getPostById(Post, req.body._id); // req.body.post_id
    res.status(200).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a post by post id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    const { _id, ...rest } = obj;
    const post = await Posts.updatePostById(Post, req.params.id, rest);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a post by post id
router.route("/:postId").delete(async (req, res) => {
  try {
    const post = await Posts.getPostById(Post, req.params.postId);
    const group = await Groups.getGroupById(User, req.body.groupId);
    const user = await Users.getUserById(User, req.body.userId);
    if (req.body.userId == post.author_id || user.admin) {
      await Posts.deletePostById(Post, req.params.postId);

      const groupPostIds = group.post_ids.filter(
        (id) => id != req.params.postId
      );
      await Groups.updateGroupById(Group, req.body.groupId, {
        post_ids: groupPostIds,
      });

      const userPostIds = user.post_ids.filter((id) => id != req.params.postId);
      await Users.updateUserById(User, req.body.userId, { post_ids: userPostIds });

      const commentIds = post.comment_ids;
      for (let i = 0; i < commentIds.length; i++) {
        await Comments.deleteCommentById(Comment, commentIds[i]);
      }
    } else {
      res
        .status(400)
        .json({ error: "You are not authorized to delete this post!" });
      return;
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
