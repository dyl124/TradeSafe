// Home.js
import React from 'react';
import './home.css';
import EscrowDiagram from './assets/basic-escrow.png';
import  TransactionDetails from './escrowPayment';
const Home = () => {
  return (
    <div className="container">
      <h2>tradeSafe</h2>
      <TransactionDetails />

      <p>
        We keep all parties accountable and safe from bad trade work,<br></br> customers who don't pay,
        and most of all, we help you keep your hard-earned money spending<br></br> on the things that matter to you.
      </p>
      <br></br>

      <p><span className='spanText'>How do we work?</span> </p>
      <img src={EscrowDiagram} alt='Escrow Diagram' />
    </div>
  );
};

export default Home;
