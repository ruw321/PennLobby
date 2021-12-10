const router = require('express').Router();   
const passport = require('passport');

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (req.session.requestCount) {
      req.session.requestCount += 1;
    } else {
      req.session.requestCount = 1;
    }
    console.log(req.session.requestCount);
    if (err) {
      if (req.session.requestCount > 2) {
        console.log('your account is being locked');
      }
      return res.status(401).json(err);
    }
    if (!user) {
      if (req.session.requestCount > 2) {
        console.log('your account is being locked');
      }
      return res.status(401).json(info);
    }
    // because we used the customized callback function
    // so we have to manually call logIn function which 
    // will trigger the userserialize functions to add 
    // user information to the session
    req.logIn(user, function(err) {    // if success
      if (err) { return next(err); }
      return res.status(200).json({ id: user.id });
    })
  })(req, res, next);
});

router.get('/logout', function (req, _res) {
  req.logout();
});

module.exports = router;