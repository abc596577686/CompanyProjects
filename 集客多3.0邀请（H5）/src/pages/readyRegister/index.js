import React from 'react';
import {
  Flex,
  WhiteSpace,
  Button,
  Modal,
  InputItem,
  Toast
} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './readyRegister.css'
import { getStoreInfo, ckeckIsAgent, getToken } from '../../axios/api'
import ty from '../../resource/assets/images/ty.png'

import sensors from 'sa-sdk-javascript';   //神策
var wx = require('weixin-js-sdk');

export default class NoFound extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    logoImg: '',
    inviteMan: ''
  }

  componentWillMount() {
    console.log('欢迎注册集客多');
    this.getStoreInfo()
    this.pageInit() //用户检测
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
        if (res.data.type == '1') {
          // 已经是卖家
          if (res.data.isShareUser == false) {
            // window.location.replace("inDownload?s=" + res.data.storeId)
          } else {                               
            window.location.replace("invite?s=" + res.data.storeId + '&isSignShare=true')
          }
        } else if (res.data.type == '2') {  //非卖家
          window.location.replace("invite?s=" + res.data.storeId + '&isSignShare=true')
        } else {
          //邀请代理商界面过期
          window.location.replace("pageDueError?s=" + res.data.storeId)
        }
      } else {
        console.log('页面出错啦')
      }
    })
  }

  getUrlPara(paraName) {
    var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  getStoreInfo = () => {
    let params = {
      storeId: this.getUrlPara("s")
    }
    getStoreInfo(params, 'post').then(res => {
      if (res.data.code == 1 || res.data.code == -10) {
        this.setState({
          logoImg: res.data.logo,
          inviteMan: res.data.shopName
        })
        let storeName = ''
        if (res.data.shopName != '') {
          storeName = res.data.shopName
        }
        let storeLogo = ''
        let link = window.location.href.split('#')[0];
        let title = storeName + '邀请你加入集客多';
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
              success: function () {
                console.log('分享成功')
              },
              cancel: function () {
                //console.log('分享111成功')
                // 用户取消分享后执行的回调函数
              }
            })
          })
        })
      }
      // else {
      //   Toast.info('页面数据获取失败', 1.4)
      // }
    })
  }

  goDownload = () => {
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd'
  }

  render() {
    return (
      <div id="h5_inviteReady">
        <img className='codeImg' src={ty} />
        <img className='logoImg' src={this.state.logoImg} />
        <p className='codeTxt'>{this.state.inviteMan}已邀请您注册过啦</p>
        <Button className='inviteBtns' type="primary" onClick={this.goDownload}>立即下载集客多赚钱</Button>
      </div>
    )
  }
}
