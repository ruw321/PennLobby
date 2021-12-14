const express = require("express");
const router = express.Router();
const Groups = require("../DBOperations/groups");
const Group = require("../models/Group");
const Topic = require("../models/Topic");
const Ajv = require("ajv")
const top = require("../DBOperations/topics");

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    owner: { type: "string" },
    type: { type: "string" },
    topic_ids: { type: "array" },
    member_ids: { type: "array" },
    post_ids: { type: "array" },
  },
  required: ["name", "owner", "type"],
};

// get all groups
router.route("/").get(async (req, res) => {
  try {
    const groups = await Groups.getGroups(Group);
    res.status(200).send(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new group
router.route("/").post(async (req, res) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    // console.log("check1");
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    const exists = await Groups.getGroupByName(Group, req.body.name);
    if (exists) {
      res.status(409).json({ error: "group is already in the database" });
      return;
    }
    const to = req.body.topics;
    const newTopicID = [];
    for (let i = 0; i < to.length; i++) {
      console.log(to[i]);
      const t = await top.getTopicByName(Topic, to[i]);
      newTopicID.push(t._id);
    }
    console.log(newTopicID);
    const newGroup = {
      name: req.body.name,
      owner: req.body.owner,
      description: req.body.description,
      type: req.body.type,
      topic_ids: newTopicID,
    }

    const result = await Groups.addGroup(Group, newGroup);

    const groupID = result._id;
    // add this group's id to topic.group_ids
    for (let i = 0; i < newTopicID.length; i++) {
      top.addGroupIDToTopic(Topic, groupID, newTopicID[i])
    }
    res.status(201).send(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a group by id
router.route("/:id").get(async (req, res) => {
  try {
    const group = await Groups.getGroupById(Group, req.body._id);
    res.status(200).send(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a group by id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    const { _id, ...rest } = obj;
    const group = await Groups.updateGroupById(Group, req.body._id, rest);
    res.status(200).send(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a group by id
router.route("/:id").delete(async (req, res) => {
  try {
    const group = await Groups.deleteGroupById(Group, req.body._id);
    res.status(200).send(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
