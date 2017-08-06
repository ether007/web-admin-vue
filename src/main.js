// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import App from './App'


import store from './store'
import {routes, permissionRouter} from './router'


Vue.config.productionTip = false


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Router)


const router = new Router({
  routes: routes.concat(permissionRouter)
})

router.beforeEach((to, from, next) => {
  let user = store.getters.user;
  let permission = store.getters.permission;
  //生成路由导航
  if (store.getters.self_routers == null && user != null && permission != null) {
    store.dispatch('GenerateRoutes');
  }
  if (to.matched.some(record => !!!record.meta.anonymous)) {
    //不能匿名访问
    store.dispatch('isLogin').then(data => {
      //判断是否登录
      if (data.code == 1 && data.data.islogin) {
        //前端判断是否有权限
        let ps = store.getters.permission;
        if (ps && ps.some(ipath => {
            return ipath === to.path;
          })) {
          next();
        } else {
          next({path: '/login'});
        }
      } else {
        next({path: '/login'})
      }
    })
  } else {
    next();
  }

})


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
