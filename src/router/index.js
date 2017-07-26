import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Dashboard from '@/components/Dashboard'

import AdminProfile from '@/components/view-system/admin-profile'
import AdminMessage from '@/components/view-system/admin-message'

import User from '@/components/view-user/User'
import Role from '@/components/view-user/Role'
import Authority from '@/components/view-user/Authority'

import Goods from '@/components/view-order/Goods'


Vue.use(Router)

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path:'/',
    hidden:true,
    component: Home,
    name:'通用',
    children:[
      { path: '/404', component: NotFound, name: '404' },
      { path: '/admin/profile', component: AdminProfile, name: '我的信息' },
      { path: '/admin/message', component: AdminMessage, name: '我的消息' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '用户',
    iconCls: 'fa fa-address-card',//图标样式class
    children: [
      { path: '/user', component: User, name: '用户管理' },
      { path: '/role', component: Role, name: '角色管理' },
      { path: '/authority', component: Authority, name: '权限管理' },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '商品',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/goods', component: Goods, name: '商品管理' },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa fa-address-card',
    leaf: true,//只有一个节点
    children: [
      { path: '/dashboard', component: Dashboard, name: '仪表板' }
    ]
  }, {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

export default new Router({
  routes: routes
})
