import React, { useState } from 'react';
import authService from './authservice';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarOpen(true);
      return;
    }
    try {
      await authService.register({ email, password });
      setSnackbarMessage('Registration successful');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Registration failed');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="signup-container">
     
      <form onSubmit={handleSubmit}>
          <b><h2>Sign Up</h2></b> 
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">
          Sign Up
        </button>
      </form>
      {snackbarOpen && (
        <div className="snackbar">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

export default Signup;
