import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#">
          StarDB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to='/people/'>People</Link>
        </li>
        <li>
          <Link to="/starships/">Starships</Link>
        </li>
        <li>
          <Link to="/vehicles/">Vehicles</Link>
        </li>
        <li>
          <Link to="/species/">Species</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;