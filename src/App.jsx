import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

function App() {
  return (
    <>
      <AppRoutes />

      <ToastContainer />
    </>
  );
}

export default App;
