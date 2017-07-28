// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import App from './App'


import store from './store'
import {routes, permissionRouter} from './router'


Vue.config.productionTip = false


import 'font-awesome/css/font-awesome.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Router)


const router = new Router({
  routes: routes
})

router.addRoutes(permissionRouter)

router.beforeEach((to, from, next) => {

  let path = to.path;
  if (path == '/login') {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('permission');
    store.commit('FetchData', false);
    return next()
  }

  let user = JSON.parse(sessionStorage.getItem('user'));
  let permission = JSON.parse(sessionStorage.getItem('permission'));

  if (!user || !permission) {
    return next({path: '/login'})
  }
  if (!store.getters.fetchData) {
    //获取用户权限
    store.dispatch('fetchUserData').then((permission) => {
      //获取路由生成导航
      sessionStorage.setItem('permission', JSON.stringify(permission));
      store.dispatch('GenerateRoutes').then((data) => {
        //router.addRoutes(data)
        //next();
      });
    });
  }
  //权限检查
  if ((permission.some(ipath => {
      return ipath === path;
    }))) {
    next();
  } else {
    next({path: '/404'});
  }

})


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
