const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // media attachment
  author_id: { type: Schema.Types.ObjectId, ref: "User" },
  group_id: { type: Schema.Types.ObjectId, ref: "Group" },
  comment_ids: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  created_at: { type: Date, default: Date.now(), required: true },
  flag_for_deletion: { type: Boolean, default: false, required: true },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
