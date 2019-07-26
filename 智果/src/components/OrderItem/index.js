import React from 'react';
import { Modal,message,Tabs,Spin} from 'antd';
import './index.less'
import {orderTake,orderDel,orderCancel,baseUrl,baseImgUrl,getOrderPackageList} from '../../axios/api';
export default class GoodTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  //获取订单状态
  getOrderStatusName(order){
    switch (order.status){
      case '1' :
        return(
          <span>未支付</span>
        )
      case '2' :
        return(
          <span>未发货</span>
        )
      case '3' :
        return(
          <span>已发货</span>
        )
      case '4' :
        return(
          <span>已收货</span>
        )
      case '5' :
        return(
          <span>已取消</span>
        )
      case '6' :
        return(
          <span>售后中</span>
        )
    }
  }
  generateOrderAction(order) {
    switch (order.status) {
      case '1':
        return (
          <div className="btnWrap">
            <span className="btn btn-danger" onClick={this.goPaymentPage.bind(this,order)}>立即付款</span>
            <span className="btn btn-danger" onClick={this.bindleCancelOrder.bind(this, order)}>取消订单</span>
          </div>
        );
      case '2':
        return (
          <div className="btnWrap">
            <span>等待发货中</span>
          </div>
        );
      case '3':
        return (
          <div className="btnWrap">
            {/*<span className="btn btn-primary">申请售后</span>*/}
            <span className="btn btn-primary" onClick={this.bindleConfirmReceive.bind(this, order)}>确认收货</span>
          
          </div>
        );
      case '4' :
        return(
          <div className="btnWrap">
            <span className="btn">买家已收货</span>
          </div>
        )
      case '5' :
        return(
          <div className="btnWrap">
            <span className="btn btn-primary" onClick={this.delOrder.bind(this, order)}>删除订单</span>
          </div>
        )
      case '6' :
        return(
          <div className="btnWrap">
            <span className="btn">查看售后</span>
          </div>
        )
      default :
        return (
          <div className="btnWrap">
            <span>其它</span>
          </div>
        );
    }
  };
  //取消订单
  bindleCancelOrder(order) {
    let orderId = order.orderId;
    this.setState({
      curOrder: order,
      visibleCancelOrder: true,
    })
  };
  //确认取消订单
  confirmOrder() {
    this.setState({
      confirmOrderLoading: false,
      visibleCancelOrder: false,
    });
    let {cancelReason, curOrder} = this.state;
    console.log(curOrder.orderId, cancelReason);
    let params = {
      orderId : curOrder.orderId
    }
    orderCancel(params).then(res => {
      console.log(res)
      if(res.data.code == '1'){
        message.success(res.data.msg)
        this.props.submitFresh()
      }else{
        message.error(res.data.msg)
      }
    })
    
  };
  // 取消弹窗
  handleCancelOrder() {
    this.setState({
      visibleCancelOrder: false
    })
  };
  //订单取消原因
  bindleCancelReason(e) {
    console.log(e.target.value);
    let cancelReason = e.target.value;
    this.setState({
      cancelReason
    });
  };
  // 确认收货二次确认
  bindleConfirmReceive(order) {
    this.setState({
      curOrder: order,
      visibleReceive: true,
    })
  };
  // 确定收货
  confirmReceive() {
    let orderId = this.state.curOrder.orderId
    this.setState({
      confirmReceiveLoading: false,
      visibleReceive: false,
    });
    let params = {
      orderId
    }
    orderTake(params).then(res => {
      console.log(res)
      if(res.data.code=='1'){
        message.success(res.data.msg)
        this.props.submitFresh()
      }else{
        message.error(res.data.msg)
      }
    })
    
  };
  //取消收货
  handleCancelReceive() {
    this.setState({
      confirmReceiveLoading: false,
      visibleReceive: false,
    });
  };
  //立即付款
  goPaymentPage =(order) => {
    console.log(order)
    this.props.submitGoOtherPage('payment',order)
  }
  //删除订单
  delOrder = (order) => {
    let curOrder = order
    this.setState({
      visibleDel : true,
      curOrder
    })
  }
  orderDelete = () => {
    let orderId = this.state.curOrder.orderId
    let params = {
      orderId
    }
    orderDel(params).then(res => {
      console.log(res)
      if(res.data.code == '1'){
        message.success(res.data.msg)
        this.props.submitGoOtherPage('order')
      }else{
        message.error(res.data.msg)
      }
      this.setState({
        visibleDel : false
      })
    })
  }
  orderDelCancel = () => {
    this.setState({
      visibleDel : false
    })
  }
  getPostType = (productType) => {
    switch (productType){
      case '1' :
        return '国内'
      case '2' :
        return '保税'
      case '3' :
        return '直邮'
      default :
        return '未知'
    }
    
  }
  //订单能否支付
  getOrderBuyStatus = (data) => {
    let buyStatus =data.some(good => {return good.stockStatus==='1'||good.stockStatus==='2'})&&this.props.orderInfo[0].status==='1'
    return buyStatus
  }
  render(){
    // 模态弹窗 - 订单取消
    const cancelModal = (
      <Modal title="订单取消"
             visible={this.state.visibleCancelOrder}
             onOk={this.confirmOrder.bind(this)}
             confirmLoading={this.state.confirmOrderLoading}
             onCancel={this.handleCancelOrder.bind(this)}
             cancelText="取消"
             okText='确定'
      >
        <div className="order-cancel-model">
          <div className="item clearfix">
            <div className="cont">确认取消此订单？</div>
          </div>
        </div>
      </Modal>
    );
    
    // 模态弹窗 - 确认收货
    const receiveModal = (
      <Modal title="确认收货"
             visible={this.state.visibleReceive}
             onOk={this.confirmReceive.bind(this)}
             confirmLoading={this.state.confirmReceiveLoading}
             onCancel={this.handleCancelReceive.bind(this)}
             cancelText="取消"
             okText='确定'
      >
        <div className="order-receive-model">
          确认收货吗？
        </div>
      </Modal>
    );
    // 模态弹窗 - 删除订单
    const delModal = (
      <Modal title="删除订单"
             visible={this.state.visibleDel}
             onOk={this.orderDelete.bind(this)}
        // confirmLoading={this.state.confirmReceiveLoading}
             onCancel={this.orderDelCancel.bind(this)}
             cancelText="取消"
             okText='确定'
      >
        <div className="order-receive-model">
          确认删除此订单？
        </div>
      </Modal>
    );
    return(
      <div>
        {cancelModal}
        {receiveModal}
        {delModal}
        <table className='goodTable'>
          <thead>
          <tr>
            <td colSpan='3'>商品</td>
            {/*<td>商品货号/sku</td>*/}
            <td>订单状态</td>
            <td>收货人</td>
            {/*<td>数量/单价</td>*/}
            <td>实付</td>
            {/*<td>订单操作</td>*/}
          </tr>
          </thead>
          <tbody>
          {this.props.data.map((item,index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={baseImgUrl+item.productImagePath}></img>
                  {
                    item.stockStatus === '1'&&
                    <span className='soldout-icon top-icon'>已售罄</span>
                  }
                  {
                    item.stockStatus === '2'&&
                    <span className='notEnough-icon top-icon'>库存不足</span>
                  }
                </td>
                <td className='goodInfo'>
                  <span>{item.productName}</span>
                  <br/>
                  <span className='tag'>{item.productTags}</span>
                </td>
                <td className='goodPrice'>
                  <span>￥{item.price}</span>
                  <br/>
                  <span>x{item.quantity?parseInt(item.quantity):''}</span>
                </td>
                {/*<td>*/}
                {/*{ <div>*/}
                {/*{item.productCode}*/}
                {/*<br/>*/}
                {/*{item.productSku}*/}
                {/*</div>}*/}
                {/*</td>*/}
                {
                  index==0&&
                  <td rowSpan={this.props.data.length}>
                    {this.getOrderStatusName(this.props.orderInfo[0])}
                  </td>
                }
                {
                  index==0&&
                  <td rowSpan={this.props.data.length}>
                    {this.props.orderInfo[0].consignee}
                    <br/>
                    {this.props.orderInfo[0].consigneePhone}
                  </td>
                }
                {
                  index==0&&
                  <td rowSpan={this.props.data.length}>
                    ￥{this.props.orderInfo[0].payAmount}
                    <div className="yf" style={{fontSize:'12px'}}>含运费￥{this.props.orderInfo[0].postage}</div>
                    <div className="yf" style={{fontSize:'12px'}}>含税费￥{this.props.orderInfo[0].tax}</div>
                  </td>
                }
                {/*{*/}
                  {/*index==0&&*/}
                  {/*<td rowSpan={this.props.data.length} >*/}
                    {/*{*/}
                      {/*this.getOrderBuyStatus(this.props.data)?*/}
                        {/*<div>*/}
                          {/*<span style={{display:'block'}}>订单商品库存不足</span>*/}
                          {/*<span className="btn btn-primary"*/}
                                {/*onClick={this.bindleCancelOrder.bind(this, this.props.orderInfo[0])}*/}
                                {/*style={{padding:'4px 15px',marginTop:'5px'}}*/}
                          {/*>取消订单</span>*/}
                        {/*</div>*/}
                        {/*:*/}
                        {/*this.generateOrderAction.bind(this, this.props.orderInfo[0])()*/}
                    {/*}*/}
                  {/**/}
                  {/*</td>*/}
                {/*}*/}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}