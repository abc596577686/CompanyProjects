import React, {Component} from 'react';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default class App extends Component {

  componentWillMount() {
    console.log('app');
    let isLogin = localStorage.getItem('__isLogin__');
    if (!isLogin || isLogin === 'false') {
      if (window.location.pathname === '/login') {
        return;
      }
      window.location.href = '/login'
    }
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        {this.props.children}
      </LocaleProvider>
    );
  }
}
