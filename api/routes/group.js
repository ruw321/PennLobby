const express = require("express");
const router = express.Router();
const Groups = require("../DBOperations/groups");
const Posts = require("../DBOperations/posts");
const Users = require("../DBOperations/users");
const Topics = require("../DBOperations/topics");
const Group = require("../models/Group");
const Post = require("../models/Post");
const User = require("../models/User");
const Topic = require("../models/Topic");
const Ajv = require("ajv");
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

// get all public groups
router.route("/public").get(async (_req, res) => {
  console.log("here");
  try {
    const p_groups = await Groups.getPublicGroups(Group);
    res.status(200).send(p_groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new group
router.route("/").post(async (req, res) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
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
      const t = await top.getTopicByName(Topic, to[i]);
      newTopicID.push(t._id);
    }
    const newGroup = {
      name: req.body.name,
      owner: req.body.owner,
      description: req.body.description,
      type: req.body.type,
      topic_ids: newTopicID,
      member_ids: [req.body.owner],
    };
    const result = await Groups.addGroup(Group, newGroup);
    const groupID = result._id;
    // add this group's id to topic.group_ids
    for (let i = 0; i < newTopicID.length; i++) {
      top.addGroupIDToTopic(Topic, groupID, newTopicID[i]);
    }
    // add this group's id to owner.group_ids
    const user = await Users.getUserById(User, req.body.owner);
    // const group = await Groups.getGroupByName(Group, newGroup.name);
    const userGroupIds = user.group_ids;
    userGroupIds.push(result._id);
    await Users.updateUserById(User, req.body.owner, {
      group_ids: userGroupIds,
    });
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
router.route("/:groupId").delete(async (req, res) => {
  try {
    const group = await Groups.getGroupById(Group, req.params.groupId);
    const owner = await Users.getUserById(User, group.owner);
    const curUser = await Users.getUserById(User, req.body.userId);

    if (owner == curUser || curUser.admin) {
      const topicIds = group.topic_ids;
      for (let i = 0; i < topicIds.length; i++) {
        const topic = await Topics.getTopicById(Topic, topicIds[i]);
        const topicGroupIds = topic.group_ids.filter((id) => id != topicIds[i]);
        await Topics.updateTopicById(Topic, topicIds[i], {
          group_ids: topicGroupIds,
        });
      }

      const memberIds = group.member_ids;
      for (let i = 0; i < memberIds.length; i++) {
        const user = await Users.getUserById(User, memberIds[i]);
        const userGroupIds = user.group_ids.filter((id) => id != memberIds[i]);
        await Users.updateUserById(User, memberIds[i], {
          group_ids: userGroupIds,
        });
      }

      const postIds = group.post_ids;
      for (let i = 0; i < postIds.length; i++) {
        await Posts.deletePostById(Post, postIds[i]);
      }
    } else {
      res
        .status(400)
        .json({ error: "You are not authorized to delete this group!" });
      return;
    }
    res.status(200).send(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
