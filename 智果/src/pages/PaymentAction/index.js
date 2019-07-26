import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import './index.less';
import scanIcon from '../../resource/assets/images/T1bdtfXfdiXXXXXXXX.png';
import {orderPay,queryPay} from '../../axios/api'
import {message,Spin} from 'antd'
import BankCard from '../bankCard'
import QRCode from 'qrcode'

// const QRCode = require('qrcode.react');

export default class PaymentAction extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    tips : '',
    tips1 : '',
    paySuccess : false,
    showLoading : false,
    payAmount : 0,
    redirect:false
  }
  _queryPay =() => {
    let params = {
      orderNo : this.state.orderNo,
      paymentType : this.state.paymentType
    }
    queryPay(params).then(res => {
      console.log(res)
      if(res.data.code=='1'){
        this.setState({
          paySuccess : true
        })
        message.success('订单支付成功，即将跳转')
        this.setState({
          showLoading :true
        })
        clearInterval(this.timerr)
        console.log('----------------',this)
        let timer = setTimeout(()=> {
          this.setState({
            redirect : true
          })
          clearTimeout(timer)
        },2000)
      }
    })
  }
  getTips =() => {
    let tips,tips1
    if(this.state.paymentType == '1'){
      tips = '打开手机支付宝'
      tips1 = '扫一扫继续付款'
    }
    if(this.state.paymentType == '2'){
      tips = '请使用微信扫一扫'
      tips1 = '扫描二维码支付'
      
    }
    this.setState({
      tips,
      tips1
    })
  }
  //设置定时器
  setTime = () => {
    clearInterval(this.timerr)
    this.timerr = setInterval(()=> {
      this._queryPay()
    },5000)
  }
  //初始化函数
  generateFuc = (orderInfo,paymentMethod) => {
    console.log('orderInfo-----',orderInfo)
    if(orderInfo){
      let data = orderInfo
      let orderId = data.orderId
      let orderNo = data.orderNo
      let payAmount = (data.payAmount - 0).toFixed(2)
      this.setState({
        orderId,
        orderNo,
        payAmount,
        paymentType : paymentMethod
      },() => {
        this.getTips()
        this._orderPay()
        if(paymentMethod == 3) {
          clearInterval(this.timerr)
          return
        }
        this.setTime()
      })
    }
    
  }

  componentWillMount() {
    console.log('页面加载了')
    this.generateFuc(this.props.orderInfo,this.props.paymentMethod)
  };
  componentWillReceiveProps(nextProps){
    this.generateFuc(nextProps.orderInfo,nextProps.paymentMethod)
  }
  componentWillUnmount(){
    console.log('页面卸载了')
    clearInterval(this.timerr)
  }
  _orderPay =() => {
    this.setState({
      showLoading : true
    })
    let params = {
      orderId:this.state.orderId,
      paymentType:this.state.paymentType
    }
    if(this.state.paymentType===3){
      console.log('美付宝')
      this.setState({
        showLoading : false
      })
      return
    }
    orderPay(params).then(res => {
      console.log('二维码---------',res)
      if(res.data.code=='1'){
        let qrcode
        this.setState({
          showLoading : false
        })
        if(this.state.paymentType == 1){
          qrcode = res.data.data.body
        }
        if(this.state.paymentType == 2){
          qrcode = res.data.data.code_url
        }
        this.setState({
          qrcode
        })
        if(qrcode){
          this.toQRCode(qrcode)
        }
      }else{
        message.error(res.data.msg)
      }
      
    })
  }
  //转二维码
  toQRCode =(qrcode) => {
    console.log('转化')
    QRCode.toDataURL(qrcode, function (err, url) {
      if (err) throw err
      let img = document.getElementById('image')
      img.src = url
    })
  }
  render() {
    
    const QrCodePay = (
      <div className="finance">
       <div className="paychat">
        <ul>
          <li>扫一扫付款（元）</li>
          <li>
            <span className="m">￥{this.state.payAmount}</span>
          </li>
          <li>
            <div className="p-wrap">
              <div className='imgBox'><img id='image' width="168" height="168" /></div>
              <div className="qrcode-img-explain clearfix">
                <img className="fn-left" src={scanIcon} alt="扫一扫标识" />
                <div className="fn-left tips">{this.state.tips}<br />{this.state.tips1}</div>
              </div>
            </div>
            {
              this.state.paymentType == '1' &&
              <div className="hv">hv</div>
            }
            {
              this.state.paymentType == '2' &&
              <div className='hv weixin'>hv</div>
            }
          </li>
        </ul>
      </div>
      </div>
    )
    return (
      <div className="payment-page">
        {
          this.state.redirect&&
          <Redirect to={`/orderDetail?orderId=${this.state.orderId}`}/>
        }
        <Spin spinning={this.state.showLoading} size='small'>
              {
                this.state.paymentType == 1 || this.state.paymentType == 2?
                  QrCodePay : null
              }
              {
                this.state.paymentType == 3?
                  <BankCard type='choose' payAmount={this.state.payAmount} orderId={this.state.orderId}/> : null
              }
        </Spin>
      </div>
    )
  }
}