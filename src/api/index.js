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
  if(response.data){}
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

//登录系列
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

//角色管理
export const requestRoleList=(params)=>{
  return axios.post('admin/role/list', usp(params))
}

export const requestRoleSave=(params)=>{
  return axios.post('admin/role/save', usp(params))
}
export const requestRoleDelete=(params)=>{
  return axios.post('admin/role/delete', usp(params))
}

//用户管理
export const requestUserList=(params)=>{
  return axios.post('admin/user/list', usp(params))
}

export const requestSaveUser=(params)=>{
  return axios.post('admin/user/save', usp(params))
}

export const requestDeleteUser=(params)=>{
  return axios.post('admin/user/delete', usp(params))
}
