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

const getters = {
  fetchData:state =>{return state.user.fetchData},
  permission:state =>{return state.user.permission},
  self_routers:state =>{return state.permission.routers}
}

const store = new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters
})

export default store



