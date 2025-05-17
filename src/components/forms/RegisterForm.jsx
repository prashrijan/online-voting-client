import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { registerFormFields } from '@assets/form/formFields';
import useForm from '../../hooks/useForm';
import { registerValidationSchema } from '@validation/RegisterValidation';
import { googleAuth, signUpUserApi } from '@services/authApi';
import InputGroup from 'react-bootstrap/InputGroup';
import Loader from '../loader/Loader';

const RegisterForm = () => {
  const formInitialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { form, handleOnChange, handleOnSubmit, errors, resetForm } = useForm(
    formInitialValues,
    registerValidationSchema
  );

  const handleRegister = async () => {
    console.log(errors);
    setLoading(true);
    try {
      const res = await signUpUserApi(form);

      setLoading(false);
      res && res.success && resetForm();
    } catch (error) {
      setLoading(false);
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    await googleAuth();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-4">
      {loading ? (
        <Loader text="Processing your candidacy..." />
      ) : (
        <Form
          className="p-4 bg-white rounded-3 shadow-sm"
          style={{ width: '100%', maxWidth: '500px' }}
          onSubmit={(e) => handleOnSubmit(e, () => handleRegister(form))}
        >
          <h3 className="text-center mb-4 fw-bold text-dark">
            Register to become a voter and make your voice heard!
          </h3>

          {registerFormFields.map((input) => (
            <Form.Group key={input.name} className="mb-3">
              <Form.Label className="fw-semibold">{input.label}</Form.Label>
              {input.type === 'password' ? (
                <InputGroup>
                  <Form.Control
                    type={
                      input.name === 'password'
                        ? showPassword
                          ? 'text'
                          : 'password'
                        : showConfirmPassword
                          ? 'text'
                          : 'password'
                    }
                    name={input.name}
                    placeholder={input.placeholder}
                    value={form[input.name]}
                    onChange={handleOnChange}
                    className="py-2"
                  />
                  <Button
                    onClick={
                      input.name === 'password'
                        ? togglePasswordVisibility
                        : toggleConfirmPasswordVisibility
                    }
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '40px' }}
                    variant="dark"
                  >
                    {input.name === 'password' ? (
                      showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )
                    ) : showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </Button>
                </InputGroup>
              ) : (
                <Form.Control
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={form[input.name]}
                  onChange={handleOnChange}
                  className="py-2"
                />
              )}
              {errors[input.name] && (
                <Form.Text className="text-danger small">
                  {errors[input.name]}
                </Form.Text>
              )}
            </Form.Group>
          ))}

          <Button
            variant="dark"
            type="submit"
            className="w-100 py-2 mt-3 fw-bold"
          >
            Create Account
          </Button>

          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="px-3 text-muted small">OR</span>
            <hr className="flex-grow-1" />
          </div>

          <Button
            variant="outline-dark"
            className="w-100 py-2 d-flex justify-content-center align-items-center gap-2"
            onClick={handleGoogleRegister}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <p className="text-center mt-4 mb-0">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-decoration-none fw-semibold text-dark"
            >
              Sign in
            </a>
          </p>
        </Form>
      )}
    </div>
  );
};

export default RegisterForm;

// this is a check commit
