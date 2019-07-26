import axios from 'axios';
import {UN_LOGIN} from '../axios/config'
import {Modal} from 'antd'
import {message} from 'antd'

// 跨域请求携带cookie
axios.defaults.withCredentials = true;
axios.defaults.timeout =  6000;

// 请求拦截器
axios.interceptors.request.use(function(config){
  if (sessionStorage.X_STORE_ID) {
    config.headers['x-store-id'] = sessionStorage.X_STORE_ID // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config;
}, err => {
  return Promise.reject(err);
});

//响应拦截器
axios.interceptors.response.use(response => {
  if(response.status === 200 && response.headers['x-store-id']){
    sessionStorage.X_STORE_ID = response.headers['x-store-id']
  }
  return response;
}, err => {
  return Promise.reject(err);
});
function showConfirm() {
  Modal.confirm({
    title: '提示',
    content: '需要登录才能使用此功能，是否前往登录页？',
    onOk() {
      window.location.href='/login'
    },
    onCancel() {
      // window.location.href='/'
    },
  });
}
export const Http = (url = '', params = {}, method = 'POST', headers = {},data = {}) => {
  headers['X-TOKEN'] = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        params: params,
        method: method,
        headers: headers,
        withCredentials: true,
        data: data,
        dataType: 'json',
        timeout: 60000
      }).then(res => {
        //登录过期/未登录
        if (res.data.code === UN_LOGIN) {
          document.cookie = "isLogin=false"
          showConfirm()
          return;
        }
        if (res.headers['X-Token']) {
          localStorage.setItem('token',res.headers['X-Token'])
        }
        resolve(res)
      })
        .catch(err => {
          reject(err)
          console.log(err)
        })
    })
}