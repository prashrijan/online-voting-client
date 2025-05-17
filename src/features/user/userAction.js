import { fetchAllUserApi, fetchUserApi, updateProfileApi } from './userApi';
import { setActiveUsers, setUser } from './userSlice';

import { refreshTokenApi } from '@services/authApi';

export const fetchUserAction = () => async (dispatch) => {
  try {
    const { data } = await fetchUserApi();

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
      const { data } = await refreshTokenApi();

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

    data && dispatch(setActiveUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateProfileAction = (payload) => async (dispatch) => {
  try {
    const res = await updateProfileApi(payload);
    if (res && res.success && res.data) {
      dispatch(setUser(res.data));
      dispatch(fetchUserAction());
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
