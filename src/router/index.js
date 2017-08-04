import Login from '@/components/Login'
import NotFound from '@/components/404'

import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import AdminProfile from '@/components/view-system/admin-profile'
import AdminMessage from '@/components/view-system/admin-message'

import User from '@/components/view-user/User'
import Role from '@/components/view-user/Role'
import Authority from '@/components/view-user/Authority'

import Goods from '@/components/view-order/Tree'


const permissionRouter = [
  {
    path: '/1',
    component: Home,
    name: '首页',
    iconCls: 'fa fa-home fa-fw',
    leaf: true,
    children: [
      {path: '/dashboard', component: Dashboard, name: '仪表盘'},
      {path: '/index', name: '数据', hidden: true, redirect: {path: '/dashboard'}}
    ]
  },
  {
    path: '/2',
    hidden: true,
    component: Home,
    name: '个人信息',
    children: [
      {path: '/admin/profile', component: AdminProfile, name: '我的信息'},
      {path: '/admin/message', component: AdminMessage, name: '我的消息'}
    ]
  },
  {
    path: '/3',
    component: Home,
    name: '用户管理',
    iconCls: 'fa fa-address-card fa-fw',//图标样式class
    children: [
      {path: '/user/list', component: User, name: '用户列表'},
      {path: '/user/add', name: '添加用户' ,hidden: true},
      {path: '/user/update', name: '修改用户',hidden: true},
      {path: '/user/delete',  name: '删除用户',hidden: true},
      {path: '/user/role', component: Role, name: '角色列表'},
      {path: '/user/role/add', hidden: true, name: '添加角色'},
      {path: '/user/role/update', hidden: true, name: '更新角色'},
      {path: '/user/role/delete', hidden: true, name: '删除角色'},
      {path: '/user/authority', component: Authority, name: '权限列表'},
    ]
  },
  {
    path: '/4',
    component: Home,
    name: '商品管理',
    iconCls: 'fa fa-id-card-o fa-fw',
    children: [
      {path: '/good/list', component: Goods, name: '商品列表'},
      {path: '/good/tree', component: Goods, name: '树测试'},
    ]
  }
]

const routes = [
  {
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true,
    meta: { anonymous: true }
  },
  {
    path: '/error',
    component: Home,
    hidden: true,
    meta: { anonymous: true },
    children: [
      {path: '/404', component: NotFound, name: '404',meta: { anonymous: true }},
      {path: '/403', component: NotFound, name: '403',meta: { anonymous: true }}]
  }
  , {
    path: '*',
    name: '40x',
    hidden: true,
    meta: { anonymous: true },
    redirect: {path: '/404'}
  }
];

export {permissionRouter, routes}


