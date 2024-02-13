import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div>
      <h2>tradeSafe</h2>
      <div className="BtnContainer">
        <a href="http://localhost:3000/login">
          <button className='BtnHome'>
            Login
          </button>
        </a>
        <a href="http://localhost:3000/register">
          <button className='BtnHome'>
            Register
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
