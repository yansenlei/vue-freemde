// 2018-09-28 18:35:59

import VueFreemde from './Freemde'

export default VueFreemde

VueFreemde.install = function install (Vue) {
  Vue.component(VueFreemde.name, VueFreemde)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(VueFreemde.name, VueFreemde)
}
