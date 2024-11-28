/// <reference types="vite/client" />
// 解决@别名引入爆红
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
