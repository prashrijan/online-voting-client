import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { ElectionProvider } from './context/ElectionContext';

function App() {
  return (
    <>
      <AppRoutes />

      <ToastContainer />
    </>
  );
}

export default App;
