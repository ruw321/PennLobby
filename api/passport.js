// const session = require('express-session');  // session middleware
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

module.exports = (passport) => {
  // Passport Local Strategy
  passport.use(new LocalStrategy(
    // function of username, password, done(callback)
    function (username, password, done) {
      // look for the user data
      User.findOne({ username: username })
        .then(async (user) => {
          // if user doesn't exist
          if (!user) { return done(null, false, { message: 'User not found.' }); }
          // if the password isn't correct
          await user.verifyPassword(password, function (err, isMatch) {
            if (err) throw err;
            if (!isMatch) {
              return done(null, false, {
                message: 'Invalid password.',
              });
            } else {
              return done(null, user);
            }
          });
        });
    }
  ));

  // these functions are for storing user in the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  });
  passport.deserializeUser((userId, done) => {
    User.findOne({ _id: userId })
      .then((user) => {
        done(null, user);
      })
      .catch(err => done(err))
  });
}

