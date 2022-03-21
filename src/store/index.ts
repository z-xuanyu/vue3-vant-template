/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-21 11:27:24
 * @LastEditTime: 2022-03-21 11:43:53
 * @Description: Modify here please
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}

export { store }
