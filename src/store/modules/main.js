export default {
    state:{
        // menu 侧边栏的显示隐藏
        isCollapse: false,
    },
    mutations: {
        // 控制侧边栏和menu菜单的函数
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
    }
}