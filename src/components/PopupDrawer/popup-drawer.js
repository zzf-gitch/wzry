/** 弹窗组件布局
 *  1. title 可以设置弹窗组件的头部信息，不传递不显示，默认为空
 *  2. effect 鼠标悬停 ElTooltip 组件背景色 白色：light 黑色： dark 默认值是黑色
 *  3. placement 鼠标悬停 ElTooltip 组件的位置，值为
 *     {
 *        top,left,right,bottom 默认是 top 上边
 *        其他方向值可以在前缀  方向值(top)-start || end
 *     }
 *  4. content 鼠标悬停 ElTooltip 组件，具体的内容，需要在元素上添加该属性，值为字符串
 *  5. tranleft aside的left值
 */

import { h, defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
const POPUP_DRAWER = 'PopupDrawer'

import './PopupDrawer.scss'
export default defineComponent({
  name: POPUP_DRAWER,
  components: {
    ElTooltip
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    effect: {
      type: String,
      default: 'dark'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  setup(props, { attrs, slots }) {
    const slot = slots.popheader ? slots.popheader() : []
    const childTitle = h('span', { class: 'title' }, [props.title])
    const childBts = h(
      'div',
      {
        class: 'header-bts'
      },
      [
        slot.map((item, index) => {
          return h(
            ElTooltip,
            {
              content: item.props.content,
              placement: props.placement,
              effect: props.effect,
              showAfter: 100
            },
            {
              default: () => h(
                'a',
                {
                  href: 'javascript:void(0);'
                },
                [h(item, { key: index })]
              )
            }
          )
        })
      ]
    )
    return () => {
      return h(
        'div',
        {
          class: 'popup-drawer'
        },
        [
          h(
            'header',
            {
              class: [
                'popup-drawer-header',
                props.title === '' ? 'popup-drawer_kong' : ''
              ]
            },
            [
              props.title !== '' ? childTitle : '',
              childBts
            ]
          ),
          h(
            'main',
            {
              class: 'popup-drawer-main'
            },
            slots.popupform?.()
          ),
          h(
            'div',
            {
              class: 'aside',
              style: {
                'transform': `translateX(${attrs.tranleft})`,

              }
            },
            slots.additional?.()
          )
        ]
      )
    }
  }
})

// slots.popheader().map((item, index) => {
//   return h(childa, null, { icons: () => h(item) })
// })
// slot.map(item => {
//   console.log(item);
//   return h(
//     ElTooltip,
//     {
//       content: '表单',
//       placement: 'left',
//       effect: 'dark'
//     },
//     {
//       default: () =>
//         h(item)
//     }
//   )
// })
// const child = h('a', { href: 'javascript:void(0);' })
// const slot = slots.default ? slots.default() : []