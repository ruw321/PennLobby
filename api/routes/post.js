const express = require("express");
const router = express.Router();
const Posts = require("../DBOperations/posts");
const Post = require("../models/Post");
const Ajv = require("ajv");

// get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await Posts.getPosts(Post);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
