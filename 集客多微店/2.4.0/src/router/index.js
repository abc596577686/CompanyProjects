import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const rootPath = '/shop';

export default new VueRouter({
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  routes: [
    {
      path: rootPath + '/',
      redirect: rootPath + '/index'
    },
    // {
    //   path: rootPath + '/index',  // home
    //   name: 'home',
    //   component: resolve => require(['components/home/home'], resolve)
    // },
    // {
    // 	path: rootPath + '/index/theme',  // 专题详情
    //   name: 'theme',
    //   component: resolve => require(['components/home/children/theme/theme'], resolve)
    // },
    // {
    //   path: rootPath + '/index/insidePage', //内页
    //   name: 'insidePage',
    //   component: resolve => require(['components/home/children/insidePage/insidePage'], resolve)
    // },
    // {
    //   path: rootPath + '/index/bigGif',  //大礼包
    //   name: 'bigGif',
    //   component: resolve => require(['components/home/children/bigGif/bigGif'], resolve)
    // },
    {
      path: rootPath + '/productDetail',  //商品详情
      name: 'productDetail',
      component: resolve => require(['components/home/children/productDetail/productDetail'], resolve)
    },
    {
      path: rootPath + '/groupProduct',  //商品组合
      name: 'groupProduct',
      component: resolve => require(['components/home/children/productDetail/groupProduct/groupProduct'], resolve)
    },
    // {
    //   path: rootPath + '/invitationDetail',  //邀请详情
    //   name: 'invitationDetail',
    //   component: resolve => require(['components/home/children/invitationDetail/invitationDetail'], resolve)
    // },
    // {
    //   path: rootPath + '/invitation',  //邀请详情
    //   name: 'invitationDetail',
    //   component: resolve => require(['components/home/children/invitationDetail/invitationDetail'], resolve)
    // },
    {
      path: rootPath + '/type',  //分类
      name: 'type',
      component: resolve => require(['components/type/type'], resolve)
    },
    {
      path: rootPath + '/productSearch',  //搜索
      name: 'productSearch',
      component: resolve => require(['components/productSearch/productSearch'], resolve)
    },
    {
      path: rootPath + '/cart',  //分类
      name: 'cart',
      component: resolve => require(['components/cart/cart'], resolve)
    },
    {
      path: rootPath + '/profile',  //用户信息
      name: 'profile',
      component: resolve => require(['components/profile/profile'], resolve)
    },
    {
      path: rootPath + '/order',  //订单列表
      name: 'order',
      component: resolve => require(['components/order/order'], resolve)
    },
    {
      path: rootPath + '/order/logistics',  //物流信息
      name: 'logistics',
      component: resolve => require(['components/order/children/logistics/logistics'], resolve)
    },
    {
      // path: rootPath + '/order/orderDetail',  //订单详情页
      path: rootPath + '/orderDetail',  //订单详情页
      name: 'orderDetail',
      component: resolve => require(['components/order/children/orderDetail/orderDetail'], resolve)
    },
    {
      path: rootPath + '/confirmOrder',  //确认订单页
      name: 'confirmOrder',
      component: resolve => require(['components/confirmOrder/confirmOrder'], resolve)
    },
    {
      path: rootPath + '/chooseAddress',  //选择地址
      name: 'chooseAddress',
      component: resolve => require(['components/confirmOrder/children/chooseAddress/chooseAddress'], resolve)
    },
    {
      path: rootPath + '/addAddress',  //添加地址
      name: 'addAddress',
      component: resolve => require(['components/confirmOrder/children/children/addAddress/addAddress'], resolve)
    },
    {
      path: rootPath + '/refund',  //售后服务
      name: 'refund',
      component: resolve => require(['components/refund/refund'], resolve)
    },
    {
      path: rootPath + '/paySuccess',  //支付成功
      name: 'paySuccess',
      component: resolve => require(['components/paySuccess/paySuccess'], resolve)
    },
    // {
    //   path: rootPath + '/dealers',  //开通经销商
    //   name: 'dealers',
    //   component: resolve => require(['components/dealers/dealers'], resolve)
    // },
    // {
    //   path: rootPath + '/paydealers',  //经销商支付
    //   name: 'paydealers',
    //   component: resolve => require(['components/dealers/children/paydealers'], resolve)
    // },
    // {
    //   path: rootPath + '/success',  //开通经销商支付成功
    //   name: 'success',
    //   component: resolve => require(['components/dealers/children/success'], resolve)
    // },
    {
      path: rootPath + '/productGroup',  //商品分组
      name: 'productGroup',
      component: resolve => require(['components/home/children/productGroup/productGroup'], resolve)
    },
    {
      path: rootPath + '/coupon',  //优惠券
      name: 'coupon',
      component: resolve => require(['components/coupon/coupon'], resolve)
    },
    {
      path: rootPath + '/applyrefund',  //申请退款
      name: 'applyrefund',
      component: resolve => require(['components/order/children/refund/applyrefund'], resolve)
    },
    {
      path: rootPath + '/refundDetail',  //退款退货详情
      name: 'refundDetail',
      component: resolve => require(['components/order/children/refund/refundDetail'], resolve)
    },
    {
      path: rootPath + '/applyAcess',  //申请提交成功页面
      name: 'applyAcess',
      component: resolve => require(['components/order/children/refund/applyAcess'], resolve)
    },
    {
      path: rootPath + '/writelogistics',  //填写物流页面
      name: 'writelogistics',
      component: resolve => require(['components/order/children/refund/writelogistics'], resolve)
    },
    {
      path: rootPath + '/showCoupon',  //优惠券展示页
      name: 'showCoupon',
      component: resolve => require(['components/coupon/showCoupon'], resolve)
    },
    {
      path: rootPath + '/bankCardList',  //银行卡管理
      name: 'bankCardList',
      component: resolve => require(['components/bankCardList/bankCardList'], resolve)
    },
    {
      path: rootPath + '/bindBankCard',  //银行卡绑定
      name: 'bindBankCard',
      component: resolve => require(['components/bindBankCard/bindBankCard'], resolve)
    },
    {
      path: rootPath + '/yytOrderDetail',  //mfb订单确认页
      name: 'yytOrderDetail',
      component: resolve => require(['components/yytPayType/yytOrderDetail'], resolve)
    },
    {
      path: rootPath + '/yytPay',  //mfb订单付款页
      name: 'yytPay',
      component: resolve => require(['components/yytPayType/yytPay'], resolve)
    },
    {
      path: rootPath + '/refundList',  //售后退款订单
      name: 'refundList',
      component: resolve => require(['components/order/refundList'], resolve)
    },
    // {
    //   path: rootPath + '/evaluate',  //评价晒单
    //   name: 'evaluate',
    //   component: resolve => require(['components/evaluate/evaluate'], resolve)
    // },
    // {
    //   path: rootPath + '/evaluateSuccess',  //评价成功
    //   name: 'evaluateSuccess',
    //   component: resolve => require(['components/evaluate/evaluateSuccess'], resolve)
    // },
    // {
    //   path: rootPath + '/evaluateShare',  //评价分享
    //   name: 'evaluateShare',
    //   component: resolve => require(['components/evaluate/wap/evaluateShare'], resolve)
    // },
    // {
    //   path: rootPath + '/evaluateIntroduce',  //晒单有礼分享介绍
    //   name: 'evaluateIntroduce',
    //   component: resolve => require(['components/evaluate/evaluateIntroduce'], resolve)
    // },
    {
      path: rootPath + '/allevaluate',  //详情页小伙伴说
      name: 'allevaluate',
      component: resolve => require(['components/home/children/productDetail/allevaluate'], resolve)
    }
  ]
})

