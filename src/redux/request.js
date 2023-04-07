import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token !== undefined) {
    config.headers.common['Authorization'] = token;
  }
  return config;
});

export default api;
