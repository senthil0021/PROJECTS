import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UserProfile from './UserProfile';
import Products from './Products';
import AddCard from './Addcard';
import Payment from './Payment';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header'; // Import Header

const App = () => {
  return (
    <Router>
      <Header /> {/* Include Header here */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute element={UserProfile} />} />
        <Route path="/products" element={<ProtectedRoute element={Products} />} />
        <Route path="/addcard" element={<AddCard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

