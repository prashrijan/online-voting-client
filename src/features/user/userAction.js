import { fetchAllUserApi, fetchUserApi } from './userApi';
import { setActiveUsers, setUser } from './userSlice';

import { refreshTokenApi } from '../../services/authApi';

export const fetchUserAction = () => async (dispatch) => {
  try {
    console.log('Fetching user');
    const { data } = await fetchUserApi();

    console.log('User fetched: ', data);
    data && dispatch(setUser(data));
  } catch (error) {
    console.error(error);
    if (error.message === 'jwt expired') {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    throw error;
  }
};

export const autologin = () => async (dispatch) => {
  console.log('Auto login triggered');
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    // When access token is available
    if (accessToken) {
      await dispatch(fetchUserAction());
      return;
    }

    // When access token is not available but refresh token is
    if (refreshToken) {
      console.log('Refresh Token', refreshToken);
      const { data } = await refreshTokenApi();
      console.log('Refresh Api returned: ', data);
      if (data?.accessToken) {
        sessionStorage.setItem('accessToken', data.accessToken);
        await dispatch(fetchUserAction());
      }
    }
  } catch (error) {
    console.error('Autologin failed:', error.message);
    // Clear tokens if any operation fails
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export const fetchAllUserAction = () => async (dispatch) => {
  try {
    const { data } = await fetchAllUserApi();

    console.log(data);

    data && dispatch(setActiveUsers(data));
  } catch (error) {
    console.error(error);
  }
};
