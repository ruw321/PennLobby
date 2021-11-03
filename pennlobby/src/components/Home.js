import React from 'react';
import {
  Link,
} from 'react-router-dom';
// import Login from './Login';
// import Signup from './Signup';

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Click to see the log in page</Link>
        </li>
        <li>
          <Link to="/signup">Click to see the sign up page</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
