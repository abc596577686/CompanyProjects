import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {LocaleProvider,message} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default  class App extends React.Component {
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

    localStorage.setItem('__isLogin__','true');  //开发阶段 默认登录状态

    let isLogin = localStorage.getItem('__isLogin__');
    if (!isLogin || isLogin === 'false') {
      if (window.location.pathname === '/login') {
        return;
      }
      window.location.href = '/login'
      alert('请登录后再使用 -w-')
    }
  }

  _getpage(){
    
  }

  render() {
    return (
      <div className="superH5System">
        <LocaleProvider locale={zhCN}>
          {this.props.children}
        </LocaleProvider>
      </div>
    );
  }
}
