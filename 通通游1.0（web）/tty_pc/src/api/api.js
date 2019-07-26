import axios from 'axios';

// 本地
// let base = '/distributor/';

// 打包 
let base = '/distributor/'

// 登录
export const requestLogin = params => { return axios.post(`${base}login.do`, params).then(res => res.data) };

// 获取用户手机号
export const getUserInfo = params => { return axios.post(`${base}user/dist/phone.do`, params).then(res => res.data) };

// 退出
export const loginOut = params => { return axios.post(`${base}quit.do`, params).then(res => res.data) };

// 获取用户账户
export const getUserCount = params => { return axios.get(`${base}order/wallet.do`, params).then(res => res.data) };

// 获取店铺信息
export const getShopInfo = params => { return axios.get(`${base}store/store/info.do`, params).then(res => res.data) };

// 提交店铺信息
export const upShopInfo = params => { return axios.post(`${base}store/store/revise.do`, params).then(res => res.data) };

// 店铺图片上传
export const uploadImageForShop = params => { return axios.post(`${base}store/store/upload_image.do`, params).then(res => res.data) };

// 取消代理
export const cancelProxy = params => { return axios.post(`${base}product/agency.do`, params).then(res => res.data) };

// 代理 (商品市场)
export const proxy = params => { return axios.post(`${base}product/agency.do`, params).then(res => res.data) };

// 获取商品列表
export const getGoodsList = params => { return axios.post(`${base}product/shop/list.do`, params).then(res => res.data) };

// 获取商品列表 (商品市场)
export const getGoodsListForMarket = params => { return axios.post(`${base}product/market/list.do`, params).then(res => res.data) };

// 获取产品信息(商品详情)
export const getProductInfo = params => { return axios.post(`${base}product/info.do`, params).then(res => res.data) };

// 获取订单列表
export const getOrderList = params => { return axios.post(`${base}order/list.do`, params).then(res => res.data) };

// 获取订单详情
export const getOrderDetails = params => { return axios.post(`${base}order/info.do`, params).then(res => res.data) };

// 获取出发地/目的地
export const getCityList = params => { return axios.post(`${base}national/list.do`, params).then(res => res.data) };

// 获取验证码
export const getVerifyCode = params => { return axios.post(`${base}sms/send.do`, params).then(res => res.data) };

// 验证码验证
export const verify = params => { return axios.post(`${base}sms/verify.do`, params).then(res => res.data) };

// 获取银行卡列表
export const getBankList = params => { return axios.get(`${base}dict/list.do`, params).then(res => res.data) };

// 获取银行卡信息
export const getBankInfo = params => { return axios.get(`${base}order/wallet/part.do`, params).then(res => res.data) };

// 分销商银行卡号查询
export const getCardList = params => { return axios.get(`${base}user/dist/card.do`, params).then(res => res.data) };

// 绑定银行卡信息
export const bindBankInfo = params => { return axios.post(`${base}user/dist/revise/card.do`, params).then(res => res.data) };

// 提现
export const drawMoney = params => { return axios.post(`${base}order/finance/apply/add.do`, params).then(res => res.data) };

// 获取分销商列表
export const getDistributionList = params => { return axios.post(`${base}dist/sale/list.do`, params).then(res => res.data) };

// 获取分销商详情
export const getDistributionDetails = params => { return axios.post(`${base}user/dist/info.do`, params).then(res => res.data) };

// 添加分销员
export const addDistribution = params => { return axios.post(`${base}dist/sale/newly.do`, params).then(res => res.data) };

// 批量启用 (或者单个启用)
export const actionForState = params => { return axios.post(`${base}dist/sale/isEnable.do`, params).then(res => res.data) };

// 获取消息
export const getMessage = params => { return axios.post(`${base}notice/list.do`, params).then(res => res.data) };

// 获取分销佣金
export const getCommission = params => { return axios.get(`${base}user/dist/ratio.do`, params).then(res => res.data) };

// 设置分销佣金
export const setCommission = params => { return axios.post(`${base}user/dist/ratio/revise.do`, params).then(res => res.data) };

// 出团日期
export const getDateInfo = params => { return axios.post(`${base}product/dist/cal.do`, params).then(res => res.data) };

// 出团日期列表
// export const getDateList = params => { return axios.post(`${base}product/dist/search.do`, params).then(res => res.data) };


