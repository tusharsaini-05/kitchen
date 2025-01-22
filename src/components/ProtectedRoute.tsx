import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './common/LoadingSpinner';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
   
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if(user.role == 'order_taker') return <Navigate to="/orders" />;
    if(user.role == 'order_receiver') return <Navigate to="/order-receiver" />;
    return <Navigate to="/dashboard" />;
  }
  else
     
  return children || <Outlet />;
};