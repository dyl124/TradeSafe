import React, { useState } from 'react';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerAddress: '',
    buyerEmail: '',
    sellerName: '',
    sellerAddress: '',
    sellerEmail: '',
    itemName: '',
    itemDescription: '',
    itemQuantity: 1,
    itemPrice: 0,
    currency: 'AUD',
    paymentMethod: '',
    paymentAmount: 0,
    shippingAddress: '',
    additionalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log(formData);
  };

  return (
   
    <form onSubmit={handleSubmit}>

      <h2>Transaction Details</h2>
      <div>
        <h3>Buyer Information</h3>
        <input
          type="text"
          name="buyerName"
          value={formData.buyerName}
          onChange={handleChange}
          placeholder="Buyer's Name"
          required
        />
        <input
          type="text"
          name="buyerAddress"
          value={formData.buyerAddress}
          onChange={handleChange}
          placeholder="Buyer's Address"
        />
        <input
          type="email"
          name="buyerEmail"
          value={formData.buyerEmail}
          onChange={handleChange}
          placeholder="Buyer's Email"
          required
        />
      </div>
      <div>
        <h3>Seller Information</h3>
        <input
          type="text"
          name="sellerName"
          value={formData.sellerName}
          onChange={handleChange}
          placeholder="Seller's Name"
          required
        />
        <input
          type="text"
          name="sellerAddress"
          value={formData.sellerAddress}
          onChange={handleChange}
          placeholder="Seller's Address"
        />
        <input
          type="email"
          name="sellerEmail"
          value={formData.sellerEmail}
          onChange={handleChange}
          placeholder="Seller's Email"
          required
        />
      </div>
      <div>
        <h3>Item Details</h3>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <textarea
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          placeholder="Item Description"
        />
        <input
          type="number"
          name="itemQuantity"
          value={formData.itemQuantity}
          onChange={handleChange}
          placeholder="Quantity"
          min="1"
          required
        />
        <input
          type="number"
          name="itemPrice"
          value={formData.itemPrice}
          onChange={handleChange}
          placeholder="Price"
          min="0"
          step="0.01"
          required
        />
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          required
        >
          <option value="AUD">AUD</option>
          {/* Add other currency options as needed */}
        </select>
      </div>
      <div>
        <h3>Payment</h3>
        <input
          type="text"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          placeholder="Payment Method"
          required
        />
        <input
          type="number"
          name="paymentAmount"
          value={formData.paymentAmount}
          onChange={handleChange}
          placeholder="Payment Amount"
          min="0"
          step="0.01"
          required
        />
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          required
        >
          <option value="AUD">AUD</option>
          {/* Add other currency options as needed */}
        </select>
      </div>
      <div>
        <h3>Shipping</h3>
        <input
          type="text"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleChange}
          placeholder="Shipping Address"
        />
      </div>
      <div>
        <h3>Additional Notes</h3>
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Additional Notes"
        />

      </div>
      <button type="submit">Submit</button>
    </form>
    
  );
};

export default TransactionForm;
