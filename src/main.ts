/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-18 14:53:16
 * @LastEditTime: 2022-07-19 11:28:27
 * @Description: 入口文件
 */
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';

function bootstrap() {
  const app = createApp(App);
  // 注冊路由
  setupRouter(app);
  // pinia 状态管理
  setupStore(app);
  // 挂载
  app.mount('#app');
}

bootstrap();
