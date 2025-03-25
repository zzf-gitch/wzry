export default{
    state: {
        openTab: [],
        activeIndex: '',
    },
    mutations: {
        add_tabs(state, data) {
            console.log(state);
            console.log(data)
            state.openTab.push(data)
        },
        delete_tabs(state, route) {
            let index = 0
            for (let gohh of state.openTab) {
                if (gohh.route === route) {
                    break
                }
                index++
            }
            state.openTab.splice(index, 1)
        },
        set_active_index(state, index) {
            console.log(index);
            state.activeIndex = index
        }
    },
}