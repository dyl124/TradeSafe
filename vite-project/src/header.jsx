// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <div className='header-container'>
      <Link to="/">
        <h1>tradeSafe</h1>
      </Link>
      <nav>
      <ul>
        <li>
          <Link to="/companies">Companies</Link>
        </li>
        <li>
          <Link to="/individuals">Individuals</Link>
        </li>
        <li>
          <Link to="/discrepancies">Discrepancies</Link>
        </li>     
        <li>
          <Link to="/postings">Postings</Link>
        </li>    
        <li>
          <Link to="/advertising">Advertising</Link>
        </li>
        <button>Login</button>  
        <button>Register</button>   
 
        </ul>
    </nav>
    </div>
   
  );
};

export default Header;
