import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import ToggleButton from 'vue-js-toggle-button'
import './styles/index.less'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png'),
  error: require('./common/image/default.png')
})

Vue.use(ToggleButton)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
