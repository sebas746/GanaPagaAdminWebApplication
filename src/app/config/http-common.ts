import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export default setupInterceptorsTo(axiosInstance);