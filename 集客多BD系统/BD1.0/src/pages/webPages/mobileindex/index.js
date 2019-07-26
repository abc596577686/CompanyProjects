import React from 'react';

export default class GiftPack extends React.Component {

  componentWillMount() {
    console.log('欢迎来到集客多BD系统');

    // 直接进入index首页 由路由判断设备后加载资源
    // if (window.location.pathname === '/index') {
    //   return;
    // }
    // window.location.href = '/index'

    // localStorage.setItem('__isLogin__','true');  //开发阶段 默认登录状态
    window.location.href = '/login'

    // this.props.history.replace('/login');
    // let isLogin = localStorage.getItem('__isLogin__');
    // if (!isLogin || isLogin === 'false') {
    //   if (window.location.pathname === '/login') {
    //     return;
    //   }
    //   window.location.href = '/login'
    //   // this.props.history.push('/login');
    //   alert('请登录后再使用 qaq')
    // }
  }

  render() {
    return (
      <div>移动端BD系统主页</div>
    )
  }
}