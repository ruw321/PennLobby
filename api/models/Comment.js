const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
  author_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
