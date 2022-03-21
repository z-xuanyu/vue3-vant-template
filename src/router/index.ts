/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-21 11:35:42
 * @LastEditTime: 2022-03-21 11:43:21
 * @Description: Modify here please
 */
import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('/@/views/Home.vue'),
    meta: {
      title: 'home',
      keepAlive: false,
    },
  },
  {
    path: '/user',
    component: () => import('/@/views/User.vue'),
    meta: {
      title: 'user',
      keepAlive: false,
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('/@/components/Error.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => {
    0
  },
})

export function setupRouter(app: App) {
  app.use(router)
}
