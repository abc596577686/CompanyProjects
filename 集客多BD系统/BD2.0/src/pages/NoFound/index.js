import React from 'react';

export default class NoFound extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('欢迎来到集客多BD系统');

    // 直接进入index首页 由路由判断设备后加载资源
    // if (window.location.pathname === '/index') {
    //   return;
    // }
    // window.location.href = '/index'

    // localStorage.setItem('__isLogin__','true');  //开发阶段 默认登录状态

    // let isLogin = localStorage.getItem('__isLogin__');
    // if (!isLogin || isLogin === 'true') {
    //   // window.location.href = '/index'
      
    // }
    // if (!isLogin || isLogin === 'false') {
    //   if (window.location.pathname === '/login') {
    //     return;
    //   }
    //   window.location.href = '/login'
    localStorage.setItem('__isLogin__','false');
    localStorage.setItem('token', '');
    window.location.href = '/login'
    // alert('返回重新登录')
    // }

  }
  
  render() {
    return (
      <div style={{ fontSize:'.5rem' }} >
        页面找不到了 T-T
      </div>
    )
  }
}