import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [


  // {
  //   path: '/',
  //   name: 'Web',
  //   component: () => import('../views/web')
  // },

  {
    path: "/home",
    name: "Admin",
    component: () => import("../views/Home"),
    children: [
      {
        path: "/admin/users/personal",
        name: "UserPersonal",
        component: () => import("../views/User/personal.vue"),
        meta: {
          title: "个人资料",
        },
      },
      {
        path: "/admin/users/password",
        name: "UserPassword",
        component: () => import("../views/User/password.vue"),
        meta: {
          title: "修改密码",
        },
      },
      
      
      {
        path: '/admin/notice/add',
        name: 'Hnoticemsgadd',
        component: () => import('@/views/Hnotice/add.vue'),
        meta: {
          title: '发布公告'
        }
      },
      {
        path: '/admin/notice/del',
        name: 'Hnoticemsgdel',
        component: () => import('@/views/Hnotice/del.vue'),
        meta: {
          title: '整整公告'
        }
      },
      {
        path: '/admin/helpmsg/list',
        name: 'Helpmsglist',
        component: () => import('@/views/Helpmsg/index.vue'),
        meta: {
          title: '求助列表'
        }
      },
      {
        path: '/admin/helpmsg/add',
        name: 'Helpmsgadd',
        component: () => import('@/views/Helpmsg/add.vue'),
        meta: {
          title: '发布求助'
        }
      },

    ]

  }, {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
