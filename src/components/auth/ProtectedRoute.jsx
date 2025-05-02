import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const isAuth = user._id ? true : false;

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
