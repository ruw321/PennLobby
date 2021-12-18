const express = require("express");
const router = express.Router();
const Notifications = require("../DBOperations/notifications");
const Notification = require("../models/Notification");
const Ajv = require("ajv");

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    content: { type: "string" },
    // sender_id: { type: "string" },
    receiver_id: { type: "string" },
  },
  required: ["content"],
};

// get all notifications
router.route("/").get(async (req, res) => {
  try {
    const topics = await Topics.getTopics(Topic);
    res.status(200).send(topics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;