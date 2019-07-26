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
import './registerSuccess.css'
import { getStoreInfo } from '../../axios/api'
import success from '../../resource/assets/images/success.png'

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
        <div id="h5_inviteSuccess">
          <img className='codeImg' src={success} />
          <p className='codeTxt'>恭喜您，注册成功</p>
          <Button className='inviteBtns' type="primary" onClick={ this.goDownload }>立即下载集客多赚钱</Button>
        </div>
    )
  }
}