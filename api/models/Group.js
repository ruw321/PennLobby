const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true},
  // picture: { type:  }
  member_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  topics: [{ type: String, ref: 'Topic', required: true }],
  post_ids: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  last_active: { type: Date },
  created_at: { type: Date },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
