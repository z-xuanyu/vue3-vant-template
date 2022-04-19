/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-18 14:53:16
 * @LastEditTime: 2022-04-19 10:15:40
 * @Description: vite 配置文件
 */
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// 引入 Icon自动引入解析器
import IconsResolver from 'unplugin-icons/resolver'
// 引入自动引入插件
import Components from 'unplugin-vue-components/vite'

// vant 组件库 自动引入解析器
import { VantResolver } from 'unplugin-vue-components/resolvers'

// 自然导入api
import AutoImport from 'unplugin-auto-import/vite'

import pxtoviewport from 'postcss-px-to-viewport'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig(({ mode }: ConfigEnv) => {
  // 环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    plugins: [
      // vue
      vue(),
      // vant
      styleImport({
        resolves: [VantResolve()],
      }),
      // 使用自动引入插件
      Components({
        // 配置解析器
        resolvers: [
          // Icon自动引入解析器
          // prefix - 前缀，默认为 i，上面我们配置成了 icon，即组件名以 icon 开头
          // collection - 图标集名
          // icon - 图标名
          // {prefix}-{collection}-{icon}
          // 当然大驼峰也可以
          IconsResolver({
            // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
            prefix: 'icon',
            // 当图标集名字过长时，可使用集合别名
            alias: {
              system: 'system-uicons',
            },
            // 标识自定义图标集
            customCollections: ['svg'],
          }),
          // vant 组件按需自动导入
          VantResolver(),
        ],
      }),
      // Icons
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        // 自定义图标 svg
        customCollections: {
          svg: FileSystemIconLoader('src/assets/svg', svg =>
            svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
      }),
      // 自动api导入
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './src/auto-imports.d.ts',
        resolvers: [
          // vant 组件库
          VantResolver(),
        ],
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ],
    // 代理
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          pxtoviewport({
            unitToConvert: 'px', //需要转换的单位，默认为"px"
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
            // viewportHeight: 667, //视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
            unitPrecision: 13, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            fontViewportUnit: 'vw', //字体使用的视口单位
            selectorBlackList: ['.ignore-', '.hairlines'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // 允许在媒体查询中转换`px`
            replace: true, //是否直接更换属性值，而不添加备用属性
            // exclude: /node_modules/i, //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', //横屏时使用的单位
            landscapeWidth: 1134, //横屏时使用的视口宽度
          }),
        ],
      },
    },
  }
})
