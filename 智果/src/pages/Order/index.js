import React from 'react';
import IHeader from '../../components/Header';
import HomeHeader from '../../components/HomeHeader'
import { Link } from 'react-router-dom';
import { DatePicker, Modal, Pagination, message, Spin, Card, Tabs, Input, Form, Row, Col, Button } from 'antd';
import moment from 'moment';
import PageFooter from '../../components/PageFooter'
import 'moment/locale/zh-cn';
import { getNowFormatDate, dateFormate } from '../../utils/utils';
import './index.less';
import { getOrderList_api, orderTake, orderDel, orderCancel, baseUrl,baseImgUrl,editRemark } from '../../axios/api';
import { ERR_OK } from '../../axios/config';
import HandleBar from '../../components/HandleBar'
const TabPane = Tabs.TabPane
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const FormItem = Form.Item
export default class Order extends React.Component {
  state = {
    selectOrderType: 0,  // 订单类型默认第一个
    searchOrderId: '', // 搜索的订单ID
    searchReceiveUser: '',
    startTime: '',  //开始时间
    endTime: '', //结束时间
    logisticsType: 0, //默认选中第一个
    status: 0, //默认全部订单 0:全部 1:待付款 2:待发货 3:收货 4:异常订单
    orderList: [], //订单列表,
    curOrder: null, //当前选择的订单
    visibleCancelOrder: false,
    visibleReceive: false,
    confirmOrderLoading: false,
    confirmReceiveLoading: false,
    cancelReason: '', //订单取消原因
    pageSizeOptions: ['10', '15', '30', '60', '100'],
    pageSize: 10,
    pageidx: 1,
    dataTotal: 100,
    defaultCurrent: 1,
    visibleDel: false,
    showLoading: true,
    deliverOrderNumber: '0',
    newOrderNumber: '0',
    overOrderNumber: '0',
    unDeliverOrderNumber: '0'
  };
  showLoading = () => {
    this.setState({
      showLoading: true
    })
  }
  hideLoading = () => {
    this.setState({
      showLoading: false
    })
  }

  // Render之前
  componentWillMount() {
    console.log('ShoppingPage');
    let userInfo = JSON.parse(localStorage.getItem('__userInfo__'));
    this.setState({
      userInfo
    });
    

    // if (this.props.location.state) {
    //   let data = this.props.location.state
    //   this.setState({
    //     status: data.idx,
    //     selectOrderType: data.idx
    //   }, () => {
    //     this._getOrderList();
    //   })
    // } else {
      this._getOrderList();
    // }

    // let data = this.props.location.state
    // console.log('--------d', data)
    // if (data !== undefined) {
    //   this.setState({
    //     status: data.idx,
    //     selectOrderType: data.idx
    //   }, () => {
    //     this._getOrderList();
    //   })
    // } else {
    //   this._getOrderList();
    // }
  };

  // 获取订单列表
  _getOrderList() {
    this.showLoading()
    let params = {
      orderStatus: this.state.status,
      orderNo: this.state.searchOrderId,
      customerName: this.state.searchReceiveUser,
      beginTime: this.state.startTime,
      endTime: this.state.endTime,
      pageidx: this.state.pageidx,
      pagesize: this.state.pageSize,
      mobile: this.state.phone
    }
    getOrderList_api(params).then(res => {
      console.log('订单列表：', res);
      if (res.data.code !== ERR_OK) {
        return;
      }
      let orderList = res.data.data;
      // let dataTotal = orderList.length;
      this.hideLoading()
      this.setState({
        orderList,
        total: res.data.total,
        orderInfo: res.data
      });
    })
  };
  getDownloadUrl = () => {
    let base = baseUrl + 'order/getOrderReport?'
    // if(this.state.status){
    base += `orderStatus=${this.state.status}`
    // }
    if (this.state.searchOrderId) {
      base += `&orderNo=${this.state.searchOrderId}`
    }
    if (this.state.searchReceiveUser) {
      base += `&customerName=${this.state.searchReceiveUser}`
    }
    if (this.state.phone) {
      base += `&mobile=${this.state.phone}`
    }
    if (this.state.beginTime) {
      base += `&beginTime=${this.state.startTime}&endTime=${this.state.endTime}`
    }
    return base

    // `${baseUrl}order/getOrderReport?orderStatus=${this.state.status}&orderNo=${this.state.searchOrderId}&customerName=${this.state.searchReceiveUser}&mobile=${this.state.phone}&beginTime=${this.state.startTime}&endTime=${this.state.endTime}`

  }

  // 切换订单类型
  bindleOrderType(typeIndex) {
    console.log(typeIndex);

    let orderType = typeIndex;
    this.setState({
      selectOrderType: typeIndex,
      status: orderType,
      pageidx: 1
    }, () => {
      this._getOrderList();
    });

  };
  changeTabs = (e) => {
    console.log(e)
    let orderType = e;
    this.setState({
      selectOrderType: orderType,
      status: orderType,
      pageidx: 1
    }, () => {
      this._getOrderList();
    });
  }

  // 搜索订单号/商品名称
  bindleSearchOrderid = (e) => {
    console.log(e.target.value);
    let searchOrderId = e.target.value;
    this.setState({
      searchOrderId,
    });
  };

  // 搜索收货人/手机号
  bindReceivePhone = (e) => {
    let phone = e.target.value
    this.setState({
      phone
    })
  }
  bindleSearchReceiveUser = (e) => {
    console.log(e.target.value);
    let searchReceiveUser = e.target.value;
    this.setState({
      searchReceiveUser,
    });
  };


  // 日期变化
  bindleDateChange = (moment, str) => {
    console.log(moment, str);
    let reg = new RegExp('/', 'g')
    // let start = encodeURIComponent(moment[0]._i.replace(reg,'-'))
    // let end = encodeURIComponent(moment[1]._i.replace(reg,'-'))
    // console.log('1---------',start,end)
    let startTime = str[0] + ' 00:00:00';
    let endTime = str[1] + ' 00:00:00';
    // startTime = encodeURIComponent(startTime)
    // endTime = encodeURIComponent(endTime)
    console.log('2-------', startTime, endTime)
    this.setState({
      startTime,
      endTime,
    })
  };

  // 物流筛选 0:所有 1:有 2:无
  bindleLogisticsChange = (e) => {
    console.log(e.target.value);
    let logisticsType = e.target.value;
    this.setState({
      logisticsType
    })
  };

  //搜索
  bindleSearch = () => {
    this._getOrderList()
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
    let { cancelReason, curOrder } = this.state;
    console.log(curOrder.orderId, cancelReason);
    let params = {
      orderId: curOrder.orderId
    }
    orderCancel(params).then(res => {
      console.log(res)
      if (res.data.code == '1') {
        message.success(res.data.msg)
        this._getOrderList(params)
      } else {
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
      if (res.data.code == '1') {
        message.success(res.data.msg)
        this._getOrderList()
      } else {
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

  // 查看物流
  bindleViewLogistics(order) {
    Modal.info({
      title: '查看物流',
      content: (
        <div className="logistics-order">
          <p>物流信息物流信息物流</p>
        </div>
      ),
      onOk() {
      },
    })
  };
  //立即付款
  goPaymentPage = (order) => {
    console.log(order)
    let orderId = order.orderId
    let amount = order.payAmount
    let orderNo = order.orderNo
    this.props.local.history.push({
      pathname: '/payment',
      state: {
        orderId,
        amount,
        orderNo
      }
    })
  }
  //删除订单
  delOrder = (order) => {
    let curOrder = order
    this.setState({
      visibleDel: true,
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
      if (res.data.code == '1') {
        message.success(res.data.msg)
        this._getOrderList()
      } else {
        message.error(res.data.msg)
      }
      this.setState({
        visibleDel: false
      })
    })
  }
  orderDelCancel = () => {
    this.setState({
      visibleDel: false
    })
  }

  // 订单状态对应的操作
  generateOrderAction(order) {
    switch (order.status) {
      case '1':
        return (
          <div className="btnWrap">
            <span className="btn btn-danger btn-sm" onClick={this.goPaymentPage.bind(this, order)}>立即付款</span>
            <span className="btn btn-danger btn-sm" onClick={this.bindleCancelOrder.bind(this, order)}>取消订单</span>
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
            <span className="btn btn-primary" onClick={this.bindleConfirmReceive.bind(this, order)}>确认收货</span>
            {/*<span className="btn">申请退换货</span>*/}
            {/*<span className="btn btn-primary" onClick={this.bindleViewLogistics.bind(this, order)}>查看物流</span>*/}
          </div>
        );
      case '4':
        return (
          <div className="btnWrap">
            <span className='btn'>买家已收货</span>
            {/*<span className="btn">申请退换货</span>*/}
            {/*<span className="btn btn-primary" onClick={this.bindleViewLogistics.bind(this, order)}>查看物流</span>*/}
          </div>
        )
      case '5':
        return (
          <div className="btnWrap">
            <span>已取消</span>
            <span className="btn btn-primary" onClick={this.delOrder.bind(this, order)}>删除订单</span>
          </div>
        )
      case '6':
        return (
          <div className="btnWrap">
            <span className="btn">查看售后</span>
          </div>
        )
      default:
        return (
          <div className="btnWrap">
            <span></span>
          </div>
        );
    }
  };
  //获取订单状态
  getOrderStatusName(order) {
    switch (order.status) {
      case '1':
        return (
          <span>未支付</span>
        )
      case '2':
        return (
          <span>未发货</span>
        )
      case '3':
        return (
          <span>已发货</span>
        )
      case '4':
        return (
          <span>已收货</span>
        )
      case '5':
        return (
          <span>已取消</span>
        )
      case '6':
        return (
          <span>售后中</span>
        )
        default :
        return null
    }
  }

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
      pageSize: pageSize,
      pageidx: page
    }, () => {
      this._getOrderList()
    })

  };

  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({
      pageSize,
      pageidx: 1,
    }, () => {
      this._getOrderList();
    });


  };

  goBatchPage = () => {
    // this.props.history.push({
    //   pathname: '/batch'
    // })
    window.location.href='/batch'
  }
  getOrderNum = (i) => {
    let data = this.state.orderInfo
    if (data !== undefined) {
      switch (i) {
        case 0:
          console.log('---------', data.total)
          return ''
        case 1:
          return data.newOrderNumber==='0'?'':data.newOrderNumber
        case 2:
          return data.unDeliverOrderNumber==='0'?'':data.unDeliverOrderNumber
        case 3:
          return data.deliverOrderNumber==='0'?'':data.deliverOrderNumber
        case 4:
          return ''
        case 5:
          return ''
        default:
          return ''
      }
    } else {
      return ''
    }

  }
  getPostType = (productType) => {
    switch (productType) {
      case '1':
        return '国内'
      case '2':
        return '保税'
      case '3':
        return '直邮'
      default:
        return '未知'
    }
  }
  getOrderBuyStatus = (order) => {
    let buyStatus =order.orderItemList.some(good => {return good.stockStatus==='1'||good.stockStatus==='2'})&&order.status==='1'
    return buyStatus
  }
  showRemark = (item) => {
    let curRemark = item.buyerMessage
    let orderId = item.orderId
    this.setState({
      editModal : true,
      curRemark,
      curOrderId : orderId
    })
  }
  getRemark = (e) => {
    let value = e.target.value
    this.setState({
      curRemark : value
    })
  }
  //保存备注
  remarkOk = () => {
    let params = {
      orderId : this.state.curOrderId,
      buyerMessage : this.state.curRemark
    }
    editRemark(params).then(res => {
      if(res.data.code==='1'){
        message.success(res.data.msg)
        this.setState({
          editModal : false
        })
        this._getOrderList()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  remarkCancel = () => {
    this.setState({
      editModal : false
    })
  }
  render() {
    // 订单类型
    const orderType = [
      '全部',
      '待付款',
      '待发货',
      '待收货',
      '已收货',
      '已取消',
    ];
    // 物流信息
    const logistics = ['有', '无'];
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';
    const dateFormater = 'YYYY-MM-DD HH:mm:ss'

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
          {/*<div className="item clearfix">*/}
          {/*<div className="label">订单状态:</div>*/}
          {/*<div className="cont">待付款</div>*/}
          {/*</div>*/}
          {/*<div className="item clearfix">*/}
          {/*<div className="label">取消原因:</div>*/}
          {/*<div className="cont">*/}
          {/*<textarea className="reason" onChange={this.bindleCancelReason.bind(this)}*/}
          {/*value={this.state.cancelReason}/>*/}
          {/*</div>*/}
          {/*</div>*/}
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
    //编辑备注
    const editModal = (
      <Modal title="编辑备注"
             visible={this.state.editModal}
             onOk={this.remarkOk}
             onCancel={this.remarkCancel}
             cancelText="取消"
             okText='保存'
      >
        <div className="order-receive-model">
          <Input.TextArea placeholder='请输入订单备注' value={this.state.curRemark} onChange={this.getRemark}>
          
          </Input.TextArea>
        </div>
      </Modal>
    );

    return (
      <div className="order-page">
        {cancelModal}
        {receiveModal}
        {delModal}
        {editModal}
        {/* <HandleBar /> */}
        {/* <IHeader userInfo={this.state.userInfo} /> */}
        {/* <HomeHeader navIndex={1} isHome={false} /> */}
          <div className="page-box ">
            <div className="page-content-wrapper">
              <Card hoverable={true}>
                <Spin spinning={this.state.showLoading} wrapperClassName='loadLogo'>
                  <div className="topSearch">
                  <Form>
                    <Row>
                      <Col span={7}>
                        <FormItem label='订单号' {...formItemLayout} >
                          <Input
                            type="text"
                            placeholder="请输入订单号"
                            value={this.state.searchOrderId}
                            onChange={this.bindleSearchOrderid}
                          />
                        </FormItem>
                      </Col>
                      <Col span={7}>
                        <FormItem label='收货人' {...formItemLayout} >
                          <Input
                            type="text"
                            placeholder="请输入姓名"
                            value={this.state.searchReceiveUser}
                            onChange={this.bindleSearchReceiveUser}
                          />
                        </FormItem>
                      </Col>
                      <Col span={7}>
                        <FormItem label='手机号' {...formItemLayout} >
                          <Input
                            type="text"
                            placeholder="请输入收货人手机号"
                            value={this.state.phone}
                            onChange={this.bindReceivePhone}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={7}>
                        <FormItem label='支付日期' {...formItemLayout} >
                          <RangePicker
                            defaultValue={[moment(getNowFormatDate(), dateFormater), moment(getNowFormatDate(), dateFormater)]}
                            format={dateFormat} onChange={this.bindleDateChange} />
                        </FormItem>
                      </Col>
                      <Col span={7} offset={1}>
                        <FormItem>
                          <div className="otherBtn">
                            <Button onClick={this.bindleSearch} style={{ marginRight: '20px' }} type='primary'>查询</Button>
                          </div>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
                  <div className="page-content">
                  <div className="mainPage">
                    <div className="wrap-fenxiao">
                      <div className="wrap-fenxiao-hd">
                        <Tabs onChange={this.changeTabs}
                          type='card'
                          defaultActiveKey={this.state.status.toString()}
                        >
                          {
                            orderType.map((type, i) =>
                              <TabPane tab={`${type} ${this.getOrderNum.bind(this, i)()}`} key={i}>
                              </TabPane>
                            )
                          }
                        </Tabs>
                      </div>
                      <div className='operateBtn'>
                        {/*<Button onClick={this.goBatchPage} style={{ marginRight: '20px' }}>批量下单</Button>*/}
                        <Button>
                          {/*<a href={`${baseUrl}order/getOrderReport?orderStatus=${this.state.status}&orderNo=${this.state.searchOrderId}&customerName=${this.state.searchReceiveUser}&mobile=${this.state.phone}&beginTime=${this.state.startTime}&endTime=${this.state.endTime}`}>订单导出</a>*/}
                          {/*<a href={`${baseUrl}order/getOrderReport`}>订单导出</a>*/}
                          <a href={this.getDownloadUrl()}>订单导出</a>
                        </Button>
                      </div>
                      <div className="wrap-fenxiao-cnt">
                        <div className="order-table no-ck">
                          <div className="titleWrap clearfix">
                            <span className="item goodsName">商品</span>
                            {/*<span className="item type">贸易类型</span>*/}
                            {/*<span className="item type">商品编码/sku</span>*/}
                            <span className="item date">订单状态</span>
                            <span className="item user">收货人</span>
                            {/*<span className="item count">价格/数量</span>*/}
                            <span className="item amount">实付</span>
                            {/*<span className="item from"></span>*/}
                            <span className="item status">操作</span>
                          </div>
                          <div className='table-main'>
                            <ul className="orderList">
                              {
                                this.state.orderList.length ?
                                  this.state.orderList.map((order, i) =>
                                    <li className="order" key={i}>
                                      <div className="top">
                                      <span className="number" style={{ marginRight: '20px' }}>
                                        订单号：{order.orderNo}
                                      </span>
                                        <span className="dealtime">下单时间：{dateFormate(order.createTime)}</span>
                                        <span className='orderFrom'>订单来源：{order.orderSource}</span>
                                        <Link to={`/orderDetail?orderId=${order.orderId}`}
                                              target="_blank" className="g-img">订单详情</Link>
                                      </div>
                                      <div className="cont clearfix">
                                        <div className="item goods-item goodsName clearfix">
                                          {
                                            order.orderItemList.map((goods, goodsIndex) =>
                                              <div className="clearfix productItem">
                                                <div className='p-img'>
                                                  <Link to={`goods?productId=${goods.productId}`} target="_blank">
                                                    <img src={baseImgUrl + goods.productImagePath} className='productImg'/>
                                                  </Link>
                                                  {
                                                    goods.stockStatus === '1'&&
                                                    <span className='soldout-icon top-icon'>已售罄</span>
                                                  }
                                                  {
                                                    goods.stockStatus === '2'&&
                                                    <span className='notEnough-icon top-icon'>库存不足</span>
                                                  }
                                                </div>
                                                <div className='p-price'>
                                                  <span style={{marginBottom:'6px'}}>￥{goods.price}</span>
                                                  <span>x{goods.quantity ? parseInt(goods.quantity) : ''}</span>
                                                </div>
                                                <div className="p-cnt">
                                                  <div className="p-name">
                                                    <Link to={`goods?productId=${goods.productId}`} target="_blank">{goods.productName}</Link>
                                                  </div>
                                                  <div className="p-spec">
                                                    <span>{goods.productTags}</span>
                                                  </div>
                                                </div>
                                                
                                              </div>
                                            )
                                          }
                                        </div>
                                        {/*<div className="item type">*/}
                                          {/*{*/}
                                            {/*order.orderItemList.map((goods, idx) => {*/}
                                              {/*return (*/}
                                                {/*<div>*/}
                                                  {/*{goods.productCode}*/}
                                                  {/*<br/>*/}
                                                  {/*{goods.productSku}*/}
                                                {/*</div>*/}
                                              {/*)*/}
                                            {/*})*/}
                                          {/*}*/}
                                        {/*</div>*/}
                                        <div className="item date">
                                          <div>{this.getOrderStatusName.bind(this, order)()}</div>
                                          <div className='refund'>
                                            <Link to={'/aftersale?orderId=' + order.orderId}>
                                              申请售后
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="item user">
                                          <div className="nm">{order.consignee}</div>
                                          <div className="pn">{order.consigneePhone}</div>
                                          <div className="bz" style={{color:'#0069af'}} onClick={this.showRemark.bind(this,order)}>查看备注</div>
                                        </div>
                                        <div className="item amount">
                                          <div className="py">￥{order.payAmount}</div>
                                          <div className="yf" style={{ fontSize: '10px' }}>含运费￥{order.postage}</div>
                                          <div className="yf" style={{ fontSize: '10px' }}>含税费￥{order.tax}</div>
                                        </div>
                                        {/*<div className="item from"></div>*/}
                                        <div className="item status">
                                          {
                                            this.getOrderBuyStatus(order)? <div>
                                                <span>订单商品库存不足</span>
                                                <span className="btn btn-primary" onClick={this.bindleCancelOrder.bind(this, order)}
                                                      style={{padding:'4px 15px',marginTop:'5px'}}
                                                >取消订单</span>
                                              </div>:
                                              this.generateOrderAction.bind(this, order)()
                                          }
                                        </div>
            
                                      </div>
                                    </li>
                                  ) :
                                  <li className="orderNull">暂无此类订单</li>
                              }
                            </ul>
                            <Pagination
                              defaultCurrent={1}
                              current={this.state.pageidx}
                              pageSize={this.state.pageSize}
                              total={this.state.total}
                              showSizeChanger={true}
                              showQuickJumper={true}
                              pageSizeOptions={this.state.pageSizeOptions}
                              onShowSizeChange={this.pageSizeChange}
                              onChange={this.pageChange}
                              // hideOnSinglePage={true}
                            />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Spin>
              </Card>
            </div>
          </div>
        {/* <PageFooter></PageFooter> */}
      </div>
    )
  }
}
