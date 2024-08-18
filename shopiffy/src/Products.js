// Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for receiving search query
import authService from './authservice';
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation(); // Get search query from location
  const searchQuery = location.state?.searchQuery?.toLowerCase() || ''; // Convert to lowercase for case-insensitive search

  useEffect(() => {
    authService.getProducts()
      .then(data => {
        setProducts(data);
        if (searchQuery) {
          const filtered = data.filter(product => 
            product.title.toLowerCase().includes(searchQuery)
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(data);
        }
      })
      .catch(err => console.error("Error in fetching the data", err));
  }, [searchQuery]); // Include searchQuery in dependency array

  const onFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    applyFilter(selectedFilter);
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
    navigate('/AddCard', { state: { product } });
  };

  return (
    <div className="products-container">
      <div className="filter-container">
        <div className="filter-buttons">
          <button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>All</button>
          <button className={`filter-button ${filter === 'price' ? 'active' : ''}`} onClick={() => onFilterChange('price')}>Price</button>
          <button className={`filter-button ${filter === 'category' ? 'active' : ''}`} onClick={() => onFilterChange('category')}>Category</button>
          <button className={`filter-button ${filter === 'rating' ? 'active' : ''}`} onClick={() => onFilterChange('rating')}>Rating</button>
        </div>
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
