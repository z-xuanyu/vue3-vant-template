/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-21 11:28:07
 * @LastEditTime: 2022-03-21 11:46:21
 * @Description: Modify here please
 */
import { defineStore } from 'pinia'
import { store } from '../index'
export const appStore = defineStore({
  id: 'app-setting',
  state: () => ({
    isShowMenu: false,
  }),

  getters: {
    getMenuStatus(): boolean {
      return this.isShowMenu
    },
  },

  actions: {
    changeMenuStatus() {
      this.isShowMenu = !this.isShowMenu
    },
  },
})

export function useAppStoreWithOut() {
  return appStore(store)
}
