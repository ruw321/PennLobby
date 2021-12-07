const express = require("express");
const router = express.Router();
const Posts = require("../DBOperations/posts");
const Post = require("../models/Post");
const Ajv = require("ajv");

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    author_id: { type: "string" },
    comment_ids: { type: "array" },
  },
  required: ["title", "content", "author_id"],
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
    const exists = await Posts.getPostById(Post, req.body._id);
    if (exists) {
      res.status(409).json({ error: "post is already in the database" });
      return;
    }
    const result = await Posts.addPost(Post, req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a post by id
router.route("/:id").get(async (req, res) => {
  try {
    const post = await Posts.getPostById(Post, req.body._id); 
    res.status(200).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a post by id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    const { _id, ...rest} = obj;
    const post = await Posts.updatePostById(Post, req.body._id, rest);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a post by id
router.route("/:id").delete(async (req, res) => {
  try {
    const post = await Posts.deletePostById(Post, req.body._id);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
