import 'babel-polyfill'
import 'common/js/flexible'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import LazyRender from 'vue-lazy-render'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Navigation from 'vue-navigation'
import store from './store'
import 'swiper/dist/css/swiper.css'
import 'common/stylus/index.css'

Vue.config.productionTip = false

document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
}, false);

Vue.use(VueAwesomeSwiper)
Vue.use(LazyRender)
Vue.use(VueLazyload, {
  loading: require('common/image/logo.png')
})

Vue.use(Navigation, {router})

Vue.directive('title', {
  inserted: (el, binding) => {
    document.title = el.dataset.title
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
