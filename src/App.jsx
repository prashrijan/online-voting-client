import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserAction } from '@features/user/userAction';

function App() {
  const activeUsers = useSelector((state) => state.user?.activeUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeUsers.length === 0) {
      dispatch(fetchAllUserAction());
    }
  }, [dispatch, activeUsers.length]);
  return (
    <>
      <AppRoutes />

      <ToastContainer />
    </>
  );
}

export default App;
