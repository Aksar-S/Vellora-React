import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../admin/adminAuth';

export function AdminRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}