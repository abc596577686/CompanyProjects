import React from 'react'
import {getOrderList, sendERP, orderClose} from '../../../axios/api';
import './index.less'
import {substring} from "../../../utils/utils";
import {Link} from 'react-router-dom'
import {ERR_OK,baseUrl} from "../../../axios/config";
import moment from 'moment';
import OrderDetail from '../OrderDetail'
import OrderSearchComponent from '../../../components/orderSearchComponet/container/index'
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
  message,
  Table,
  Popover,
  Pagination,
  Modal,
  Checkbox,
  Tabs,
  Spin
} from 'antd'
const FromItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const layoutHorizontal = 'horizontal';
 class CustomerOrderList extends React.Component {
  constructor() {
    super()
    this.state = {
      btnList: [
        {
          name: '手动推送ERP',
          env: this.showModal,
        },
        {
          name: '订单取消',
          env: this.showModal
        },
      ],
      orderDataSource: [
        {
          key: '1',
          name: '胡1',
          age: 32,
          address: '西湖区湖底公园1号',
        }
      ],
      pageidx: 1,
      pagesize: 10,
      defaultCurrent: 1,
      Searchtype: 1,
      filters :[]
    }
  }
  showModal = (type) => {
    if (!this.state.orderList) return
    let checked = this.state.orderList.some(item => item.eveChecked)
    console.log('选择', checked)
    if (checked) {
      this.setState({
        type,
        visible: true
      })
    } else {
      message.warn('请您选择要操作的商品！')
    }


  }
  sendERP = (orderIds) => {
    let orderIdList = orderIds
    let params = {
      orderIdList
    }
    sendERP(params, 'get').then(res => {
      console.log(res)
      if (res.data.code == '1') {
        message.success(<div dangerouslySetInnerHTML={{__html: res.data.msg}}/>)
        this._getOrderList()
      } else {
        message.error(<div dangerouslySetInnerHTML={{__html: res.data.msg}}/>)
      }
    })
  }
  //关闭订单
  cancelOrder = (orderIds) => {
    let orderIdList = orderIds
    let params = {
      orderIdList,
      message: this.state.msg
    }
    orderClose(params, 'get').then(res => {
      if (res.data.code == '1') {
        message.success(<div dangerouslySetInnerHTML={{__html: res.data.msg}}/>)
        this._getOrderList()
      } else {
        message.error(<div dangerouslySetInnerHTML={{__html: res.data.msg}}/>)
      }

    })
  }
  getMsg = (e) => {
    let value = e.target.value
    this.setState({
      msg: value
    })
  }
  handleOk = () => {
    let orderIds = this.getOrderIds()
    let type = this.state.type
    console.log(orderIds)
    switch (type) {
      case 1:
        this.sendERP(orderIds)
        break;
      case 2:
        this.cancelOrder(orderIds)
        break;
    }
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })

  }
  componentWillMount() {
    this._getOrderList()
  }
   _getOrderList(filters = this.state.filters) {
     filters.push({
        key: 'isSplitSingle',
        value: false
      },
      {
        key: 'isPushErp',
        value: false
      },
      {
        key: 'status',
        value: '2'
      },
      {
        key: 'isIntercept',
        value: false
      });
     console.log('------------111',filters)
     let params = {
        filters: JSON.stringify(filters),
        pageidx: this.state.pageidx,
        pagesize: this.state.pagesize,
     };

     this.setState({ showLoading : true})
     getOrderList(params, 'POST').then(res => {
       this.setState({showLoading : false})

       console.log('订单列表：', res);
       if (res.data.code !== ERR_OK) return;
       if (res.data.code === ERR_OK) {
         let dataTotal = res.data.count;
         let orderList = res.data.data;
         if (orderList && orderList.length > 0) {
           orderList.forEach(item => {
             item.eveChecked = false
           })
         }
         this.setState({
           orderList,
           dataTotal,
           loadingSearch: false
         })
       }
     })
   };
  eveCheckedEnv = (index) => {
    let orderList = this.state.orderList
    orderList.forEach((item, i) => {
      if (i == index) {
        item.eveChecked = !item.eveChecked
      }
    })
    let allChecked = orderList.every(item => {
      return item.eveChecked
    })
    this.setState({
      orderList,
      allChecked
    })
  }
  allCheckedEnv = () => {
    let orderList = this.state.orderList
    let allChecked = this.state.allChecked
    allChecked = !allChecked
    if (orderList && orderList.length > 0) {
      orderList.forEach((item, index) => {
        item.eveChecked = allChecked
      })
      this.setState({
        orderList: orderList,
        allChecked
      })

    }


  }
  getOrderIds = () => {
    let orderList = this.state.orderList
    let orderIds = []
    orderList.forEach(item => {
      if (item.eveChecked) {
        orderIds.push(item.orderId)
      }
    })
    orderIds = orderIds.join(',')
    return orderIds
  }
  //下单平台
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
  //获取订单状态
  getOrderStatusName(order) {
    console.log('---------', order.orderStatus, typeof (order.orderStatus))
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
  getTableData = (order) => {
    let dataList = []
    order.itemList.forEach((item, index) => {
      dataList.push({
        key: index,
        orderInfo: {
          name: item.productName,
          img: item.imageUrl,
          sku: item.productSku,
          productCode : item.productCode,
          productTags : item.productTags
        },
        priceInfo: {
          price: item.productPrice,
          num: item.productNumber,
        },
        price: item.productPrice,
        addressInfo: {},
        status: 5,
        operate: 6
      })
    });
    return dataList;
  }
  generateOrderAction = (order) => {
    let status = order.orderStatus
    switch (status) {
      case '1':
        return (
          <div>
            <Link to={`/orderManager/customerOrder/orderDetail?orderId=${order.orderId}`} className="g-img">订单详情</Link>
          </div>
        );
      case '2':
        return (
          <div>
            <Link to={`/orderManager/customerOrder/orderDetail?orderId=${order.orderId}`} target="_blank"
                  className="g-img">订单详情</Link>
            <a className='g-img'>立即发货</a>
          </div>
        )
      case '3':
        return (
          <div>
            <Link to={`/orderManager/customerOrder/orderDetail?orderId=${order.orderId}`} target="_blank"
                  className="g-img">订单详情</Link>
            <Link to={`/trunk?orderId=${order.orderId}`} target="_blank" className="g-img">查看物流</Link>
          </div>
        )
      case '4':
        return (
          <div>
            <Link to={`/orderManager/customerOrder/orderDetail?orderId=${order.orderId}`} target="_blank"
                  className="g-img">订单详情</Link>
          </div>
        )
      case '5':
        return (
          <div>
            <Link to={`/orderManager/customerOrder/orderDetail?orderId=${order.orderId}`} target="_blank"
                  className="g-img">订单详情</Link>
          </div>
        )
      default :
        return (
          <div className="btnWrap">
            <span>其它</span>
          </div>
        );
    }

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
  //查询数据
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
        key: 'oldOrderNo',
        value: oldOrderNo
      },
      {
        key : selectMod,
        value : selectNo
      },
      {
        key : 'erpStoreId',
        value : erpStoreId
      }
    ]
    filters = filters.filter(item => item.value&&item.value !== undefined && item.value != '')
    this.setState({
      filters
    })
    return filters


  }
  saveFormRef = (formRef) => {
     this.formRef = formRef;
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
  render() {
    const formItemLayoutBottom = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
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
      <div className='page customer-page'>
       <Spin spinning={this.state.showLoading}>
         <Modal
           title="确认操作"
           visible={this.state.visible}
           onOk={this.handleOk}
           onCancel={this.handleCancel}
         >

           {
             this.state.type == '3' ?
               <div>
                 <p>请输入订单关闭原因</p>
                 <Input.TextArea onChange={this.getMsg} value={this.state.msg}/>
               </div>
               :
               <p>请你确认是否提交此操作！</p>
           }
         </Modal>
         <OrderSearchComponent
           wrappedComponentRef={this.saveFormRef}
           onSearch={this.searchStart}
         />
         <div className='handleBox'>
           {
             this.state.btnList.map((item, index) => {
               return (
                 <Button style={{margin: '0 20px 20px 20px'}} key={index} onClick={() => item.env(index + 1)}>{item.name}</Button>
               )
             })
           }
         </div>
         <Card className="od_list__table">
           <Row className="head">
             <Col span={10}>
               <Checkbox
                 onChange={this.allCheckedEnv} style={{float: 'left', marginLeft: '12px'}}
                 checked={this.state.allChecked}
               />
               订单信息
             </Col>
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
                         <p style={{textAlign: 'left',minWidth: '250px'}}>
                           <Checkbox
                             onChange={() => this.eveCheckedEnv(i)}
                             checked={order.eveChecked}
                             style={{float: 'left', margin: '0px 6px'}}
                           />
                           <b> 订单编号: </b>{order.orderNo}
                          </p>
                         <p style={{textAlign: 'left',minWidth: '350px'}}><b>下单平台: </b>{order.orderSource}</p>
                         <p style={{textAlign: 'left'}}><b>下单时间: </b>{order.createTime}</p>
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
                       // columns={orderTableColumns}
                       columns={
                         [
                           {
                             title: '',
                             dataIndex: 'name',
                             key: 'orderInfo',
                             render: (text, record) => {
                               console.log('-------------', text, record)
                               return (
                                 <div className="flex order-info">
                                   {
                                     order.itemList && order.itemList.length > 0 ?
                                       <div className="innerBox">
                                         <img className="pic" src={baseUrl + record.orderInfo.img}/>
                                         <div className='productInfo'>
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
                                             <span>商品货号 : {record.orderInfo.productCode} /  {record.orderInfo.sku} / {record.orderInfo.productTags}</span>
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
                                       <div>
                                         <div>{this.getOrderStatusName.bind(this, order)()}</div>
                                         <span className="g-img" onClick={this.props.goDetail.bind(this,name,order.orderId)}>订单详情</span>
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
                       }
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
             showQuickJumper={true}
             showTotal={total => `订单信息查询结果 共${this.state.dataTotal}单`}
             pageSizeOptions={this.state.pageSizeOptions}
             onShowSizeChange={this.pageSizeChange}
             onChange={this.pageChange}/>
         </Card>
       </Spin>
      </div>
    )
  }

}
export default class CustomerOrder extends React.Component{
  constructor(){
    super()
    const panes = [{
      title: '客审订单',
      content: <CustomerOrderList goDetail={this.stateCallback}/>,
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
    window.scrollTo(0,0)
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
