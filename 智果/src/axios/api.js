import {Http} from '../utils/httpUtil';

// 正式环境服务器连接地址
//export const baseUrl = 'http://zuul.uzengroup.com/market/'
//export const baseImgUrl = 'http://www.zhiguo360.com/'

// 测试环境服务器连接地址
export const baseUrl = 'http://testzuul.uzengroup.com/market/'
export const baseImgUrl = 'http://testzuul.uzengroup.com/market/'
// export const baseUrl = 'http://192.168.10.127:7300/market/'
// export const baseImgUrl = 'http://192.168.10.127:7300/market/'
// 获取验证码
export const getECode_api = params => {
  return Http(`${baseUrl}userInfo/sendCode`, params);
};
//注册账号
export const register_api = params => {
  return Http(`${baseUrl}userInfo/register`, params);
};
// 登录
export const login_api = params => {
  return Http(`${baseUrl}userInfo/login`, params);
};
//退出账号
export const loginOut_api = params => {
  return Http(`${baseUrl}userInfo/loginOut`, params);
};

//找回密码
export const upDatePassword = params => {
  return Http(`${baseUrl}/userInfo/forgetPassword`, params);
};

//首页与搜索列表
export const getGoodsList_api = params => {
  return Http(`${baseUrl}clt/home`, params,'GET');
};
//根据分类找品牌/品牌找分类
export const getBrandCategoryList_api = params => {
  return Http(`${baseUrl}clt/brandCategoryList`, params,'GET');
};


// 订单列表
export const getOrderList_api = params => {
  return Http(`${baseUrl}clt/orderList`, params,'GET');
};

//购物车列表
export const getShoppingCartList = params => {
  return Http(`${baseUrl}clt/cartList`, params,'GET')
};

//优惠券列表
export const getCouponList = params => {
  return Http(`${baseUrl}clt/index.json?a=v1/couponList`, params)
};


// 商品详情
export const getGoodsDetails_api = params => {
  return Http(`${baseUrl}clt/productDetail`, params,"GET");
};
//检查商品
export const checkBuy = params => {
  return Http(`${baseUrl}order/checkBuy`, params);
};


// 我的收货地址列表
export const getAddressList = params => {
  return Http(`${baseUrl}clt/userAddressListTag`, params,'GET')
};

// 删除地址
export const deleteAddress = params => {
  return Http(`${baseUrl}userAddress/deleteAddress`, params)
}
//更新地址
export const updateAddress = params => {
  return Http(`${baseUrl}customer/updateCustomer`, params)
}


// 收货人信息提交/更新
export const saveAddressDetails = params => {
  return Http(`${baseUrl}/userAddress/saveAddress`, params)
}

// 省市区数据
export const upLoadBatch = params => {
  return Http(`${baseUrl}order/orderBatchImport`, params)
}
//模板上传
export const getRegionList = params => {
  return Http(`${baseUrl}clt/regionList`, params, 'GET')
}


// 添加购物车
export const _addCart_api = params => {
  return Http(`${baseUrl}userCart/addNumCart`, params);
};

//删除购物车
export const delShoppingCartList = params => {
  return Http(`${baseUrl}userCart/deleteCart`, params)
};

//购物车增减商品
export const addNumberCart = params => {
  return Http(`${baseUrl}clt/cart/addNumCart.msp`, params)
};

//结算商品
export const buyShopoingGood = params => {
  return Http(`${baseUrl}order/checkCart`, params)
};

// 提交订单
export const confirmOrder_api = params => {
  return Http(`${baseUrl}order/orderConfirm`, params);
};

//邀请好友
export const inviteOther = params => {
  return Http(`${baseUrl}clt/index.json?a=v1/inviteTeammate`, params);
};
//用户信息
export const userInfo = params => {
  return Http(`${baseUrl}/userInfo/getUserInfo`, params,'GET');
};
//图片上传
export const ImgUpLoad = params => {
  return Http(`${baseUrl}clt/user/webUploadImage.msp`, params);
};
//修改用户信息
export const upDateUserInfo = params => {
  return Http(`${baseUrl}/userInfo/updateUserInfo`, params);
};
// 订单详情
export const getOrderDetail = params => {
  return Http(`${baseUrl}clt/orderDetail`, params,'GET');
};
//提交订单
export const orderConfirm = params => {
  return Http(`${baseUrl}order/orderConfrim`, params);
};
//订单页面
export const orderCheck = params => {
  return Http(`${baseUrl}clt/orderCheck`, params,'GET');
};
//
export const orderPay = params => {
  return Http(`${baseUrl}order/orderPayment`, params);
};
//查询是否支付
export const queryPay = params => {
  return Http(`${baseUrl}order/queryPayment`, params);
};
//取消订单
export const orderCancel = params => {
  return Http(`${baseUrl}order/cancelOrder`, params);
};
//确认收货
export const orderTake = params => {
  return Http(`${baseUrl}order/confirmTake`, params);
};
//删除订单
export const orderDel = params => {
  return Http(`${baseUrl}order/deleteOrder`, params);
};

// 获取图形验证码
export const verifyCode = params => {
  return Http(`${baseUrl}userInfo/verifyCode`, params, 'GET');
};
//获取短信验证码
export const sendCode = params => {
  return Http(`${baseUrl}userInfo/sendCode`, params);
};
//邮费计算
export const postage = params => {
  return Http(`${baseUrl}postTage/getPostTage`, params,'get');
};
//导入订单
// export const orderImport = (data,method) => {
//   return Http(`${baseUrl}order/orderImport`,null, method, {}, data);
// };
export const orderImport = (data,method,token,isIgnore) => {
  return Http(`${baseUrl}order/orderImport?token=${token}&isIgnoreExistOrder=${isIgnore}`,null, method, {}, data);
};
// 获取用户协议
export const userProtocol = params => {
  return Http(`${baseUrl}user/userProtocol`, params ,'GET');
};

//订单批量同步列表
export const getBatchSyncOrderList = params => {
  return Http(`${baseUrl}syncOrder/getBatchSyncOrderList`, params,'get');
};
//同步订单记录列表
export const getSyncOrderRecordList = params => {
  return Http(`${baseUrl}syncOrder/getSyncOrderRecordList`, params,'get');
};
//店铺列表
export const getSyncStoreList = params => {
  return Http(`${baseUrl}syncOrder/getSyncStoreList`, params,'get');
};
//物流信息列表
export const getSyncOrderCourierList = params => {
  return Http(`${baseUrl}syncOrder/getSyncOrderExpressList`, params,'get');
};
//订单详情列表
export const getSyncOrderList = params => {
  return Http(`${baseUrl}syncOrder/getSyncOrderList`, params,'get');
};
//重新同步
export const resyncOrder = (params) => {
  return Http(`${baseUrl}syncOrder/resyncOrder`,params);
};
//填写身份证
export const editIdentity = (params) => {
  return Http(`${baseUrl}syncOrder/editIdentity`,params);
};
//浏览记录与收藏列表
export const userProductList = (params) => {
  return Http(`${baseUrl}clt/userProductList`,params,'get');
};
//收藏商品
export const saveCollect = (params) => {
  return Http(`${baseUrl}userCollectProduct/save`,params);
};
//取消收藏
export const delCollect = (params) => {
  return Http(`${baseUrl}userCollectProduct/delete`,params);
};
//热销商品
export const hotSaleProductList = (params) => {
  return Http(`${baseUrl}clt/hotSaleProductList`,params,'get');
};

// 修改密码
export const updatePassword = params => {
  return Http(`${baseUrl}/userInfo/updatePassword`, params);
};
//根据id查找规格
export const getProductSpecList = (params) => {
  return Http(`${baseUrl}clt/productSpecList`,params,'get');
};
//设置默认地址
export const setDefaultAddress = (params) => {
  return Http(`${baseUrl}userAddress/setDefaultAddress`,params);
};
//获取物流详情
export const getOrderPackageList = (params) => {
  return Http(`${baseUrl}clt/orderPackageList`,params,'get');
};
//手动同步
export const manualSyncOrder = (params) => {
  return Http(`${baseUrl}syncOrder/manualSyncOrder`,params);
};
// 关闭订单
export const closeSyncOrder = (params) => {
  return Http(`${baseUrl}syncOrder/closeSyncOrder`,params,'get');
};
//银行列表
export const allBankList = (params) => {
  return Http(`${baseUrl}clt/bankList`,params,'get');
};
//发送短信
export const sendBankCode = (params) => {
  return Http(`${baseUrl}/quickPay/quickBingSms`,params);
};
//绑定卡号
export const quickPaySign = (params) => {
  return Http(`${baseUrl}quickPay/quickPaySign`,params);
};
// 银行卡解绑
export const untieCard = (params) => {
  return Http(`${baseUrl}quickPay/untieCard`,params);
};
//银行卡列表
export const bankCardList = (params) => {
  return Http(`${baseUrl}clt/userQuickCardList`,params,'get');
};
//快捷支付提交
export const quickPaySubmit = (params) => {
  return Http(`${baseUrl}/quickPay/quickPaySubmit`,params);
};
//保存备注
export const editRemark = (params) => {
  return Http(`${baseUrl}/order/updateBuyerMessage`,params);
};
//店铺列表









