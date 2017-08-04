import * as types from '../mutation-types'

import {permissionRouter} from '../../router'

function clone(obj) {
  if (typeof (obj) != 'object'){
    return obj;
  }
  var re = {};
  if(obj!=null &&obj.constructor == Array){
    re = [];
  }
  for (var i in obj) {
    re[i] = obj==null?null:clone(obj[i]);
  }
  return re;
}


function filterRouter(permissionRouter, permission) {
  //这里会改变permissionRouter
  let permissionRouterLocal = clone(permissionRouter);
  let accessedRouters = permissionRouterLocal.filter(router => {
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
    routers: null
  },
  mutations: {
    [types.SET_ROUTERS](state, routes) {
      state.routers = routes
    }
  },
  actions: {
    GenerateRoutes({commit, rootGetters}) {
      return new Promise((resolve, reject) => {
        let permission = rootGetters.permission;
        let user = rootGetters.user;
        //系统管理员则显示所有
        let rs = user.issys ? permissionRouter : filterRouter(permissionRouter.slice(0), permission);
        if (rs && rs.length > 0) {
          commit(types.SET_ROUTERS, rs);
          resolve(rs);
        } else {
          reject('never permission')
        }
      });
    }
  }
}

export default Permission;
