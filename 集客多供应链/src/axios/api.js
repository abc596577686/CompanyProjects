import {Http} from '../utils/httpUtil';
import {baseUrl, marketUrl, customsUrl} from '../axios/config';
// 登录
export const userLogin = params => {
  return Http(`${baseUrl}/login`, params);
};
// 订单列表
export const getOrderList = (data, method) => {
  return Http(`${baseUrl}/order/orderList`, null, method, {}, data);
};

//订单详情
export const getOrderDetail = (params, method) => {
  return Http(`${baseUrl}/order/info`, params, method);
};

// 品牌列表
export const brandList = (params, method) => {
  return Http(`${baseUrl}/brand/brandList`, params, method);
};

// 商品信息
export const getGoodsInfo = (params, method) => {
  return Http(`${baseUrl}/product/productDetail`, params, method);
};

// 商品列表
export const getGoodsList = (data, method) => {
  return Http(`${baseUrl}/product/productList`, null, method, {}, data);
};
//erp推送
export const sendERP = (params, method) => {
  return Http(`${baseUrl}/order/handlerPushErp`, params, method);
};
//订单关闭
export const orderClose = (params, method) => {
  return Http(`${baseUrl}/order/orderClose`, params, method);
};

//商品编辑参数信息列表
export const getProductParamList = (params, method) => {
  return Http(`${baseUrl}/product/getProductParamList`, params, method);
};

//商品渠道列表
export const getChannelList = (params, method) => {
  return Http(`${baseUrl}/product/getChannelList`, params, method);
};

//商品分类
export const getGoodsCategoryList = (params, method) => {
  return Http(`${baseUrl}/product/getProductCategoryList`, params, method);
};

//商品品牌
export const getGoodsBrandList = (params, method) => {
  return Http(`${baseUrl}/product/getProductBrandList`, params, method);
};

//商品出厂国家
export const getBrandCountryList = (params, method) => {
  return Http(`${baseUrl}/country/getBrandCountryList`, params, method);
};

//仓库列表
export const getWareHouseList = (params, method) => {
  return Http(`${baseUrl}/product/getProductWarehouseList`, params, method);
};

//同步状态列表
export const SyncList = (params, method) => {
  return Http(`${baseUrl}/orderSync/syncList`, params, method);
};
//同步状态记录
export const SyncstatusList = (params, method) => {
  return Http(`${baseUrl}/orderSync/syncStatusList`, params, method);
};
//推送海关记录表
export const customsList = (params, method) => {
  return Http(`${baseUrl}/customs/list`, params, method);
};
//通知记录列表
export const orderPayList = (params, method) => {
return Http(`${baseUrl}/orderPaymentNotify/list`, params, method);
};

//商品保存信息
export const saveProduct = (data, method) => {
  return Http(`${baseUrl}/product/saveProduct`, null, method, {}, data);
};

//wangEditor编辑器文件上传地址
export const getEditorUploadURL = () => {
  return `${baseUrl}/upload/multipartUpload`;
};

//普通文件上传地址
export const getFileUploadURL = () => {
  return `${baseUrl}/upload/fileUpload`;
};

//保存商品信息
export const saveBrand = (data, method) => {
  return Http(`${baseUrl}/brand/save`, null, method, {}, data);
};

//商品信息获取
export const getProductDetail = (params, method) => {
  return Http(`${baseUrl}/product/productDetail`, params, method);
}

//商品上/下架
export const productUpdateFxStatus = (params, method) => {
  return Http(`${baseUrl}/product/updateFxStatus`, params, method);
};

//商品删除
export const productDelete = (params, method) => {
  return Http(`${baseUrl}/product/deleteProduct`, params, method);
};

//商品品牌删除
export const brandDelete = (params, method) => {
  return Http(`${baseUrl}/brand/delete`, params, method);
};

//商品分类列表
export const categoryList = (params, method) => {
  return Http(`${baseUrl}/category/categoryTree`, params, method);
};

//商品分类保存
export const categorySave = (data, method) => {
  // return Http(`${baseUrl}/category/save`, params, method);
  return Http(`${baseUrl}/category/save`, null, method, {}, data);
};

//商品分类删除
export const categoryDelete = (params, method) => {
  return Http(`${baseUrl}/category/delete`, params, method);
};

//商品分类启用禁用
export const setCategoryDisEnabled = (params, method) => {
  return Http(`${baseUrl}/category/setCategoryDisEnabled`, params, method);
};

//商品仓库列表
export const warehouseList = (data, method) => {
  return Http(`${baseUrl}/warehouse/warehouseList`, null, method, {}, data);
};

//商品仓库新增/编辑
export const saveOrUpdate = (data, method) => {
  return Http(`${baseUrl}/warehouse/saveOrUpdate`, null, method, {}, data);
};

//商品仓库删除 t
export const warehousedelete = (params, method) => {
  return Http(`${baseUrl}/warehouse/delete`, params, method);
};

//获取运费模板列表 
export const getPostageTplTree = (data, method) => {
  return Http(`${baseUrl}/postageTpl/getPostageTplTree`, null, method, {}, data);
};

//创建新运费模板 post k
export const createPostageTpl = (data, method) => {
  return Http(`${baseUrl}/postageTpl/createPostageTpl`, null, method, {}, data);
};

//删除运费模板
export const deletePostageTemplate = (params, method) => {
  return Http(`${baseUrl}/postageTpl/deletePostageTemplate`, params, method);
};

// 邮费模板地区列表
export const areaList = (data, method) => {
  return Http(`${baseUrl}/area/areaList`, null, method, {}, data);
};

//创建新运费模板
export const saveRegionTplArea = (data, method) => {
  return Http(`${baseUrl}/postageTpl/saveRegionTplArea`, null, method, {}, data);
};

//查询当前运费模板区域
export const getRegionListByTplId = (params, method) => {
  return Http(`${baseUrl}/postageTpl/getRegionListByTplId`, params, method);
};

//删除当前运费模板区域
export const deletePostageRegion = (params, method) => {
  return Http(`${baseUrl}/postageTpl/deletePostageRegion`, params, method);
};

//商品列表
export const getProductStockList = (data, method) => {
  return Http(`${baseUrl}/productStock/productStockList`, null, method, {}, data);
};

// 获取投放规格库存信息
export const getProductStockById = (params, method) => {
  return Http(`${baseUrl}/productStock/getProductStockById`, params, method);
};

// 获取投放中商品列表搜索
export const getSearchProductList = (params, method) => {
  return Http(`${baseUrl}/productStock/searchProductList`, params, method);
};

// 投放商品
export const updateProductStock = (data, method) => {
  return Http(`${baseUrl}/productStock/updateProductStock`, null, method, {}, data);
};

// 分销市场用户列表
export const userList = (params, method) => {
  return Http(`${marketUrl}/manager/userInfoList`, params, method);
};

// 分销市场用户编辑
export const auditUser = (params, method) => {
  return Http(`${marketUrl}/manager/auditUser`, params, method);
};

// 分销商品
export const getChannelProductList = (params, method) => {
  return Http(`${baseUrl}/channel/channelProductList`, params, method);
};

// 上传图片地址
export const fileUpload = baseUrl + '/upload/fileUpload';

// 获取验证码
export const getVerifyCode = (params, method) => {
  return Http(`${baseUrl}/verifyCode`, params, method);
};

// 获取用户信息
export const getUserInfo = (params, method) => {
  return Http(`${baseUrl}/adminUser/getUserInfo`, params, method);
};

// 更新用户信息
export const updateUserInfo = (data, method) => {
  return Http(`${baseUrl}/adminUser/updateUser`, null, method, {}, data);
};

//已投放商品列表
export const marketProductList = (data, method) => {
  return Http(`${marketUrl}/manager/market/getProductList`, null, method, {}, data);
};

// 分销市场商品信息
export const getMarketProductDetail = (params, method) => {
  return Http(`${marketUrl}/manager/market/getProductDetail`, params, method);
};

//商品保存信息
export const saveMarketProduct = (data, method) => {
  return Http(`${marketUrl}/manager/market/saveProduct`, null, method, {}, data);
};
//修改密码
export const updatePassword = (data, method) => {
  return Http(`${baseUrl}/adminUser/updateMyselfPassWord`, null, method, {}, data);
};
//新建菜单
export const createMenu = (data, method) => {
  return Http(`${baseUrl}/menu/createMenu`, null, method, {}, data);
};
//删除菜单
export const deleteMenu = (params, method) => {
  return Http(`${baseUrl}/menu/deleteMenu`, params,'post');
};
//编辑菜单
export const editMenu = (data, method) => {
  return Http(`${baseUrl}/menu/editMenu`, null, method, {}, data);
};
//菜单详情
export const menuInfo = (params, method) => {
  return Http(`${baseUrl}/menu/menuInfo`, params, method);
};
//菜单树
export const menuTree = (params, method) => {
  return Http(`${baseUrl}/menu/menuTree`, params, 'get');
};
//创建角色
export const createRole = (data, method) => {
  return Http(`${baseUrl}/role/createRole`, null, method,{},data);
};
//角色列表
export const roleList = (params, method) => {
  return Http(`${baseUrl}/role/roleList`,params,'get');
};
//删除角色
export const deleteRole = (params, method) => {
  return Http(`${baseUrl}/role/deleteRole`, params, 'post');
};
//更新角色
export const updateRole = (data, method) => {
  return Http(`${baseUrl}/role/updateRole`, null, method, {}, data);
};
//角色详情
export const roleInfo = (params, method) => {
  return Http(`${baseUrl}/role/roleInfo`,params,'get');
};
//角色绑定菜单
export const roleBindMenu = (params, method) => {
  return Http(`${baseUrl}/role/roleBindMenu`, params, 'post');
};
//角色绑定资源
export const roleBindResource = (data, method) => {
  return Http(`${baseUrl}/role/roleBindResource`, null, method,{},data);
};
//用户列表、、、、、、、、、、、、、、、
export const adminUserList = (params, method) => {
  return Http(`${baseUrl}/admin/userList`,params,'get');
};

//管理员列表
export const superadmin = (params, method) => {
  return Http(`${baseUrl}/admin/userList`, params, 'get');
};
//新增管理员
export const createUser = (data, method) => {
  return Http(`${baseUrl}/admin/createUser?password=123456`, null, method, {}, data);
};
//启用禁用管理员
export const enableUser = (params, method) => {
  return Http(`${baseUrl}/admin/enableUser`, params, 'get');
};
//设置超级管理员
export const isSuperAccount = (params, method) => {
  return Http(`${baseUrl}/admin/isSuperAccount`, params, 'get');
};
//查询管理员角色
export const adminInfo = (params, method) => {
  return Http(`${baseUrl}/admin/adminInfo`, params, 'get');
};
//修改管理员绑定角色
export const userBindRole = (params, method) => {
  return Http(`${baseUrl}/admin/userBindRole`, params, 'post');
};
//获取资源树
export const resourceTree = (params, method) => {
  return Http(`${baseUrl}/resource/resourceTree`, params, 'get');
};
//新增资源
export const createResource = (data, method) => {
  return Http(`${baseUrl}/resource/createResource`, null, method, {}, data);
};
// 删除资源
export const deleteResource = (params, method) => {
  return Http(`${baseUrl}/resource/deleteResource`, params, 'post');
};
// 更新资源
export const updateResource = (data, method) => {
  return Http(`${baseUrl}/resource/updateResource`, null, method, {}, data);
};
//获取海关订单信息
export const requestLog = (params, method) => {
  return Http(`${customsUrl}/requestLog/list`, params, 'get');
};
//获取海关订单详情
export const getOrderByOrderId = (params, method) => {
  return Http(`${customsUrl}/order/getOrderByOrderId`, params, 'get');
};
//编辑用户信息
export const updateReceiveInfo = (params, method) => {
  return Http(`${baseUrl}/order/updateReceiveInfo`, params);
};
//省市区列表
export const getAddressList = (params, method) => {
  return Http(`${baseUrl}/area/getListByAreaId`, params,'get');
};
//分销商品删除
export const deleteProductMarket = (params, method) => {
  return Http(`${marketUrl}/manager/market/deleteProduct`, params,'get');
};
//商品市场删除
export const deleteProduct = (params, method) => {
  return Http(`${baseUrl}/product/deleteProduct`, params,'get');
};

//商品上下架
export const updateFxStatusMarket = (params, method) => {
  return Http(`${marketUrl}/manager/market/updateFxStatus`, params,'get');
};
//物流详情
export const orderPackageList = (params, method) => {
  return Http(`${baseUrl}/orderexpress/orderPackageList`, params,method);
};
//确认清单
export const savePurchaseExcel = (params, method) => {
  return Http(`${marketUrl}/manager/productExcel/savePurchaseExcel`, params,method);
};
//上传清单
export const uploadExcel = (data, method) => {
  return Http(`${marketUrl}/manager/productExcel/uploadExcel`, null, method, {}, data);
};
//删除渠道投放
export const deleteProductStock = (params, method) => {
  return Http(`${baseUrl}/productStock/deleteProductStock`, params,method);
};
//erp店铺列表
export const erpStoreList = (params, method) => {
  return Http(`${baseUrl}/erpStore/getOrderSyncStoreMap`, params,'get');
};

// 调取支付二维码
export const orderPay = params => {
  return Http(`${baseUrl}/order/orderPayment`, params);
};
// 查询支付二维码
export const queryPayment = params => {
  return Http(`${baseUrl}/order/queryPayment`, params);
};
//分销市场订单详情列表
export const getSyncOrderList = params => {
  return Http(`${marketUrl}/syncOrder/getSyncOrderList`, params,'get');
};
//重新同步
export const resyncOrder = (params) => {
  return Http(`${marketUrl}/syncOrder/resyncOrder`,params);
};
//填写身份证
export const editIdentity = (params) => {
  return Http(`${marketUrl}/syncOrder/editIdentity`,params);
};
//物流信息列表
export const getSyncOrderCourierList = params => {
  return Http(`${marketUrl}/syncOrder/getSyncOrderExpressList`, params,'get');
};
//手动同步
export const manualSyncOrder = (params) => {
  return Http(`${marketUrl}/syncOrder/manualSyncOrder`,params);
};
// 关闭订单
export const closeSyncOrder = (params) => {
  return Http(`${marketUrl}/syncOrder/closeSyncOrder`,params,'get');
};
//店铺列表
export const getSyncStoreList = params => {
  return Http(`${marketUrl}/syncOrder/getSyncStoreList`, params,'get');
};
//店铺列表
export const getToken = params => {
  return Http(`${baseUrl}/common/getToken`, params,'get');
};
// 退款订单获取
export const refundOrderList = params => {
  return Http(`${baseUrl}/refund/refundOrderList`, params);
};
// 退款详情
export const getListByOrderId = params => {
  return Http(`${baseUrl}/refund/getListByOrderId`, params,'get');
};
// 退款退货审核
export const checkRefund = params => {
  return Http(`${baseUrl}/refund/checkRefund`, params);
};
