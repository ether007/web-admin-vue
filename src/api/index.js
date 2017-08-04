import axios from 'axios'

axios.defaults.baseURL = '/';
//axios.defaults.headers.common['Authorization'] = 'xxvv';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
 return Promise.reject(error);
});


function usp(params){
  let param = new URLSearchParams();
  for (let p in params){
    param.append(p, params[p]);
  }
  return param;
}

export const isLogin = params => {
  return axios.post('/admin/islogin', usp(params))
};

export const requestLogin = params => {
  return axios.post('/admin/dologin', usp(params))
};

export const requestPermission = ()=>{
  return axios.post('/admin/loginSuccess',{});
};

export const requestloginOut = () => {
  return axios.post('/admin/dologinOut')
};
