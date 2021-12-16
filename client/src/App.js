/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
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
// import Message from './components/Message';
import Messages from './components/Messages';
import GroupDetail from './components/GroupDetail';
import GroupMembers from './components/GroupMembers';
import { setupWSConnection } from './components/notifications';
import { getAllUsers } from './fetch';

function App() {
  const [contacts, setContacts] = useState(0); // number of connected users
  const [messages, setMessages] = useState(0); // counts messages sent and received - lift up state
  const texts = useRef([]); // mutable reference to store messages. Do not overuse!
  const [friends, setFriends] = useState([]);
  const [userName, setUserName] = useState('');
  const [refresh, setRefresh] = useState(false);
  const updateUserName = (u) => setUserName(u);
  const updateContacts = () => setContacts((contacts) => contacts + 1);
  const updateMessages = () => setMessages((messages) => messages + 1);
  
  useEffect(() => {
    authenticate();
  }, [userName]);
  useEffect(() => {
    getAllUsers().then((response) => {
      if (!response) { return; }
      setFriends(response.filter((r) => r.username !== sessionStorage.getItem('username')));
      // .filter((r) => r !== sessionStorage.getItem('username'))
    });
    setRefresh(!refresh);
    const cleanup = () => { sessionStorage.getItem('token'); };
    console.log('texts', texts);
    // we need to cleanup when leaving the tab
    window.addEventListener('beforeunload', cleanup);
    
    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [contacts, messages, texts]);

  const authenticate = async () => {
    setupWSConnection(updateContacts, updateMessages, texts); // setup ws connection
    setContacts((contacts) => contacts + 1); // update state to trigger re-rendering and useEffect
  };
  return (
    <div className="App">
      <Router>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/login" element={<Login updateUserName={updateUserName} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/group" element={<Group />} />
          <Route path="/post" element={<Post refresh={refresh} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<Messages contacts={contacts} messages={messages} texts={texts} friends={friends} />} />
          <Route path="/groupdetail" element={<GroupDetail />} />
          <Route path="/groupmembers" element={<GroupMembers />} />
          {/* <Route path="/messages" element={<Messages />} /> */}

          {/* put this last because since it is empty, it will always be the first
            child to match the URL */}
          <Route path="/" element={<Lobby />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
