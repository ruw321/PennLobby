const express = require("express");
const router = express.Router();
const Topics = require("../DBOperations/topics");
const Topic = require("../models/Topic");
const Ajv = require("ajv");

// get all topics
router.route("/").get(async (req, res) => {
  try {
    const topics = await Topics.getTopics(Topic);
    res.status(200).send(topics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;