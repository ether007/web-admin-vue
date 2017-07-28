import axios from 'axios'

import {requestLogin,requestMenu} from './admin'


axios.defaults.baseURL = 'http://localhost:8080/static';
axios.defaults.headers.common['Authorization'] = 'xxvv';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.method='GET';
  return config;
}, function (error) {
 // return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.info(error);
 // return Promise.reject(error);
});

export {requestLogin,requestMenu};
