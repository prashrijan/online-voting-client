import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import InputGroup from 'react-bootstrap/InputGroup';
import { loginValidationSchema } from '@validation/LoginValidation';
import useForm from '../../hooks/useForm';
import { googleAuth, loginUserApi } from '@services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { autologin, fetchUserAction } from '@features/user/userAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const formInitialValues = {
    email: '',
    password: '',
  };

  const [loading, setLoading] = useState(false);
  const [autologinLoading, setAutologinLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryRedirect = searchParams.get('redirect');
  const redirect = location.state?.from || queryRedirect || '/user';

  const { user } = useSelector((state) => state.user);

  // auto login useEffect
  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        await dispatch(autologin());
      } catch (error) {
        console.log('Auto login failed:', error);
      } finally {
        setAutologinLoading(false);
      }
    };

    if (user?._id) {
      if (location.pathname === '/login') {
        navigate(redirect);
      }
    } else {
      tryAutoLogin();
    }
  }, [user?._id, redirect, location.pathname]);

  useEffect(() => {
    const errorParam = searchParams.get('error');

    if (errorParam === 'google-failed') {
      toast.error(
        'Google login failed: This email is already registered. Please sign in with your email and password.',
        {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        }
      );
    } else if (errorParam) {
      toast.error('Login Failed. Please try again.', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }

    if (errorParam) {
      const cleanUrl =
        location.pathname + location.search.replace(/(\?|&)error=[^&]*/g, '');
      window.history.replaceState({}, '', cleanUrl);
    }
  }, [location.search]);

  const { form, handleOnChange, handleOnSubmit, errors } = useForm(
    formInitialValues,
    loginValidationSchema
  );

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await loginUserApi(form);

      if (data?.accessToken && data?.refreshToken) {
        sessionStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        await dispatch(fetchUserAction());
        navigate(redirect);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Render loading spinner during auto-login check
  if (autologinLoading) {
    return <Loader text="Checking your session..." />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-4">
      {loading ? (
        <Loader text="Logging you in.." />
      ) : (
        <Form
          className="p-4 bg-white rounded-3 shadow-sm"
          style={{ width: '100%', maxWidth: '500px' }}
          onSubmit={(e) => handleOnSubmit(e, () => handleLogin())}
        >
          <h3 className="text-center mb-4 fw-bold text-dark">
            Welcome back to Chunaab!
          </h3>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleOnChange}
              className="py-2"
            />
            {errors.email && (
              <Form.Text className="text-danger small">
                {errors.email}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleOnChange}
                className="py-2"
              />
              <Button
                onClick={togglePasswordVisibility}
                className="d-flex align-items-center justify-content-center"
                style={{ width: '40px' }}
                variant="dark"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            {errors.password && (
              <Form.Text className="text-danger small">
                {errors.password}
              </Form.Text>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Link
              to="/forgot-password"
              className="text-decoration-none text-dark"
            >
              <p
                style={{ transition: 'color 0.2s' }}
                onMouseOver={(e) => (e.target.style.color = '#0d6efd')}
                onMouseOut={(e) => (e.target.style.color = '#212529')}
              >
                Forgot password?
              </p>
            </Link>
          </div>

          <Button
            variant="dark"
            type="submit"
            className="w-100 py-2 mt-3 fw-bold"
          >
            Sign In
          </Button>

          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="px-3 text-muted small">OR</span>
            <hr className="flex-grow-1" />
          </div>

          <Button
            variant="outline-dark"
            className="w-100 py-2 d-flex justify-content-center align-items-center gap-2"
            onClick={async () => await googleAuth()}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <p className="text-center mt-4 mb-0 ">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-decoration-none fw-semibold text-dark"
            >
              Register
            </a>
          </p>
        </Form>
      )}
    </div>
  );
};

export default LoginForm;
