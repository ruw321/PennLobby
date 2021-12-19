const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: "User" },
  receiver_ids: [{ type: Schema.Types.ObjectId, ref: "User" }], // optional upon creation
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
