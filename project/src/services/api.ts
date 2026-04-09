import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { BACKEND_URL, REQUEST_TIMEOUT, StatusCodeMapping } from '../const/const';

import { getUserProfile } from './user-profile';
import { toast } from 'react-toastify';

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getUserProfile()?.token;
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>)['X-Token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.error(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
