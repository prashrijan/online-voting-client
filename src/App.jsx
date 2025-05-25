import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserAction } from '@features/user/userAction';
import { useLocation } from 'react-router-dom';

function App() {
  const activeUsers = useSelector((state) => state.user?.activeUsers);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const isUserPage = location.pathname.includes('/user');
    if (isUserPage && activeUsers.length === 0) {
      dispatch(fetchAllUserAction());
    }
  }, [dispatch, activeUsers.length, location.pathname]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
