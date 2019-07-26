import React from 'react';
import { Input, Button, message, Modal } from 'antd';
import LoginHeader from '../../components/LoginHeader';
import './index.less'
import { Link } from 'react-router-dom'
// import loginlogo from '../../resource/assets/images/loginlogo.png';
// import loginlogok from '../../resource/assets/images/loginlogok.png';
import loginlogos from '../../resource/assets/images/registerPic.jpg';
import successimg from '../../resource/assets/images/icon_dagou@3x.png';
import codeimg from '../../resource/assets/images/jkdCode.jpg';
import IHeader from '../../components/Header';
import simga from '../../resource/assets/images/s1.png';
import simgb from '../../resource/assets/images/s4.png';
import simgc from '../../resource/assets/images/s3.png';
// import HomeHeader from '../../components/HomeHeader';
import { getECode_api, register_api, verifyCode, userProtocol } from '../../axios/api'

export default class Register extends React.Component {
  componentWillMount() {
    console.log('Register')
    this._getverifyCode();
    this._getdowntxt();
  }

  getOtherCode = () => {
    this._getverifyCode()
  }

  // _getdowntxt = () => {
  //   this._getdowntxt()
  // }

  goindex = () => {
    this.props.history.push({
      pathname: '/'
    })
  }

  _getverifyCode() {
    let params = {}
    verifyCode(params).then(res => {
      // if (res.data.code !== ERR_OK) {
      // console.log(res.data.data)
      let baseImg = 'data:image/png;base64,' + res.data.data
      console.log(baseImg)
      // var baseImg='data:image/png;base64,'  
      // <img src={img_base} />
      this.setState({
        codeimg: baseImg
      });
      // }
    })
  }

  _getdowntxt() {
    let params = {}
    userProtocol(params).then(res => {
      this.setState({
        downtxt: res.data
      });
    })
  }

  marksure = () => {
    this.setState({
      checkstatus: !this.state.checkstatus,
      isSure: !this.state.isSure
    });
  }

  state = {
    time: 60,
    codeText: '免费获取',
    isEnableCode: true,
    register: false,
    dtcode: '',
    visible: false,
    downtxt: '',
    isSure: false,
    checkstatus: false,
    actionstatus: 'flex',
    successstatus: 'none',
    // actionstatus: 'none',
    // successstatus: 'flex',

  }

  showtxt = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      checkstatus: true,
      isSure: true
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  getPhone = (e) => {
    let value = e.target.value
    this.setState({
      phoneVal: value
    })
  }
  getSmsCode = (e) => {
    let value = e.target.value
    this.setState({
      smsVal: value
    })
  }
  getDtCode = (e) => {
    let value = e.target.value
    this.setState({
      dtcode: value
    })
  }
  getPassword = (e) => {
    let value = e.target.value
    this.setState({
      passwordVal: value
    })
  }
  getInviteCode = (e) => {
    let value = e.target.value
    this.setState({
      inviteVal: value
    })
  }
  getCode = () => {
    let inputVal = this.state.phoneVal;
    if (!inputVal) {
      message.error('请输入手机号')
      return;
    }

    if (!this.state.isEnableCode) return;
    if (this.state.dtcode == '') {
      message.error('请输入图形验证码')
      return;
    }

    this._getECode();

  };

  /**
   * 获取验证码接口
   * */
  _getECode() {
    let inputVal = this.state.phoneVal;
    let params = {
      mobile: inputVal,
      codeType: 1,
      countryCode: 86,
      verifyCode: this.state.dtcode,
    };
    getECode_api(params).then(res => {
      console.log(res);
      if (res.data.code == '1') {
        message.success(res.data.msg)
        let time = this.state.time
        this.setState({
          codeText: `${time}s后重新获取`,
          isEnableCode: false,
        });
        let timer = setInterval(() => {
          if (time === 0) {
            this.setState({
              codeText: `免费获取`,
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
      } else {
        message.warning(res.data.msg)
        this._getverifyCode();
      }
    });
  };
  submitUserInfo = () => {
    let params = {
      mobile: this.state.phoneVal,
      smsCode: this.state.smsVal,
      password: this.state.passwordVal,
      inviteCode: this.state.inviteVal,
      isSure: this.state.isSure
    }
    register_api(params).then(res => {
      console.log(res)
      if (res.data.code == '1') {
        this.setState({
          register: true,
          successstatus: 'flex',
          actionstatus: 'none',
          // successstatus: 'none',
          // actionstatus: 'flex',
        })
        message.success(res.data.msg)
      } else {
        message.warning(res.data.msg)
      }
    })
  }
  render() {
    return (
      <div className='register_container'>
        <LoginHeader status='2' />
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
        {/* <div className='register_header'>
          <div className='status_item'>
            <span className='circle'>1</span>
            <span className='info'>注册账号</span>
            <span className='line'></span>
          </div>
          <div className={this.state.register?'status_item':'status_item noRearch'}>
            <span className='circle'>2</span>
            <span className='info'>小二审核</span>
          </div>
        </div> */}



        {/* 注册模块 */}

        <div className='register_main'>
          {/* <img className='leftpic' src={loginlogos}/> */}
          <div className='register_content' style={{ display: this.state.actionstatus }}>
            <Link className='alreadyGet' to='/login' style={{ display: this.state.actionstatus }}>已有账号！<span className='alreadyGetSp'>登录</span></Link>
            <div className='item ep'>
              <div className='outwidth'>
                <div className='user'></div>
                <input className='ps' placeholder='手机号' onChange={this.getPhone} />
              </div>
            </div>
            <div className='item ep'>
              <div className='outwidths'>
                <div className='yzform'></div>
                <input className='ys' placeholder='验证码' onChange={this.getDtCode} />
              </div>
              {/* <Button className='getCode' onClick={this.getCode}>{this.state.codeText}</Button> */}
              <div className='ewCodeimg22' onClick={this.getOtherCode}><img className='codeimg1' src={this.state.codeimg} /></div>
            </div>
            <div className='item ep'>
              {/* <span className='share s'>短信动态码:</span> */}
              <div className='outwidths'>
                <div className='yzform'></div>
                <input className='ys' placeholder='短信动态码' onChange={this.getSmsCode} />
              </div>
              <Button className='getCode' onClick={this.getCode}>{this.state.codeText}</Button>
            </div>
            <div className='item ep'>
              {/* <span className='s'>密码:</span> */}
              <div className='outwidth'>
                <div className='lock'></div>
                <input className='ms' placeholder='密码' onChange={this.getPassword} type='password' />
              </div>
            </div>
            <div className='item ep'>
              <div className='outwidth'>
                <div className='lock'></div>
                <input className='qs' placeholder='邀请码' onChange={this.getInviteCode} />
              </div>
            </div>
            <div className='item ep'>
              <div className='xieyi'><input checked={this.state.checkstatus} onClick={this.marksure} className='yunject' type="checkbox" name="click" value='11' />我已经看过并接受<span onClick={this.showtxt} style={{ color: 'blue', cursor: 'pointer' }}>《智果用户注册协议》</span></div>
            </div>
            <div className='item ep' style={{ padding: '0 100px' }}>
              <Button type='primary' onClick={this.submitUserInfo} block={true} style={{ backgroundColor: '#E31939', border: 'none' }}>提交注册</Button>
            </div>
          </div>
          {/* 注册成功模块 */}
          <div className='register_content  lt' style={{ display: this.state.successstatus }}>
            <div className='successimg'>
              <img src={successimg} />
            </div>
            <div className='successtxt'>资料已提交审核,等待小二审核中...</div>
            <div className='successtxt2'>客服小二会在24小时内主动与您联系,请保持手机畅通</div>
            <div className='successtxt3'>若在认证过程中有任何问题请拨打热线：4000639939</div>
            <div className='codeimgg'>
              <img src={codeimg} />
            </div>
            <div className='successtxt2'>扫一扫智果公众号</div>
            <button className='linkbtn_res' onClick={this.goindex}>先逛一逛</button>
          </div>
        </div>
        <Modal
          title="智果用户注册协议"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          mask='true'
          className='localmodal'
          width={800}
        // centered='true'
        >
          <p className='modalp' style={{ height: '300px', overflow: 'scroll', textIndent: '2em' }}>{this.state.downtxt}</p>
        </Modal>
        <div className='footerw'>© COPYRIGHT 2018-2020 智果 版权所有 浙ICP备18056755号-1</div>
      </div>
    )
  }
}