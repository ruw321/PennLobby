const express = require("express");
const router = express.Router();
const Topics = require("../DBOperations/topics");
const Topic = require("../models/Topic");
const Ajv = require("ajv");

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    group_ids: { type: "array" },
  },
  required: ["name"],
};

// get all topics
router.route("/").get(async (req, res) => {
  try {
    const topics = await Topics.getTopics(Topic);
    res.status(200).send(topics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new topic
router.route("/").post(async (req, res) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    // const exists = await Topics.getTopicById(Topic, req.body._id); 
    // if (exists) {
    //   res.status(409).json({ error: "topic is already in the database" });
    //   return;
    // }
    const result = await Topics.addTopic(Topic, req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a topic by id
router.route("/:id").get(async (req, res) => {
  try {
    const topic = await Topics.getTopicById(Topic, req.params.id); 
    res.status(200).send(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a topic by id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    const { _id, ...rest} = obj;
    const topic = await Topics.updateTopicById(Topic, req.params.id, rest);
    res.status(200).send(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a topic by id
router.route("/:id").delete(async (req, res) => {
  try {
    const topic = await Topics.deleteTopicById(Topic, req.params.id);
    res.status(200).send(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;