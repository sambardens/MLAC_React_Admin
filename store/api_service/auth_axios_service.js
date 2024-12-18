import { Router } from 'next/router';

import store from '..';
import axios from 'axios';

import authAPI from '../auth/auth.api';
import { loadingError } from '../errors/errors.actions';

//  Token for headers auth request
let authAxiosService;
try {
  authAxiosService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });

  const { dispatch, getState } = store;

  authAxiosService.interceptors.request.use(
    async function (config) {
      config.headers.Authorization = `Bearer ${getState().auth.token}`;
      return config;
    },
    function (error) {
      dispatch(loadingError(error));
      return Promise.reject(error);
    },
  );
  authAxiosService.interceptors.response.use(
    response => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest.sent) {
        originalRequest.sent = true;
        // Request refresh token
        dispatch(authAPI.endpoints.refreshToken.initiate());
        return authAxiosService(originalRequest);
      }
      dispatch(loadingError(error));
      return Promise.reject(error);
    },
  );
} catch (e) {
  console.log('Message: ', e.message);
}

export { authAxiosService };
