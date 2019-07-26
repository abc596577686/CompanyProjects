import { Http, Httpss } from '../utils/httpUtil';
import axios from 'axios'
import { marketUrl, customsUrl, localUrl, testUrl} from '../axios/config';

let util = {};
util.ajax = axios.create({
    timeout: 60000
});


// 登录
export const userLogin = params => {
  return Http(`${localUrl}clt/login`, params, 'post');
};

// 获取图形验证码
export const vertifyCode = params => {
  return Http(`${localUrl}clt/vertifyCode`, params, 'GET');
};

// 成员管理
export const userList = ( params, method ) => {
  return Http(`${localUrl}clt/user/userList`,  params, method);
};

// 渠道列表
export const channelList = ( params, method ) => {
  return Http(`${localUrl}clt/widget/channelList`,  params, method);
};

// 从属列表
export const getRegionList = ( params, method ) => {
  return Http(`${localUrl}clt/widget/getRegionListByChannelId`,  params, method);
};

// 职级列表
export const getroleList = ( params, method ) => {
  return Http(`${localUrl}clt/widget/roleList`,  params, method);
};

// 保存用户
export const saveUser = (data, method) => {
  return Http(`${localUrl}clt/user/saveUser`, null, method, {}, data);
};

// 渠道总览
export const extendTeamList = ( params, method ) => {
  return Http(`${localUrl}clt/team/extendTeamList`,  params, method);
};

// 团队总览
export const conversionTeamList = ( params, method ) => {
  return Http(`${localUrl}clt/team/conversionTeamList`,  params, method);
};

// 负责人列表
export const getUserListByType = ( params, method ) => {
  return Http(`${localUrl}clt/widget/getUserListByType`,  params, method);
};

//替换区域负责人
export const updateRegionManager = (params, method) => {
  return Http(`${localUrl}clt/region/updateRegionManager`, params, method);
};

//替换团队负责人
export const updateTeamManager = (params, method) => {
  return Http(`${localUrl}clt/team/updateTeamManager`, params, method);
};

// 新建区域
export const saveRegion = (data, method) => {
  return Http(`${localUrl}clt/region/saveRegion`, null, method, {}, data);
};

// 新建团队
export const saveTeam = (data, method) => {
  return Http(`${localUrl}clt/team/saveTeam`, null, method, {}, data);
};

//地推团队列表
export const pushTeamList = (params, method) => {
  return Http(`${localUrl}clt/pushTeamList`, params, method);
};

//地推团队详情总览
export const teamDetail = (params, method) => {
  return Http(`${localUrl}clt/teamDetail`, params, method);
};

//用户分配列表
export const userPoolList = (params, method) => {
  return Http(`${localUrl}clt/userPoolList`, params, method);
};

// 分配对接人
export const bindBdUser = params => {
  return Http(`${localUrl}clt/userPool/bindBdUser`, params, 'post');
};

//获取所有团队 （地推+转化）
export const getTeamList = (params, method) => {
  return Http(`${localUrl}clt/userPool/getTeamList`, params, method);
};

// 获取所选团队负责人
export const getUserListByTeamId = ( params, method ) => {
  return Http(`${localUrl}clt/userPool/getUserListByTeamId`,  params, method);
};

// 客户管理列表
export const customerList = ( params, method ) => {
  return Http(`${localUrl}clt/customerList`,  params, method);
};

// 查询用户信息
export const queryUserInfo = ( params, method ) => {
  return Http(`${localUrl}clt/customer/queryUserInfo`,  params, method);
};

// 用户记录
export const getCustomerHistory = ( params, method ) => {
  return Http(`${localUrl}clt/customer/getCustomerHistory`,  params, method);
};

// 保存拜访记录
export const saveCustomerHistory = params => {
  return Http(`${localUrl}clt/customer/saveCustomerHistory`, params, 'post');
};

// 保存用户记录修改
export const updateCustomerInfo = params => {
  return Http(`${localUrl}clt/customer/updateCustomerInfo`, params, 'post');
}

// 获取用户信息
export const getUserInfo = ( params, method ) => {
  return Http(`${localUrl}clt/user/getUserInfo`,  params, method);
};

//用户信息 转化团队  —— 当前状态修改
export const updateStatus = ( params, method ) => {
  return Http(`${localUrl}clt/customer/updateStatus`, params, method);
}

// 获取拜访记录一览
export const customerHistoryList = ( params, method ) => {
  return Http(`${localUrl}clt/customerHistoryList`,  params, method);
};

// 绩效记录
export const achievementsHistoryList = ( params, method ) => {
  return Http(`${localUrl}clt/achievementsHistoryList`,  params, method);
};

// 绩效导出
export const exportAllBdAchievements = ( params, method ) => {
  return Http(`${localUrl}clt/widget/exportAllBdAchievements`,  params, method);
};

// 退出登录
export const logout = ( params, method ) => {
  return Http(`${localUrl}clt/logout`,  params, method);
};

// //订单详情
// export const getOrderDetail = (params, method) => {
//   return Http(`${baseUrl}/order/info`, params, method);
// };

// 图片上传
// export const webUploadImage = params => {
//   return Httpss(`${localUrl}/upload/webUploadImage`, params , 'post');
// };

export const webUploadImage = params => { return util.ajax.post(`${localUrl}clt/upload/webUploadImage`,params).then(res => res.data) }