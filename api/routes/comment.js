const express = require("express");
const router = express.Router();
const Comments = require("../DBOperations/comments");
const Comment = require("../models/Comment");
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
router.route("/").get(async (req, res) => {
  try {
    const comments = await Comments.getComments(Comment);
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
    const exists = await Comments.getCommentById(Comment, req.body._id); 
    if (exists) {
      res.status(409).json({ error: 'comment is already in the database' });
      return;
    }
    const result = await Comments.addComment(Comment, req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a comment by id
router.route("/:id").get(async (req, res) => {
  try {
    const comment = await Comments.getCommentById(Comment, req.body._id); 
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a comment by id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    const { _id, ...rest} = obj;
    const comment = await Comments.updateCommentById(Comment, req.body._id, rest);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a comment by id
router.route("/:id").delete(async (req, res) => {
  try {
    const comment = await Comments.deleteCommentById(Comment, req.body._id);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
