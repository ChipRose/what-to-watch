import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { BACKEND_URL, REQUEST_TIMEOUT } from '../const/const';

import { getToken } from './token';
import { processErrorHandle } from './process-error-handle';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError <{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        // eslint-disable-next-line
        console.log(error.response.data.error)
        processErrorHandle(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
