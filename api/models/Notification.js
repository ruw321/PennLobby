const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: "User" },
  receiver_id: { type: Schema.Types.ObjectId, ref: "User" },
  // plain_message, delete_post, grant_group_access, being_invited_to_group
  type: { type: String, default: "plain_message", required: true },
  // status 1: accept (admin deletes post OR admin adds the user into group OR user agrees to join the group)
  // status 2: decline (admin not to delete post OR admin refuses to add user into group OR user declines the invitation)
  // status 3: pending (haven't decided yet)
  status: { type: String, default: "pending", required: true },
  // true / false, turn into not visible if read on the frontend part
  read: { type: Boolean, default: true, required: true },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
