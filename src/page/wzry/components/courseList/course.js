import { h, defineComponent } from 'vue'
const COURSE = 'COURSE'
import './course.scss'
export default defineComponent({
    name: COURSE,
    setup(props, { attrs, slots }){
        const header = h('header',null,slots.title?.()) 
        const main = h('main',slots.main?.())
        return()=>{
            return h(
                'div',
                {
                    class:'box'
                },
                [
                    header,
                    main,
                    // slots.default?.()
                ]
            )
        }

    }
})