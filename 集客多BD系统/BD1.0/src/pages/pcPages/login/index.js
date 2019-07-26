import React from 'react';
import {
  Button, 
  Card, 
  message
} from 'antd';
import { userLogin, vertifyCode} from '../../../axios/api';
import "antd/dist/antd.css";
import './index.css';
import PropTypes from 'prop-types'
import LoginBackground from '../../../globalComponents/loginBackground';

export default class GiftPack extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    codeimg: '',  //图片验证码 
    mobile:'',
    password:'',
    verifyCode:'',
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    // 获取图片验证码
    this._getverifyCode();
  }

  // 更新新验证码
  getOtherCode=()=> {
    this._getverifyCode()
  }
  // 获取验证码
  _getverifyCode() {
    let params = {}
    vertifyCode(params).then(res => {
      // if (res.data.code !== ERR_OK) {
      // console.log(res.data.data)
      let baseImg = 'data:image/png;base64,'+res.data.data  
      console.log(baseImg)
      // var baseImg='data:image/png;base64,'  
      // <img src={img_base} />
        this.setState({
          codeimg: baseImg
        });
      // }
    })
  }
  // 登录
  login=()=>{
    if (this.state.mobile == '') {
      message.warning('请检查用户名哦亲')
      return;
    }
    if (this.state.password == '') {
      message.warning('请检查登录密码哦亲')
      return;
    }
    if (this.state.verifyCode == '') {
      message.warning('请检查验证码哦亲')
      return;
    }
    this._login()
  }
  _login(){
    let params = {
      username: this.state.mobile,
      password: this.state.password,
      verifyCode: this.state.verifyCode
    }
    userLogin(params).then(res => {
      if(res.data.code == 1){
        message.success(res.data.msg)
        localStorage.setItem('token', res.data.data);
        localStorage.setItem('__isLogin__', true);
        // let dataList = JSON.parse(res.data.dataList)
        // console.log(typeof(res.data.dataList))
        if (res.data.dataList) {
          localStorage.setItem('_menulist_', JSON.stringify(res.data.dataList))
        }
        this.props.history.replace('/index');
      }else{
        this.getOtherCode()
        message.warning(res.data.msg)
      }
    })
  }

  usernameHandle=(e)=>{
    let inputVal = e.target.value;
    this.setState({
      mobile: inputVal,
    });
  }
  passwordHandle=(e)=>{
    let inputVal = e.target.value;
    this.setState({
      password: inputVal,
    });
  }
  verifyCodeHandle=(e)=>{
    let inputVal = e.target.value;
    this.setState({
      verifyCode: inputVal,
    });
  }

  render() {
    return (
      <div className="superPcLogin">
        <LoginBackground/>
        {/* 登录模块 */}
        {/* <div className='loginGroudBox'> */}
          <Card
            className= "loginBox"
            title="客服管理系统"
            // extra={<a href="#">More</a>}
            style={{ width: 400,height:400 }}
          >
            <div className='form_item'>                    
              <div className='user'>
              </div>
              <input className="incode"
                type="text"
                value={this.state.mobile}
                onChange={(e) => this.usernameHandle(e)}
                placeholder="手机号码" />
            </div>
            <div className='form_item'>                    
              <div className='user'>
              </div>
              <input className="incode"
                type="password"
                value={this.state.password}
                onChange={(e) => this.passwordHandle(e)}
                placeholder="密码" />
            </div>
            <div className='form_item' style={{width: '200px'}}>
              <div className='yzform'></div>
              <input className="incode yacodeinput"
                type="text"
                value={this.state.verifyCode}
                onChange={(e) => this.verifyCodeHandle(e)}
                placeholder="验证码"/>  
                <div className='ewCodeimg' onClick={this.getOtherCode}><img className='codeimg' src={this.state.codeimg} /></div>
            </div>
            <Button type="primary" onClick={this.login} style={{width: '310px' ,backgroundColor:'#357ebd'}}>
              确认
            </Button>
          </Card>
        {/* </div> */}
        <footer id='Anchor'>
          Copyright jikeduo.com.cn. All rights reserved. 渝ICP备16000273号-2
        </footer>
      </div>
    )
  }
}
