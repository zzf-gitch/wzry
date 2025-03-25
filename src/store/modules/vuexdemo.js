export default {
    state:{
        // 控制侧边栏的显示隐藏
        isshow: false,
        // number
        number: 80,
    },
    mutations: {
        // 控制侧边栏的函数
        MenuOpenClose(state) {
            state.isshow = !state.isshow
        },
        // 增加
        addchange(state, add) {
            state.number += add
        },
        // 重新赋值
        valuationchange(state, num) {
            state.number = +num
        }
    }
}