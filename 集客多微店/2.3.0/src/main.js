// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config/rem'
import VueLazyload from 'vue-lazyload';
// import LazyRender from 'vue-lazy-render'
import FastClick from 'fastclick';
import 'common/style/resize.css';

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import 'common/style/theme-chalk/index.css';
import VueScroller from 'vue-scroller';
import VueClipboard from 'vue-clipboard2';
import sa from 'sa-sdk-javascript';
import VueAwesomeSwiper from 'vue-awesome-swiper'

require('swiper/dist/css/swiper.css')


sa.init({
  sdk_url: 'http://static.sensorsdata.cn/sdk/1.10.9/sensorsdata.min.js',
  heatmap_url: 'http://static.sensorsdata.cn/sdk/1.10.9/heatmap.min.js',
  web_url: 'http://sa.jikeduo.com.cn/?project=default',
  // web_url: 'http://sa.jikeduo.com.cn/?project=production',
  server_url: 'http://sa.jikeduo.com.cn:8106/sa?project=default',
  // server_url: 'http://sa.jikeduo.com.cn:8106/sa?project=production',

  name: 'sa',
  heatmap: {
    clickmap:'default',
    scroll_notice_map:'default',
    loadTimeout:  3000,
    isTrackLink: true,
    collect_url: function(){
      return true;
    },
    collect_element: function(element_target){
      // 如果这个元素有属性sensors-disable=true时候，不采集
      if(element_target.getAttribute('sensors-disable') === 'true'){
        console.log('不采集');
        return false;
      } else{
        console.log('采集');
        return true;
      }
    },
    collect_input:function(element_target){
      //例如如果元素的id是a，就采集这个元素里的内容
      if(element_target.id === 'a'){
        return true;
      }
    },
    scroll_delay_time: 2000
  },
});

let distinct_id = sa.store.getDistinctId();
console.log(sa.store.getDistinctId());

// sa.login(distinct_id);

sa.quick('autoTrack', {
  platForm:'h5'
});


Vue.directive('stat', {
  inserted(el,binding) {
    console.log(binding);
    if (binding.value.type == 'pageview' && binding.value.title != '') {
      sa.track('$pageview', {
        $title: binding.value.title,
        $url: location.href,
        $url_path: location.pathname,
        $referrer_host: location.hostname,
        $referrer: document.referrer
      })
    }

    // el.addEventListener('click', () => {
    // //监听自定义指令的元素是否点击，执行请求
    // console.log('======== click ========');
    // console.log(el);
    // console.log(binding);
    // })
  }
})

// 图片延迟加载
// Vue.use(VueLazyload, {
//     loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGOAQMAAACDrcdkAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURf///6fEG8gAAAArSURBVHja7cEBDQAAAMKg909tDjegAAAAAAAAAAAAAAAAAAAAAAAAAODJAE9KAAFdnSTbAAAAAElFTkSuQmCC'
//     // loading: require('common/images/logo.png')
// });
// Vue.use(LazyRender)

Vue.use(VueLazyload, {
  // loading: require('common/images/default2.png')
})
Vue.use(ElementUI);
Vue.use(VueScroller);
Vue.use(VueClipboard);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

// 解决移动端点击500ms延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

// 动态设置页面标题
Vue.directive('title', {
  inserted: (el, binding) => {
    console.log(el)
    console.log(el.dataset)
    document.title = el.dataset.title;
    // console.log(el.dataset.title)
  }
})

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  next()
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
