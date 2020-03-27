// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/ress.css'
import './assets/css/global.css'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight, faAngleLeft)

window.addEventListener('load', () => {
  /**
   * FontAwesomeアイコンをDOMに反映
   */
  dom.i2svg()
})

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
