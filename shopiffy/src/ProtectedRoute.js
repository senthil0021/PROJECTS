// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from './authservice'; // Adjust import based on your file structure

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
