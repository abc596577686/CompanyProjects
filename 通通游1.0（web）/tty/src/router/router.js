import App from '../App'
import { rootPath } from 'src/config/env'
// 主页
const index = r => require.ensure([], () => r(require('../page/ttyindex/index')), 'index')
// 注册
const register = r => require.ensure([], () => r(require('../page/ttyregister/register')), 'register')
// 手机号/账号/第三方登录
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
// 个人中心
const personal = r => require.ensure([], () => r(require('../page/personal/personal')), 'personal')
// 目的地展示页(待调试)
const destination = r => require.ensure([], () => r(require('../page/destination/destination')), 'destination')
// 待付款
const waitpay = r => require.ensure([], () => r(require('../page/personal/waitpay/waitpay')), 'waitpay')
// 已取消
const cancelpay = r => require.ensure([], () => r(require('../page/personal/cancelpay/cancelpay')), 'cancelpay')
// 已付款
const readypay = r => require.ensure([], () => r(require('../page/personal/readypay/readypay')), 'readypay')

// 通知文档
// 出团通知
const chutuan = r => require.ensure([], () => r(require('../page/personal/txtlist/chutuan')), 'chutuan')
// 电子合同
const dianzi = r => require.ensure([], () => r(require('../page/personal/txtlist/dianzi')), 'dianzi')
// 约签通知
const yueqian = r => require.ensure([], () => r(require('../page/personal/txtlist/yueqian')), 'yueqian')

// 退款
// 退款主控
const refund = r => require.ensure([], () => r(require('../page/personal/refund/refund')), 'refund')
// 退款信息
const refundinfo = r => require.ensure([], () => r(require('../page/personal/refund/refundinfo')), 'refundinfo')
// 散件
// 商品信息
const proinfo = r => require.ensure([], () => r(require('../page/personal/proinfo/proinfo')), 'proinfo')
// 产品具体信息
const promain = r => require.ensure([], () => r(require('../page/personal/promain/promain')), 'promain')
// 联系人信息
const contacts = r => require.ensure([], () => r(require('../page/personal/contacts/contacts')), 'contacts')
// 出行人信息
const goinfo = r => require.ensure([], () => r(require('../page/personal/goinfo/goinfo')), 'goinfo')
// 备注
const remark = r => require.ensure([], () => r(require('../page/personal/remark/remark')), 'remark')
// 总金额
const allpay = r => require.ensure([], () => r(require('../page/personal/allpay/allpay')), 'allpay')
// 待申请退款
const waitcall = r => require.ensure([], () => r(require('../page/personal/refund/waitcall')), 'waitcall')
// 个人中心 所有订单
const alllist = r => require.ensure([], () => r(require('../page/personal/alllist/alllist')), 'alllist')

// 主页


// 日期选择页
const selectDate = r => require.ensure([], () => r(require('../page/selectDate/selectDate')), 'selectDate')
// 日期选择页
const dateclick = r => require.ensure([], () => r(require('../page/indexpage/dateclick/dateclick')), 'dateclick')
// 游客信息（身份证）
const travel = r => require.ensure([], () => r(require('../page/indexpage/travel/travel')), 'travel')
// 出行人信息（主控）
const travela = r => require.ensure([], () => r(require('../page/indexpage/travel/travela')), 'travela')
// 发票（主控）
const invoice = r => require.ensure([], () => r(require('../page/indexpage/invoice/invoice')), 'invoice')
// 填写预定信息
const reserve = r => require.ensure([], () => r(require('../page/indexpage/reserve/reserve')), 'reserve')
// 支付订单
const paylist = r => require.ensure([], () => r(require('../page/indexpage/pay/paylist')), 'paylist')
// 支付订单（带出行人信息）
const paylistmore = r => require.ensure([], () => r(require('../page/indexpage/pay/paylistmore')), 'paylistmore')
// 支付成功
const paysuccess = r => require.ensure([], () => r(require('../page/indexpage/pay/paysuccess')), 'paysuccess')
// 申请代理
const applyagency = r => require.ensure([], () => r(require('../page/indexpage/applyagency/applyagency')), 'applyagency')
// 申请代理成功
const applysuccess = r => require.ensure([], () => r(require('../page/indexpage/applyagency/applysuccess')), 'applysuccess')
// 搜索
const search = r => require.ensure([], () => r(require('../page/indexpage/search/search')), 'search')
// 目的地图文
const place = r => require.ensure([], () => r(require('../page/indexpage/place/place')), 'place')
// 商品详情页
const productDetail = r => require.ensure([], () => r(require('../page/productDetail/productDetail')), 'productDetail')

// 预订信息
const reservationInfo = r => require.ensure([], () => r(require('../page/reservationInfo/reservationInfo')), 'reservationInfo')
// 客服接入
const customer = r => require.ensure([], () => r(require('../page/customer/customer')), 'customer')

// 失效界面
const losepage = r => require.ensure([], () => r(require('../page/losepage/losepage')), 'losepage')
// 暂无相关数据
const errorload = r => require.ensure([], () => r(require('../page/errorload/errorload')), 'errorload')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转主页
        {
            path: rootPath + '/',
            redirect: rootPath + '/index'
        },
        // 主页
        {
            path: rootPath + '/index',
            component: index
        },
        //注册
        {
            path: rootPath + '/register',
            component: register
        },
        //手机号/账号/第三方登录
        {
            path: rootPath + '/login',
            component: login
        },
        //个人中心
        {
            path: rootPath + '/personal',
            component: personal
        },
        //待付款
        {
            path: rootPath + '/waitpay',
            component: waitpay
        },
        //已付款
        {
            path: rootPath + '/readypay',
            component: readypay
        },
        // 已取消
        {
            path: rootPath + '/cancelpay',
            component: cancelpay
        },
        // 目的地展示
        {
            path: rootPath + '/destination',
            component: destination
        },
        // 通知文档
        // 出团通知
        {
            path: rootPath + '/chutuan',
            component: chutuan
        },
        // 电子合同
        {
            path: rootPath + '/dianzi',
            component: dianzi
        },
        // 约签通知
        {
            path: rootPath + '/yueqian',
            component: yueqian
        },
        // 退款
        {
            path: rootPath + '/refund',
            component: refund
        },
        // 退款信息
        {
            path: rootPath + '/refundinfo',
            component: refundinfo
        },
        // 待申请退款
        {
            path: rootPath + '/waitcall',
            component: waitcall
        },
        // 商品信息
        {
            path: rootPath + '/proinfo',
            component: proinfo
        },
        // 产品具体信息
        {
            path: rootPath + '/promain',
            component: promain
        },
        // 产品具体信息
        {
            path: rootPath + '/contacts',
            component: contacts
        },
        // 出行人信息
        {
            path: rootPath + '/goinfo',
            component: goinfo
        },
        // 备注
        {
            path: rootPath + '/remark',
            component: remark
        },
        // 总金额
        {
            path: rootPath + '/allpay',
            component: allpay
        },
        // 所有订单
        {
            path: rootPath + '/alllist',
            component: alllist
        },

        // 主页
        // 游客信息
        {
            path: rootPath + '/travel',
            component: travel
        },
        // 出行人信息
        {
            path: rootPath + '/travela',
            component: travela
        },
        // 发票
        {
            path: rootPath + '/invoice',
            component: invoice
        },
        // 日期选择页面
        {
            path: rootPath + '/dateclick',
            component: dateclick
        },
        // 填写预定信息
        {
            path: rootPath + '/reserve',
            component: reserve
        },
        // 支付订单
        {
            path: rootPath + '/paylist',
            component: paylist
        },
        // 支付订单（带出行人信息）
        {
            path: rootPath + '/paylistmore',
            component: paylistmore
        },
        // 支付成功
        {
            path: rootPath + '/paysuccess',
            component: paysuccess
        },
        // 申请代理
        {
            path: rootPath + '/applyagency',
            component: applyagency
        },
        // 申请代理成功
        {
            path: rootPath + '/applysuccess',
            component: applysuccess
        },
        // 顶部搜索块
        {
            path: rootPath + '/search',
            component: search
        },
        // 目的地图文展示
        {
            path: rootPath + '/place',
            component: place
        },
        // 商品详情页
        {
            path: rootPath + '/productDetail',
            component: productDetail
        },
        // 日期选择
        {
            path: '/selectDate',
            component: resolve => require(['page/selectDate/selectDate'], resolve)
        },
        {
            path: '/reservationInfo',
            component: resolve => require(['page/reservationInfo/reservationInfo'], resolve)
        },
        {
            path: '/locationclick',
            component: resolve => require(['page/indexpage/locationclick/locationclick'], resolve)
        },


        // 失效界面
        {
            path: rootPath + '/losepage',
            component: losepage
        },
        // 暂无相关数据
        {
            path: rootPath + '/errorload',
            component: errorload
        },
        // 客服接入
        {
            path: rootPath + '/customer',
            component: customer
        },




























        
        // //商品分组
        // {
        //     path: rootPath + '/productGroup',
        //     component: productGroup
        // },
        // //搜索页
        // {
        //     path: rootPath + '/search',
        //     component: search
        // },
        // //分类页
        // {
        //     path: rootPath + '/type',
        //     component: type
        // },
        // //商品搜索
        // {
        //     path: rootPath + '/productSearch',
        //     component: productSearch
        // },
        // //购物车
        // {
        //     path: rootPath + '/cart',
        //     component: cart
        // },
        // //个人信息页
        // {
        //     path: rootPath + '/profile',
        //     component: profile
        // },

        // //商品详情
        // {
        //     path: rootPath + '/productDetail',
        //     component: productDetail
        // },
        // //订单列表页
        // {
        //     path: rootPath + '/order',
        //     component: order,
        // },
        // //物流信息
        // {
        //     path: rootPath + '/logistics',
        //     component: logistics

        // },
        // //订单详情页
        // {
        //     path: rootPath + '/orderDetail',
        //     component: orderDetail,
        // },


        // //确认订单页
        // {
        //     path: rootPath + '/confirmOrder',
        //     component: confirmOrder
        // },
        // //选择地址
        // {
        //     path: rootPath + '/chooseAddress',
        //     component: chooseAddress
        // },
        // //添加地址
        // {
        //     path: rootPath + '/addAddress',
        //     component: addAddress
        // },
        // //售后
        // {
        //     path: rootPath + '/service',
        //     component: service
        // },
        // //支付成功
        // {
        //     path: rootPath + '/paySuccess',
        //     component: paySuccess
        // }
    ]
}]