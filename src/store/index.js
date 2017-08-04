import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//一般都以在这个文件中mutation-types.js


//state 保存状态
//1.store.state.isLogin
//2.import { mapState } from 'vuex'
//...mapState(['isLogin'])

//mutations 改变状态
//this.$store.commit('todoLogin',true);
//2.import { mapMutations } from 'vuex'
//...mapMutations(['increment' ]),映射 this.increment() 为 this.$store.commit('increment')

//getters  获取状态函数
//1.store.getters.getMenu
//2.import { mapGetters } from 'vuex'
//...mapGetters(['getMenu'])

//actions  触发改变状态
//1.store.dispatch('increment',{})
//2.import { mapActions } from 'vuex'
//...mapActions(['increment'])// 映射 this.increment() 为 this.$store.dispatch('increment')

import user from './modules/user'
import permission from './modules/permission'
import {permissionRouter} from '../router'
import * as types from './mutation-types'

function leafNode(node, prefix) {
  let leafs = [];
  let children = node.children;
  leafs.push({name: prefix + node.name, path: node.path, $isDisabled: !!children})
  if (!!children) {
    prefix += ""
    for (let a of children) {
      leafs = leafs.concat(leafNode(a, prefix));
    }
  }

  return leafs;
}

const getters = {
  user: state => {
    return state.user.user || JSON.parse(sessionStorage.getItem('user'))
  },
  permission: state => {
    return state.user.permission || JSON.parse(sessionStorage.getItem('permission'))
  },
  self_routers: state => {
    return state.permission.routers
  },
  leafPermission: state => {
    let leafs = [];
    for (var node of state.permission.routers) {
      leafs = leafs.concat(leafNode(node, ""));
    }
    return leafs;
  },
  allPermission: state => {
    let leafs = [];
    let all = [];
    for (var node of permissionRouter) {
      leafs = leafs.concat(leafNode(node, ""));
    }
    for (let p of leafs) {
      all.push(p.path)
    }
    return all;
  }
}

const actions={
  logout:({commit})=>{
    commit(types.SetUser, null)
    commit(types.SET_ROUTERS, null);
  }
}

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    permission
  }
})

export default store



