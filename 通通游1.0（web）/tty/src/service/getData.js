import { baseUrl } from '../config/env'
import { getJSON } from '../config/mUtils'
// import * as city from './tempdata/city'

/**
 * 创建临时数据
 */
const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
};
/**
 * 获取首页数据
 */
// 第一个分销商id 暂定jkd 第二个运营商id 暂定tty
var homeDatas = (distId,platId) => getJSON('POST', 'html5/product/market.msp', {
    distId: distId,
    platId: platId,
});


/**
 * 获取内页数据
 */
var pageView = (ob) => getJSON('POST', 'wap/pageView.msp', ob);
/**
 * 商品分组
 */
var groupView = (ob) => getJSON('POST', 'wap/groupView.msp', ob);
/**
 * 获取商品列表
 */
var goodsLists = (ob) => getJSON('GET', 'productPageList', ob);
/**
 * 获取商品一级分类
 */
var getCategoryList = (ob) => getJSON('GET', 'productCategoryList', ob);
/**
 * 获取购物车列表
 */
var cartLists = (ob) => getJSON('GET', 'cartList', ob);
/**
 * 添加购物车或者修改购物车商品数量
 */
var addNumCart = (ob) => getJSON('POST', 'wap/addNumCart.msp', ob);
/**
 * 删除购物车
 */
var deleteCart = (ob) => getJSON('POST', 'api/cart/deleteCart.msp', ob);
/**
 * 购物车结算校验
 */
var cartCheck = (ob) => getJSON('POST', 'api/order/checkCart.msp', ob);
/**
 * 购物车结算 立即购买
 */
var orderCheckDetail = (ob) => getJSON('GET', 'orderCheckDetail', ob);
/**
 * 我的地址列表
 */
var addressList = (ob) => getJSON('GET', 'addressList', ob);
/**
 * 保存地址
 */
var saveAddress = (ob) => getJSON('POST', 'api/address/saveAddress.msp', ob);
/**
 * 删除地址
 */
var deleteAddress = (ob) => getJSON('POST', 'api/address/deleteAddress.msp', ob);



/**
 * 我的订单
 */
var orderkey = (distId,page,rows,userId,orderStatus) => getJSON('POST', '/html5/order/list.msp', {
    distId: distId,
    page: page,
    rows: rows,
    userId: userId,
    orderStatus: orderStatus
});

/**
 * 卖家订单列表
 */
var orderSellersList = (ob) => getJSON('GET', 'orderList', ob);
/**
 * 订单详情
 */
var orderDetail = (ob) => getJSON('GET', 'orderDetail', ob);
/**
 * 删除订单
 */
var deleteOrder = (ob) => getJSON('POST', 'api/order/deleteOrder.msp', ob);
/**
 * 取消订单
 */
var cancelOrder = (ob) => getJSON('POST', 'api/order/cancelOrder.msp', ob);
/**
 * 确认收货
 */
var queryTake = (ob) => getJSON('POST', 'wap/queryTake.msp', ob);
/**
 * 商品详情
 */
// var productDetail = (ob) => getJSON('GET', 'productDetail', ob);
var productDetail = (distId,platId,productId) => getJSON('POST', 'html5/product/productDetail.msp', {
    distId: distId,
    platId: platId,
    productId: productId,
});
/**
 * 获取用户信息
 */
var userInfo = (ob) => getJSON('GET', 'userInfo', ob);
/**
 * 计算运费
 */
var getPostage = (ob) => getJSON('POST', 'api/product/getPostage.msp', ob);
/**
 * 确认订单
 */
var orderConfrim = (ob) => getJSON('POST', 'api/order/orderConfrim.msp', ob);
/**
 * 确认购买 /立即购买
 */
var checkBuy = (ob) => getJSON('POST', 'wap/checkBuy.msp', ob);
/**
 * 支付接口
 */
var orderPay = (ob) => getJSON('POST', 'api/pay/orderPay.msp', ob);
/**
 * 查看物流
 */
var orderPackageList = (ob) => getJSON('GET', 'orderPackageList', ob);
/**
 * 商品分组
 */
var productByGroupId = (ob) => getJSON('GET', 'productByGroupId', ob);
/**
 * 获取微信签名信息
 */
var getToken = (ob) => getJSON('POST', 'wap/weixin/getToken.msp', ob);
/**
 * 商品分享
 */
var shareProduct = (ob) => getJSON('POST', 'api/product/shareProduct.msp', ob);
/**
 * 更新支付信息
 */
//var updateOrderPayRecode = (ob) => getJSON('POST', 'api/pay/updateOrderPayRecode.msp', ob);

/**
 * 获取城市列表
 */
//var getCityList = () => setpromise(city.city);
var getCityList = () => getJSON('GET', 'regionList', {});

export {
    homeDatas,
    pageView,
    groupView,
    getCityList,
    getCategoryList,
    goodsLists,
    cartLists,
    addNumCart,
    deleteCart,
    cartCheck,
    orderCheckDetail,
    checkBuy,
    addressList,
    saveAddress,
    deleteAddress,
    orderkey,
    // alllist,
    orderSellersList,
    orderDetail,
    deleteOrder,
    cancelOrder,
    queryTake,
    productDetail,
    userInfo,
    getPostage,
    orderConfrim,
    orderPay,
    orderPackageList,
    productByGroupId,
    getToken,
    shareProduct
}