const express = require("express");
const router = express.Router();
const Comments = require("../DBOperations/comments");
const Comment = require("../models/Comment");
const Ajv = require("ajv");

// get all comments
router.route("/").get(async (req, res) => {
  try {
    const comments = await Comments.getComments(Comment);
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
