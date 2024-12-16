import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: 'src/mock',
        //@ts-ignore
        localEnabled: command === 'serve'
      }),
      VueSetupExtend()// setup语法糖直接使用name
    ],
    resolve: {
      alias: {
          "@": path.resolve(__dirname, "./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
        preprocessorOptions: {
          scss: {
            javascriptEnabled: true,
            additionalData: '@import "/src/styles/variable.scss";',// 引入全局scss样式
          },
        },
      }
  }
})
