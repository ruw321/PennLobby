import React from "react";
import { Link } from "react-router-dom";

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
        <li>
          <Link to="/lobby">Click to see the main page</Link>
        </li>
        <li>
          <Link to="/profile">Click to see the profile page</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
