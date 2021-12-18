const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: "User" },
  receiver_id: { type: Schema.Types.ObjectId, ref: "User" },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
