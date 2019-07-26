import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Modal,message} from 'antd';
import {getOrderDetail} from '../../axios/api'
import './index.less';
import PaymentAction from '../../pages/PaymentAction'
import HomeHeader from '../../components/HomeHeader'
import PageFooter from '../../components/PageFooter'
import IHeader from "../../components/Header/index";

export default class Payment extends React.Component {

  state = {
    orderCount: 1,
    paymentType: 1,
    isGetMsgCode: true,
    btnText: '获取验证码',
    isSelectedPaymentType: false,
    amount : '',
    orderId : '',
    orderNo : '',
    // paymentMethod : 1
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() {
    window.scrollTo(0,0)
    let data = this.props.history.location.state
    console.log('数据-------',data)
    this.setState({
      orderId : data.orderId,
      orderNo : data.orderNo,
      amount : data.amount
    },() => {
      this.getOrderDetail()
    })
  };
  //订单能否支付
  getOrderBuyStatus = (data) => {
    let buyStatus =data.some(good => {return good.stockStatus==='1'||good.stockStatus==='2'})
    return buyStatus
  }
  getOrderDetail =()=> {
    let params = {
      orderId : this.state.orderId
    }
    getOrderDetail(params).then(res => {
      console.log(res)
      if(res.data.code == '1'){
        let buyStatus = this.getOrderBuyStatus(res.data.orderItemList)
        if(buyStatus){
          message.error('该订单中商品库存不足，请重新下单')
          this.props.history.push('/')
        }
        this.setState({
          orderInfo : res.data.orderInfo[0],
          orderItemList : res.data.orderItemList
        })
      }
    })
  }

  // 显示订单详情
  bindleShowOrderDetail = () => {
    Modal.info({
      title: '订单详情',
      iconType: 'none',
      content: (
        <ul className="orderDetailInfo">
          <li className="item">
            <div className="label">订单编号: </div>
            <div className="cont">{this.state.orderInfo.orderNo}</div>
          </li>
          <li className="item">
            <div className="label">商品名称: </div>
            <div className="cont">
              {
                this.state.orderItemList.map((item,index) => {
                  return(
                    <div key={index} className='good-item'>
                      <span>&nbsp;{item.productName}&nbsp;{item.productTags}</span>
                      <span>&nbsp;&nbsp;X{parseInt(item.quantity)}</span>
                    </div>
                  )
                })
              }
            </div>
          </li>
          <li className="item">
            <div className="label">交易金额: </div>
            <div className="cont">￥{(this.state.orderInfo.payAmount-0).toFixed(2)}</div>
          </li>
          <li className="item">
            <div className="label">收件人: </div>
            <div className="cont">{this.state.orderInfo.consignee}</div>
          </li>
          <li className="item">
            <div className="label">收货地址: </div>
            <div className="cont">{this.state.orderInfo.address}</div>
          </li>
        </ul>
      ),
      onOk() {}
    });
  };
  // 选择支付宝
  bindleAlipay = () => {
    this.setState({
      paymentMethod: 1,
      paymentType: 0,
      isSelectedPaymentType: true
    })
  };

  // 选择微信
  bindleWechat = () => {
    this.setState({
      paymentMethod: 2,
      paymentType: 0,
      isSelectedPaymentType: true
    })
  };
  //选择美付宝
  bindleMfb = () => {
    this.setState({
      paymentMethod : 3,
      paymentType : 0,
      isSelectedPaymentType: true
    })
  }
  
  // 获取验证码
  // getMsgCode = () => {
  //   if (!this.state.isGetMsgCode) {
  //     return;
  //   }
  //   let count = 60;
  //   count--;
  //   this.setState({
  //     btnText: `${count}s后重新获取`,
  //     isGetMsgCode: false,
  //   });
  //   let timer = setInterval(() => {
  //     count--;
  //     if (count === 0) {
  //
  //       this.setState({
  //         btnText: `重新获取验证码`,
  //         isGetMsgCode: true,
  //       });
  //       clearInterval(timer);
  //     } else {
  //       this.setState({
  //         btnText: `${count}s后重新获取`
  //       });
  //     }
  //   }, 1000)
  // };

  // 支付类型选择 0第三方  1余额支付
  // bindlePaymentType = (e) => {
  //   let selectPaymentType;
  //   if (!e) {
  //     selectPaymentType = '1';
  //   } else {
  //     selectPaymentType = e.target.value;
  //   }
  //   console.log(selectPaymentType);
  //
  //   this.setState({
  //     isSelectedPaymentType: true
  //   });
  //   switch (selectPaymentType) {
  //     case '0':
  //       this.bindleAlipay();
  //       this.setState({
  //         paymentType: 0
  //       });
  //       break;
  //     case '1':
  //       this.cancelSelectedAlipay();
  //       this.setState({
  //         paymentType: 1
  //       });
  //       break;
  //   }
  // };

  // 立即支付
  bindlePayment = () => {
    if (!this.state.isSelectedPaymentType) {
      alert('请选择支付方式');
      return;
    }
        this.props.history.push({
          pathname : '/paymentaction',
          state : {
            orderId : this.state.orderId,
            paymentTypeId : this.state.paymentMethod,
            orderNo : this.state.orderNo,
            payAmount : this.state.orderInfo.payAmount
          }
        })
    // console.log('选择支付类型： ', this.state.paymentType);
  };

  render() {
    return (
      <div className="payment-page clearfix">
        <IHeader/>
        <HomeHeader isHome={false} isBuyStatus={true} buyStatus={2}/>
        <div className="page-box minW">
          <div className="pay-head">
            <div className="pay-t">
              提交<span className="pay-count">{this.state.orderCount}笔</span>订单成功
              <span className="go-order" onClick={this.bindleShowOrderDetail}>查看订单详情</span>
            </div>
            <div className="pay-b clearfix">
              <span className="pull-left">
                为保证价格和库存不影响您的订单，请在12小时内完成付款
              </span>
              <span className="pull-right">
                合计金额&nbsp;&nbsp;&nbsp;
                <em className="count"><span>￥</span>{(this.state.amount-0).toFixed(2)}</em>
              </span>
            </div>
          </div>
          <div className="pay-body">
            <div className="pay-sel clearfix">
              {/*<label className="label">*/}
                {/*<input type="radio"*/}
                   {/*name="paymentMethod"*/}
                   {/*value='0'*/}
                   {/*onChange={this.bindlePaymentType}*/}
                   {/*checked={this.state.paymentType === 0 ? true : false}/> 第三方*/}
              {/*</label>*/}
              <div className='label'>请选择支付方式</div>
              <ul className="payList">
                <li className={this.state.paymentMethod === 1 ? 'item active' : 'item'} onClick={this.bindleAlipay}>
                  <span className="ck">
                    <i className="fa fa-check-circle-o"/>
                  </span>
                  <span className="bk bank-alipay">allinpay_alipay</span>
                </li>
                <li className={this.state.paymentMethod === 2 ? 'item active' : 'item'} onClick={this.bindleWechat}>
                  <span className="ck">
                    <i className="fa fa-check-circle-o"/>
                  </span>
                  <span className="bk bank-wechatpay">allinpay_weixin</span>
                </li>
                {/*<li className={this.state.paymentMethod === 3 ? 'item active' : 'item'} onClick={this.bindleMfb}>*/}
                  {/*<span className="ck">*/}
                    {/*<i className="fa fa-check-circle-o"/>*/}
                  {/*</span>*/}
                  {/*<span className="bk bank-mfb">allinpay_mfb</span>*/}
                {/*</li>*/}
              </ul>
            </div>
              {
                this.state.paymentMethod&&
                <PaymentAction
                  paymentMethod={this.state.paymentMethod}
                  orderInfo={this.state.orderInfo}
                />
              }
            {/*<div className="pay-sel myzoom clearfix">*/}
              {/*<label className="label">*/}
                {/*<input type="radio"*/}
                   {/*name="paymentMethod"*/}
                   {/*value='1'*/}
                   {/*onChange={this.bindlePaymentType}*/}
                   {/*checked={this.state.paymentType === 1 ? true : false}/> 余额支付*/}
              {/*</label>*/}
              {/*<ul className="formList">*/}
                {/*<li className="formGroup">*/}
                  {/*<input className="form-control" type="text" placeholder="6位验证码"/>*/}
                {/*</li>*/}
                {/*<li className="formGroup">*/}
                  {/*<button className="btn btn-primary sendCodeBtn"*/}
                          {/*onClick={this.getMsgCode}>{this.state.btnText}</button>*/}
                {/*</li>*/}
                {/*<li className="formGroup">*/}
                  {/*<div className="remain">当前账户余额（元）: <span className="remainder">8968.00</span></div>*/}
                {/*</li>*/}
              {/*</ul>*/}
            {/*</div>*/}
            {/*<div className="pay-sel clearfix">*/}
              {/*<label htmlFor="" className="label"/>*/}
              {/*<div className="btnWrap">*/}
                {/*<button className="btn btn-danger paymentBtn" onClick={this.bindlePayment}>立即支付</button>*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
        </div>
        <PageFooter/>
      </div>
    )
  }
}