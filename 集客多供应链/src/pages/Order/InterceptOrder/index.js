import React from 'react';
import OrderDetail from '../OrderDetail'
import {substring} from "../../../utils/utils";
import OrderSearchComponent from '../../../components/orderSearchComponet/container/index'
import {
  Card,
  Input,
  Row,
  Col,
  Button,
  Table,
  Popover,
  Pagination,
  Tabs,
  Spin,
  Modal,
  message

} from 'antd';
import './index.less';
import {getOrderList, orderClose} from '../../../axios/api';
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
    optionStatus: [
      {
        label: '全部',
        value: '01'
      },
      {
        label: 'A',
        value: '02'
      },
      {
        label: 'B',
        value: '03'
      },
      {
        label: 'C',
        value: '04'
      }
    ],
    filters : [
      {
        key : 'isIntercept',
        value : 'true'
      }
    ]
  };
  componentDidMount() {
    console.log('props----------',this.props.data)
    this._getOrderList();

  };
  _getOrderList(filters = this.state.filters) {
    let params = {
      pagesize: this.state.pagesize,
      pageidx: this.state.pageidx,
      filters: JSON.stringify(filters)
    }

    this.setState({showLoading : true})
    getOrderList(params, 'POST').then(res => {
      this.setState({showLoading : false})

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
  //获取订单状态
  getOrderStatusName(order) {
    // console.log('---------', order.orderStatus, typeof (order.orderStatus))
    switch (order.orderStatus) {
      case 1 :
        return (
          <span>未支付</span>
        )
      case 2 :
        return (
          <span>未发货</span>
        )
      case 3 :
        return (
          <span>已发货</span>
        )
      case 4 :
        return (
          <span>已收货</span>
        )
      case 5 :
        return (
          <span>交易关闭</span>
        )
      default :
        return (
          <span>无</span>
        )
    }
  }
  //获取渲染数据
  getTableData = (order) => {
    let dataList = []
    order && order.itemList.length>0 &&
    order.itemList.forEach((item, index) => {
      dataList.push({
        key: index,
        orderInfo: {
          name: item.productName,
          img: item.imageUrl,
          sku: item.productSku,
          productCode : item.productCode,
          productTags : item.productTags,
          productId : item.productId
        },
        priceInfo: {
          price: item.productPrice ? (item.productPrice - 0).toFixed(2) : '',
          num: item.productNumber,
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
                order.itemList && order.itemList.length > 0 ?
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
                  rowSpan: order.itemList.length
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
                children: <div>￥{order.payAmount ? (order.payAmount - 0).toFixed(2) : ''}</div>,
                props: {
                  rowSpan: order.itemList.length
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
          let name = order.itemList&&order.itemList.length>0?order.itemList[0].productName:'订单详情'
          return (
            record.key == 0 ?
              {
                children:
                  <div className='flex-box'>
                    <div>{this.getOrderStatusName.bind(this, order)()}</div>
                    <Button size='small'  onClick={this.props.goDetail.bind(this,name,order.orderId)}>订单详情</Button>
                    <Button size='small' onClick={this.showModal.bind(this,order.orderId)}>关闭订单</Button>
                  </div>,
                props: {
                  rowSpan: order.itemList.length
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
  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({
      pagesize: pageSize
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
        key :  'isIntercept',
        value :  'true'
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
      console.log('Received values of form: ', values);
      let filters = this.getFilter(values)
      this.setState({
        filters,
        pageidx:1
      },() => {
        this._getOrderList(filters)
      })

    });

  }
  //关闭订单
  cancelOrder = () => {
    let params = {
      orderIdList:this.state.curOrderId,
      message: this.state.closeMsg
    }
    orderClose(params, 'get').then(res => {
      if (res.data.code == '1') {
        message.success(<div dangerouslySetInnerHTML={{__html: res.data.msg}}/>)
        this.setState({
          visible : false
        })
        this._getOrderList()
      } else {
        message.error(<div dangerouslySetInnerHTML={{__html: res.data.msg}}/>)
      }

    })
  }
  getMsg = (e) => {
    let value = e.target.value
    this.setState({
      closeMsg: value
    })
  }
  handleOk = () => {
    this.cancelOrder()
  }
  handleCancel = () => {
    this.setState({
      visible : false
    })
  }
  showModal = (orderId) => {
    this.setState({
      visible : true,
      curOrderId : orderId
    })
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
        <Spin spinning={this.state.showLoading}>
          <Modal
            title="订单取消"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
                <div>
                  <p>请输入订单关闭原因</p>
                  <Input.TextArea onChange={this.getMsg} value={this.state.closeMsg}/>
                </div>
          </Modal>
          <Card className="searchForm">
            <OrderSearchComponent
              wrappedComponentRef={this.saveFormRef}
              onSearch={this.searchStart}
            />
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
                          <p><b className="ml_l">下单时间 : </b>{order.createTime}</p>
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
                          <b className="mr_l fl_r">共{order.totalNumber}件商品</b>
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
        </Spin>
      </div>
    )
  }
}
//订单页
export default class InterceptOrder extends React.Component{
  constructor(props){
    super(props)
    const panes = [{
      title: '拦截订单',
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
