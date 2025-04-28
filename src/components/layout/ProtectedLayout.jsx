import React from 'react';
import ProtectedRoute from '../auth/ProtectedRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
