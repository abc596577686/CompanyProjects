import React from 'react';
import {Row, Col, Card, Tooltip, Icon} from 'antd';
import './index.css';
import LoginBackground from '../../../globalComponents/loginBackground';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('组件加载完');
    // window.location.href = '/login'
    let isLogin = localStorage.getItem('__isLogin__');
    if (!isLogin || isLogin === 'false') {
      if (window.location.pathname === '/login') {
        return;
      }
      window.location.href = '/login'
      // this.props.history.replace('/login');
      // this.props.history.push('/login');
      // alert('请登录后再使用 qaq')
    }
  };

  render() {
    return (
      <div className="superPcLogin" style={{ width: '100%', height: '100%', backgroundColor: '#fff' ,textAlign:'center',paddingTop:'200px',fontSize:'20px'}}>
        {/* <LoginBackground/> */}
        BD客户管理系统
      </div>
    )
  }
}