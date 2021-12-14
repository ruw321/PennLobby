const express = require("express");
const router = express.Router();
// make sure the name is different from the class instance 
// for example, it cannot be users = require(./users)
const Users = require("../DBOperations/users");
const User = require('../models/User');
// data validator 
const Ajv = require("ajv");

//data validator
const ajv = new Ajv({ coerceTypes: true })
const schema = {
  type: "object",
  properties: {
    username: { type: 'string' },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    password: { type: 'string' },
    group_ids: { type: 'array' },
    post_ids: { type: 'array' },
    following: { type: 'array' },
    followers: { type: 'array' },
    blocking: { type: 'array' },
    blocked_by: { type: 'array' },
  },
  required: ['username', 'email', 'firstName', 'lastName', 'password'],
}

// in this file, we will assume the database connection is
// already established and successful

// get all users
router.route("/").get(async (req, res) => {
  try {
    console.log(' !!get all!!user!');
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
      res.status(409).json({ error: 'this email is already in the database' });
      return;
    }
    if (await Users.getUserByUsername(User, req.body.username)) {
      res.status(409).json({ error: 'this username is already in the database' });
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
  try {
    const user = await Users.getUserByUsername(User, req.params.username);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a user by email
router.route("/email/:email").get(async (req, res) => {
  try {
    console.log(req.query);
    const user = await Users.getUserByEmail(User, req.body.email);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a user by id
router.route("/:id").put(async (req, res) => {
  try {
    console.log("....here.....")
    const obj = req.body;
    const { _id, ...rest } = obj;
    // console.log(rest);
    const user = await Users.updateUserById(User, req.body._id, rest);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a user by id
router.route("/:id").delete(async (req, res) => {
  try {
    const user = await Users.deleteUserById(User, req.body._id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// join a group by id
router.route("/join/").put(async (req, res) => {
  try {
    console.log(' !!put!!user!');
    const userId = req.body._id;
    const groupId = req.body._group_id;
    const user = await Users.getUserById(User, userId);
    if (user.group_ids.includes(groupId)) {
      res.status(400).json({ error: 'already in this group' });
      return;
    }
    user.group_ids.push(groupId);
    console.log(' !!user!', user)
    const { _id, ...rest } = user;
    const newUsers = await Users.updateUserById(User, req.body._id, rest);
    res.status(200).send(newUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
