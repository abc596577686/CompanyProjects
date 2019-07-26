// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/styles/normalize.css'
import './assets/fonts/iconfont.css'
import './assets/styles/index.css'

import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
