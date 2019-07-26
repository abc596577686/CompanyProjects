import React from 'react';
import OrderDetail from '../OrderDetail'
import {substring} from "../../../utils/utils";
import OrderSearchComponent from '../../../components/orderSearchComponet/container/index'
import {dateFormate} from "../../../utils/index";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Tooltip,
  Icon,
  Select,
  DatePicker,
  Button,
  Radio,
  message,
  Modal,
  Table,
  Popover,
  Pagination,
  Tabs,
  Spin
} from 'antd';
import './index.less';
import {refundOrderList,checkRefund,getListByOrderId} from '../../../axios/api';
import {baseUrl, ERR_OK} from "../../../axios/config";
const TabPane = Tabs.TabPane
//订单列表
class OrderList extends React.Component {
  constructor(props) {
    super(props);
  };
  state = {
    orderList: [],
    type: '商户订单号',
    // 默认第几页
    defaultCurrent: 1,
    //页面大小
    pagesize: 10,
    pageidx: 1,
    status: '0',
    //数据总条数
    dataTotal: 0,
    //页面大小可选项
    pageSizeOptions: ['10', '15', '30', '60', '100'],
    popTitle: '',
    popContent: '',
    selectedTag: null,
    loadingSearch: false,
    defaultStatus: '01',
    showMoreBox: false,
    createTime: '',
    tradeNo: '',
    orderNo: '',
    productSku: '',
    productName: '',
    consignee: '',
    consigneePhone: '',
    refundType : '1',
    tagsOrderStatus: [
      {
        id: '',
        label: '全部订单'
      },
      {
        id: '1',
        label: '审核中'
      },
      {
        id: '2',
        label: '退款成功'
      },
      {
        id: '3',
        label: '退款被拒'
      },
    ],
    refundStatusList : [
      {
        id: '0',
        label: '全部订单'
      },
      {
        id: '1',
        label: '审核中'
      },
      {
        id: '2',
        label: '退款成功'
      },
      {
        id: '3',
        label: '退款被拒'
      },
    ],
    reGoodStatusList : [
      {
        id: '0',
        label: '全部订单'
      },
      {
        id: '1',
        label: '审核中'
      },
      {
        id: '2',
        label: '退款成功'
      },
      {
        id: '3',
        label: '退款被拒'
      },
      {
        id: '4',
        label: '等待发货'
      },
      {
        id: '5',
        label: '等待收货'
      }
    ],
    refundStatus : '0',
    filters : [

    ],
    RefundCheckErp : '1',
    RefundAgree: '1',
    curRefund : {}
  };
  componentDidMount() {
    console.log('props----------',this.props.data)
    this._getOrderList();

  };
  _getOrderList(filters = this.state.filters) {
    filters = encodeURIComponent(JSON.stringify(filters))
    let params = {
      pagesize : this.state.pagesize,
      pageidx : this.state.pageidx,
      refundStatus : this.state.refundStatus == '0'? '' : this.state.refundStatus,
      refundType : this.state.refundType,
      filters
    }
    this.setState({
      showLoading : true
    })
    refundOrderList(params).then(res => {
      this.setState({
        showLoading : false
      })
      console.log('订单列表：', res);
      if (res.data.code !== ERR_OK) return;
      if (res.data.code === ERR_OK) {
        let dataTotal = res.data.count;
        let orderList = res.data.data;
        this.setState({
          orderList,
          dataTotal,
          loadingSearch: false
        })
      }
    })
  };
  //获取退款操作记录
  _getListByOrderId = (orderId) => {
    this.setState({
      operateModal : true
    })
    let params = {
      orderId
    }
    getListByOrderId(params,'get').then(res => {
      if(res.data.code === '1'){
        let orderHistoryList = res.data.data.histohistoryListry
        this.setState({
          orderHistoryList
        })

      }

    })
  }
  //获取订单状态
  getOrderStatusName(record) {
    // console.log('---------', order.orderStatus, typeof (order.orderStatus))
    let status = record.refundStatus - 0
    switch (status) {
      case 1 :
        return (
          <span>审核中</span>
        )
      case 2 :
        return (
          <span>退款成功</span>
        )
      case 3 :
        return (
          <span>退款被拒</span>
        )
      case 4 :
        return (
          <span>等待发货</span>
        )
      case 5 :
        return (
          <span>等待收货</span>
        )
      default :
        return (
          <span>无</span>
        )
    }
  }
  //跳转详情页
  jumpToEditPage = (productId,productName) => {
    this.props.data.history.push({
      pathname:'/Market/product',
      state : {
        productId,
        productName
      }
    })
  }
  //获取渲染数据
  getTableData = (order) => {
    let dataList = []
    order.orderItemList && order.orderItemList.length > 0 &&
    order.orderItemList.forEach((item, index) => {
      dataList.push({
        key: index,
        orderInfo: {
          name: item.productName,
          img: item.productImagePath,
          sku: item.productSku,
          productCode : item.productCode,
          productTags : item.productTags,
          productId : item.productId
        },
        priceInfo: {
          price: item.productPrice ? (item.productPrice - 0).toFixed(2) : '',
          num: item.quantity,
        },
        price: '',
        addressInfo: '',
        status: '',
        operate: ''
      })
    })
    // console.log('-------------',dataList)
    return dataList
  }
  //渲染列
  renderColumns = (order) => {
    const columns = [
      {
        title: '',
        dataIndex: 'name',
        key: 'orderInfo',
        render: (text, record) => {
          // console.log('-------------', text, record)
          return (
            <div className="flex order-info">
              {
                order.orderItemList && order.orderItemList.length > 0 ?
                  <div className="innerBox">
                      <img className="pic" src={baseUrl + record.orderInfo.img}/>
                      <div className='productInfo'
                      >
                        {/*<p className="name" onClick={this.jumpToEditPage.bind(this,record.orderInfo.productId,record.orderInfo.name)}>{record.orderInfo.name}</p>*/}
                        <p className='name'>
                          {/*<Link to={{*/}
                          {/*pathname:'/Market/product',*/}
                          {/*state : {*/}
                            {/*productId : record.orderInfo.productId,*/}
                            {/*productName : record.orderInfo.name*/}
                          {/*}}}>*/}
                          {record.orderInfo.name}
                        {/*</Link>*/}
                        </p>

                        <p className="sku">
                          <span> 商品货号: {record.orderInfo.productCode} / {record.orderInfo.sku} / {record.orderInfo.productTags}</span>
                        </p>
                      </div>
                    <div className='orderPrice'>
                      <span>￥{record.priceInfo.price}</span>
                      <span>x{record.priceInfo.num}</span>
                    </div>

                  </div> : '无'
              }
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'addressInfo',
        render: (text, record) => {
          return (
            record.key == 0 ?
              {
                children:
                  <Popover content={<div style={{maxWidth:'200px',padding:'10px'}}>{order.address}</div>} placement='rightTop'>
                    <div style={{cursor:'pointer'}}>
                      <div>{order.consignee}</div>
                    </div>
                  </Popover>,
                props: {
                  rowSpan: order.orderItemList.length
                }
              } :
              {
                props: {
                  rowSpan: 0
                }
              }
          )
        }
      },
      {
        title: '',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return (
            record.key == 0 ?
              {
                children:
                  <div>
                    <div>￥{order.payAmount ? (order.payAmount - 0).toFixed(2) : ''}</div>
                    <div>{this.getOrderStatusName.bind(this, order.refund)()}</div>
                  </div>,
                props: {
                  rowSpan: order.orderItemList.length
                }
              } :
              {
                props: {
                  rowSpan: 0
                }
              }
          )
        }
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'operate',
        render: (text, record) => {
          let name = order.orderItemList&&order.orderItemList.length>0?order.orderItemList[0].productName:'订单详情'
          return (
            record.key == 0 ?
                {
                  children:
                    <div className='flex-box'>
                      <Button
                        className="g-img"
                        size='small'
                        onClick={this.showRefundModal.bind(this,order.refund)}
                      >
                        退款信息
                      </Button>
                      {
                        (order.refund.refundStatus === 1 || order.refund.refundStatus === 5) &&
                        <Button className="g-img" size='small' onClick={this.showRefundCheck.bind(this,order.refund)}>退款审核</Button>
                      }
                      {/*<span className="g-img" onClick={this.props.goDetail.bind(this,name,order.orderId)}>订单详情</span>*/}
                      <Button className="g-img" size='small' onClick={this._getListByOrderId.bind(this,order.orderId)}>退款进度</Button>
                    </div>,
                  props: {
                    rowSpan: order.orderItemList.length
                  }
                }
              :
              {
                props: {
                  rowSpan: 0
                }
              }
          )
        }
      }
    ]
    return columns

  }
  //下单平台
  // 1.集客多批发市场 2.集客多APP 3.阳光海岸APP
  transChannelId = (channelId) => {
    switch (channelId) {
      case 1:
        return (
          <span>集客多批发市场</span>
        )
      case 2 :
        return (
          <span>集客多APP</span>
        )
      case 3 :
        return (
          <span>阳光海岸APP</span>
        )
    }
  }
  onChangeTags = (e) => {
    console.log(e)
    this.setState({
      refundStatus: e
    }, () => {
      this._getOrderList()
    })
  };
  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({
      pagesize: pageSize,
      pageidx : 1,
    }, () => {
      this._getOrderList();
    });


  };
  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
      pageidx: page,
      pagesize: pageSize
    }, () => {
      this._getOrderList();
    })
  };
  //搜索组件
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  //格式化日期
  timeFormat = (time) => {
    let formatTime
    if(time&&time.length>0){
      formatTime = [
        time[0].format('YYYY-MM-DD'),
        time[1].format('YYYY-MM-DD'),
      ]
      formatTime = '>|' + formatTime[0] + ',' + '<|' + formatTime[1]
    }else{
      formatTime = ''
    }
    console.log(formatTime)
    return formatTime
  }
  getFilter = (values) => {
    const {
      customer,
      goodName,
      mobile,
      selectMod,
      selectNo,
      productCode,
      time,
      oldOrderNo,
      erpStoreId,
      payTime
    } = values
    let formatTime = this.timeFormat(time)
    let payFormatTime = this.timeFormat(payTime)
    let filters = [
      {
        key: 'createTime',
        value: formatTime
      },
      {
        key: 'payTime',
        value: payFormatTime
      },
      {
        key: 'productCode',
        value: productCode
      },
      {
        key: 'consignee',
        value: customer
      },
      {
        key: 'consigneePhone',
        value: mobile
      },
      {
        key: 'productName',
        value: goodName
      },
      {
        key : selectMod,
        value : selectNo
      },
      {
        key :  'oldOrderNo',
        value :  oldOrderNo
      },
      {
        key : 'erpStoreId',
        value : erpStoreId
      }
    ]
    filters = filters.filter(item => item.value&&item.value !== undefined && item.value != '')
    this.setState({
      loadingSearch: true
    });
    console.log(filters)
    this.setState({
      filters
    })
      return filters
  }
  searchStart = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('filters参数 ', values);
      let filters = this.getFilter(values)
      this.setState({
        filters,
        pageidx:1
      },() => {
        this._getOrderList(filters)
      })
    });
  }
  //修改退款类型
  changeRefundType = (e) => {
    console.log(e)
    let val = e.target.value
    let tagsOrderStatus = val === '1'? this.state.refundStatusList : this.state.reGoodStatusList
    this.setState({
      refundType : val,
      tagsOrderStatus,
      refundStatus : '0'
    },() => {
      this._getOrderList()
    })
  }
  //退款详情
  showRefundModal = (refund) => {
    let {
      applyRefundTime,
        completedTime,
    createTime,
    expressCompany,
    expressExplain,
    expressNumber,
    isReceive,
    isSendPackage,
    orderId,
    refundAddress,
    refundAmount,
    refundCount,
    refundExplain,
    refundId,
    refundNumber,
    refundStatus,
    refundType,
    refusalReason,
    remark,
    totalAmount,
    updateTime,
    } = refund
    this.setState({
      refundModal : true,
      applyRefundTime,
      expressCompany,
      expressExplain,
      expressNumber,
      refundAddress,
      refundAmount,
      refundCount,
      refundExplain,
      refundId,
      refundNumber,
      orderRefundStatus : refundStatus,
      orderRefundType : refundType,
      orderAmount:totalAmount,
      refusalReason,
    })
  }
  handleOk = () => {
    this.setState({
      refundModal : false
    })
  }
  handleCancel = () => {
    this.setState({
      refundModal : false
    })
  }
  //退款审核
  showRefundCheck = (refund) => {
    let curOrderId = refund.orderId
    this.setState({
      refundCheck : true,
      curOrderId,
      RefundAmount : refund.totalAmount,
      curRefund : refund,
      isConfirmRefund : refund.isConfirmRefund
    })

  }
  handleOk1 = () => {
    this._checkRefund()
  }
  handleCancel1 = () => {
    this.setState({
      refundCheck : false
    })
  }
  handleCancel3 = () => {
    this.setState({
      operateModal:false
    })
  }
  closeCheck = () => {
    this.setState({
      RefundAgree : '1',
      Refuse : '',
      RefundAddress : '',
      RefundAmount : '',
      RefundCheckErp : '1',
    })
  }
  //是否同意退款
  changeAgree = (e) => {
    this.setState({
      RefundAgree :e.target.value
    })
  }
  //拒绝原因
  getRefuse = (e) => {
    this.setState({
      Refuse : e.target.value
    })
  }
  //退货地址
  getRefundAddress = (e) => {
    this.setState({
      RefundAddress : e.target.value
    })
  }
  //退款金额
  getRefundAmount = (e) => {
    this.setState({
      RefundAmount : e.target.value
    })
  }
  //changeRefundCheckErp
  changeRefundCheckErp = (e) => {
    this.setState({
      RefundCheckErp : e.target.value
    })
  }
  //审核api
  _checkRefund = () => {
    let params = {
      orderId : this.state.curOrderId,
      result : this.state.RefundAgree,
      reason : this.state.Refuse,
      refundAmount : this.state.RefundAmount,
      address : this.state.RefundAddress,
      isRefundTips : this.state.RefundCheckErp
    }
    if(this.state.isConfirmRefund && this.state.RefundAgree === '1'){
      this.showConfirm(params)
    }else{
      checkRefund(params).then(res => {
        if(res.data.code === '1'){
          message.success(res.data.msg)
          this.setState({
            refundCheck : false
          })
          this._getOrderList()
        }else{
          message.error(res.data.msg)
        }
      })
    }

  }
  showConfirm = (params) => {
    let that = this
    Modal.confirm({
      title: '退款提示',
      content: '是否确定退款到买家账户?请谨慎操作！',
      onOk() {
        checkRefund(params).then(res => {
          if(res.data.code === '1'){
            message.success(res.data.msg)
            that.setState({
              refundCheck : false
            })
            that._getOrderList()
          }else{
            message.error(res.data.msg)
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  render() {
    const popover = (
      <div>
        <div>
          订单等级<Input type="text"/>
        </div>
        <div style={{textAlign: 'right', marginTop: '15px'}}>
          <Button type="primary">保存</Button>
        </div>
      </div>
    );
    return (
      <div className="page order-page">
        <Modal
          title="退款审核"
          visible={this.state.refundCheck}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          afterClose = {this.closeCheck}
        >
          <div className='refundBox edit'>
            <div className='item'>
              <span className='label'>是否同意</span>
              <span className='contenter'>
                <Radio.Group onChange={this.changeAgree} value={this.state.RefundAgree}>
                  <Radio value='1'>同意</Radio>
                  <Radio value='2'>拒绝</Radio>
                </Radio.Group>
              </span>
            </div>
            {
              this.state.RefundAgree === '2' &&
              <div className='item'>
                <span className='label'>拒绝原因</span>
                <span className='contenter'>
                <Input onChange={this.getRefuse}/>
              </span>
              </div>
            }
            {
              this.state.RefundAgree === '1'&& this.state.curRefund.refundType == '2'&& this.state.curRefund.refundStatus == '1' &&
              <div className='item'>
                <span className='label'>退货地址</span>
                <span className='contenter text'>
                <Input.TextArea onChange={this.getRefundAddress}/>
              </span>
              </div>
            }
            {
              this.state.RefundAgree === '1' &&
              <div className='item'>
                <span className='label'>退款金额</span>
                <span className='contenter'>
                <Input onChange={this.getRefundAmount} value={this.state.RefundAmount}/>
              </span>
              </div>
            }
            <div className='item'>
              <span className='label'>检查erp已取消</span>
              <span className='contenter'>
                <Radio.Group onChange={this.changeRefundCheckErp} value={this.state.RefundCheckErp}>
                  <Radio value='1'>检查</Radio>
                  <Radio value='2'>不检查</Radio>
                </Radio.Group>
              </span>
            </div>
          </div>
        </Modal>
        <Modal
          title="退款信息"
          visible={this.state.refundModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div className='refundBox'>
            <div className='item'>
              <span className='label'>退款类型</span>
              <span className='contenter'>{this.state.orderRefundType == '1'?'退款':'退款退货'}</span>
            </div>
            {
              this.state.refundStatus == '5' && this.state.refundType == '2' &&
              <div>
                <div className='item'>
                  <span className='label'>物流公司</span>
                  <span className='contenter'>{this.state.expressCompany}</span>
                </div>
                <div className='item'>
                  <span className='label'>物流单号</span>
                  <span className='contenter'>{this.state.expressNumber}</span>
                </div>
                <div className='item'>
                  <span className='label'>物流说明</span>
                  <span className='contenter'>{this.state.expressExplain}</span>
                </div>
              </div>

            }
            <div className='item'>
              <span className='label'>退款说明</span>
              <span className='contenter'>{this.state.refundExplain}</span>
            </div>
            <div className='item'>
              <span className='label'>退款金额</span>
              <span className='contenter'>{this.state.refundAmount}</span>
            </div>
            <div className='item'>
              <span className='label'>订单金额</span>
              <span className='contenter'>{this.state.orderAmount}</span>
            </div>
            <div className='item'>
              <span className='label'>申请时间</span>
              <span className='contenter'>{this.state.applyRefundTime?dateFormate(this.state.applyRefundTime):''}</span>
            </div>
          </div>
        </Modal>
        {/*operateModal*/}
        <Modal
          title="退款操作记录"
          visible={this.state.operateModal}
          onCancel={this.handleCancel3}
          footer={null}
        >
          <ul className='operate refundBox'>
            {
              this.state.orderHistoryList && this.state.orderHistoryList.length > 0 ?
                this.state.orderHistoryList.map((item, index) => {
                  return (
                    <li className='li_item' key={index}>
                      <span className='circle'></span>
                      {item.content}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {item.createTime?dateFormate(item.createTime):''}

                    </li>
                  )
                }) : <div>暂无操作记录</div>
            }
          </ul>
        </Modal>
       {/*<Spin spinning={this.state.showLoading}>*/}
         <Card className="searchForm">
           <OrderSearchComponent
             wrappedComponentRef={this.saveFormRef}
             onSearch={this.searchStart}
           />
         </Card>
         <Card className="od_list__card">
           <Radio.Group value={this.state.refundType} onChange={this.changeRefundType} style={{ marginBottom: 16 }}>
             <Radio.Button value="1">退款</Radio.Button>
             <Radio.Button value="2">退货退款</Radio.Button>
           </Radio.Group>
           <Tabs onChange={this.onChangeTags} activeKey={this.state.refundStatus}>
             {
               this.state.tagsOrderStatus.map((tag, i) =>
                 <TabPane tab={tag.label} key={i}>
                 </TabPane>
               )
             }
           </Tabs>
         </Card>
         <Card className="od_list__table">
           <Row className="head">
             <Col span={10}>订单信息</Col>
             <Col span={4}>收货人</Col>
             <Col span={3}>实付款</Col>
             <Col span={6}>操作</Col>
           </Row>
           <div>
             {
               this.state.orderList && this.state.orderList.length > 0 ?
                 this.state.orderList.map((order, i) =>
                   <div key={i}>
                     <Table
                       className="wrapper"
                       pagination={false}
                       align="center"
                       bordered={true}
                       title={() => <Row className="new_column_type">
                         <p><b> 订单编号 : </b>{order.orderNo}{order.oldOrderNo?` / ${order.oldOrderNo}`:null}</p>
                         <p><b className="ml_l" aaa={typeof order.createTime}>下单时间 : </b>{order.createTime?dateFormate(order.createTime):''}</p>
                         <p><b className="ml_l">下单平台 : </b>{this.transChannelId.bind(this, order.channelId)()}</p>
                         <div className="fl_r">
                           <Popover
                             trigger="hover"
                             title="订单备注"
                             placement="left"
                             content={popover}>
                             <img className="icon dp_b" width="20" height="20"
                                  src="https://www.jk.cn/ms-trade/images/remark0.png"/>
                           </Popover>
                         </div>
                         <b className="mr_l fl_r">共{order.totalQuantity}件商品</b>
                       </Row>}
                       onHeaderCell={() => <span>1</span>}
                       dataSource={this.getTableData.bind(this, order)()}
                       columns={this.renderColumns.bind(this, order)()}
                     >
                     </Table>
                   </div>
                 ) : null
             }
           </div>
           <Pagination
             defaultCurrent={this.state.defaultCurrent}
             current={this.state.pageidx}
             pageSize={this.state.pagesize}
             total={this.state.dataTotal}
             showSizeChanger={true}
             showTotal={total => `订单信息查询结果 共${this.state.dataTotal}单`}
             showQuickJumper={true}
             pageSizeOptions={this.state.pageSizeOptions}
             onShowSizeChange={this.pageSizeChange}
             onChange={this.pageChange}/>
         </Card>
       {/*</Spin>*/}
      </div>
    )
  }
}
//订单页
export default class AllOrder extends React.Component{
  constructor(props){
    super(props)
    const panes = [{
      title: '订单列表',
      content: <OrderList goDetail={this.stateCallback} data={props}/>,
      key: '1',
      closable: false
    }]
    this.state ={
      panes,
      activeKey : panes[0].key
    }
  }
  stateCallback = (name,orderId) => {
    const panes = this.state.panes;
    name = substring(name,10)
    const activeKey = 'tab' + orderId;
    // 检查tab是否已打开
    let isExistTab = false;
    this.state.panes.forEach((pane, i) => {
      if (pane.key == activeKey) {
        isExistTab = true;
        this.setState({panes, activeKey});
        return;
      }
    });
    // 新增tab
    if(!isExistTab){
      panes.push({ title: name, content: <OrderDetail orderId={orderId}/>, key: activeKey});
      this.setState({panes, activeKey});
      this.scrollToAnchor("top");
    }
  }
  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  render(){
    return(
      <div className='orderPage' id='top'>
        <Tabs
          hideAdd
          className='topTabs'
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}>
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    )
  }
}
