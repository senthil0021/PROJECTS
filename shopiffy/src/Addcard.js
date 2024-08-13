// AddCard.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AddCard.css';

const AddCard = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="add-card-container">
      <div className="add-card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="add-card-content">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h5>Price: <span className="price">${product.price * quantity}</span></h5>
        <div className="quantity-selector">
          <button onClick={decrementQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity}>+</button>
        </div>
        <button className="cta-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default AddCard;
