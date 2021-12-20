/* eslint-disable import/newline-after-import */
/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  group_ids: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
