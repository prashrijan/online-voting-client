import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { fetchUserAction } from '../../features/user/userAction';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      sessionStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setTimeout(() => {
        navigate('/user');
      }, 1000);

      dispatch(fetchUserAction());
    } else {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <BarLoader color="#0d6efd" />
      <p className="mt-2 text-muted">Logging you in...</p>
    </div>
  );
};

export default GoogleAuthSuccess;
