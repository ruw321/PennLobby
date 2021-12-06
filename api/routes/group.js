const express = require("express");
const router = express.Router();
const Groups = require("../DBOperations/groups");
const Group = require("../models/Group");
const Ajv = require("ajv");

// get all groups
router.route("/").get(async (req, res) => {
  try {
    const groups = await Groups.getGroups(Group);
    res.status(200).send(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
