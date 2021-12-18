const router = require('express').Router();   
const passport = require('passport');
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');
const serverToken = jwt.sign({
  name: 'webserver',
}, 'this_is_a_secret', { expiresIn: '1h' });
// const url = 'ws://penn-lobby-websocket.herokuapp.com/';
const url = 'ws://localhost:8085/';
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

router.post('/register', function (req, _res) {
  console.log('register````', req.body);
  // create jwt token
  let userToken;
  // create and send JWT to a the user
  userToken = jwt.sign({
    name: req.body.username,
  }, 'this_is_a_secret', { expiresIn: '1h' });
  // Notify WS Server to update all connected clients
  const msg = {type: 'new user', data: req.body.username}
  connection.send(JSON.stringify(msg));  
  return _res.status(200).json({ token: userToken, username: req.body.username});
});

router.post('/', function (req, _res) {
  console.log('Received a message');
  if (!req.body.to || !req.body.from || !req.body.message) {
    _res.status(400).json({ error: 'missing to or from or message' });
    return;
  }
  // check if user is valid
  // if(!users.has(req.body.from)){
  //   _res.status(401).json({ error: 'unauthorized user' });
  //   return;
  // }
    const msg = {type: 'message', data: {to: req.body.to, from: req.body.from, message: req.body.message}}
    // Notify WS Server
    connection.send(JSON.stringify(msg)); 
    _res.json({
      message: 'message received',
    });
});

module.exports = router;