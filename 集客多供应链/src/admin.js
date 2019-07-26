import React from 'react';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import {Layout,Menu} from 'antd';
import {connect} from 'react-redux';
import NavLeft from './components/NavLeft';
import CommonHeader from './components/Header';
import './styles/common.less';

import logo from './resource/assets/images/zhiguo.png';
import {getUserInfo} from "./axios/api";
import {baseUrl, ERR_OK} from "./axios/config";
import {message} from "antd/lib/index";

const {Sider, Content} = Layout;
class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      userInfo: null
    };
  }
  componentWillMount() {
    let isLogin = localStorage.getItem('__isLogin__')
    if (!isLogin || isLogin === 'false') {
      window.location.href = '/login'
      return;
    }
    this._getUserInfo();
  };

  _getUserInfo() {
    getUserInfo({}, 'GET').then(res => {
      console.log('用户信息：', res);
      if (res.data.code !== ERR_OK) {
        message.error(res.data.msg);
        return;
      }
      if (res.data.code === ERR_OK) {
        let userInfo = res.data.data;
        this.setState({
          userInfo
        })
      }
    })
  }
  // Slide 展开收起菜单
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    this.props.router.push({
      pathname :'/login',
    })
  };
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <div className="logo"><img src={logo} style={{width:'40px',height:'40px'}}/><h1>智果</h1></div>
          <Menu theme="dark" mode="inline">
            <NavLeft/>
          </Menu>
        </Sider>
        <Layout style={{color: '#000', position: 'relative', overflow: 'hidden'}}>
          <CommonHeader
              toggleMenu={this.toggle.bind(this)}
              collapsed={this.state.collapsed}
              userInfo={this.state.userInfo}
              onLogout={this.logout}/>
          <Content className='content'>{this.props.children}</Content>
        </Layout>
        </Layout>
    )
  }
}
export default connect()(Admin)