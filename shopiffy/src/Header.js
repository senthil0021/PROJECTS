// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import authService from './authservice';
import './Header.css'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const onSearch = () => {
    if (isAuthenticated) {
      navigate('/products'); 
    } else {
      alert('You need to be logged in to search products.');
    }
  };

  const logout = () => {
    authService.logout();
    navigate('/'); 
  };

  return (
    <nav>
      <div className="search-container">
        <input type="text" id="search-input" placeholder="Search" onClick={onSearch} />
      </div>
      <div className="app-name">Shopify</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
        {!isAuthenticated && <li><Link to="/signup">Signup</Link></li>}
        {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
        {isAuthenticated && <li><a href="#" onClick={logout}>Logout</a></li>}
      </ul>
    </nav>
  );
};

export default Header;
