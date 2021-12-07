import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
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
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/group" element={<Group />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          {/* put this last because since it is empty, it will always be the first
            child to match the URL */}
          <Route path="/" element={<Lobby />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
