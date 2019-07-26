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
import './pageDueError.css'
import { getStoreInfo } from '../../axios/api'
import success from '../../resource/assets/images/success.png'
import ty from '../../resource/assets/images/ty.png'

export default class NoFound extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    
  }

  componentWillMount() {
    console.log('欢迎注册集客多');
    // this.getStoreInfo()
    // this.getUrlparams()   //提前抓住url参数备用
  }

  goDownload = () => {
    window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd'
  }

  render() {
    return (
        <div id="h5_pageDueError">
          <img className='codeImg' src={ty} />
          <p className='codeTxt'>很抱歉,该链接邀请已失效</p>
          <p className='codeTxta'>请联系您的小伙伴,重新获取邀请链接</p>
          <Button className='inviteBtns' type="primary" onClick={ this.goDownload }>立即下载集客多</Button>
        </div>
    )
  }
}