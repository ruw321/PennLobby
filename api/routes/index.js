/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ message: "Welcome to PennLobby's backend!" });
});

module.exports = router;
