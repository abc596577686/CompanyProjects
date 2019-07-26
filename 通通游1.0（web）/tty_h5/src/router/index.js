import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

VueRouter.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        //return savedPosition
    } else {
        savedPosition = {}
            // new navigation.
            // scroll to anchor by returning the selector
        if (to.hash) {
            savedPosition.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            savedPosition.x = 0
            savedPosition.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        //return position
    }
    //console.log(savedPosition);
    if (savedPosition && savedPosition.y > 0) {
        //console.log(savedPosition.y);
        setTimeout(() => {
            window.scrollTo(0, savedPosition.y)
        }, 400);
    }
}

export default new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: resolve => require(['components/pageTransition/pageTransition'], resolve),
      children: [
        {
          name: '错误',
          path: '/error',
          component: resolve => require(['components/error/error'], resolve)
        },
        {
          name: '登录',
          path: '/login',
          component: resolve => require(['components/login/login'], resolve)
        },
        {
          name: '注册',
          path: '/register',
          component: resolve => require(['components/register/register'], resolve)
        },
        {
          name: '首页',
          path: '/index',
          component: resolve => require(['components/home/home'], resolve)
        },
        {
          name: '搜素页',
          path: '/search',
          component: resolve => require(['components/search/search'], resolve)
        },
        {
          name: '搜素结果页',
          path: '/searchResult',
          component: resolve => require(['components/searchResult/searchResult'], resolve)
        },
        {
          name: '',
          path: '/destination',
          component: resolve => require(['components/destination/destination'], resolve)
        },
        {
          name: '产品列表',
          path: '/productList',
          component: resolve => require(['components/productList/productList'], resolve)
        },
        {
          name: '产品详情',
          path: '/productDetails',
          component: resolve => require(['components/productDetails/productDetails'], resolve)
        },
        {
          name: '产品不存在',
          path: '/productNull',
          component: resolve => require(['components/productNull/productNull'], resolve)
        },
        {
          name: '出行信息选择',
          path: '/selectDate',
          component: resolve => require(['components/selectDate/selectDate'], resolve)
        },
        {
          name: '预订须知',
          path: '/bookInfo',
          component: resolve => require(['components/bookInfo/bookInfo'], resolve)
        },
        {
          name: '取消政策',
          path: '/cancelPolicy',
          component: resolve => require(['components/cancelPolicy/cancelPolicy'], resolve)
        },
        {
          name: '编辑预订信息',
          path: '/editBookInfo',
          component: resolve => require(['components/editBookInfo/editBookInfo'], resolve)
        },
        {
          name: '游客信息',
          path: '/visitorList',
          component: resolve => require(['components/visitorList/visitorList'], resolve)
        },
        {
          name: '出行信息编辑',
          path: '/editVisitorInfo/:id',
          component: resolve => require(['components/editVisitorInfo/editVisitorInfo'], resolve)
        },
        {
          name: '支付订单',
          path: '/payOrder',
          component: resolve => require(['components/payOrder/payOrder'], resolve)
        },
        {
          name: '客服',
          path: '/custom',
          component: resolve => require(['components/custom/custom'], resolve)
        },
        {
          name: '用户中心',
          path: '/userCenter',
          component: resolve => require(['components/userCenter/userCenter'], resolve)
        },
        {
          name: '订单列表',
          path: '/orderList',
          component: resolve => require(['components/orderList/orderList'], resolve)
        },
        {
          name: '订单详情',
          path: '/orderDetail',
          component: resolve => require(['components/orderDetail/orderDetail'], resolve)
        },
        {
          name: '退款原因',
          path: '/refundReasons',
          component: resolve => require(['components/refundReasons/refundReasons'], resolve)
        },
        {
          name: '退款进度',
          path: '/refundProgress',
          component: resolve => require(['components/refundProgress/refundProgress'], resolve)
        },
        {
          name: '支付状态',
          path: '/payStatus',
          component: resolve => require(['components/payStatus/payStatus'], resolve)
        },
        {
          name: '申请发票',
          path: '/invoice',
          component: resolve => require(['components/invoice/invoice'], resolve)
        },
        {
          name: '分销员广告',
          path: '/distAdvert',
          component: resolve => require(['components/distAdvert/distAdvert'], resolve)
        },
        {
          name: '申请分销员',
          path: '/distApply',
          component: resolve => require(['components/distApply/distApply'], resolve)
        },
        {
          name: '申请成功',
          path: '/applySuccess',
          component: resolve => require(['components/applySuccess/applySuccess'], resolve)
        },
        {
          name: '退款主控',
          path: '/refund',
          component: resolve => require(['components/refund/refund'], resolve)
        },
        {
          name: '退款申请成功',
          path: '/refundprogress',
          component: resolve => require(['components/refundProgress/refundProgress'], resolve)
        },
        {
          name: '补充资料',
          path: '/goinfo',
          component: resolve => require(['components/goinfo/goinfo'], resolve)
        },
        {
          name: '下载文档',
          path: '/downloadDoc',
          component: resolve => require(['components/downloadDoc/downloadDoc'], resolve)
        },
        // 补充资料时候填写预定信息
        {
          name: '填写出行人信息',
          path: '/travellist',
          component: resolve => require(['components/travellist/travellist'], resolve)
        },
        {
          name: '支付后编辑出行人信息',
          path: '/editinfo',
          component: resolve => require(['components/editinfo/editinfo'], resolve)
        },
        // 支付完成页填写预定信息
        {
          name: '支付完成页出行人信息',
          path: '/payreadyinfo',
          component: resolve => require(['components/payreadyinfo/payreadyinfo'], resolve)
        },
        {
          name: '支付完成页编辑出行人信息',
          path: '/editpayreadyinfo',
          component: resolve => require(['components/editpayreadyinfo/editpayreadyinfo'], resolve)
        }
      ]
    }
  ]
})
