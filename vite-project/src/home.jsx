// Home.js
import React from 'react';
import './home.css';
import EscrowDiagram from './assets/basic-escrow.png';

const Home = () => {
  return (
    <div className="container">
      <p>
        We keep all parties accountable and safe from bad trade work,<br></br> customers who don't pay,
        and most of all, we help you keep your hard-earned money spending<br></br> on the things that matter to you.
      </p>
      <img src={EscrowDiagram} alt='Escrow Diagram' />
    </div>
  );
};

export default Home;
