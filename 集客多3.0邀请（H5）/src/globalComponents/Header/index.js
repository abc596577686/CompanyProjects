import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Icon, Dropdown, Menu, Breadcrumb, Avatar,message} from 'antd';
import {connect} from 'react-redux';
// import BreadcrumbCustom from '../BreadcrumbCustom';
import './index.less';
import '../../styles/common.css';
// import { logout, getUserInfo } from '../../axios/api'
import { derivedUrl } from "../../axios/config";

const {Header} = Layout;

export default class commonHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: this.props.collapsed,
      visible: false,
      userInfo: []
    }
  };

  componentWillMount() {
    console.log(this.props.collapsed);
    this.toogleMenus()
    // this.getUserInfo()
    // let isFirstLogin = sessionStorage.getItem('__isFirstLogin__');
    // if (isFirstLogin != 0) {
    //   this.toogleMenus()
    // } else{
    //   return
    // }
  };

  // getUserInfo = () => {
  //   let params = {}
  //   this.setState({
  //     userInfo: []
  //   })
  //   getUserInfo(params, 'GET').then(res => {
  //       if (res.data.code == 1) {
  //           if (res.data.data) {
  //               console.log(res.data.data)
  //               this.setState({
  //                   userInfo: res.data.data
  //               })
  //           }
  //       } else {
  //         this.setState({
  //           userInfo: []
  //         })
  //       }
  //   })
  // }

  toogleMenus = () => {
    // sessionStorage.setItem( '__isFirstLogin__', 0 );
    this.setState({
      collapsed: !this.state.collapsed,
    });
    this.props.toggleMenu();
  };

  handleMenuClick = (e) => {
    if (e.key === '3') {
      this.setState({visible: false});
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({visible: flag});
  };

  // onOutLogin = () => {
  //   console.log('退出登录');
  //   localStorage.setItem('__isLogin__', false);
  //   let params = {}
  //   logout(params, 'GET').then(res => {
  //     if (res.data.code == 1) {
  //       message.success('退出登录成功')
  //     } else {
  //       message.warning(res.data.msg)
  //     }
  //   })
  // };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {/* <Menu.Item key="1">
          <Link to="/accountSetting"><Icon type="user"/>个人设置</Link>
        </Menu.Item> */}
        {/* <Menu.Divider/> */}
        <Menu.Item key="2">
          <Link to="/login" onClick={this.onOutLogin}><Icon type="logout"/>退出登录</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{background: '#fff', padding: 0,}}>
        <Icon
          className="trigger"
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toogleMenus}
          style={{marginLeft: '20px'}}
        />
        <div className="topTitle" style={{ width:'8rem', display:'inline-block',position:'absolute', right:'12%',fontSize:'15px',textAlign:'right'}}>
          {/* <BreadcrumbCustom /> */}
          {/*<Breadcrumb>*/}
            {/*{*/}
              {/*this.props.breadcrumbs.map((item, i) =>*/}
                {/*<Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>*/}
              {/*)*/}
            {/*}*/}
          {/*</Breadcrumb>*/}
          {this.state.userInfo.channelName!=null?this.state.userInfo.channelName+'—' :null}{this.state.userInfo.regionTeamName!=null?this.state.userInfo.regionTeamName+'—':null}{this.state.userInfo.realName!=null?this.state.userInfo.realName:null}
        </div>
        <div className="topTags">
          <Dropdown overlay={menu}
                    onVisibleChange={this.handleVisibleChange}
                    visible={this.state.visible}>
              <span className="ant-dropdown-span">
                {!this.props.userInfo ? <Avatar icon="user" /> : <Avatar src={derivedUrl + this.props.userInfo.headImage} className="img-avatar"/>}
                {!this.props.userInfo ? '' : this.props.userInfo.fullName}
            </span>
          </Dropdown>
        </div>
      </Header>

    )
  }
}

// export default connect()(commonHeader);
