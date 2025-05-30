import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
import Login from '../views/Login.vue'
import NProgress from 'nprogress'

const routes = [
    {
        path:'/',
        redirect:'/Login'
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        // hidden: true
        // redirect:'/Home',
        meta: {
            title: "王者荣耀后台管理系统"
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import('@/page/login/About.vue'),
        meta: {
            title: "About"
        }
    },
    {
        path: '/PDFwordvideo',
        name: 'PDFwordvideo',
        component: () =>
            import('@/views/PDFwordvideo.vue'),
        meta: {
            title: "PDFwordvideo"
        }
    },
    {
        path: '/cardbox',
        name: 'cardbox',
        component: () =>
            import('@/views/cardbox.vue'),
        meta: {
            title: "cardbox"
        }
    },
    {
        path: '/card',
        name: 'card',
        component: () =>
            import('@/views/card.vue'),
        meta: {
            title: "card"
        }
    },
    {
        path: '/cardDrawer',
        name: 'cardDrawer',
        component: () =>
            import('@/views/cardDrawer.vue'),
        meta: {
            title: "cardDrawer"
        }
    },
    {
        path: '/cardword',
        name: 'cardword',
        component: () =>
            import('@/views/cardword.vue'),
        meta: {
            title: "cardword"
        }
    },
    {
        path: '/QQ',
        name: 'QQ',
        component: () =>
            import('@/page/QQ.vue'),
        meta: {
            title: "QQ"
        }
    },
    {
        path: '/QQcopy',
        name: 'QQcopy',
        component: () =>
            import('@/page/QQcopy.vue'),
        meta: {
            title: "QQ第二版"
        }
    },
    {
        path: '/aside',
        name: 'aside',
        component: () =>
            import('@/views/aside.vue'),
        meta: {
            title: "aside"
        }
    },
    {
        path: '/table',
        name: 'table',
        component: () =>
            import('@/views/table.vue'),
        meta: {
            title: "table"
        }
    },
    {
        path: '/loginthree',
        name: 'loginthree',
        component: () =>
            import('@/views/loginthree.vue'),
        meta: {
            title: "loginthree"
        }
    },
    {
        path: '/demowatch',
        name: 'demowatch',
        component: () =>
            import('@/views/demowatch.vue'),
        meta: {
            title: "demowatch"
        }
    },
    {
        path: '/vuexdemo',
        name: 'vuexdemo',
        component: () =>
            import('@/views/vuexdemo.vue'),
        meta: {
            title: "vuexdemo"
        }
    },
    {
        path: '/time',
        name: 'time',
        component: () =>
            import('@/views/time.vue'),
        meta: {
            title: "time"
        }
    },
    {
        path: '/vueself-adaptiondemo',
        name: 'vueself-adaptiondemo',
        component: () =>
            import('@/views/vueself-adaptiondemo.vue'),
        meta: {
            title: "vueself-adaptiondemo"
        }
    },
    {
        path: '/setTimeout',
        name: 'setTimeout',
        component: () =>
            import('@/views/setTimeout.vue'),
        meta: {
            title: "setTimeout"
        }
    },
    {
        path: '/videotwo',
        name: 'videotwo',
        component: () =>
            import('@/views/videotwo.vue'),
        meta: {
            title: "videotwo"
        }
    },
    {
        path: '/loginfour',
        name: 'loginfour',
        component: () =>
            import('@/views/loginfour.vue'),
        meta: {
            title: "loginfour"
        }
    },
    {
        path: '/layout',
        name: 'layout',
        component: () =>
            import('@/views/layout.vue'),
        meta: {
            title: "layout"
        }
    },
    {
        path: '/animationdemo',
        name: 'animationdemo',
        component: () =>
            import('@/page/animationdemo.vue'),
        meta: {
            title: "animationdemo"
        }
    },
    {
        path: '/tabss',
        name: 'tabss',
        component: () =>
            import('@/views/tabss.vue'),
        meta: {
            title: "tabss"
        }
    },
    {
        path: '/video',
        name: 'video',
        component: () =>
            import('@/views/video.vue'),
        meta: {
            title: "video"
        }
    },
    {
        path: '/QQtabbercopy',
        name: 'QQtabbercopy',
        component: () => import('@/page/QQ/QQtabbercopy.vue'),
        children: [{
                path: '/homepageQQcopy',
                name: 'homepageQQcopy',
                component: () => import('@/page/QQ/homepageQQcopy.vue'),
                meta: {
                    title: "消息"
                }
            },
            {
                path: '/ContactQQcopy',
                name: 'ContactQQcopy',
                component: () => import('@/page/QQ/ContactQQcopy.vue'),
                meta: {
                    title: "联系人"
                }
            },
            {
                path: '/DynamicQQcopy',
                name: 'DynamicQQcopy',
                component: () => import('@/page/QQ/DynamicQQcopy.vue'),
                meta: {
                    title: "动态"
                }
            },
        ]
    },
    {
        path: '/QQTabber',
        name: 'QQTabber',
        //路由重定向 父级路由相当于摆设直接跳到自子级路由/zhuye
        redirect: '/homepage',
        component: () =>
            import('@/page/QQ/QQTabber.vue'),
        children: [{
                path: '/homepage',
                name: 'homepage',
                component: () =>
                    import('@/page/QQ/homepage.vue'),
                meta: {
                    title: "消息"
                }
            },
            {
                path: '/Contact',
                name: 'Contact',
                component: () =>
                    import('@/page/QQ/Contact.vue'),
                meta: {
                    title: "联系人"
                }
            },
            {
                path: '/Dynamic',
                name: 'Dynamic',
                component: () =>
                    import('@/page/QQ/Dynamic.vue'),
                meta: {
                    title: "动态"
                }
            },
        ]
    },
    {
        path: '/service',
        name: 'service',
        component: () =>
            import('@/page/service.vue'),
        meta: {
            title: '服务协议'
        }
    },
    {
        path: '/contract',
        name: 'contract',
        component: () =>
            import('@/page/contract.vue'),
        meta: {
            title: 'QQ隐私保护指引'
        }
    },
    {
        path: '/page',
        name: 'page',
        component: () =>
            import('../views/page.vue'),
        meta: {
            title: 'page'
        }
    },
    {
        path: '/heroInfo',
        name: 'heroInfo',
        component: () =>
            import('../views/heroInfo.vue'),
        meta: {
            title: '英雄基本信息'
        }
    },
    {
        path: '/datav',
        name: 'datav',
        component: () =>
            import('@/page/datav.vue'),
        meta: {
            title: 'datav'
        }
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import('@/page/404.vue'),
        meta: {
            title: '404'
        }
    },
    {
        path: "/:pathMath(.*)", // 此处需特别注意置于最底部
        //重定向
        redirect: "/404"
    },
    {
        path: '/logina',
        name: 'logina',
        component: () =>
            import('@/page/login/logina.vue'),
        meta: {
            title: 'logina'
        }
    },
    {
        path: '/index',
        name: 'index',
        component: () =>
            import('@/views/index/index.vue'),
        meta: {
            title: 'index'
        }
    },

    {
        path: '/echarts',
        name: 'echarts',
        component: () =>
            import('@/page/echarts.vue'),
        meta: {
            title: 'echarts'
        }
    },

    {
        path: '/echarts1',
        name: 'echarts1',
        component: () =>
            import('@/page/echarts1.vue'),
        meta: {
            title: 'echarts1'
        }
    },
    {
        path: '/echartsa',
        name: 'echartsa',
        component: () =>
            import('@/page/echartsa.vue'),
        meta: {
            title: 'echartsa'
        }
    },
    {
        path: '/yidong',
        name: 'yidong',
        component: () =>
            import('@/page/yidong.vue'),
        meta: {
            title: '移动端'
        }
    },
    {
        path: '/loginone',
        name: 'loginone',
        component: () =>
            import('@/views/loginone.vue'),
        meta: {
            title: 'loginone'
        }
    },
    {
        path: '/logintwo',
        name: 'logintwo',
        component: () =>
            import('@/views/logintwo.vue'),
        meta: {
            title: 'logintwo'
        }
    },
    {
        path: '/videoone',
        name: 'videoone',
        component: () =>
            import('@/views/videoone.vue'),
        meta: {
            title: 'videoone'
        }
    },
    {
        path: '/imgdemo',
        name: 'imgdemo',
        component: () =>
            import('@/views/imgdemo.vue'),
        meta: {
            title: 'imgdemo'
        }
    },
    {
        path: '/fordemo',
        name: 'fordemo',
        component: () =>
            import('@/views/fordemo.vue'),
        meta: {
            title: 'fordemo'
        }
    },
    {
        path: '/wzry',
        //路由重定向 父级路由相当于摆设直接跳到自子级路由/zhuye
        name: "wzry",
        redirect: '/zhuye',
        component: () =>
            import('@/page/wzry/wzry.vue'),
        children: [{
                path: '/zhuye',
                name: '主页',
                component: () =>
                    import('@/page/wzry/components/zhuye.vue'),
                meta: {
                    title: '主页',
                    name: 'zhuye',
                    isMenu: true,
                    permissions: ['zhuye']
                },
            },
            {
                path: '/zhanji',
                name: '战绩',
                component: () =>
                    import('@/page/wzry/components/zhanji.vue'),
                meta: {
                    title: '战绩',
                    name: 'zhanji',
                    isMenu: true
                }
            },
            {
                path: '/yx',
                name: '英雄',
                component: () =>
                    import('@/page/wzry/components/yx.vue'),
                meta: {
                    title: '英雄',
                    name: 'yx',
                    isMenu: true
                }
            },
            {
                path: '/pf',
                name: '皮肤',
                // component: () =>
                //     import ('@/page/wzry/components/pf.vue'),
                meta: {
                    title: '皮肤',
                    name: 'pf',
                    isMenu: true
                },
            },
            {
                path: '/pfzs',
                name: '皮肤展示',
                component: () =>
                    import('@/page/wzry/components/pf/pfzs.vue'),
                meta: {
                    title: '皮肤展示'
                }
            },
            {
                path: '/pftj',
                name: '皮肤图鉴',
                component: () =>
                    import('@/page/wzry/components/pf/pftj.vue'),
                meta: {
                    title: '皮肤图鉴'
                }
            },
            {
                path: '/ry',
                name: '荣耀',
                // component: () =>
                //     import ('@/page/wzry/components/ry.vue'),
                meta: {
                    title: '荣耀',
                    name: 'ry',
                    isMenu: true
                }
            },
            {
                path: '/cj',
                name: '成就',
                component: () =>
                    import('@/page/wzry/components/ry/cj.vue'),
                meta: {
                    title: '成就'
                }
            },
            {
                path: '/Hero_career',
                name: '英雄生涯',
                component: () =>
                    import('@/page/wzry/components/ry/wzsy/Hero_career.vue'),
                meta: {
                    title: '英雄生涯'
                },
            },
            {
                path: '/Hero_switch',
                name: '英雄切换',
                component: () =>
                    import('@/page/wzry/components/ry/wzsy/Hero_switch.vue'),
                meta: {
                    title: '英雄切换'
                },
            },
            {
                path: '/wzsy',
                name: '王者生涯',
                // component: () =>
                //     import ('@/page/wzry/components/ry/wzsy.vue'),
                meta: {
                    title: '王者生涯'
                },
            },
            {
                path: '/ryzl',
                name: '荣誉资料',
                component: () =>
                    import('@/page/wzry/components/ry/ryzl.vue'),
                meta: {
                    title: '荣誉资料'
                }
            },
            {
                path: '/bsry',
                name: '比赛荣誉',
                component: () =>
                    import('@/page/wzry/components/ry/bsry.vue'),
                meta: {
                    title: '比赛荣誉'
                }
            },
            {
                path: '/hwd',
                name: '护卫队',
                // component: () =>
                //     import ('@/page/wzry/components/hwd.vue'),
                meta: {
                    title: '护卫队',
                    name: 'hwd',
                    isMenu: true
                }
            },
            {
                path: '/sp',
                name: '审判',
                component: () =>
                    import('@/page/wzry/components/hwd/sp.vue'),
                meta: {
                    title: '审判'
                }
            },
            {
                path: '/xy',
                name: '信誉',
                component: () =>
                    import('@/page/wzry/components/hwd/xy.vue'),
                meta: {
                    title: '信誉'
                }
            },
            {
                path: '/yox',
                name: '游戏',
                // component: () =>
                //     import ('@/page/wzry/components/yox.vue'),
                meta: {
                    title: '游戏',
                    name: 'yox',
                    isMenu: true
                }
            },
            {
                path: '/dzzl',
                name: '对战资料',
                component: () =>
                    import('@/page/wzry/components/yox/dzzl.vue'),
                meta: {
                    title: '对战资料'
                }
            },
            {
                path: '/wxtg',
                name: '万象天宫',
                component: () =>
                    import('@/page/wzry/components/yox/wxtg.vue'),
                meta: {
                    title: '万象天宫'
                }
            },
            {
                path: '/sj',
                name: '社交',
                // component: () =>
                //     import ('@/page/wzry/components/sj.vue'),
                meta: {
                    title: '社交',
                    name: 'sj',
                    isMenu: true
                }
            },
            {
                path: '/jymp',
                name: '交友名片',
                component: () =>
                    import('@/page/wzry/components/sj/jymp.vue'),
                meta: {
                    title: '交友名片'
                }
            },
            {
                path: '/grxc',
                name: '个人相册',
                component: () =>
                    import('@/page/wzry/components/sj/grxc.vue'),
                meta: {
                    title: '个人相册'
                }
            },
            {
                path: '/qmgx',
                name: '亲密关系',
                component: () =>
                    import('@/page/wzry/components/sj/qmgx.vue'),
                meta: {
                    title: '亲密关系'
                }
            },
            {
                path: '/stxx',
                name: '师徒信息',
                component: () =>
                    import('@/page/wzry/components/sj/stxx.vue'),
                meta: {
                    title: '师徒信息'
                }
            },
            {
                path: '/xyd',
                name: '心愿单',
                component: () =>
                    import('@/page/wzry/components/sj/xyd.vue'),
                meta: {
                    title: '心愿单'
                }
            },
        ]
    },

    {
        path: '/element_plus',
        name: 'element_plus',
        redirect: "/china",
        component: () =>
            import('@/page/element_plus.vue'),
        children: [{
                path: '/china',
                name: 'china',
                component: () =>
                    import('@/page/login/china.vue'),
                meta: {
                    title: '中国地图',
                    name: 'china',
                    isMenu: true
                }
            },
            {
                path: '/world',
                name: 'world',
                component: () =>
                    import('@/page/login/world.vue'),
                meta: {
                    title: '世界地图',
                    name: 'world',
                    isMenu: true
                }
            },
            {
                path: '/shanxi',
                name: 'shanxi',
                component: () =>
                    import('@/page/shanxi.vue'),
                meta: {
                    title: '山西地图',
                    name: 'shanxi',
                    isMenu: true
                }
            },
            {
                path: '/jiangsu',
                name: 'jiangsu',
                component: () =>
                    import('@/page/jiangsu.vue'),
                meta: {
                    title: '江苏地图',
                    name: 'jiangsu',
                    isMenu: true
                }
            },
            {
                path: '/shuibowen',
                name: 'shuibowen',
                component: () =>
                    import('@/page/login/shuibowen.vue'),
                meta: {
                    title: '水波纹按钮',
                    name: 'water',
                    isMenu: true
                }
            },
            {
                path: '/guojia',
                name: 'guojia',
                component: () =>
                    import('@/page/guojia.vue'),
                meta: {
                    title: '国家信息',
                    name: 'country Info',
                    isMenu: true,
                }
            },
            {
                path: '/country',
                name: 'country',
                meta: {
                    title: '国家地图',
                }
            },
            {
                path: '/region',
                name: 'region',
                meta: {
                    title: '地区地图',
                }
            },
            {
                path: '/Water',
                name: 'Water',
                meta: {
                    title: '水波纹',
                }
            },
        ]
    },
]



const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes
})

//to: 进入到哪个路由去 from: 从哪个路由离开 next: 路由的控制参数
router.beforeEach((to, from, next) => {
    if(to.meta.title) {
        document.title = to.meta.title
    }
    NProgress.start()
    // 判断有没有登录
    let login = sessionStorage.getItem('Loginuser')
    if (!login) {
        if (to.name == "Login") {
            next();
        } else {
            next({path: '/'})
        }
    } else {
        next();
    }
});
router.afterEach(() => {
    NProgress.done()
})
export default router