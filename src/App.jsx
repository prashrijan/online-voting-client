import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { autologin } from './features/user/userAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autologin());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />

      <ToastContainer />
    </>
  );
}

export default App;
