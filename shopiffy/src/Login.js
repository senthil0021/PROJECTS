import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import authService from './authservice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login({ email, password });
      console.log('Login successful', response);
      setSnackbarMessage('Login successful');
      setSnackbarOpen(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      setSnackbarMessage('Login failed');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="login-form">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <b><h2>LOGIN</h2></b>
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
          <button type="submit">
            Login
          </button>
        </form>
        {snackbarOpen && (
          <div className="snackbar">
            {snackbarMessage}
          </div>
        )}
        <div className="signup-link">
          <p>New user? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
