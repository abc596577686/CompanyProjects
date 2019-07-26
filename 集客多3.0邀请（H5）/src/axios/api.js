import { Http, Httpss } from '../utils/httpUtil';
import axios from 'axios'
import { localUrl } from '../axios/config';

let util = {};
util.ajax = axios.create({
    timeout: 60000
});

// 获取短信验证码
export const sendCode = params => {
  return Http(`${localUrl}clt/user/sendCode.msp`, params, 'post');
};

// 提交注册
export const userRegister = params => {
  return Http(`${localUrl}clt/wap/userRegister.msp`, params, 'post');
};

// 获取注册页数据
export const getStoreInfo = params => {
  return Http(`${localUrl}clt/wap/getStoreInfo.msp`, params, 'post');
};

// 用户鉴别
export const ckeckIsAgent = params => {
  return Http(`${localUrl}clt/wap/ckeckIsAgent.msp`, params, 'post');
};
// 微信分享token
export const getToken = params => {
  return Http(`${localUrl}clt/weixin/getToken.msp`, params, 'post');
};



// 登录
export const userLogin = params => {
  return Http(`${localUrl}clt/login`, params, 'post');
};

// 获取图形验证码
export const vertifyCode = params => {
  return Http(`${localUrl}clt/vertifyCode`, params, 'GET');
};

// 新建区域
export const saveRegion = (data, method) => {
  return Http(`${localUrl}clt/region/saveRegion`, null, method, {}, data);
};

// 退出登录
export const logout = ( params, method ) => {
  return Http(`${localUrl}clt/logout`,  params, method);
};
