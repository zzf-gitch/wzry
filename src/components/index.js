import CountTo from './count-to/CountTo.vue'

const UILib  = {
  install (Vue) {
    Vue.component('CountTo', CountTo)
  }
}

export default UILib