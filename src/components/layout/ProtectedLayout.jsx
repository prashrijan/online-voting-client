import React from 'react';
import ProtectedRoute from '../auth/ProtectedRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Chatbot from '../chatbot/Chatbot';

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Header />
      <main className="main-content d-flex flex-row position-relative">
        <Sidebar />

        <div className="flex-grow-1 position-relative">
          <Outlet />

          <div
            className="position-fixed"
            style={{ right: '20px', bottom: '20px' }}
          >
            <Chatbot />
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
