import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '@components/loader/Loader';

import { forgetPasswordApi } from '../../services/authApi';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    try {
      const res = await forgetPasswordApi(email);

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-4">
      {loading ? (
        <Loader text="Processing request..." />
      ) : (
        <Form
          className="p-4 bg-white rounded-3 shadow-sm"
          style={{ width: '100%', maxWidth: '500px' }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4 fw-bold text-dark">
            Forgot Password?
          </h3>

          {submitted ? (
            <Alert variant="success">
              If an account with that email exists, a password reset link has
              been sent.
            </Alert>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Submit
              </Button>
            </>
          )}

          <p className="text-center mt-4 mb-0">
            Remembered your password?{' '}
            <a
              href="/login"
              className="text-decoration-none fw-semibold text-dark"
            >
              Back to Login
            </a>
          </p>
        </Form>
      )}
    </div>
  );
};

export default ForgetPassword;
