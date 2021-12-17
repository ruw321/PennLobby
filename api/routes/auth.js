const router = require('express').Router();   
const passport = require('passport');
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');
const serverToken = jwt.sign({
  name: 'webserver',
}, 'this_is_a_secret', { expiresIn: '1h' });
const url = 'ws://penn-lobby-websocket.herokuapp.com/';
const connection = new WebSocket(url, {
  headers: { token: serverToken },
});
connection.onopen = () => {
  connection.send('["webserver"]');
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  console.log(e.data);
};

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (req.session.requestCount > 4) {
      req.session.requestCount = 0;
    }

    if (err) {
      if (req.session.requestCount) {
        req.session.requestCount += 1;
      } else {
        req.session.requestCount = 1;
      }
      if (req.session.requestCount > 4) {
        return res.status(401).json({ error: "too many failed requests"})
      }
      return res.status(401).json(err);
    }

    if (!user) {
      if (req.session.requestCount) {
        req.session.requestCount += 1;
      } else {
        req.session.requestCount = 1;
      }
      if (req.session.requestCount > 4) {
        return res.status(401).json({ error: "too many failed requests"})
      }
      return res.status(401).json(info);
    }
    // because we used the customized callback function
    // so we have to manually call logIn function which 
    // will trigger the userserialize functions to add 
    // user information to the session
    req.logIn(user, function(err) {    // if success
      if (err) { return next(err); }
      // create jwt token
      let userToken;
      // create and send JWT to a the user
      userToken = jwt.sign({
        name: user.username,
      }, 'this_is_a_secret', { expiresIn: '1h' });
      // Notify WS Server to update all connected clients
      const msg = {type: 'new user', data: user.username}
      connection.send(JSON.stringify(msg));  
      return res.status(200).json({ id: user.id, token: userToken, user: user.username});
    })
  })(req, res, next);
});

router.get('/logout', function (req, _res) {
  req.logout();
});

module.exports = router;