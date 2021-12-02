const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;