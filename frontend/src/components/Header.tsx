import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Tasks</Link>
            </li>
            <li>
              <Link to="/add">Add Task</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;