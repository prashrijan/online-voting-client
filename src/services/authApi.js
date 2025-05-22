import { toast } from 'react-toastify';
import { conf } from '../conf/conf';
import { apiProcessor } from './apiProcessor';

/**
 * Sends a POST request to the authentication API endpoint to register a new user.
 *
 * @async
 * @function signUpUserApi
 * @param {Object} payload - The data to be sent in the request body for user registration.
 *
 * @returns {Promise<Object>} The response from the API, typically containing the result of the registration process.
 * @throws Will log an error to the console if the API request fails.
 */

// const authApiEndPoint = conf.baseUrlDev + '/api/v1/auth';
const authApiEndPoint = conf.baseUrlProduction + '/api/v1/auth';

console.log(authApiEndPoint);

// signining user
export const signUpUserApi = async (payload) => {
  try {
    const result = await apiProcessor({
      url: authApiEndPoint + '/register',
      method: 'POST',
      payload,
      showToast: true,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

// logging in user
export const loginUserApi = async (payload) => {
  try {
    const result = await apiProcessor({
      url: authApiEndPoint + '/login',
      method: 'POST',
      payload,
      showToast: true,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const googleAuth = async () => {
  try {
    window.location.href = `${authApiEndPoint}/google`;
  } catch (error) {
    console.error(error);
  }
};

export const refreshTokenApi = async () => {
  try {
    const res = await apiProcessor({
      url: authApiEndPoint + '/refresh-token',
      method: 'GET',
      isPrivate: true,
      isRefresh: true,
    });

    console.log(res);

    if (!res?.data?.accessToken) {
      throw new Error('Invalid token response');
    }
    return res;
  } catch (error) {
    // Clear tokens if refresh fails
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const res = apiProcessor({
      method: 'POST',
      url: authApiEndPoint + '/verify-email',
      payload: { token },
      showToast: true,
    });

    return res;
  } catch (error) {
    console.error('Email verification failed: ', error);
    return error;
  }
};

//logout user
export const logoutUserApi = async (userId) => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: authApiEndPoint + '/logout',
      isPrivate: true,
      showToast: true,
    });

    return res;
  } catch (error) {
    console.error('Logout failed', error);
    throw error;
  }
};

// forget-password
export const forgetPasswordApi = async (email) => {
  try {
    const res = await apiProcessor({
      method: 'POST',
      url: authApiEndPoint + '/forget-password',
      payload: { email },
    });
    return res;
  } catch (error) {
    console.error('Error sending password reset link: ', error);
  }
};

export const resetPasswordApi = async (token, password) => {
  try {
    const res = await apiProcessor({
      method: 'PUT',
      url: `${authApiEndPoint}/reset-password/${token}`,
      payload: { password },
    });

    if (res.success) {
      return res;
    } else {
      toast.error(res.message);
      return res;
    }
  } catch (error) {
    console.error('Error reseting the password.');
  }
};
