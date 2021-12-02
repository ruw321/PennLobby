const User = require("../models/User");

module.exports.createUser = async (req, res, next) => {
  // const user = new User(req.body);
  const testUser = {
    name: "Ruichen3"
  }
  // dedup logic
  const user = new User(testUser);
  console.log(user);
  await user.save();
  res.json({ message: `Successfully created new user ${user.name}` });
  // res.redirect(`/api/user/${user._id}`); -> frontend
  // res.render -> frontend
};

module.exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
};

module.exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const testId = "61a8db012fc183b98ca8cf81";
  const user = await User.findById(id);
  res.json(user);
};

module.exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const testId = "61a8dc5c3d3ac6bb09845d2d";
  const user = await User.findByIdAndUpdate(id, { ...req.body });
  const updatedName = "Super Ruichen";
  user.name = updatedName;
  await user.save();
  res.json({ message: `Successfully updated user's name to ${user.name}` });
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const testId = "61a8e04632eaa2bf5f58aef8";
  const deletedUser = await User.findByIdAndDelete(id);
  res.json({ message: `Successfully deleted user ${deletedUser.name}` });
};