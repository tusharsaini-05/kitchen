import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { OrderSystem } from './components/OrderSystem';
import { OrderReceiver } from './components/OrderReceiver';
import { UserManagement } from './components/UserManagement';
import { MenuManagement } from './components/MenuManagement';
import { OrderManagement } from './components/OrderManagement';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrderSystem />} />
            <Route path="/order-receiver" element={
              <ProtectedRoute allowedRoles={['admin', 'order_receiver']}>
                <OrderReceiver />
              </ProtectedRoute>
            } />
            <Route path="/order-management" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <OrderManagement />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/menu" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MenuManagement />
              </ProtectedRoute>
            } />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;