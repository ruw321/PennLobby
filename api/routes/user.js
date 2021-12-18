const express = require("express");
const router = express.Router();
// make sure the name is different from the class instance
// for example, it cannot be users = require(./users)
const Users = require("../DBOperations/users");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Comments = require("../DBOperations/comments");
const Posts = require("../DBOperations/posts");
const Post = require("../models/Post");
const Groups = require("../DBOperations/groups");
const Group = require("../models/Group");
// data validator
const Ajv = require("ajv");

//data validator
const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    password: { type: "string" },
    comment_ids: { type: "array" },
    group_ids: { type: "array" },
    post_ids: { type: "array" },
    following: { type: "array" },
    followers: { type: "array" },
    blocking: { type: "array" },
    blocked_by: { type: "array" },
    avatar_url: { type: "string" },
    notification_ids: { type: "array" },
  },
  required: ["username", "email", "firstName", "lastName", "password"],
};

// in this file, we will assume the database connection is
// already established and successful

// get all users
router.route("/").get(async (req, res) => {
  try {
    console.log(" !!get all!!user!");
    const users = await Users.getUsers(User);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new user
router.route("/").post(async (req, res) => {
  // console.log(req.body);
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    // check if the user already exists in the database
    const exists = await Users.getUserbyEmail(User, req.body.email);
    if (exists) {
      res.status(409).json({ error: "this email is already in the database" });
      return;
    }
    if (await Users.getUserByUsername(User, req.body.username)) {
      res
        .status(409)
        .json({ error: "this username is already in the database" });
      return;
    }
    const result = await Users.addUser(User, req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a user by id
router.route("/id/:id").get(async (req, res) => {
  try {
    const user = await Users.getUserById(User, req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a user by username
router.route("/username/:username").get(async (req, res) => {
  if (req.isAuthenticated) {
    try {
      const user = await Users.getUserByUsername(User, req.params.username);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "You are not authorized." });
  }
});

// get a user by email
router.route("/email/:email").get(async (req, res) => {
  try {
    const user = await Users.getUserByEmail(User, req.params.email);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// user change password
router.route("/password/:id").put(async (req, res) => {
  if (req.isAuthenticated) {
    try {
      const pass = req.body.password;
      const id = req.params.id;
      const user = await Users.changePassword(User, id, pass);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "You are not authorized." });
  }
});

// update a user by id
router.route("/:id").put(async (req, res) => {
  if (req.isAuthenticated) {
    try {
      const obj = req.body;
      const { _id, ...rest } = obj;
      const user = await Users.updateUserById(User, req.params.id, rest);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "You are not authorized." });
  }
});

// deactivate a user by id
router.route("/:id").delete(async (req, res) => {
  try {
    const user = await Users.deleteUserById(User, req.params.id);
    // delete the comments, posts and groups created by this user
    await Comments.deleteCommentByAuthor(Comment, req.params.id);
    await Posts.deletePostByAuthor(Post, req.params.id);
    await Groups.deleteGroupByOwner(Group, req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// join a group by id
router.route("/join/").put(async (req, res) => {
  try {
    console.log(" !!put!!user!");
    const userId = req.body._id;
    const groupId = req.body._group_id;
    const user = await Users.getUserById(User, userId);
    if (user.group_ids.includes(groupId)) {
      res.status(400).json({ error: "already in this group" });
      return;
    }
    user.group_ids.push(groupId);
    console.log(" !!user!", user);
    const { _id, ...rest } = user;
    const newUsers = await Users.updateUserById(User, req.body._id, rest);
    res.status(200).send(newUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// a group admin promotes another group member from member to admin
router.route("/promote/:userToPromoteId").put(async (req, res) => {
  if (req.isAuthenticated) {
    try {
      const user = await Users.getUserById(User, req.body.user_id);
      const userToPromote = await Users.getUserById(
        User,
        req.params.userToPromoteId
      );

      const g_id = req.body.group_id;
      if (userToPromote.group_ids.includes(req.body.group_id) && user.group_admins.includes(g_id)) {
        const groupAdmins = userToPromote.group_admins;
        groupAdmins.push(g_id);
        const response = await Users.updateUserById(
          User,
          req.params.userToPromoteId,
          { group_admins: groupAdmins }
        );
        res.status(200).send(response);
      } else {
        res
          .status(400)
          .json({ error: "You are either not authorized to promote this user, or this user is not in the group!" });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "You are not authorized." });
  }
});

// a group admin demotes another group member from admin to member
router.route("/demote/:userToPromoteId").put(async (req, res) => {
  if (req.isAuthenticated) {
    try {
      const user = await Users.getUserById(User, req.body.user_id);
      const userToPromote = await Users.getUserById(
        User,
        req.params.userToPromoteId
      );
      const gIDs = user.group_admins;
      const gID = req.body.group_id;
      const currG = await Groups.getGroupById(gID);
      
      if (userToPromote.group_ids.includes(gID) && gIDs.includes(gID) && currG.owner != req.params.userToPromoteId) {
        const gIDs2 = userToPromote.group_admins;
        gIDs2.splice(gIDs2.indexOf(gID), 1);
        const response = await Users.updateUserById(
          User,
          req.params.userToPromoteId,
          { group_admins: gIDs2 }
        );
        res.status(200).send(response);
      } else {
        res
          .status(400)
          .json({ error: "You are either not authorized to demote this user, or this user is not in the group!" });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "You are not authorized." });
  }
});

module.exports = router;
