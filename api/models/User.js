const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hashed_password: { type: String, required: true },
  // profile pic
  group_ids: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  posts_ids: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blocking: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blocked_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  admin: { type: Boolean, default: false, required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;