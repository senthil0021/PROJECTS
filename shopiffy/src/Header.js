// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import authService from './authservice';
import './Header.css'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const navigate = useNavigate(); 

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const onSearch = () => {
    if (isAuthenticated) {
      navigate('/products', { state: { searchQuery } }); // Pass searchQuery to Products page
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
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          onKeyPress={(e) => e.key === 'Enter' && onSearch()} // Trigger search on Enter key
        />
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

