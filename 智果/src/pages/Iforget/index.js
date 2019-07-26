import React from 'react';
import {Input,Button,message} from 'antd';
import './iforget.less'
import { Link } from 'react-router-dom'
import LoginHeader from '../../components/LoginHeader';
import {getECode_api,upDatePassword,login_api, verifyCode, sendCode} from '../../axios/api'
export default class Iforget extends React.Component{
  state = {
    time : 60,
    codeText : '获取验证码',
    isEnableCode : true,
    codeimg: '',
    dtcode: '',
    passwordVal:'',
    passwordVals:'',
  }

  componentDidMount() {
    // console.log('Login');
    // this.onMouseOverIpt();
    this._getverifyCode();
  };
  getOtherCode=()=> {
    this._getverifyCode()
  }

  _getverifyCode() {
    let params = {}
    verifyCode(params).then(res => {
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

  getPhone = (e) => {
    let value = e.target.value
    this.setState({
      phoneVal : value
    })
  }
  getSmsCode = (e) => {
    let value = e.target.value
    this.setState({
      smsVal : value
    })
  }
  getDtCode = (e) => {
    let value = e.target.value
    this.setState({
      dtcode : value
    })
  }
  getPassword = (e) => {
    let value = e.target.value
    this.setState({
      passwordVal : value
    })
  }
  getPasswords = (e) => {
    let value = e.target.value
    this.setState({
      passwordVals : value
    })
  }
  getCode = () => {
    let inputVal = this.state.phoneVal;
    if (!inputVal) {
      message.error('请输入手机号')
      return;
    }
    if (!this.state.isEnableCode) return;

    
    
    this._getECode();
    
  };
  checkInput =() => {
    if(!this.state.phoneVal){
      message.error('请输入手机号')
      return false
    }
    if(!this.state.smsVal){
      message.error('请输入验证码')
      return false
    }
    if(!this.state.passwordVal){
      message.error('请输入新密码')
      return false
    }
    if(!this.state.passwordVals){
      message.error('请验证新密码')
      return false
    }
    return true
  }
  _upDatePassword = () => {
    var keya = this.state.passwordVal
    var keyb = this.state.passwordVals
    if (keya != keyb) {
      message.warning('两次输入的密码不一致')
      return
    }
    let checkInput = this.checkInput()
    let params = {
      mobile : this.state.phoneVal,
      smsCode : this.state.smsVal,
      password : this.state.passwordVal
    }
    if(checkInput){
      upDatePassword(params).then(res => {
        if(res.data.code=='1'){
          message.success('密码修改成功')
          this.props.history.push('/login')
        }else{
          message.error(res.data.msg)
        }
      })
    }
  }
  
  /**
   * 获取验证码接口
   * */
  _getECode() {
    let inputVal = this.state.phoneVal;
    let params = {
      mobile: inputVal,
      codeType: 3,
      countryCode: 86,
      verifyCode: this.state.dtcode,
    };
    getECode_api(params).then(res => {
      console.log(res);
      if (res.data.code =='1') {
        message.success(res.data.msg)
        let time = this.state.time
        this.setState({
          codeText: `${time}s后重新获取`,
          isEnableCode: false,
        });
        let timer = setInterval(() => {
          if (time === 0) {
            this.setState({
              codeText: `获取验证码`,
              isEnableCode: true,
            })
            clearInterval(timer);
            return;
          }
          time--;
          this.setState({
            codeText: `${time}s后重新获取`
          })
        }, 1000);
      }else{
        message.error(res.data.msg)
      }
    });
  };
  render(){
    return(
      <div className='forget_container'>
        <LoginHeader status='3'/>
        {/* <IHeader/> */}
        {/* <div className="lg_headerWrap">
          <div className="lg_headerBox clearfix headerbox_bor" style={{padding: '16px 16px 0 16px'}}>
          <Link className="lg_logo" to="/shopping">
            <img src={loginlogo}/>
          </Link>
          <span className='line'></span>
          <Link className="lg_logo" to="/shopping">
            <img src={loginlogok}/>
          </Link>
            <div className="lg_header_right clearfix">
              <Link className="tag" to="/login">
                已有账号? <span className='tag_2'>请登录 ></span>
              </Link>
            </div>
          </div>
        </div> */}
        {/* <div className='header'>
          <h2>重置密码</h2>
        </div> */}
        <div className='headline'></div>
        <div className='content'>
          <div className='item'>
            {/* <span className='itemsp'>手机号码</span> */}
            <div className='reDiv'>
              <div className='user'></div>
              <input className="input ps" placeholder='手机号' onInput={this.getPhone}/>
            </div>
          </div>
          <div className='item'>
            {/* <span className='share' className='itemsp'>验证码</span> */}
            <div className='reDivs'>
              <div className='yzcode'></div>
              <input className='kk' placeholder='验证码' onInput={this.getDtCode}/>
            </div>
            {/* <Button className='getCode' onClick={this.getCode}>{this.state.codeText}</Button> */}
            <div className='ewCodeimg2' onClick={this.getOtherCode}><img className='codeimg1' src={this.state.codeimg}/></div>
          </div>
          <div className='item'>
            {/* <span className='share' className='itemsp'>短信动态码</span> */}
            <div className='reDivs'>
              <div className='yzcode'></div>
              <input className='kk' placeholder='短信动态码' onInput={this.getSmsCode}/>
            </div>
            <Button className='getCode' onClick={this.getCode}>{this.state.codeText}</Button>
          </div>
          
          <div className='item' >
            {/* <span className='share' className='itemsp'>新密码</span> */}
            <div className='reDiv'>
              <div className='lock'></div>
              <input className='ps' placeholder='新密码' onInput={this.getPassword} type='password'/>
            </div>
          </div>
          <div className='item'>
            <div className='reDiv'>
              <div className='lock'></div>
              <input className='ps' placeholder='确认新密码' onInput={this.getPasswords} type='password'/>
            </div>
          </div>
          <div className='item' style={{ padding: '0 100px'}}>
            <button className='itembutton' type='primary' onClick={this._upDatePassword} block={true}>确认</button>
          </div>
          <Link className='returnRegister' to='/register'>您还可以重新注册>></Link>
        </div>
        <div className='footerw'>© COPYRIGHT 2018-2020 智果 版权所有 浙ICP备18056755号-1</div>
      </div>
    )
  }
}
