import axios from 'axios';
import queryString from 'query-string';

const API_URL_GLOBAL: string = 'http://bookstoreapi.libvn.net/yb/';
const API_URL_LOCAL: string = 'http://192.168.1.249:55/yb/';

const axiosClient = axios.create({
  baseURL: API_URL_GLOBAL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;
