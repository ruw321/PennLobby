const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  topic_ids: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
  member_ids: [{ type: Schema.Types.ObjectId, ref: "User" }],
  post_ids: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  last_active: { type: Date, default: Date.now(), required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  description: { type: String, required: true },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
