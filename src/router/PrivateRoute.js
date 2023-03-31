import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component }) {
  const token = localStorage.getItem('token');

  return token ? Component : <Navigate to='/signin' />;
}

export default PrivateRoute;
