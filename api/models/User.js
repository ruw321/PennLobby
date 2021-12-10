const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // this is used for hashing password
const SALT_WORK_FACTOR = 10; // this is used for hashing password
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  // profile pic
  group_ids: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  post_ids: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blocking: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blocked_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  admin: { type: Boolean, default: false, required: true },
  created_at: { type: Date, default: Date.now(), required: true }
});

// this function is referenced from: 
// https://stackoverflow.com/questions/14588032/mongoose-password-hashing
userSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.verifyPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;