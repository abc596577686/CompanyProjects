import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import './index.less';
import { loginOut_api,userInfo } from '../../axios/api'
import jkdCode from '../../resource/assets/images/jkdCode.jpg'

export default class IHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redirect: false,
      islogin:'',
    }
  }

  componentWillMount(){
    let userInfo
    if(window.sessionStorage.getItem('__userInfo__')){
      console.log('---------------',window.sessionStorage.getItem('__userInfo__'))
      userInfo = JSON.parse(window.sessionStorage.getItem('__userInfo__'))
    }
    console.log('客户信息',userInfo)
    this.setState({
      userInfo : userInfo||''
    })

    if (window.sessionStorage.getItem('__islogin__')){
      let isloginkey = JSON.parse(window.sessionStorage.getItem('__islogin__'))
      this.setState({
        islogin : isloginkey
      })
    }
  }
  getUserInfo = () =>{
    userInfo().then(res => {
      if(res.data.code==='1'){
        this.setState({
          userInfo : res.data.data
        })
        sessionStorage.setItem('__userInfo__',JSON.stringify(res.data.data))
      }
    })
  }
  //更新存储信息
  setInfo =()=>{
    let userInfo
    if(window.sessionStorage.getItem('__userInfo__')){
      userInfo = JSON.parse(window.sessionStorage.getItem('__userInfo__'))
    }
    console.log('客户信息',userInfo)
    this.setState({
      userInfo : userInfo||''
    })
    if(userInfo){
      clearInterval(this.timer)
    }
  }
  componentWillReceiveProps(nextProps){
    console.log('header接受了',nextProps)
    if(nextProps.fresh==='isLogin'){
      this.getUserInfo()
      if(!sessionStorage.getItem('__userInfo__')){
        this.timer = setInterval(() => {
          console.log('定时任务启动了')
          this.setInfo()
        },1000)
      }else{
        this.setInfo()
      }
    }else if(nextProps.fresh==='noLogin'){
      this.setState({
        userInfo : ''
      })
    }else{
    
    }
  }
  loginOut =(e) => {
    e.preventDefault()
    loginOut_api().then(res => {
      console.log('退出',res)
      if(res.data.code=='1'){
        window.sessionStorage.removeItem('__userInfo__')
        window.sessionStorage.removeItem('__userType__')
        window.sessionStorage.setItem('__islogin__',0)
        this.setState({
          redirect : true
        })
      }
    })
  }
  render() {
    return (
      <div className="headerWrap">
      {
        this.state.redirect&&
        <Redirect to='/login'/>
      }
        <div className="headerBox clearfix">
          <div className="hd_left">
            {
              this.state.userInfo?
                <div className='hasLogin'>
                  <Link to='/control'><span className='userName'>{this.state.userInfo.fullName}</span></Link>
                  <span>欢迎您回来！</span>
                  <a className="tag" onClick={this.loginOut}>
                    <span>退出</span>
                  </a>
                </div>
                :
                <div className='noLogin'>
                  <em>欢迎光临智果商城!</em>
                  <Link to='/login'>
                    <span className='sn-login'>请登录</span>
                  </Link>
                  <Link to='/register'>
                    <span className='sn-register'>免费注册</span>
                  </Link>
                </div>
            }
          </div>
          <div className="hd_right">
            <ul className='sn-menu'>
              {
                this.state.userInfo?
                <li className='sn-item' >
                  <div className='sn-div'>
                    <span className='menu-hd' >
                      <em>我的信息</em>
                      <i className='fa fa-angle-down'></i>
                    </span>
                    <div className='menu-hide'>
                      <div className='hide-item' onClick={() => { window.location.href = '/control?act=order' }}>已买到的宝贝</div>
                      <div className='hide-item' onClick={() => { window.location.href = '/control?act=address' }}>我的地址管理</div>
                    </div>
                  </div>
                </li>
                :null
              }
              {
                this.state.userInfo?
                  <li className='sn-item sn-import' onClick={() => {window.location.href='/cart'}}>
                    <div className='sn-div sn-import'>
                      <b className='fa fa-shopping-cart'></b>
                      <span className='menu-hd'><em>购物车</em></span>
                    </div>
                  </li>
                  :
                  null
                  
              }
              {
                this.state.userInfo?
                  <li className='sn-item'>
                    <div className='sn-div'>
                      <span className='menu-hd' onClick={() => {window.location.href='/control?act=collection'}}>收藏夹</span>
                    </div>
                  </li>
                  :
                  null
              }
              {
                this.state.userInfo?
                  <li className='sn-item sn-separator'></li>
                  :
                  null
              }
             
              <li className='sn-item'>
                <div className='sn-div'>
                  <span className='menu-hd'>
                    <em>关注我们</em>
                  </span>
                  <div className='menu-hide imgCode'>
                    <img src={jkdCode} alt=""/>
                  </div>
                </div>
              </li>
              <li className='sn-item'>
                <div className='sn-div' onClick={() => {window.location.href='/'}}>
                  <span className='menu-hd'>智果商城</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
