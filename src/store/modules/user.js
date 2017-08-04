import * as types from '../mutation-types'

import {requestPermission, requestLogin, isLogin,requestloginOut} from '../../api/index'

const User = {
  state: {
    user: null,
    permission:null
  },
  mutations: {
    [types.SetUser](state, user) {
      state.user = user;
      if(user!=null){
        sessionStorage.setItem('user', JSON.stringify(user));
        if (user.permission) {
          state.permission = user.permission;
          sessionStorage.setItem('permission', JSON.stringify(state.permission));
        }
      }else{
        state.user=null;
        state.permission=null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('permission');
      }

    }
  },
  actions: {
    isLogin() {
      return new Promise((resolve, reject) => {
        isLogin().then(response => {
          let data = response.data;
          resolve(data);
        }).catch(error => {
          reject(error)
        });
      });
    },
    loginUser({commit,rootGetters}, loginParams) {
      return new Promise((resolve, reject) => {
        requestLogin(loginParams).then(response => {
          let data = response.data;
          if (data.code == 1) {
            let user = data.data;
            if(user.issys){
              user.permission =rootGetters.allPermission;
            }
            commit(types.SetUser, user)
            resolve();
          } else {
            reject(data.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    fetchUserData({commit}) {
      return new Promise((resolve, reject) => {
        requestPermission().then(response => {
          let data = response.data;
          if (data.code == 1) {
            let user = data.data;
            commit(types.SetUser, user)
            resolve();
          } else {
            reject(data.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    loginOut({commit}) {
      return new Promise((resolve, reject) => {
        requestloginOut().then(response => {
          let data = response.data;
          if (data.code == 1) {
            commit(types.SetUser, null)
            commit(types.SET_ROUTERS, null);
            resolve();
          } else {
            reject(data.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

  }
}

export default User;
