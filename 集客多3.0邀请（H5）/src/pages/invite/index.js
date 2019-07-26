import React from 'react';
import {
  Flex,
  WhiteSpace,
  Button,
  Modal,
  InputItem,
  Toast,
  Icon
} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
// import "antd/dist/antd.css";
import './invite.css'
import { sendCode, userRegister, getStoreInfo, ckeckIsAgent, getToken } from '../../axios/api'
import localImg from '../../resource/assets/images/localImg.png'
// import localBigWordImg from '../../resource/assets/images/backImg.png'
import watchleft from '../../resource/assets/images/watchleft.png'
import watchright from '../../resource/assets/images/watchright.png'
import testa from '../../resource/assets/images/test1.png'
import testb from '../../resource/assets/images/test2.png'
import testc from '../../resource/assets/images/test3.png'
import showImgUrl from '../../resource/assets/images/rightJt.png'

import sensors from 'sa-sdk-javascript';   //神策
var wx = require('weixin-js-sdk');

export default class NoFound extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    modal1: false,
    modal2: false,
    // yzcodetxt: '请输入验证码',
    btnText: '获取验证码',
    timer: 60,
    discodeBtn: false,
    clearInterval: false,
    mobile: '',
    yzcode: '',
    isSign: '',
    sidd: '',
    showMask: 0,
    shopName: '',
    logoImg: '',
    topImg: '',
    showPage: 0,
    localBigWordImg:'',
    localBigWordImgs:'',
    localBigWordImgss: '',
    isShareUsers: '',
    isShowLoading: false,
  }

  componentWillMount() {
    console.log('欢迎进入集客多');
    this.getUrlparams()   //提前抓住url参数备用
    this.pageInit()
    this.saSdk()
    this.track()
  }

  track = () => {
    setTimeout(() => {
      sensors.track('inviteH5View', {
        inviteType: '邀请VIP',
        inviteCode: ''
      })
    }, 1000)
  }

  saSdk = (para) => {
    sensors.init({      
      sdk_url: 'http://static.sensorsdata.cn/sdk/1.10.9/sensorsdata.min.js',
      heatmap_url: 'http://static.sensorsdata.cn/sdk/1.10.9/heatmap.min.js',
      name: 'sa',
      // web_url: 'http://sa.jikeduo.com.cn/?project=default',
      web_url: 'http://sa.jikeduo.com.cn/?project=production',
      // server_url: 'http://sa.jikeduo.com.cn:8106/sa?project=default',
      server_url: 'http://sa.jikeduo.com.cn:8106/sa?project=production',

      heatmap:{
        clickmap:'default',
        scroll_notice_map:'default',
        loadTimeout:  3000,
        isTrackLink: true,
        collect_url: function(){
          return true;
        },
        collect_element: function(element_target){
          // 如果这个元素有属性sensors-disable=true时候，不采集
          if(element_target.getAttribute('sensors-disable') === 'true'){
            console.log('不采集');
            return false;
          } else{
            console.log('采集');
            return true;
          }
        },
        collect_input:function(element_target){
          //例如如果元素的id是a，就采集这个元素里的内容
          if(element_target.id === 'a'){
            return true;
          }
        },
        scroll_delay_time: 2000
      }
    });

    let user_id = localStorage.getItem('__userId__') || '';
    sensors.login(user_id);
    sensors.quick('autoTrack');
  }

  pageInit = () => {
    // let link = window.location.href.split('#')[0];
    // console.log(link)
    let storeId = this.getUrlPara("s");
    let params = {
      storeId: storeId,
      type: 1
    }
    ckeckIsAgent(params, 'post').then(res => {
      if (res.data.code == '1') {
        if (res.data.type == '1') {    // 已经是卖家
          if (res.data.isShareUser == false) {   //非邀请人
            window.location.replace("inDownload?s=" + res.data.storeId);
          } else {   //邀请人
            this.setState({
              showPage: 1,
              isShareUsers: 1
            })
            this.getStoreInfo()  //加载本页面数据
          }
        } else if(res.data.type == '2'){  //非卖家
          this.setState({
            showPage: 1,
            isShareUsers: 0
          })
          this.getStoreInfo()  //加载本页面数据
        } else {
          //邀请代理商界面过期
          window.location.replace("pageDueError?s=" + res.data.storeId)
        }
      } else {
        // alert('页面出错啦,怀疑是接口有问题，但是没有证据，咱也不知道，咱也不敢问')
        alert('页面出错啦')
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { openBox } = nextProps;
    // console.log('nextProps', nextProps);
    // 获取验证码
    if (props.openBox.sendBoxMobileCode !== openBox.sendBoxMobileCode) {
      const { code, message } = openBox.sendBoxMobileCode;
      if (code === '0') {
        this.count();
      }
      // else {
      //   Toast.info(message);
      // }
    }
  }

  getStoreInfo = () => {
    let params = {
      storeId : this.getUrlPara("s")
    }
    getStoreInfo(params, 'post').then(res => {
      if (res.data.code == 1) {
        this.setState({
          shopName: res.data.shopName,
          logoImg: res.data.logo,
          shopName: res.data.shopName,
          localBigWordImg: res.data.imagePathList[0],
          localBigWordImgs: res.data.imagePathList[1],
          localBigWordImgss: res.data.imagePathList[2]
        })
        let storeName = ''
        if(res.data.shopName !=''){
          storeName = res.data.shopName
        }
        let storeLogo = ''
        let link = window.location.href.split('#')[0];
        let title = storeName+'邀请你加入集客多';
        let imgUrl = storeLogo;
        let desc = '听说打开这条链接的人都赚了大钱';
        let params = {
          url: link
        }
        getToken(params, 'post').then(res => {
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.appId, // 必填，公众号的唯一标识
              timestamp: res.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.nonceStr, // 必填，生成签名的随机串
              signature: res.signature, // 必填，签名，见附录1
              jsApiList: [
                'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          
          wx.ready(function () {
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: link, // 分享链接
              imgUrl: imgUrl, // 分享图标
              success() {
                  console.log('分享成功')
              },
              cancel() {
                  //console.log('分享11成功')
                  // 用户取消分享后执行的回调函数
              }
            })
            
            // 分享给朋友
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接
              imgUrl: imgUrl, // 分享图标
              success: function() {
                  console.log('分享成功')
              },
              cancel: function() {
                  //console.log('分享111成功')
                  // 用户取消分享后执行的回调函数
              }
            })
          })
        })
      }else if(res.data.code == '-10'){
        //已经是卖家
        if(res.data.isShareUser == false){ //自己
          window.location.replace( "inDownload?s=" + this.state.sidd)
        }
      }else{
        Toast.info('页面数据获取失败',1.4)
      }
    })
  }

  getUrlparams = () => {
    let isSign = this.getUrlPara('isSignShare')
    let sidd = this.getUrlPara("s");
    this.setState({
      isSign,
      sidd
    }, () => {
      console.log(this.state.isSign)
      console.log(this.state.sidd)
    })
  }
  
  getUrlPara(paraName) {
    var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  sendCode = () => {
    this.setState({
      discodeBtn: true   //使不可点击
    })
    let params = {
      mobile: this.state.mobile,
      countryCode: 86,
      codeType: 5
    }
    sendCode(params, 'post').then(res => {
      if (res.data.code == 1) {
        Toast.info(res.data.msg, 1.4)
        this.setState({
          timer: this.state.timer=this.state.timer-1,
          btnText: this.state.timer+'s',
        }, () => {
          this.count();
        })
      } else {
        Toast.info(res.data.msg,1.4)
        this.setState({
          discodeBtn: false
        })
      }
    })
  }

  count = () => {
    let siv = setInterval(() => {
      this.setState({
        timer: this.state.timer=this.state.timer-1,
        btnText: this.state.timer+'s',
      }, () => {
        if (this.state.timer == 0) {
          clearInterval(siv);
          this.setState({
            timer: 60,
            btnText: '重新发送',
            discodeBtn: false
          })
        }
      });
    }, 1000);
  }

  closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = this.closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  // getCode = () => {
  //   this.setState({
  //     yzcodetxt: '点我干嘛？'
  //   })
  // }

  mobileHandle = (value) => {
    this.setState({
      mobile: value
    })
  }
  yzcodeHandle= (value) => {
    this.setState({
      yzcode: value
    })
  }

  sumbitInvite = () => {
    this.setState({
      isShowLoading: true
    })
    if (this.state.mobile == '' || this.state.mobile == null ) {
      Toast.info('请先填写手机号 T-T', 1.4)
      this.setState({
        isShowLoading: false
      })
      return
    }
    if (this.state.yzcode == '' || this.state.yzcode == null ) {
      Toast.info('请先填写验证码 T-T', 1.4)
      this.setState({
        isShowLoading: false
      })
      return
    }
    let params = {
      mobile: this.state.mobile,   //账号
      smsCode: this.state.yzcode,  //验证码
      storeId: this.state.sidd,
      isSignShare: this.state.isSign,
      isVipSignUp: true,
    }
    userRegister(params, 'post').then(res => {
      if (res.data.code == 1) {
        Toast.info(res.data.msg, 1.4)
        this.setState({
          modal2: false
        })
        window.location.replace( "code" );
        this.setState({
          isShowLoading: false
        })
      } else {
        this.setState({
          isShowLoading: false
        })
        Toast.info(res.data.msg, 2)
      }
    })
  }

  showShare = () => {
    this.setState({
      showMask: 1
    })
  }

  closeMask= () => {
    this.setState({
      showMask: 0
    })
  }


  render() {
    return (
      <div id="h5_invite">
        {
          this.state.showPage == 1 ?
          <div>
            <header>
              <Flex
                direction='row'
                justify='center'
                style={{ width: '100%', height: '1.76rem' }}
              >
                <div className="headImg">
                  {
                    this.state.logoImg != '' ?
                      <img src={this.state.logoImg} />
                      : <img src={localImg} />
                  }
                </div>
                <div className="headTxt">
                  <p>你好，我是{this.state.shopName}</p>
                  <p>现在注册集客多，和我一起卖补剂挣钱~</p>
                </div>
              </Flex>
            </header>
            <section className='localBigWordImg'>
              <img src={this.state.localBigWordImg} />
            </section>
            {/* <section className='brandList'>
              <Flex
                direction='row'
                justify='center'
                className='brand_top'
              >
                <img src={watchleft} />
                <p>500+知名品牌入驻</p>
                <img src={watchright} />
                </Flex>
                <img src={this.state.localBigWordImgs} />
            </section> */}
            <section className='midImg'>
              <img src={this.state.localBigWordImgs} />
            </section>
            <section>
              <Flex
                direction='row'
                justify='center'
                className='brand_source'
              >
                <img src={testa} />
                <div>
                  <p className='brand_source_p1'>自由改价，随心所挣</p>
                  <p className='brand_source_p2'>每款商品都可以灵活设置利润，从容面对人情世故、硬核比价，想挣多少由你来定！</p>
                </div>
              </Flex>
            </section>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <section>
              <Flex
                direction='row'
                justify='center'
                className='brand_source'
              >
                <img src={testc} />
                <div>
                  <p className='brand_source_p1'>隐藏货源，保护渠道</p>
                  <p className='brand_source_p2'>商品链接不含任何渠道信息，消费者仅能查看商品介绍，全程保护您的利益！</p>
                </div>
              </Flex>
            </section>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <section>
              <Flex
                direction='row'
                justify='center'
                className='brand_source'
              >
                <img src={testb} />
                <div>
                  <p className='brand_source_p1'>安全正品，一件代发</p>
                  <p className='brand_source_p2'>品牌直供，产地直采，一手货源，保证正品，专属中央物流系统一件代发，助你卖货无忧！</p>
                </div>
              </Flex>
            </section>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <section>
              <Flex
                direction='row'
                justify='center'
                className='brand_title'
              >
                <span className='colCover'></span>
                {this.state.shopName}也喜欢的商品，推荐你也试试
                <span className='colCover1'></span>
              </Flex>
            </section>
            <WhiteSpace size="lg" />
            <p className='tip'>进入app可以咨询拿货价~</p>
            <section className='midImg'>
              <img src={this.state.localBigWordImgss} />
            </section>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            {/* <section className='botBtn'>
              <Button className='inviteBtn' type="primary" onClick={this.showModal('modal2')}>立即注册</Button>
            </section> */}
            {
              !this.state.modal2 && this.state.isShareUsers == 0?
              <section className='botBtn'>
                <Button className='inviteBtn' type="primary" onClick={this.showModal('modal2')}>立即注册</Button>
              </section>
              :null
            }
            {
              this.state.isShareUsers == 1?   
              <section className='botBtn'>
                <Button className='inviteBtn' type="primary" onClick={this.showShare}>邀请好友</Button>
              </section>
              :null
            }
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <Modal
              popup
              visible={this.state.modal2}
              onClose={this.onClose('modal2')}
              animationType="slide-up"
            // afterClose={() => { alert('afterClose'); }}
              >
              {
                this.state.isShowLoading == true?
                    <Icon className='loadingIcon' type='loading' size='lg' style={{ color: '#000' }}/>
                :null
              }
              <p>注册</p>
              <div style={{ height: '4.34rem', padding: '.3rem' }}>
                <Flex
                  direction='row'
                  justify='center'
                  className='register_item'
                  style={{ height: '1rem' }}
                >
                  <InputItem
                    type="number"
                    placeholder="请输入账号"
                    onChange={this.mobileHandle}
                    value={this.state.mobile}
                    // style={{ height: '1rem' }}
                    maxLength='11'
                  >
                  </InputItem>
                </Flex>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Flex
                  direction='row'
                  justify='center'
                  className='register_item'
                  style={{ height: '1rem' }}
                >
                  <InputItem
                    type="number"
                    placeholder="请输入验证码"
                    onChange={this.yzcodeHandle}
                    value={this.state.yzcode}
                    // style={{ width: '.5rem' }}
                    className='yzcodeInput'
                    maxLength='6'
                  >
                  </InputItem>
                  <Button className='getYzcodeBtn' disabled={this.state.discodeBtn} onClick={this.sendCode}>
                    {this.state.btnText}
                  </Button>
                </Flex>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button
                  className='inviteBtns'
                  type="primary"
                  onClick={this.sumbitInvite}
                  // loading={true}
                >确认注册</Button>
              </div>
            </Modal>
            {
              this.state.showMask == 1 ?
              <div className='coverMask' onClick={this.closeMask}>
                <img src={showImgUrl} />
                <p>点击右上角继续分享邀请好友~</p>
              </div>
              : null
            }
          </div>
          :null
        }
      </div>
    )
  }
}