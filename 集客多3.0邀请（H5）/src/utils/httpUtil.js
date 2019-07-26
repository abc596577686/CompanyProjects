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
  localStorage.setItem('__isLogin__','false')
  if (window.location.pathname === '/login') {
    return;
  }
  window.location.href = '/login'
  // this.props.history.replace('/login');
  alert('登录信息查询失效 请重新登录 -w-')
  
  // Modal.confirm({
  //   title: '提示',
  //   content: '需要登录才能使用此功能，是否前往登录页？',
  //   onOk() {
  //     window.location.href='/login'
  //   },
  //   onCancel() {
  //     // window.location.href='/'
  //   },
  // });
}
export const Http = (url = '', params = {}, method = 'POST', headers = {}, data = {}) => {
  headers['X-TOKEN'] = localStorage.getItem('token');
  headers['Authorization'] = localStorage.getItem('token');
  headers['Content-Type'] = 'application/json';

  // headers['X-STORE-ID'] = '3833';
  // headers['BDAccept-Encoding'] = 'jkd.uzengroup.com';
  // headers['BDRequest-Encoding'] = 'true';

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
        //登录过期/未登录 回炉重造
        if (res.data.code == -1) {
          // document.cookie = "isLogin=false"
          showConfirm()
          return;
        }
        if (res.headers['X-Token']) {
          localStorage.setItem('token',res.headers['X-Token'])
        }
        resolve(res)

        // window.location.href = '/'
      })
      .catch(err => {
        // 登录信息失效 强制退出 为什么失效咱也不知道 咱也不敢问
        // localStorage.setItem('__isLogin__', 'false')
        // localStorage.setItem('token', '')
        // 抛出错误
        reject(err)
        console.log(err)
      })
    })
}

export const Httpss = (url = '', params = {}, method = 'POST', headers = {}, data = {}) => {
  headers['X-TOKEN'] = localStorage.getItem('token');
  headers['Authorization'] = localStorage.getItem('token');
  headers['Content-Type'] = 'multipart/form-data;boundary=1';
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
        // if (res.data.code === UN_LOGIN) {
        if (res.data.code == -1) {
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