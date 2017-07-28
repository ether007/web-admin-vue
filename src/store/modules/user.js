const FetchData = 'FetchData'
const GetUserPermission = 'GetUserPermission'
import {requestMenu} from '../../api/index'

const User = {
  state: {
    fetchData: false,
    permission: ['/','/login','/404','*']
  },
  mutations: {
    [FetchData](state, flag) {
      state.fetchData = flag
    },
    [GetUserPermission](state, data) {
      state.fetchData = true;
      state.permission = state.permission.concat(data);
    }

  },
  actions: {
    fetchUserData({commit, state}) {
      return new Promise((resolve, reject) => {
        requestMenu().then(response => {
          if (response.data.code == 1) {
            commit(GetUserPermission, response.data.data)
            resolve(state.permission);
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

  }
}

export default User;
