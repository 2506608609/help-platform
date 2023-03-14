import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Logon from '../views/Logon.vue';
import Users from '../views/Users.vue';

const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logon',
    name: 'logon',
    component: Logon,
  },

  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },

  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  // {
  //   path: '/',
  //   redirect: '/login'
  // }




];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
