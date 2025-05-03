import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  return (
    <>
      <AppRoutes />

      <ToastContainer />
    </>
  );
}

export default App;
