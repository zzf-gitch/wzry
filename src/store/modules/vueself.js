export default {
    state:{
        // 抽屉显示隐藏
        show:false,
        // number
        n:100,
        // 消息盒子显示隐藏
        messageshow:false
    },
    mutations:{
        // 增加
        add(state,add){
            state.n+=add
        },
        // 重新赋值
        reduction(state,nu){
            state.n=+nu
        },
        // 打开抽屉
        open(state){
            state.show=true
        },
        // 打开消息盒子
        close(state){
            state.messageshow=true
        },
        // 关闭消息盒子
        closes(state){
            state.messageshow=false
        },
        // 关闭抽屉和遮罩层以及消息盒子
        closeall(state){
            state.show=false
            state.messageshow=false
        }
    }
}