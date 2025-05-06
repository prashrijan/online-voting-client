import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BarLoader } from 'react-spinners';
import InputGroup from 'react-bootstrap/InputGroup';
import { loginValidationSchema } from '../../validation/LoginValidation';
import useForm from '../../hooks/useForm';
import { googleAuth, loginUserApi } from '../../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { autologin, fetchUserAction } from '../../features/user/userAction';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const formInitialValues = {
    email: '',
    password: '',
  };

  const [loading, setLoading] = useState(false); // manual login
  const [autologinLoading, setAutologinLoading] = useState(true); // initial session check
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/user');
    } else {
      tryAutoLogin();
    }
  }, [user?._id, navigate]);

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
        navigate('/user');
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
    return (
      <div
        className="py-4 d-flex flex-column align-items-center justify-content-center"
        style={{ height: '500px' }}
      >
        <BarLoader color="#0d6efd" />
        <p className="mt-2">Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-4">
      {loading ? (
        <div
          className="py-4 d-flex flex-column align-items-center justify-content-center"
          style={{ height: '500px' }}
        >
          <BarLoader color="#0d6efd" />
          <p className="mt-2">Logging you in...</p>
        </div>
      ) : (
        <Form
          className="p-4 bg-white rounded-3 shadow-sm"
          style={{ width: '100%', maxWidth: '500px' }}
          onSubmit={(e) => handleOnSubmit(e, () => handleLogin())}
        >
          <h3 className="text-center mb-4 fw-bold text-primary">
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

          <div className="d-flex justify-content-between mb-3">
            <Form.Check
              type="checkbox"
              label="Remember me"
              className="text-muted"
            />
            <a
              href="/forgot-password"
              className="text-decoration-none text-primary"
            >
              Forgot password?
            </a>
          </div>

          <Button
            variant="primary"
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
            variant="outline-primary"
            className="w-100 py-2 d-flex justify-content-center align-items-center gap-2"
            onClick={async () => await googleAuth()}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <p className="text-center mt-4 mb-0">
            Don't have an account?{' '}
            <a href="/register" className="text-decoration-none fw-semibold">
              Register
            </a>
          </p>
        </Form>
      )}
    </div>
  );
};

export default LoginForm;
