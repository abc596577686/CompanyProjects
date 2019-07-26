import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            name: '登录',
            path: '/login',
            component: resolve => require(['components/login'], resolve)
        },
        {
            path: '/',
            component: resolve => require(['components/login'], resolve)
        },
        {
            path: '/home',
            component: resolve => require(['components/home'], resolve),
            children: [
                {
                  name: '首页',
                  path: '/homePage',
                  component: resolve => require(['components/homePage/homePage'], resolve)
                },
                {
                  name: '店铺信息',
                  path: '/storeInfo',
                  component: resolve => require(['components/storeInfo/storeInfo'], resolve)
                },
                {
                  name: '店铺商品',
                  path: '/shopGood',
                  component: resolve => require(['components/shopGood/shopGood'], resolve)
                },
                {
                  name: '商品详情',
                  path: '/goodDetails/:id',
                  component: resolve => require(['components/goodDetails/goodDetails'], resolve)
                },
                {
                  name: '订单列表',
                  path: '/orderList',
                  component: resolve => require(['components/orderList/orderList'], resolve)
                },
                {
                  name: '订单详情',
                  path: '/orderDetails/:id',
                  component: resolve => require(['components/orderDetails/orderDetails'], resolve)
                },
                {
                  name: '产品市场',
                  path: '/goodsMarket',
                  component: resolve => require(['components/goodsMarket/goodsMarket'], resolve)
                },
                {
                  name: '我的收入',
                  path: '/myIncome',
                  component: resolve => require(['components/myIncome/myIncome'], resolve)
                },
                {
                  name: '我的银行卡',
                  path: '/myBankCard',
                  component: resolve => require(['components/myBankCard/myBankCard'], resolve)
                },
                {
                  name: '短信验证',
                  path: '/msgValidate',
                  component: resolve => require(['components/msgValidate/msgValidate'], resolve)
                },
                {
                  name: '提现',
                  path: '/withDrawal',
                  component: resolve => require(['components/withDrawal/withDrawal'], resolve)
                },
                {
                  name: '分销员管理',
                  path: '/distributorManage',
                  component: resolve => require(['components/distributorManage/distributorManage'], resolve)
                },
                {
                  name: '佣金配置',
                  path: '/commissionConfigure',
                  component: resolve => require(['components/commissionConfigure/commissionConfigure'], resolve)
                },
                {
                  name: '收益通知',
                  path: '/message',
                  component: resolve => require(['components/message/message'], resolve)
                }
            ]
        }
    ]
})