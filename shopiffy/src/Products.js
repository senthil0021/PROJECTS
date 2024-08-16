// src/Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './authservice';
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    authService.getProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error("Error in fetching the data", err));
  }, []);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
    applyFilter(event.target.value);
  };

  const applyFilter = (filter) => {
    switch (filter) {
      case 'all':
        setFilteredProducts(products);
        break;
      case 'price':
        setFilteredProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case 'category':
        setFilteredProducts([...products].sort((a, b) => a.category.localeCompare(b.category)));
        break;
      case 'rating':
        setFilteredProducts([...products].sort((a, b) => b.rating.rate - a.rating.rate));
        break;
      case 'brand':
        setFilteredProducts([...products].sort((a, b) => a.brand.localeCompare(b.brand)));
        break;
      default:
        setFilteredProducts(products);
        break;
    }
  };

  const handleNavigateToAddCard = (product) => {
    navigate('/AddCard', { state: { product } }); // Navigate with state
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="filter-container">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={filter} onChange={onFilterChange}>
          <option value="all">All</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="rating">Rating</option>
          <option value="brand">Brand</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.title} 
                onClick={() => handleNavigateToAddCard(product)} 
                style={{ cursor: 'pointer' }} 
              />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate}</p>
              <p>Brand: {product.brand}</p>
              <button onClick={() => handleNavigateToAddCard(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
