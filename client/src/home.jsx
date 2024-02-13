// Home.js
import React from 'react';
import './home.css';
const Home = () => {
  return (
    <div className="container">
      <h2>tradeSafe</h2>
      <a href="http://localhost:3000/login">
      <button>
        Login
      </button>
    </a>
    <a href="http://localhost:3000/register">
      <button>
        Register
      </button>
    </a>
    
    </div>
  );
};

export default Home;
