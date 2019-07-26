import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginHeader from '../../components/LoginHeader';
import './login.less';
import { Icon } from 'antd';
import {login_api, verifyCode, sendCode} from '../../axios/api';
import {ERR_OK} from '../../axios/config';
import QRCode from 'qrcode'
import loginBanner from '../../resource/assets/images/login_img.png';
import simga from '../../resource/assets/images/s1.png';
import simgb from '../../resource/assets/images/s4.png';
import simgc from '../../resource/assets/images/s3.png';
import codeSuccessImg from '../../resource/assets/images/codeSuccess.jpg';
import codeImg from '../../resource/assets/images/ecode.png';
// import QRCode from 'qrcode.react'

export default class Login extends React.Component {
  state = {
    status:'1',
    switchType: 0,
    tipsText: '请输入账号和密码',
    tipsText1: '请输入手机号与图形验证码进行短信验证',
    autoFocusIpt: true,
    iphonePlaceholder: '手机号码',
    codeText: '获取验证码',
    time: 60,
    isEnableCode: true,
    iphoneIptVal: '',
    codeIptVal: '',
    userInfo: {},
    redirect: false,
    codeimg: '',
    yzcode: '',
    dtcode: '',
    phonecode: '',
    isClickable: false,
    codetxt: '获取验证码',
    isdis: 'none',
    isdis1: 'none', 
  };

  componentDidMount() {
    console.log('Login');
    this.onMouseOverIpt();
    this._getverifyCode();
    window.addEventListener('keydown',this.keydownEnv)
  };
  componentWillUnmount(){
    window.removeEventListener('keydown',this.keydownEnv)
  }
  //enter登入
  keydownEnv = (e) =>{
    console.log(e)
    if(e.keyCode===13){
      if(this.state.switchType===0){
        this.bindSubmit()
      }else{
        this.bindSubmit1()
      }
    }
  }

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

  /**
   * 切换登录类型
   * switchType
   * 0:账号登录 1:二维码登录
   * */
  bindSwitch = () => {
    if (this.state.switchType === 0) {
      this.setState({
        switchType: 1
      })
      // QRCode.toDataURL('weixin://wxpay/bizpayurl?pr=uH7VBaa').then(url => {
      //   console.log(url)
      //   }
      // )
      var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: {
          quality: 0.3
        }
      }
  
      QRCode.toDataURL('weixin://wxpay/bizpayurl?pr=l6FVBBr', opts, function (err, url) {
        if (err) throw err
    
        var img = document.getElementById('image')
        img.src = url
      })
    } else {
      this.setState({
        switchType: 0
      })
    }
  };

  /**
   *  鼠标悬浮在input元素上
   * */
  onMouseOverIpt = () => {
    this.iphoneInput.focus()
    this.setState({
      autoFocusIpt: true,
      iphonePlaceholder: ''
    })
  };

  /**
   *  鼠标离开input元素
   * */
  onMouseLeaveIpt = () => {
    this.setState({
      iphonePlaceholder: '用户名'
    })
  };

  /**
   * input 失去焦点
   * */
  onBlurIpt = () => {
    this.setState({
      autoFocusIpt: false,
      iphonePlaceholder: '用户名'
    })
  };

  iphoneIptChange = (e) => {
    let inputVal = e.target.value;
    this.setState({
      iphoneIptVal: inputVal,
    });
  };

  codeIptChange = (e) => {
    let inputVal = e.target.value;
    this.setState({
      passwordVal: inputVal,
    });
  };

  yzcodeChange = (e) => {
    let inputVal = e.target.value;
    this.setState({
      yzcode: inputVal,
    });
  }
  dtcodeChange = (e) => {
    let inputVal = e.target.value;
    this.setState({
      dtcode: inputVal,
    });
  }
  iphonecodeChange = (e) => {
    let inputVal = e.target.value;
    this.setState({
      phonecode: inputVal,
    });
  }
  // 获取短信验证码
  getdtcode = () => {
    let phonecode = this.state.phonecode
    let verifyCode = this.state.yzcode


    if (!phonecode) {
      this.setState({
        isdis1:'block',
        tipsText1: '请输入手机号',
      });
      return;
    }
    if (!verifyCode) {
      this.setState({
        isdis1:'block',
        tipsText1: '请输入图形验证码',
      });
      return;
    }

    let params = {
      mobile: phonecode,
      codeType: 2, 
      verifyCode: verifyCode
    }
    sendCode(params).then(res => {
      if (res.data) {
        console.log(res.data)
        if (res.data.code == 1 ) {
          this.setState({
            codetxt: 60,
            isdis1:'block',
            tipsText1: '验证码已发送',
            isClickable: true
          });
          this._numedit()
        } else {
          this.setState({
            isdis1:'block',
            tipsText1: res.data.msg,
          });
          this._getverifyCode();
        }
      }
    })
  }
  _numedit = () => {
    let _this = this
    let localnum = _this.state.time
    _this.setState({
      codetxt: `${localnum}s后重新获取`,
      isClickable: false,
    });
    let codetime =  setInterval(
      function () {
        if (localnum == 0) {
          clearInterval(codetime);
          _this.setState({
            codetxt:'获取验证码',
            isClickable: false,
          });
          return
        }
        localnum--
        _this.setState({
          codetxt: `${localnum}s后重新获取`
        });
      }
    , 1000)
  }
  /**
   * 获取验证码事件
   * */
  // getCode = () => {
  //   let inputVal = this.state.iphoneIptVal;
  //   if (!inputVal) {
  //     this.setState({
  //       tipsText: '请输入手机号',
  //     });
  //     return;
  //   }
  //
  //   if (!this.state.isEnableCode) return;
  //   let time = this.state.time
  //   this.setState({
  //     codeText: `${time}s后重新获取`,
  //     isEnableCode: false,
  //   });
  //   let timer = setInterval(() => {
  //     if (time === 0) {
  //       this.setState({
  //         codeText: `获取验证码`,
  //         isEnableCode: true,
  //       })
  //       clearInterval(timer);
  //       return;
  //     }
  //     time--;
  //     this.setState({
  //       codeText: `${time}s后重新获取`
  //     })
  //   }, 1000);
  //
  //   this._getECode();
  //
  // };

  /**
   * 获取验证码接口
   * */
  // _getECode() {
  //   let inputVal = this.state.iphoneIptVal;
  //   let params = {
  //     mobile: inputVal,
  //     codeType: 2,
  //     countryCode: 86
  //   };
  //   getECode_api(params).then(res => {
  //     console.log(res);
  //     if (res.data.code !== ERR_OK) {
  //       this.setState({
  //         tipsText: res.data.msg
  //       });
  //     }
  //   });
  // };

  /***
   * 登录接口  type, inputVal, codeVal ,yzVal
   * */
  _login(type, inputVal, codeVal, yzVal) {
    let params = {
      loginType: type,
      mobile: inputVal,
      password: codeVal,
      smsCode: yzVal,
    };
    console.log(params)
    login_api(params).then(res => {
      console.log('登录：', res);
      if (res.data.code == 1) {
        window.sessionStorage.setItem('__islogin__', 1);
          this.setState({
            isdis: 'block',
            tipsText: res.data.msg
          });
          let userInfo = res.data.data;
          let userType = '2';
          if(res.data.data.isOfficialShop){
            userType = '1';
          }

          // 本地存储用户信息
          window.sessionStorage.setItem('__userInfo__', JSON.stringify(userInfo));
          window.sessionStorage.setItem('__userType__',userType)
          document.cookie = 'isLogin=true';
          this.setState({
            userInfo: userInfo,
          });
          this.props.history.push({
            pathname :'/',
            state : {} 
          }) 
      } else {
        this.setState({
          isdis: 'block',
          tipsText: res.data.msg
        });
        // 重新获取验证码
        this._getverifyCode();  
      }
    })
  }

  _login1(type, inputVal, dtcode) {
    let params = {
      loginType: type,
      mobile: inputVal,
      smsCode: dtcode,
    };
    console.log(params)
    login_api(params).then(res => {
      console.log('登录：', res);
      if (res.data.code == 1) {
        this.setState({
          isdis1:'block',
          tipsText1: res.data.msg
        });
        this.props.history.push({
          pathname :'/index',
          state : {} 
        })
        let userInfo = res.data.data;
        // 本地存储用户信息
        window.sessionStorage.setItem('__userInfo__', JSON.stringify(userInfo));
        document.cookie = 'isLogin=true';
        this.setState({
          userInfo: userInfo,
        });
  
      } else {
        this.setState({
          isdis1:'block',
          tipsText1: res.data.msg
        });
        // 重新获取验证码
        this._getverifyCode();  
      }
    })
  }
  
    //   console.log(this.state.redirect);
    // })
  

  /**
   * 登录
   * */
  // 密码登录
  bindSubmit = () => {
    let inputVal = this.state.iphoneIptVal;
    let codeVal = this.state.passwordVal;
    let yzVal = this.state.yzcode;
    let type = 0

    if (!inputVal) {
      this.setState({
        isdis:'block',
        tipsText: '请输入手机号',
      });
      return;
    }
    if (!codeVal) {
      this.setState({
        isdis:'block',
        tipsText: '请输入密码',
      });
      return;
    }
    if (!yzVal) {
      this.setState({
        isdis:'block',
        tipsText: '请输入验证码',
      });
      return;
    }
    // if (null) {
    //   this.setState({
    //     tipsText: '验证码不正确，请重新输入',
    //   });
    //   return;
    // }

    this._login(type, inputVal, codeVal ,yzVal);

  };
  // 验证码登录
  bindSubmit1 = () => {
    let inputVal = this.state.phonecode;
    let dtcode = this.state.dtcode;
    let yzcode = this.state.yzcode;
    let type = 1

    if (inputVal == '') {
      this.setState({
        isdis1:'block',
        tipsText1: '请输入手机号',
      });
      return;
    }
    if (yzcode == '') {
      this.setState({
        isdis1:'block',
        tipsText1: '请输入图形验证码',
      });
      return;
    }
    if (dtcode == '') {
      this.setState({
        isdis1:'block',
        tipsText1: '请输入验证码',
      });
      return;
    }
    this._login1(type, inputVal, dtcode);
  };

  /**
   * 刷新二维码
   * */
  refreshFunc = () => {

  };

  changeboxa = () => {
    if(this.state.switchType == 0) return
    this.setState({
      switchType: 0,
    });
    this._getverifyCode();
  }
  changeboxb = () => {
    if(this.state.switchType == 1) return
    this.setState({
      switchType: 1,
    });
    this._getverifyCode();
  }

  // 监听键盘回车
  handlekeydown=(e)=> {
    console.log(e)
    console.log(e.KeyCode)
    if (e.KeyCode == 13) {
      this.bindSubmit()
    }
  }

  handlekeydowns(event) {
    console.log(event.KeyCode)
    if (event.KeyCode == 13) {
      this.bindSubmit1()
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/index" />;
    }
    return (
      <div className="containerrr">
        <LoginHeader status='1'/>
        <div className="login_wrap">
          <div className="wrap clearfix">
            <div className={this.state.switchType === 0 ? 'loginBox' : 'hidepage'}>
              <div className='checkbox'>
                <div className='silde1' onClick={this.changeboxa}>账号密码登录</div>
                <div className='slide2 kc' onClick={this.changeboxb}>手机动态登录</div>
              </div>
              <span>
                <Link to="/register" className="regist">立即注册 ></Link>
              </span>
              <div className="login_pc">
                <p className="error_tips" style={{display: this.state.isdis, fontSize: '12px'}}>{this.state.tipsText}</p>
                <div className="loginForm" style={{paddingBottom: '30px'}}>
                  <div className="form_item_wrap">
                    <div className={this.state.autoFocusIpt ? 'form_item cur' : 'form_item'}>
                      <div className='user'></div>
                      <input className="input"
                        type="text"
                        value={this.state.iphoneIptVal}
                        placeholder={this.state.iphonePlaceholder}
                        ref={(iphoneInput) => this.iphoneInput = iphoneInput}
                        onMouseLeave={this.onMouseLeaveIpt}
                        onBlur={this.onBlurIpt}
                        onChange={(e) => this.iphoneIptChange(e)}
                      />
                    </div>
                    <div className="form_item">
                      <div className='lock'></div>
                      <input className="ecode"
                            type='password'
                            value={this.state.passwordVal}
                            onChange={(e) => this.codeIptChange(e)}
                            placeholder="密码"/>
                    </div>
                    <div className='form_item oo'>
                      <div className='yzform'></div>
                      <input className="ecode"
                        type="text"
                        value={this.state.yzcode}
                        onChange={(e) => this.yzcodeChange(e)}
                        placeholder="验证码"
                        onKeyDown={(e) => this.handlekeydown(e)}
                      />  
                    </div>                  
                    <div className='ewCodeimg' onClick={this.getOtherCode}><img className='codeimg' src={this.state.codeimg} /></div>
                    <span>
                      <Link to='/iforget'><p className='forget'>忘记密码？</p></Link>
                    </span>
                    <button className="login_btn" onClick={this.bindSubmit} >登录</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={this.state.switchType === 1 ? 'showpage codebox' : 'hidepage'}>
              <div className='checkbox'>
                <div className='slide2' onClick={this.changeboxa}>账号密码登录</div>
                <div className='silde1 kc'  onClick={this.changeboxb}>手机动态登录</div>
              </div>
              <span>
                <Link to="/register" className="regist">立即注册 ></Link>
              </span>
              <div className="login_pc"> 
                <p className="error_tips" style={{display: this.state.isdis1, fontSize: '12px'}}>{this.state.tipsText1}</p>
                <div className="loginForm" style={{paddingBottom: '30px'}}>
                  <div className='form_item'>                    
                    <div className='user'>
                    </div>
                    <input className="eecode"
                      type="text"
                      value={this.state.phonecode}
                      onChange={(e) => this.iphonecodeChange(e)}
                      placeholder="手机号码" />
                  </div>
                  <div className='form_item' style={{width: '236px'}}>
                    <div className='yzform'></div>
                    <input className="gcode"
                      type="text"
                      value={this.state.yzcode}
                      onChange={(e) => this.yzcodeChange(e)}
                      placeholder="验证码"/>  
                      <div className='ewCodeimg1' onClick={this.getOtherCode}><img className='codeimg' src={this.state.codeimg} /></div>
                  </div>
                  <div className="form_item oo" style={{width: '236px'}}>
                    <div className='yzform'></div>
                    <input className="gcode"
                      type="text"
                      value={this.state.dtcode}
                      onChange={(e) => this.dtcodeChange(e)}
                      placeholder="请输入短信验证码"
                      onKeyDown={this.handlekeydowns}
                    />
                      <div className='ewCodeimg1'>
                        <button className='getcodebtn' onClick={this.getdtcode} disabled={this.state.isClickable}>{this.state.codetxt}</button>
                      </div>
                  </div>
                  <span>
                    <Link to='/iforget'><p className='forget'>忘记密码？</p></Link>
                  </span>
                  <button className="login_btn1" onClick={this.bindSubmit1} >登录</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='footerr'>© COPYRIGHT 2018-2020 智果 版权所有 浙ICP备18056755号-1</div>
      </div>
    )
  }
}