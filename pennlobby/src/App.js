import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import TrendingTopics from './components/TrendingTopics';

const trendingTopicsToday = ['hi', 'hey', 'hhim'];
const trendingTopicsWeekly = ['hiii', 'haaa', 'hhh'];

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
          {/* put this last because since it is empty, it will always be the first
            child to match the URL */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <TrendingTopics
        trendingTopicsToday={trendingTopicsToday}
        trendingTopicsWeekly={trendingTopicsWeekly}
      />
    </div>
  );
}

export default App;
