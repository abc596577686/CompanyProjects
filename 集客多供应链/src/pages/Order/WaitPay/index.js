import React from 'react';
import OrderDetail from '../OrderDetail'
import {substring} from "../../../utils/utils";
import OrderSearchComponent from '../../../components/orderSearchComponet/container/index'
import scanIcon from '../../../resource/assets/images/scanIocn.png';
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
  Tag,
  Table,
  Popover,
  Pagination,
  Tabs,
  Spin,
  Modal,
  Radio
} from 'antd';
import moment from 'moment';
import './index.less';
import {getOrderList, getProductStockList, orderPay, queryPayment} from '../../../axios/api';
import { baseUrl, ERR_OK } from "../../../axios/config";
import QRCode from 'qrcode'

const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class PaymentAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tips : '',
      tips1 : '',
      payAmount : 0,
      showLoading : false,
      superComponent: props.superComponent
    }
  }

  _queryPay =() => {
    if(this.state.paymentType == 1 || this.state.paymentType == 2){
      let params = {
        orderNo : this.state.orderNo,
        paymentType : this.state.paymentType
      }
      queryPayment(params).then(res => {
        if(res.data.code == '1'){
          message.success('订单支付成功，即将关闭窗口')
          clearInterval(this.timerr)

          // 关闭支付浮动窗口
          let timer = setTimeout(()=> {
            this.state.superComponent.setState({
              visible: false
            }, this.state.superComponent.click)
            clearTimeout(timer)
          }, 1000)
        }
      })
    }
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
  generateFuc = (order, paymentType) => {
    if(order){
      let data = order
      let orderId = data.orderId
      let orderNo = data.orderNo
      let payAmount = (data.payAmount - 0).toFixed(2)
      this.setState({
        orderId,
        orderNo,
        payAmount,
        paymentType : paymentType
      },() => {
        this.getTips()
        this._orderPay()
        this.setTime()
      })
    }
  }
  componentWillMount() {
    this.generateFuc(this.props.order, this.props.paymentType)
  }
  componentWillReceiveProps(nextProps){
    this.generateFuc(nextProps.order, nextProps.paymentType)
  }
  componentWillUnmount(){
    console.log('页面卸载了')
    clearInterval(this.timerr)
  }
  _orderPay =() => {
    let params = {
      orderId: this.state.orderId,
      paymentType: this.state.paymentType
    }

    this.setState({showLoading : true})
    orderPay(params).then(res => {
      console.log('二维码---------',res)
      if(res.data.code=='1'){
        this.setState({showLoading : false})

        let qrcode
        if(this.state.paymentType == 1){
          qrcode = res.data.data.body
        }else if(this.state.paymentType == 2){
          qrcode = res.data.data.code_url
        }

        this.setState(
          {qrcode},()=>{
            if(qrcode){
              if(this.state.paymentType == 2){
                this.toQRCode(qrcode)
              }
            }
          }
          )
        
      }else{
        //请求失败
        clearInterval(this.timerr)
        message.error(res.data.msg)
      }
    })
  }
  toQRCode =(qrcode) => {
    //转二维码
    console.log('转化')
    QRCode.toDataURL(qrcode, function (err, url) {
      if (err) throw err
      let img = document.getElementById('image')
      img.src = url
    })
  }
  render() {
    const QrCodePay = (
      <div className="payment-page">
       <div className="paychat">
        <ul>
          <li>扫一扫付款（元）</li>
          <li>
            <span className="m">￥{this.state.payAmount}</span>
          </li>
          <li>
            <div className="p-wrap">
              <img id='image' width="210" height="210" style={this.state.paymentType == 2? {display:'block'} : {display : 'none'} } />
              <div style={this.state.paymentType == 1? {display:'block'} : {display : 'none'}}>
                <iframe srcdoc = {this.state.qrcode} height='210px' width='210px'></iframe>
              </div>
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
        <Spin spinning={this.state.showLoading} size='small'>
          {this.state.paymentType == 1 || this.state.paymentType == 2 ? QrCodePay : null }
        </Spin>
    )
  }
}

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
    filters: [],
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
    consigneePhone: ''
  };
  componentDidMount() {
    console.log('props----------',this.props.data)
    this._getOrderList();
    this.props.onRef(this)
  };
  _getOrderList(filters = this.state.filters) {
    filters.push({
      key : 'status',
      value : '1'
    },{
      key : 'isOfficialShop',
      value : '1'
    });

    let params = {
      pagesize: this.state.pagesize,
      pageidx: this.state.pageidx,
      filters: JSON.stringify(filters)
    }

    this.setState({showLoading : true})
    getOrderList(params, 'POST').then(res => {
      this.setState({ showLoading: false })

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
                    <div>
                      <Button style={{marginRight: '30px'}} type="primary" onClick={this.props.openPay.bind(this, order)}>去支付</Button>
                      <span className="g-img" onClick={this.props.goDetail.bind(this, name, order.orderId)}>订单详情</span>
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
  onChangeTags = (e) => {
    console.log(e)
    this.setState({
      status: e
    }, () => {
      let filters = this.state.filters
      filters.forEach(item => {
        if(item.key==='status'){
          if(this.state.status=='0'){
            item.value=''
          }else{
            item.value=this.state.status
          }
        }
      })
      this.setState({
        filters
      })
      console.log('-------',filters)
      this._getOrderList(filters)
    })
  };
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
        key :  'erpStoreId',
        value :  erpStoreId
      }
    ];

    filters = filters.filter(item => item.value&&item.value !== undefined && item.value != '')
    this.setState({
      filters,
      loadingSearch: true
    });
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
        pageidx: 1
      },() => {
        this._getOrderList(filters)
      })
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
       <Spin spinning={this.state.showLoading}>
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
                         <p style={{textAlign: 'left',minWidth: '250px'}}><b> 订单编号: </b>{order.orderNo}</p>
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
export default class AllOrder extends React.Component{
  constructor(props){
    super(props)
    const panes = [{
      title: '订单列表',
      content: <OrderList goDetail={this.stateCallback} openPay={this.goOpenPay} onRef={this.onRef} data={props} />,
      key: '1',
      closable: false,
      keyvalue: '1'
    }]

    this.state ={
      panes,
      activeKey : panes[0].key,
      visible: false,
      erCodeUrl: '',
      paywayStatus: true,
      paymentType: 0,
      paymentId: '',
      showLoading: false,
      payOrderNo: '',
      //页面大小
      pagesize: 10,
      pageidx: 1,
    }
  }
  onRef = (ref) => {
    this.child = ref
  }
  click = (e) => {
    this.child._getOrderList(this.state.filters)
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      paymentType: 0,
      order: null
    });
  }
  goOpenPay = (order) => {
    this.setState({
      visible: true,
      paymentOrder: order
    })
  }
  stateCallback = (name, orderId) => {
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
  bindleSelectPay = (paymentMethod) => {
    this.setState({paymentType: paymentMethod})
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
        <Modal
          title="订单支付"
          visible={this.state.visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          width={700}
        >
          <div>
            <RadioGroup className="pay_viewradio">
              <RadioButton className="pay_viewradio bank-alipay" value="1" onClick={this.bindleSelectPay.bind(this, 1)}></RadioButton >
              <RadioButton className="pay_viewradio bank-wechatpay" value="2" onClick={this.bindleSelectPay.bind(this, 2)}></RadioButton >
            </RadioGroup>
            {this.state.paymentType == 1 || this.state.paymentType == 2 ? <PaymentAction superComponent={this} paymentType={this.state.paymentType} order={this.state.paymentOrder}/> : null}
          </div>
        </Modal>
      </div>
    )
  }
}
