import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../../services/authApi';
import Loader from '@components/loader/Loader';

const VerifyAccount = () => {
  const [status, setStatus] = useState(
    'Your account is being verified please wait..'
  );
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        setStatus('Invalid verification link');
        return;
      }

      const res = await verifyEmail(token);
      console.log(res);

      if (res?.success) {
        setLoading(false);
        setStatus('Email verified! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else if (
        res?.response?.data?.message === 'Email already verified' ||
        res?.message === 'Email already verified.'
      ) {
        setLoading(false);
        setStatus('Email already verified!!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setLoading(false);
        setStatus('Verification failed. Please try again.');
        setTimeout(() => navigate('/register'), 3000);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      {loading && <Loader />}
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyAccount;
