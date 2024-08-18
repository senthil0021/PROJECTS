// Payment.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const { state } = useLocation();
  const { product, quantity } = state || {};
  const [paymentMethod, setPaymentMethod] = useState('card');

  const totalAmount = product ? product.price * quantity : 0;

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    if (paymentMethod === 'cod') {
      alert('Order placed successfully! You chose Cash on Delivery.');
    } else {
      alert('Payment processed successfully!');
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-details">
        <h1>Payment</h1>
        <div className="product-summary">
          <h2>{product.title}</h2>
          
          <h3>Total Amount: <span className="price">${totalAmount.toFixed(2)}</span></h3>
        </div>
        <form className="payment-form" onSubmit={handlePaymentSubmit}>
          {paymentMethod === 'card' && (
            <>
              <div className="form-group">
                <input type="text" placeholder="Card Number" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="CVV" required />
              </div>
            </>
          )}
          <div className="form-group">
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery
            </label>
          </div>
          <button type="submit" className="cta-btn">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
