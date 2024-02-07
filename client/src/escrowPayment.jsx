import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionDetails = () => {
  const apiUrl = 'http://localhost:3001/';

  // Define state to store the transaction data and error
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const config = {
      auth: {
        'dylan.mainmm@hotmail.com':'Batman123'
      },
    };
    axios.get(apiUrl, config)
      .then(response => {
        console.log('Transaction data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching transaction data:', error);
      });
    
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      {error ? (
        <p>Error fetching transaction data: {error}</p>
      ) : transactionData ? (
        <div>
          <h2>Transaction Details:</h2>
          <p>Transaction ID: {transactionData.id}</p>
          {/* Render other transaction details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TransactionDetails;
