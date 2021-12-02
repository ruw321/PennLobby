import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Lobby from './components/Lobby';
import Group from './components/Group';
import Post from './components/Post';
import Profile from './components/Profile';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
          <Route path="/group">
            <Group />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/message">
            <Message />
          </Route>
          {/* put this last because since it is empty, it will always be the first
            child to match the URL */}
          <Route path="/">
            <Lobby />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
