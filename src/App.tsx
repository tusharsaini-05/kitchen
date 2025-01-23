// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Layout } from './components/Layout';
// import { Login } from './components/Login';
// import { Dashboard } from './components/Dashboard';
// import { OrderSystem } from './components/OrderSystem';
// import { OrderReceiver } from './components/OrderReceiver';
// import { UserManagement } from './components/UserManagement';
// import { MenuManagement } from './components/MenuManagement';
// import { OrderManagement } from './components/OrderManagement';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import { useAuth } from './hooks/useAuth';
// import LoadingSpinner from './components/common/LoadingSpinner';

// function App() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     <LoadingSpinner/>
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        
//         <Route element={<ProtectedRoute />}>
//           <Route element={<Layout />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/orders" element={<OrderSystem />} />
//             <Route path="/order-receiver" element={
//               <ProtectedRoute allowedRoles={['admin', 'order_receiver']}>
//                 <OrderReceiver />
//               </ProtectedRoute>
//             } />
//             <Route path="/order-management" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <OrderManagement />
//               </ProtectedRoute>
//             } />
//             <Route path="/users" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <UserManagement />
//               </ProtectedRoute>
//             } />
//             <Route path="/menu" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <MenuManagement />
//               </ProtectedRoute>
//             } />
//           </Route>
//         </Route>

//         <Route path="/" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState,useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { OrderSystem } from './components/OrderSystem';
import { OrderReceiver } from './components/OrderReceiver';
import { UserManagement } from './components/UserManagement';
import { MenuManagement } from './components/MenuManagement';
import { OrderManagement } from './components/OrderManagement';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/common/LoadingSpinner';
import { HotelManagement } from './components/HotelManagement';


function App() {
  const { user, loading } =  useAuth();

  // Fix: Add a return statement to render LoadingSpinner if loading is true
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={         
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={<OrderSystem />} />
            <Route path="/order-receiver"  element={
              <ProtectedRoute allowedRoles={['admin', 'order_receiver','order_taker']}>
                 <OrderReceiver hotelName =  {"hotelC"} />
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
              <Route path="/hotel-management" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <HotelManagement />
              </ProtectedRoute>
            } />
            <Route path="/menu" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MenuManagement />
              </ProtectedRoute>
            } />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;