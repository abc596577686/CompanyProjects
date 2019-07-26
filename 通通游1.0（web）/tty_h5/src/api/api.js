import axios from 'axios'

// 本地
let base = '/api/'

// 打包
// let base = '/html5/'
// let base = 'http://wap.ttylink.com/html5/'
// let base = 'http://192.168.10.160:8080/html5/'

// 商品详情
export const getGoodsDetails = params => { return axios.post(`${base}product/productDetail.msp`, params).then(res => res.data) };

// 首页
export const getHomeData = params => { return axios.post(`${base}product/market.msp`, params).then(res => res.data) };

// 订单列表
export const getOrderList = params => { return axios.post(`${base}order/list.msp`, params).then(res => res.data) };

// 订单详情
export const getOrderDetail = params => { return axios.post(`${base}order/orderDetail.msp`, params).then(res => res.data) };

// 下订单
export const productOrder = params => { return axios.post(`${base}order/createOrder.msp`, params).then(res => res.data) };

// 支付
export const pay = params => { return axios.post(`${base}order/orderPay.msp`, params).then(res => res.data) };

// 获取个人信息
export const getUserInfo = params => { return axios.post(`${base}user/userInfo.msp`, params).then(res => res.data) };

// 获取产品列表
export const getProductList = params => { return axios.post(`${base}product/productElect.msp`, params).then(res => res.data) };

// 产品筛选条件
export const selectOption = params => { return axios.post(`${base}product/filterCondition.msp`, params).then(res => res.data) };

// 目的地国家
export const getCountryList = params => { return axios.post(`${base}product/toPlace.msp`, params).then(res => res.data) };

// 获取产品列表
export const getProductListForSearch = params => { return axios.post(`${base}product/productList.msp`, params).then(res => res.data) };

// 申请分销员
export const applyDist = params => { return axios.post(`${base}user/register.msp`, params).then(res => res.data) };

// 退款
export const refund = params => { return axios.post(`${base}order/refund.msp`, params).then(res => res.data) };

// 取消退款
export const cancelRefund = params => { return axios.post(`${base}order/cancelRefund.msp`, params).then(res => res.data) };

// 取消订单
export const cancel = params => { return axios.post(`${base}order/cancelOrder.msp`, params).then(res => res.data) };

// 保存发票信息
export const savefp = params => { return axios.post(`${base}invoice/applyInvoice.msp`, params).then(res => res.data) };

// 保存出行人信息
export const savevisitor = params => { return axios.post(`${base}order/updateOrderDetail.msp`, params).then(res => res.data) };

