import axios from 'axios';
import {UN_LOGIN} from '../axios/config';
axios.defaults.withCredentials = true;
export const Http = (url = '', params = {}, method = 'POST', headers = {}, data = {}) => {
  headers['Authorization'] = localStorage.getItem('token');
  headers['Content-Type'] = 'application/json';
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      params: params,
      method: method,
      headers: headers,
      withCredentials: true,
      data: data,
      dataType: 'json'
    }).then(res => {
      //登录过期/未登录
      if (res.data.code === UN_LOGIN) {
        localStorage.setItem('__isLogin__', false);
        window.location.href= '/login';
        return;
      }
      
      // 获取并设置token
      if (res.headers['X-Token']) {
        localStorage.setItem('token', res.headers['X-Token']);
        localStorage.setItem('__isLogin__', true);
      }
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
};

