import store from "../index";
import {permissionRouter} from '../../router'

const SET_ROUTERS = "SET_ROUTERS"
const SET_PERMISSION = "SET_PERMISSION"

function filterRouter(permissionRouter, permission) {

  let accessedRouters = permissionRouter.filter(router => {
    if (!router.children) {
      return (permission.some(path => {
          return path === router.path;
        }));
    }
    if (router.children) {
      router.children = filterRouter(router.children, permission)
    }
    if (router.children && router.children.length > 0) {
      return true;
    }
    return false;
  });
  return accessedRouters;

}

const Permission = {
  state: {
    routers: [],
  },
  mutations: {
    [SET_ROUTERS](state, routes) {
      state.routers = routes
    }
  },
  actions: {
    GenerateRoutes({commit}) {
      return new Promise((resolve, reject) => {
        let permission = store.getters.permission;
        let rs = filterRouter(permissionRouter, permission);
        if(rs && rs.length>0 ){
          commit(SET_ROUTERS, rs);
          resolve(rs);
        }else{
          reject('never permission')
        }
      });
    }
  }
}

export default Permission;
