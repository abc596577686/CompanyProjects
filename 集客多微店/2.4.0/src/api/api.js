import axios from 'axios'
import { baseApiUrl } from 'config/env'

let util = {};
util.ajax = axios.create({
    timeout: 60000
});

// request interceptor
util.ajax.interceptors.request.use(config => {
  if (localStorage.shareUserSecret && localStorage.shareUserSecret!='empty') {
    let headerKey = JSON.parse(localStorage.shareUserSecret)
    config.headers['X-SHARE-USER'] = headerKey
  }
  return config
}, error => {
  console.log(error) // for debug
});



// respone interceptor
// util.ajax.interceptors.response.use(response => {
//   console.log(response)
//     if(response.status == 200 && response.headers['x-store-id']){
//         sessionStorage.X_STORE_ID = response.headers['x-store-id']
//     }
//     return response;
// }, error => {
//     console.log(error)
// })

//首页导航
// export const getNavList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getNavList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//模版数据
// export const getChannelDetail = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getChannelDetail = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 内页详情 
export const getInsidePageDetail = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
// export const getInsidePageDetail = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 主题详情 
// export const getThemeDetails = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getThemeDetails = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 获取城市列表 
// export const getCityList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getCityList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 获取省市区
// export const getRegionList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getRegionList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//商品详情 
export const productDetail = (params, config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//组合商品
// export const getAssemblyProduct = params => { return axios.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getAssemblyProduct = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//添加购物车或者修改购物车商品数量
// export const addNumCart = params => { return util.ajax.post(`${baseApiUrl}cart/addNumCart.msp`, params).then(res => res.data) }
export const addNumCart = (params,config) => { return util.ajax.post(`${baseApiUrl}cart/addNumCart.msp`, params, config).then(res => res.data) }

//购物车结算 立即购买
// export const orderCheckDetail = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const orderCheckDetail = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//确认购买 /立即购买
// export const checkBuy = params => { return util.ajax.post(`${baseApiUrl}order/checkBuy.msp`, params).then(res => res.data) }
export const checkBuy = (params,config) => { return util.ajax.post(`${baseApiUrl}order/checkBuy.msp`, params, config).then(res => res.data) }

//计算运费
// export const getPostage = params => { return util.ajax.post(`${baseApiUrl}product/getPostage.msp`, params).then(res => res.data) }
export const getPostage = (params,config) => { return util.ajax.post(`${baseApiUrl}product/getPostage.msp`, params, config).then(res => res.data) }

//商品分享
// export const shareProduct = params => { return util.ajax.post(`${baseApiUrl}api/product/shareProduct.msp`, params).then(res => res.data) }
export const shareProduct = (params, config) => { return util.ajax.post(`${baseApiUrl}api/product/shareProduct.msp`, params, config).then(res => res.data) }

//获取微信签名
// export const getToken = params => { return util.ajax.post(`${baseApiUrl}weixin/getToken.msp`, params).then(res => res.data) }
export const getToken = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//获取商品分类
// export const getCategoryList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getCategoryList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//商品分类（店主推荐
// export const getProductCollectionList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getProductCollectionList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//获取商品列表
// export const goodsLists = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const goodsLists = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//获取主题详细数据
// export const getProxyProductList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getProxyProductList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//获取购物车地址
// export const cartLists = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const cartLists = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//删除购物车
// export const deleteCart = params => { return util.ajax.post(`${baseApiUrl}cart/deleteCart.msp`, params).then(res => res.data) }
export const deleteCart = (params,config) => { return util.ajax.post(`${baseApiUrl}cart/deleteCart.msp`, params, config).then(res => res.data) }

//购物车结算校验
// export const checkCart = params => { return util.ajax.post(`${baseApiUrl}order/checkCart.msp`, params).then(res => res.data) }
export const checkCart = (params,config) => { return util.ajax.post(`${baseApiUrl}order/checkCart.msp`, params, config).then(res => res.data) }

//获取用户信息
// export const userInfo = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const userInfo = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//订单列表
// export const orderList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const orderList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//取消订单 
// export const cancelOrder = params => { return util.ajax.post(`${baseApiUrl}order/cancelOrder.msp`, params).then(res => res.data) }
export const cancelOrder = (params,config) => { return util.ajax.post(`${baseApiUrl}order/cancelOrder.msp`, params, config).then(res => res.data) }

//确认收货 
// export const queryTake = params => { return util.ajax.post(`${baseApiUrl}order/queryTake.msp`, params).then(res => res.data) }
export const queryTake = (params,config) => { return util.ajax.post(`${baseApiUrl}order/queryTake.msp`, params, config).then(res => res.data) }

//删除订单 
// export const deleteOrder = params => { return util.ajax.post(`${baseApiUrl}order/deleteOrder.msp`, params).then(res => res.data) }
export const deleteOrder = (params,config) => { return util.ajax.post(`${baseApiUrl}order/deleteOrder.msp`, params, config).then(res => res.data) }

//支付接口 
// export const orderPay = params => { return util.ajax.post(`${baseApiUrl}pay/orderPay.msp`, params).then(res => res.data) }
export const orderPay = (params,config) => { return util.ajax.post(`${baseApiUrl}pay/orderPay.msp`, params, config).then(res => res.data) }

//查看物流 
// export const orderPackageList = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/orderPackageList`, params).then(res => res.data) }
export const orderPackageList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/orderPackageList`, params, config).then(res => res.data) }

//订单详情 
// export const orderDetail = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const orderDetail = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//确认订单 
// export const orderConfrim = params => { return util.ajax.post(`${baseApiUrl}order/orderConfrim.msp`, params).then(res => res.data) }
export const orderConfrim = (params,config) => { return util.ajax.post(`${baseApiUrl}order/orderConfrim.msp`, params, config).then(res => res.data) }

//更新支付信息 
// export const updateOrderPayRecode = params => { return util.ajax.post(`${baseApiUrl}api/pay/updateOrderPayRecode.msp`, params).then(res => res.data) }
export const updateOrderPayRecode = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//我的地址列表 
// export const addressList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const addressList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

//保存地址 
// export const saveAddress = params => { return util.ajax.post(`${baseApiUrl}address/saveAddress.msp`, params).then(res => res.data) }
export const saveAddress = (params,config) => { return util.ajax.post(`${baseApiUrl}address/saveAddress.msp`, params, config).then(res => res.data) }

//删除地址 
// export const deleteAddress = params => { return util.ajax.post(`${baseApiUrl}address/deleteAddress.msp`, params).then(res => res.data) }
export const deleteAddress = (params,config) => { return util.ajax.post(`${baseApiUrl}address/deleteAddress.msp`, params, config).then(res => res.data) }

//商品分组 
// export const productByGroupId = params => { return util.ajax.post(`${baseApiUrl}productByGroupId`, params).then(res => res.data) }
export const productByGroupId = (params,config) => { return util.ajax.post(`${baseApiUrl}productByGroupId`, params, config).then(res => res.data) }

// 发送验证码
// export const sendCode = params => { return util.ajax.post(`${baseApiUrl}user/sendCode.msp`, params).then(res => res.data) }
export const sendCode = (params,config) => { return util.ajax.post(`${baseApiUrl}user/sendCode.msp`, params, config).then(res => res.data) }

// 验证注册
// export const userRegister = params => { return util.ajax.post(`${baseApiUrl}wap/userRegister.msp`, params).then(res => res.data) }
export const userRegister = (params,config) => { return util.ajax.post(`${baseApiUrl}wap/userRegister.msp`, params, config).then(res => res.data) }

// 开通经销商页面数据
// export const memberCenter = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const memberCenter = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 秒杀
// export const seckillList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const seckillList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 开通经销商支付
// export const inviteAgentConfrim = params => { return util.ajax.post(`${baseApiUrl}order/inviteAgentConfrim.msp`, params).then(res => res.data) }
export const inviteAgentConfrim = (params,config) => { return util.ajax.post(`${baseApiUrl}order/inviteAgentConfrim.msp`, params, config).then(res => res.data) }

// 秒杀提醒
// export const seckillNotice = params => { return util.ajax.post(`${baseApiUrl}notice/seckillNotice.msp`, params).then(res => res.data) }
export const seckillNotice = (params,config) => { return util.ajax.post(`${baseApiUrl}notice/seckillNotice.msp`, params, config).then(res => res.data) }

// 获取用户信息 
// export const getUserInfo = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getUserInfo = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 上传图片
// export const webUploadImage = params => { return util.ajax.post(`${baseApiUrl}user/webUploadImage.msp`,params).then(res => res.data) }
export const webUploadImage = (params,config) => { return util.ajax.post(`${baseApiUrl}user/webUploadImage.msp`, params, config).then(res => res.data) }

// 保存补充用户信息 
// export const updateAddress = params => { return util.ajax.post(`${baseApiUrl}address/updateAddress.msp`, params).then(res => res.data) }
export const updateAddress = (params,config) => { return util.ajax.post(`${baseApiUrl}address/updateAddress.msp`, params, config).then(res => res.data) }

// 优惠券
// export const getCouponList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getCouponList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 退款申请页信息
// export const refundReasonList = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/refundReasonList`, params).then(res => res.data) }
export const refundReasonList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/refundReasonList`, params, config).then(res => res.data) }

// 提交退款申请
// export const applyRefund = params => { return util.ajax.post(`${baseApiUrl}refund/applyRefund.msp`, params).then(res => res.data) }
export const applyRefund = (params,config) => { return util.ajax.post(`${baseApiUrl}refund/applyRefund.msp`, params, config).then(res => res.data) }

// 查看售后信息
// export const showRefund = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/refundDetail`, params).then(res => res.data) }
export const showRefund = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/refundDetail`, params, config).then(res => res.data) }

// 物流选择
// export const expressList = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/expressList`, params).then(res => res.data) }
export const expressList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/expressList`, params, config).then(res => res.data) }

// 保存物流信息
// export const saveExpressNumber = params => { return util.ajax.post(`${baseApiUrl}refund/saveExpressNumber.msp`, params).then(res => res.data) }
export const saveExpressNumber = (params,config) => { return util.ajax.post(`${baseApiUrl}refund/saveExpressNumber.msp`, params, config).then(res => res.data) }

// 优惠券列表
// export const couponList = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/couponList`, params).then(res => res.data) }
export const couponList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/couponList`, params, config).then(res => res.data) }

// 我的银行卡列表
// export const getMyBankCardList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getMyBankCardList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 银行卡列表
// export const getBankCardList = params => { return util.ajax.post(`${baseApiUrl}index.json`, params).then(res => res.data) }
export const getBankCardList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json`, params, config).then(res => res.data) }

// 获取验证码
// export const getCode = params => { return util.ajax.post(`${baseApiUrl}quickPay/quickSendSms.msp`, params).then(res => res.data) }
export const getCode = (params,config) => { return util.ajax.post(`${baseApiUrl}quickPay/quickSendSms.msp`, params, config).then(res => res.data) }

// 绑定银行卡
// export const bindBankCard = params => { return util.ajax.post(`${baseApiUrl}quickPay/quickPaySign.msp`, params).then(res => res.data) }
export const bindBankCard = (params,config) => { return util.ajax.post(`${baseApiUrl}quickPay/quickPaySign.msp`, params, config).then(res => res.data) }

// export const userQuickCardList = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/userQuickCardList`, params).then(res => res.data) }
export const userQuickCardList = (params, config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/userQuickCardList`, params, config).then(res => res.data) }

// quickPay
// export const quickSendSms = params => { return util.ajax.post(`${baseApiUrl}quickPay/quickSendSms.msp`, params).then(res => res.data) }
export const quickSendSms = (params,config) => { return util.ajax.post(`${baseApiUrl}quickPay/quickSendSms.msp`, params, config).then(res => res.data) }

// 美付宝快捷支付
// export const quickPaySubmit = params => { return util.ajax.post(`${baseApiUrl}quickPay/quickPaySubmit.msp`, params).then(res => res.data) }
export const quickPaySubmit = (params,config) => { return util.ajax.post(`${baseApiUrl}quickPay/quickPaySubmit.msp`, params, config).then(res => res.data) }

// 解除绑定
// export const unBindBankCard = params => { return util.ajax.post(`${baseApiUrl}quickPay/untieCard.msp`, params).then(res => res.data) }
export const unBindBankCard = (params,config) => { return util.ajax.post(`${baseApiUrl}quickPay/untieCard.msp`, params, config).then(res => res.data) }

// 开通经销商数据
// export const productGiftInfo = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/productGiftInfo`, params).then(res => res.data) }
export const productGiftInfo = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/productGiftInfo`, params, config).then(res => res.data) }

// 手机验证
// export const checkSmsCode = params => { return util.ajax.post(`${baseApiUrl}wap/checkSmsCode.msp`, params).then(res => res.data) }
export const checkSmsCode = (params,config) => { return util.ajax.post(`${baseApiUrl}wap/checkSmsCode.msp`, params, config).then(res => res.data) }

// 商品评价
// export const productEvaluateList = params => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/productEvaluateList`, params).then(res => res.data) }
export const productEvaluateList = (params,config) => { return util.ajax.post(`${baseApiUrl}index.json?a=v1/productEvaluateList`, params, config).then(res => res.data) }

// 提交评价
// export const applyEvaluate = params => { return util.ajax.post(`${baseApiUrl}evaluate/applyEvaluate.msp`, params).then(res => res.data) }
export const applyEvaluate = (params, config) => { return util.ajax.post(`${baseApiUrl}evaluate/applyEvaluate.msp`, params, config).then(res => res.data) }
