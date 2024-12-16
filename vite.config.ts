import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各个环境下的对应的变量
  let env = loadEnv(mode,process.cwd())
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
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,// 获取数据的服务器地址设置
          changeOrigin: true,// 需要代理跨越
          rewrite: (path) => path.replace(/^\/api/,'')// 路径重写
        }
      }
    }
  }
})
