import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import Loader from '@components/loader/Loader';
import { resetPasswordApi } from '../../services/authApi';
import { resetPasswordValidationSchema } from '../../validation/ResetPasswordValidation';
import useForm from '../../hooks/useForm';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const { token } = useParams();

  const formInitialValues = {
    password: '',
    confirmPassword: '',
  };

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { form, handleOnChange, handleOnSubmit, errors, resetForm } = useForm(
    formInitialValues,
    resetPasswordValidationSchema
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    setError('');

    try {
      const res = await resetPasswordApi(token, form.password);
      if (res.success) {
        setSubmitted(true);
        resetForm();
      } else {
        setSubmitted(false);
      }
    } catch (err) {
      setError('Invalid or expired token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-4">
      {loading ? (
        <Loader text="Resetting password..." />
      ) : (
        <Form
          className="p-4 bg-white rounded-3 shadow-sm"
          style={{ width: '100%', maxWidth: '500px' }}
          onSubmit={(e) => handleOnSubmit(e, handleSubmit)}
        >
          <h3 className="text-center mb-4 fw-bold text-dark">Reset Password</h3>

          {submitted ? (
            <Alert variant="success">
              Your password has been reset successfully.{' '}
              <a href="/login" className="fw-semibold text-dark">
                Login now
              </a>
            </Alert>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter a new password"
                    value={form.password}
                    onChange={handleOnChange}
                    className="py-2"
                  />
                  <Button
                    onClick={togglePasswordVisibility}
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '40px' }}
                    variant="dark"
                    type="button"
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

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Confirm Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={form.confirmPassword}
                    onChange={handleOnChange}
                    className="py-2"
                  />
                  <Button
                    onClick={toggleConfirmPasswordVisibility}
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '40px' }}
                    variant="dark"
                    type="button"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                {errors.confirmPassword && (
                  <Form.Text className="text-danger small">
                    {errors.confirmPassword}
                  </Form.Text>
                )}
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button
                variant="dark"
                type="submit"
                className="w-100 py-2 mt-2 fw-bold"
              >
                Reset Password
              </Button>
            </>
          )}
        </Form>
      )}
    </div>
  );
};

export default ResetPassword;
