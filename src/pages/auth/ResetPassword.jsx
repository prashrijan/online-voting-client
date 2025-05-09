import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'; // or useSearchParams if you pass token as query param
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../../components/loader/Loader';
import { resetPasswordApi } from '../../services/authApi';
import { resetPasswordValidationSchema } from '../../validation/ResetPasswordValidation';
import useForm from '../../hooks/useForm';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const formInitialValues = {
    password: '',
    confirmPassword: '',
  };
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { form, handleOnChange, handleOnSubmit, errors, resetForm } = useForm(
    formInitialValues,
    resetPasswordValidationSchema
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    setError('');

    try {
      await resetPasswordApi(token, form.password);
      setSubmitted(true);
      resetForm();
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
          onSubmit={(e) => handleOnSubmit(e, handleSubmit(form))}
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
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={handleOnChange}
                  className="py-2"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={handleOnChange}
                  className="py-2"
                  required
                />
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
