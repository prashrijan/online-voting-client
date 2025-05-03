import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Chatbot from '../chatbot/Chatbot';

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
