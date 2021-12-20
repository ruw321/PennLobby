/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
// make sure the name is different from the class instance
// for example, it cannot be users = require(./users)
const Ajv = require('ajv');
const Users = require('../DBOperations/users');
const User = require('../models/User');
const Groups = require('../DBOperations/groups');
const Group = require('../models/Group');

// quit a group by id
router.route('/').delete(async (req, res) => {
  try {
    const userId = req.body._id;
    const groupId = req.body._group_id;
    const user = await Users.getUserById(User, userId);
    if (!user.group_ids.includes(groupId)) {
      res.status(400).json({ error: 'user not in this group' });
      return;
    }
    user.group_ids.remove(groupId);
    // console.log(' user = ', user);
    const { _id, ...rest } = user;
    const newUsers = await Users.updateUserById(User, userId, rest);

    const group = await Groups.getGroupById(Group, groupId);
    if (!group.member_ids.includes(userId)) {
      res.status(400).json({ error: 'user not in this group 2' });
      return;
    }
    group.member_ids.remove(userId);
    const { _id1, ...rest1 } = group;
    const newgroup = await Groups.updateGroupById(Group, groupId, rest1);
    res.status(200).send(newUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
