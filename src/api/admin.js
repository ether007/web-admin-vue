import axios from 'axios'

export const requestLogin = params => {
  return axios.post('/dologin.json', params)
};

export const requestMenu = ()=>{
  return axios.post('/menu.json',{});
}
