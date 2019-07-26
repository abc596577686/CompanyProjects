import { baseUrl } from '../etc/config.js'
import { query } from '../utils/index.js'

// 微信获取code
export const getWechatCode = params => { return query(`${baseUrl}/clt/weixin/getWechatCode.msp`, params, 'POST') }

// 获取微信授权登陆信息
export const getWeiXinUserInfo = params => { return query(`${baseUrl}/clt/weixin/getWeiXinUserInfo.msp`, params, 'POST') }

// 获取vipCode
export const getVipCode = params => { return query(`${baseUrl}/clt/user/getUserBarCode.msp`, params, 'POST') }

// 导航
export const getNavList = params => { return query(`${baseUrl}/clt/index.json?a=v1/home`, params, 'POST') }

// 专题详情
export const getChannelDetails = params => { return query(`${baseUrl}/clt/index.json?a=v1/home`, params, 'POST')}

// 商品详情
export const getGoodsDetail = params => { return query(`${baseUrl}/clt/index.json?a=v1/productDetail`, params, 'POST') }

// 获取搜索结果
export const getSearchValue = params => { return query(`${baseUrl}/clt/index.json?a=v1/distributionProductList`, params, 'POST') }

// 组合商品列表
export const getThemeDetail = params => { return query(`${baseUrl}/clt/index.json?a=v1/home`, params, 'POST') }

export const getGroupProductList = params => { return query(`${baseUrl}/clt/index.json?a=v1/productGroupList`, params, 'POST') }

// 省市区数据
export const getRegionList = params => { return query(`${baseUrl}/clt/index.json?a=v1/regionList`, params, 'POST') }

// 商品分类数据
export const getSortlist = params => { return query(`${baseUrl}/clt/index.json?a=v1/productCategoryList`, params, 'POST') }

// 运费说明
export const getPostage = params => { return query(`${baseUrl}/clt/product/getPostage.msp`, params, 'POST') }

// 获取token
export const getToken = params => { return query(`${baseUrl}/clt/weixin/getToken.msp`, params, 'POST') }

// 品牌类目
export const getBrandList = params => { return query(`${baseUrl}/clt/index.json?a=v1/productBrandList`, params, 'POST') }

// 注册
export const userRegister = params => { return query(`${baseUrl}/clt/weixin/userRegister.msp`, params, 'POST') }

// 订单列表
export const getOrderList = params => { return query(`${baseUrl}/clt/index.json?a=v1/orderList`, params, 'POST') }

// 个人中心
export const userCenterInfo = params => { return query(`${baseUrl}/clt/user/getUserInfo.msp`, params, 'POST') }

// vip条形码
export const getBarCode = params => { return query(`${baseUrl}/clt/user/getUserBarCode.msp`, params, 'POST') }

// 绑定微信手机号
export const bindWXPhone = params => { return query(`${baseUrl}/clt/weixin/bindWeixinMobile.msp`, params, 'POST') }

// 绑定其它手机号
export const bindOtherPhone = params => { return query(`${baseUrl}/clt/weixin/bindMoible.msp`, params, 'POST') }

// 获取手机号验证码
export const sendCode = params => { return query(`${baseUrl}/clt/user/sendCode.msp`, params, 'POST') }

// 验证旧手机号
export const modifyMobile = params => { return query(`${baseUrl}/clt/weixin/modifyMobile.msp`, params, 'POST') }

// 更改手机号
export const resetUserMobile = params => { return query(`${baseUrl}/clt/weixin/editMoible.msp`, params, 'POST') }

// 导航详情
export const getDistribution = params => { return query(`${baseUrl}/clt/index.json?a=v1/distributionProductList`, params, 'POST') }

// 立即购买（多规格商品
export const checkBuy = params => { return query(`${baseUrl}/clt/order/checkBuy.msp`, params, 'POST') }

// 确定订单
export const getConfirmOrderDetail = params => { return query(`${baseUrl}/clt/index.json?a=v1/orderCheckDetail`, params, 'POST') }

// 提交订单
export const confirmOrder = params => { return query(`${baseUrl}/clt/order/orderConfrim.msp`, params, 'POST') }

// 取消订单
export const cancelOrder = params => { return query(`${baseUrl}/clt/order/cancelOrder.msp`, params, 'POST') }

// 删除订单
export const deleteOrder = params => { return query(`${baseUrl}/clt/order/deleteOrder.msp`, params, 'POST') }

// 确认收货
export const queryTake = params => { return query(`${baseUrl}/clt/order/queryTake.msp`, params, 'POST') }

// 订单详情
export const getOrderDetail = params => { return query(`${baseUrl}/clt/index.json?a=v1/orderDetail`, params, 'POST') }

// 申请售后
export const getRefundReasonList = params => { return query(`${baseUrl}/clt/index.json?a=v1/refundReasonList`, params, 'POST') }

// 加入购物车
export const addShoppingCart = params => { return query(`${baseUrl}/clt/cart/addNumCart.msp`, params, 'POST') }

// 我的收货地址列表
export const getAddressList = params => { return query(`${baseUrl}/clt/index.json?a=v1/addressManagerList`, params, 'POST') }

// 删除地址
export const deleteAddress = params => { return query(`${baseUrl}/clt/address/deleteAddress.msp`, params, 'POST') }

// 收货人信息提交
export const saveAddressDetails = params => { return query(`${baseUrl}/clt/address/saveAddress.msp`, params, 'POST') }

// 身份证上传
export const saveIdentityInfo = params => { return query(`${baseUrl}/clt/address/updateAddress.msp`, params, 'POST') }

// 微信支付
export const orderPay = params => { return query(`${baseUrl}/clt/pay/orderPay.msp`, params, 'POST') }

// 购物车列表
export const getShoppingCartList = params => { return query(`${baseUrl}/clt/index.json?a=v1/cartList`, params, 'POST') }

//删除购物车
export const delShoppingCartList = params => { return query(`${baseUrl}/clt/cart/deleteCart.msp`, params, 'POST') }

//购物车增减商品
export const addNumberCart = params => { return query(`${baseUrl}/clt/cart/addNumCart.msp`, params, 'POST') }

//结算商品
export const buyShopoingGood = params => { return query(`${baseUrl}/clt/order/checkCart.msp`, params, 'POST') }

// 优惠券
export const getCouponList = params => { return query(`${baseUrl}/clt/index.json?a=v1/couponList`, params, 'POST') }

//我的优惠劵
export const getMyCouponList = params => {
  return query(`http://test.uzengroup.com/clt/index.json?a=v1/couponList`, params, 'POST')
}

// 售后图片上传
export const webUploadImage = params => { return query(`${baseUrl}/clt/user/uploadImage.msp`, params, 'POST') }

// 售后申请
export const applyRefund = params => { return query(`${baseUrl}/clt/refund/applyRefund.msp`, params, 'POST') }

// 售后进度
export const getCustomerServerDetails = params => { return query(`${baseUrl}/clt/index.json?a=v1/refundDetail`, params, 'POST') }

//问题列表
export const getQuestionList = params => { return query(`${baseUrl}/clt/index.json?a=v1/questionList`, params, 'POST') }

//提出问题
export const addQuestiones = params => { return query(`${baseUrl}/clt/product/addQuestion.msp`, params, 'POST') }

//
export const getAnswerList = params => { return query(`${baseUrl}/clt/index.json?a=v1/answerList`, params, 'POST') }

//回答问题
export const addAnswer = params => { return query(`${baseUrl}/clt/product/addAnswer.msp`, params, 'POST') }

// 意见反馈
export const submitFeedback = params => { return query(`${baseUrl}/clt/feedback/appFeedBack.msp`, params, 'POST')}

//查看物流
export const getOrderPackageList = params => { return query(`${baseUrl}/clt/index.json?a=v1/orderPackageList`, params, 'POST') }

//新用户优惠劵
export const getHomeCouponList = params => { return query(`${baseUrl}/clt/index.json?a=v1/homeCouponList`, params, 'POST') }

//全部领取
export const getAllCoupon = params => { return query(`${baseUrl}/clt/coupon/receiveCoupon.msp`, params, 'POST') }

//首页秒杀场次
export const seckillList = params => { return query(`${baseUrl}/clt/index.json?a=v1/seckillList`, params, 'POST') }

// 发送提醒短信
export const seckillNotice = params => { return query(`${baseUrl}/clt/notice/seckillNotice.msp`, params, 'POST') }

// 获取物流公司
export const getExpressList = params => { return query(`${baseUrl}/clt/index.json?a=v1/expressList`, params, 'POST') }

// 提交单号
export const saveExpressNumber = params => { return query(`${baseUrl}/clt/refund/saveExpressNumber.msp`, params, 'POST') }
// 拼团详情页
export const groupBuyDetail = params => { return query(`${baseUrl}/clt/index.json?a=v1/collageDetail`, params, 'POST') }
// 分享参团
export const groupShareDetail = params => { return query(`${baseUrl}/clt/index.json?a=v1/collageShareDetail`, params, 'POST') }


