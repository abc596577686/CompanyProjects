import React from 'react';
import './index.less'
import Header from '../../components/Header'
import BankCard from '../../pages/bankCard'
import ShowList from '../../components/ShowList'
import Batch from '../../pages/batch'
import userImg from '../../resource/assets/images/defaultUser.jpg'
import Password from '../SetPassword/index'
import { Modal, Button,Icon,Spin } from 'antd';
import {userInfo, baseUrl, userProductList,baseImgUrl} from "../../axios/api";
import PageFooter from '../../components/PageFooter'
import { Link, Redirect } from 'react-router-dom'
import LazyLoad from 'react-lazy-load';
import Order from '../Order'
import Customer from '../Customer'
import Account from '../Account'
import SyncList from '../SyncList'
import PassWord from '../SetPassword'
import EditPassword from '../editPassword'
import { getValForKey } from '../../utils/utils'
import { loginOut_api } from '../../axios/api'
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  submitContinue = () => {
    this.props.submitContinue()
  }
  render() {
    return (
      <div className='user-right'>
        <div className='right-title'>{this.props.navComponent.title}</div>
        <div className='right-main'>
          {this.props.navComponent.action == 'userinfo' ? <PassWord /> : null}
          {this.props.navComponent.action == 'password' ? <EditPassword /> : null}
          {this.props.navComponent.action == 'address' ? <Customer /> : null}
          {this.props.navComponent.action == 'batch' ? <Batch /> : null}
          {this.props.navComponent.action == 'order' ? <Order history local={this.props.local}/> : null}
          {this.props.navComponent.action == 'bankCard' ? <BankCard type='control' /> : null}
          {this.props.navComponent.action == 'collection' ? <ShowList type='1'/>: null}
          {this.props.navComponent.action == 'synctask' ? <SyncList type='1' /> : null}
          {/*{this.props.navComponent.action == 'transform' ? <SyncList type='2' /> : null}*/}
          {this.props.navComponent.action == 'syncorder' ? <SyncList type='3'/> : null}
          {this.props.navComponent.action == 'syncstore' ? <SyncList  type='4'/> : null}
          {this.props.navComponent.action == 'syncexpress' ? <SyncList type='5' /> : null}
        </div>
      </div>
    )
  }
}
export default class ControlCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect : false
    }
    let _this = this
    this.state = {
      showMainBox : true,
      visible : false,
      showLoading : true,
      navComponent : [],
      navList : [
        {
          title : '会员中心',
          childList : [
            {
              title : '用户信息',
              action : 'userinfo'
            },
            {
              title : '修改密码',
              action : 'password'
            },
            {
              title : '地址管理',
              action : 'address'
            },
            // {
            //   title : '我的卡包',
            //   action : 'bankCard'
            // }
          ]
        },
        {
          title : '交易中心',
          childList : [
            {
              title : '我的订单',
              action : 'order'
            },
            {
              title : '批量下单',
              action : 'batch'
            },
            {
              title: '商品收藏',
              action : 'collection'
            },
          ]
        },
        {
          title : '同步中心',
          childList : [
            {
              title: '同步列表',
              action : 'synctask'
            },
            // {
            //   title: '转化订单',
            //   action : 'transform'
            // },
            {
              title: '同步订单',
              action : 'syncorder'
            },
            {
              title: '店铺列表',
              action : 'syncstore'
            },
            {
              title : '物流回写',
              action : 'syncexpress'
            },
          ]
        }
      ],
      showtype: '',
      listinfo:'',
    }
  }
  // 登出账户
  loginOut =(e) => {
    e.preventDefault()
    loginOut_api().then(res => {
      console.log('退出',res)
      if(res.data.code=='1'){
        window.sessionStorage.removeItem('__userInfo__')
        // this.setState({
        //   redirect : true
        // })
        window.location.href='/login'
      }
    })
  }

  // 获取当前菜单栏
  getMenuNav = (menuNavList, action) => {
    if(menuNavList != null && menuNavList.length > 0){
      for(let i = 0; i < menuNavList.length; i ++){
        if(menuNavList[i] != null){
          if(menuNavList[i].childList != null){
            let menuNav = this.getMenuNav(menuNavList[i].childList, action);
            if(menuNav != null && menuNav.action == action){
              return menuNav;
            }
          }else if(menuNavList[i].action != null && menuNavList[i].action == action){
            return menuNavList[i];
          }
        }
      }
    }
    return null;
  };

  componentWillMount(){
    window.scrollTo(0,0)
    // 显示主控制面板信息
    let navComponent = [];
    let action = getValForKey(this.props.location.search, 'act');
    let menuNav = this.getMenuNav(this.state.navList, action);
    let screenWidth = localStorage.getItem('__screenWidth__')?localStorage.getItem('__screenWidth__'):null
    if(menuNav != null && menuNav.action == action){
      navComponent = menuNav;
    }else{
      navComponent = this.getMenuNav(this.state.navList, 'userinfo');
    }
    this._getUserInfo()
    let userInfo = JSON.parse(window.sessionStorage.getItem('__userInfo__'))
    console.log('客户信息',userInfo)
    this.setState({
      userInfo,
      navComponent,
      screenWidth
    })
  }
  // componentWillReceiveProps(nextProps){
  //   console.log('header接受了',nextProps)
  //   let userInfo = JSON.parse(window.sessionStorage.getItem('__userInfo__'))
  //   console.log('客户信息',userInfo)
  //   this.setState({
  //     userInfo
  //   })
  // }
  _getUserInfo =() => {
    userInfo().then(res => {
      this.setState({
        showLoading : false
      })
      console.log(res)
      let userInfo = res.data.data
      let Login = userInfo?'isLogin':''
      if(!userInfo) return
      let orderInfo = {
        newOrderNumber: userInfo.newOrderNumber,
        unDeliverOrderNumber: userInfo.unDeliverOrderNumber,
        deliverOrderNumber: userInfo.deliverOrderNumber,
        overOrderNumber: userInfo.overOrderNumber,
        cancelOrderNumber: userInfo.cancelOrderNumber,
      }
      this.setState({
        userInfo ,
        orderInfo,
        showMainBox : true,
        showEditBox : false,
        showDetailBox : false,
        Login
      })
    })
  }
  componentDidMount(){
  }
  freshEnv =() => {
    console.log('fresh-------------')
    // this._getUserInfo()
    // window.location.href='/control'
  }
  render() {
    
    return (
      <div className='control_container'
      // style={this.state.screenWidth?{width:this.state.screenWidth+'px'}:{}}
      >
        {
          this.state.redirect&&
          <Redirect to='/login'/>
        }
        <Header fresh={this.state.Login}/>
        <div 
        className={this.state.screenWidth?'control-main':'control-main minW'}
        style={this.state.screenWidth?{width:this.state.screenWidth+'px'}:{}}
        
        >
          <div className="user-left">
            <div className="sideNav">
              <h1 className='userName'>{this.state.userInfo?this.state.userInfo.fullName:null}</h1>
              <div className="userInfo">
                <div className="myInfo clearfix">
                  <div className='photo'>
                    {
                      this.state.userInfo && this.state.userInfo.headImage && this.state.userInfo.headImage.length>0?
                        <img src={baseImgUrl+this.state.userInfo.headImage} alt=""/>
                          :
                          <span className={'headImg'}/>
                    }
                    <span className='mask'></span>
                  </div>
                  <div className='info-op'>
                    <ul>
                      <div className='editbtn' onClick={() => {window.location.href='/control?act=userinfo'}}>
                        <li className="info-op1">
                          <i></i>
                          <span>修改资料</span>
                        </li>
                      </div>
                      <li className="info-op2 editbtn" onClick={this.loginOut}>
                        <i></i>
                        <span>安全退出</span>
                      </li>
                      {/*<li className="info-op3">*/}
                        {/*<i></i>*/}
                        {/*<span></span>*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='navList'>
              {
                this.state.navList.map((item,index) =>
                <div className={`func func${index+1} clearfix`}>
                  <p className='title'>
                    <i></i>
                    <span>{item.title}</span>
                  </p>
                  {
                    item.childList.map((i,index) =>
                      // {
                      //   i.title!='转化订单'?
                        <div className='child-item' onClick={() => {window.location.href='/control?act=' + i.action}}>
                          <span className={i.action===this.state.navComponent.action?'active':''}>{i.title}</span>
                          <i></i>
                        </div>
                      // }
                    )
                  }
                </div>
                )
              }
            </div>
          </div>
          <MainComponent navComponent={this.state.navComponent} local={this.props}/>
        </div>
        <PageFooter></PageFooter>
      </div>
    )
  }
}