import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [


  {
    path: '/web',
    name: 'Web',
    component: () => import('../views/web/index.vue'),
    children: [
      {
        path: '/web/index',
        name: 'Webindex',
        component: () => import('../views/web/index.vue'),
        meta: {
          title: '首页'

        }
      },
      {
        path: '/web/home',
        name: 'Webhome',
        component: () => import('../views/web/home.vue'),
        meta: {
          title: '首页'

        }
      },


      {
        path: '/web/notice',
        name: 'Webnotice',
        component: () => import('../views/web/notice.vue'),
        meta: {
          title: '公告'

        }
      },
      {
        path: '/web/helpmsg',
        name: 'Webhelpmsg',
        component: () => import('../views/web/helpmsg.vue'),
        meta: {
          title: '求助'

        }
      },
      {
        path: '/web/job',
        name: 'Webjob',
        component: () => import('../views/web/job.vue'),
        meta: {
          title: 'job相关'

        }
      },
      {
        path: '/web/idle',
        name: 'Webidle',
        component: () => import('../views/web/idle.vue'),
        meta: {
          title: '闲置相关'

        }
      },


      {
        path: '/web/reply',
        name: 'Webreply',
        component: () => import('../views/web/reply'),
        meta: {
          title: '回复'

        }
      },
      {
        path: '/web/detail',
        name: 'Webdetail',
        component: () => import('../views/web/detail'),
        meta: {
          title: 'job详情'

        }
      },
      {
        path: '/web/diledetail',
        name: 'Webdetail',
        component: () => import('../views/web/idledel.vue'),
        meta: {
          title: '闲置详情'

        }
      },


      {
        path: '/web/talk',
        name: 'Webtalk',
        component: () => import('../views/Talk/index.vue'),
        meta: {
          title: '聊天室'

        }
      },

    ]



  },

  {
    path: "/home",
    name: "Admin",
    component: () => import("../views/Home"),
    children: [
      {
        path: "/admin/usercontrol/add",
        name: "Useradd",
        component: () => import("../views/Usercontorl/add.vue"),
        meta: {
          title: "用户添加",
        },
      },



      {
        path: "/admin/usercontrol/list",
        name: "Userlist",
        component: () => import("../views/Usercontorl/list.vue"),
        meta: {
          title: "用户列表",
        },
      },
      {
        path: "/admin/usercontrol/update",
        name: "Userupdate",
        component: () => import("../views/Usercontorl/update.vue"),
        meta: {
          title: "用户修改",
        },
      },







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
        component: () => import('@/views/Hnotice/index.vue'),
        meta: {
          title: '整整公告'
        }
      },
      {
        path: '/admin/notice/update',
        name: 'Hnoticemsgupdate',
        component: () => import('@/views/Hnotice/update.vue'),
        meta: {
          title: '修改公告'
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
        path: '/admin/helpmsg/admin/list',
        name: 'adminHelpmsglist',
        component: () => import('@/views/Helpmsg/adminindex.vue'),
        meta: {
          title: '全部求助列表'
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
      {
        path: '/admin/helpmsg/updateHelpmsg',
        name: 'updateHelpmsg',
        component: () => import('@/views/Helpmsg/update.vue'),
        meta: {
          title: '修改求助'
        }
      },




      {
        path: '/admin/comment',
        name: 'comment',
        component: () => import('@/views/Comment/index.vue'),
        meta: {
          title: '修改求助'
        }
      },


      {
        path: '/admin/idle/add',
        name: 'idleadd',
        component: () => import('@/views/Idle/add'),
        meta: {
          title: '发布闲置'
        }
      },
      {
        path: '/admin/idle/list',
        name: 'idlelist',
        component: () => import('@/views/Idle/index.vue'),
        meta: {
          title: '闲置列表'
        }
      },
      {
        path: '/admin/idle/list/admin',
        name: 'adminidlelist',
        component: () => import('@/views/Idle/adminindex.vue'),
        meta: {
          title: '闲置列表'
        }
      },



      {
        path: '/admin/idle/update',
        name: 'updateidle',
        component: () => import('@/views/Idle/update.vue'),
        meta: {
          title: '修改闲置'
        }
      },




      {
        path: '/admin/job/add',
        name: 'idleadd',
        component: () => import('@/views/Job/add'),
        meta: {
          title: '发布招聘'
        }
      },
      {
        path: '/admin/job/list',
        name: 'idlelist',
        component: () => import('@/views/Job/index.vue'),
        meta: {
          title: 'job列表'
        }
      },
      {
        path: '/admin/job/list/hr',
        name: 'adminjoblist',
        component: () => import('@/views/Job/adminindex.vue'),
        meta: {
          title: 'job列表'
        }
      },



      {
        path: '/admin/job/update',
        name: 'updateidle',
        component: () => import('@/views/Job/update.vue'),
        meta: {
          title: '修改job'
        }
      },


    ]

  },



  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('@/views/Login/reg.vue')
  },







  //重定位到登录页
  { path: '/', redirect: '/login' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
