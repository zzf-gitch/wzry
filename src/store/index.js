import { createStore } from 'vuex'
import vueself from './modules/vueself.js' // vueself页面
import vuexdemo from './modules/vuexdemo.js' // vuexdemo页面
import main from './modules/main.js' // 主要vuex
import heroinfo from './modules/heroinfo.js' // 英雄页面跳转heroInfo页面
import Tag from './modules/Tag.js' // 标签页和左侧边栏联动
export default createStore({
    modules: {
        vueself, // vueself页面
        vuexdemo, // vuexdemo页面
        main, // 主要vuex
        heroinfo, // 英雄页面跳转heroInfo页面
        Tag // 标签页和左侧边栏联动
    }
})