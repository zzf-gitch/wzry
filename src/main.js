import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@vant/touch-emulator';
import Vant from 'vant'
import 'vant/lib/index.css';
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import './assets/fonts/iconfont.css'
import store from './store/index.js'
// 国际化
import world from './i18n/index.js';
// 全局引入css
import '@/style/headtap.css'
import 'animate.css'
// import htmlToPdf from './page/utils/htmlToPdf.js'
import UILib from '@/components/index.js'
// 引用 flexible 插件
// import "lib-flexible/flexible.js";

const app = createApp(App)
app.use(store)
app.use(router)
app.use(dataV)
app.use(world)
app.use(UILib)



//请求地址
import urls from './api/api.js'
app.config.globalProperties.$urls = urls
    //请求方式
import request from './api/request.js'
app.config.globalProperties.$request = request

app.mount('#app')
app.use(ElementPlus)
app.use(Vant);
// app.use(htmlToPdf)