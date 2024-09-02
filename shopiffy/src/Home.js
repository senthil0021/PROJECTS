// Home.js
import React, { useState, useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import authService from './authservice';
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    authService.getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error("Error in fetching the data", err));
  }, []);

  const onSearch = () => {
    if (authService.isAuthenticated()) {
      history.push('/products');
    } else {
      alert('You need to be logged in to search products.');
      history.push('/login');
    }
  };

  return (
    <main>
      <section className="primary">
        <div className="container">
          <h1>Welcome to Shopify</h1>
          <p>Your ultimate destination for amazing products.</p>
          <Link to="/products" className="button">Explore Products</Link>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h1><b>Deals on Fashion</b></h1>
          <div className="product-list">
            {products.slice(15, 19).map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.title}</h3>
                <div className="product">
                  <Link to="/products" onClick={onSearch}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <h1><b>Deals on Electronics</b></h1>
          <div className="product-list">
            {products.slice(9, 13).map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.title}</h3>
                <div className="product">
                  <Link to="/products">
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
