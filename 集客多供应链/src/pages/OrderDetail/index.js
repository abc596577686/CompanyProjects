import React from 'react';
import {Link} from 'react-router-dom'
import {getValForKey, dateFormate} from '../../utils/index'
import {
  Card,
  Input,
  Row,
  Col,
  Select,
  Button,
  message,
  Modal,
  Table,
  Tabs,
  Form,
  Breadcrumb,
  Icon,
  Carousel,
  Spin
} from 'antd';
import CustomerOrder from '../CustomerOrder/index'
import './index.less'
import axios from 'axios'
import {baseUrl, ERR_OK} from '../../axios/config'
import AllOrder from "../AllOrder/index";
import {getOrderDetail,updateReceiveInfo,getAddressList,orderPackageList} from '../../axios/api';
const TabPane = Tabs.TabPane
const Option = Select.Option
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
//物流信息
function Logistics(props){
    const logInfo = (
      <div>
        <Tabs defaultActiveKey={props.packIndex} onChange={props.selectPackCallback}>
          {
            props.info&&props.info.length>0&&
            props.info.map((item,index) =>{
              return(
                <TabPane tab={`包裹${index+1}`} key={index}></TabPane>
              )
            })
          }
        </Tabs>
        <ul>
          {
           props.info&&props.info.length>0&&
            props.info.map((list,idx) =>
              <li className={props.packIndex==idx?'pack':'pack none'} key={idx}>
                {
                  list.expressNo&&
                  <div className='packHead'>
                    <span>物流单号：{list.expressNo}</span>
                    <span>物流公司：{list.expressCompany}</span>
                  </div>
                }
                <ul>
                  {
                    list.expressVo.data && list.expressVo.data.length > 0 &&
                    list.expressVo.data.map((item,i) => {
                      return (
                        <li className='pack-item' key={i}>
                          <span>{dateFormate(item.time)}</span>
                          &nbsp;&nbsp;
                          <span>{item.context}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            )
          }
        </ul>
      </div>
    )
    return(
      <div className='infoBox'>
        <div className='log_main'>
          {
            props.info ?
              logInfo : <div>暂无物流信息</div>
          }
        </div>
      </div>
    )
}
export default class OrderDetail extends React.Component {
  state = {
    explainList: [
      '请您于24小时之内操作发货，如果缺货，需联系买家协商退款。',
      '买家已付款，请尽快发货，否则买家有权申请退款。此期间，您可以修改【收货信息】。',
      '如果无法发货，请及时与买家联系并说明情况。',
      '买家申请退款后，将无法操作立即发货，请先去【退货退款】进行相关操作。',
      '在此期间，买家申请退款，商家需要在24小时之内处理（退款/拒绝），超24小时未处理，金额将自动退回买家账户',
    ],
    tagStatus: [
      '订单信息',
      '物流日志',
      '操作记录'
    ],
    tags: '0',
    showCloseTradBox: false,
    showAddressBox: false,
    orderInfo: {},
    orderItemList: [],
    page: '2',
    orderHistoryList: [],
    //包裹
    packIndex : '0',
    logLoading : false
  }
  
  componentWillMount() {
    let orderId = this.props.orderId
    console.log('orderId-----------', orderId);
    if (orderId != undefined) {
      console.log(1111111111111111)
      this.setState({
        orderId
      })
      this._getOrderDetail(orderId)
    }
  }
  //获取订单状态
  getOrderStatusName(order) {
    console.log('---------', order.status)
    switch (order.status) {
      case 1 :
        return (
          '未支付'
        )
      case 2 :
        return (
          '未发货'
        )
      case 3 :
        return (
          '已发货'
        )
      case 4 :
        return (
          '已收货'
        )
      case 5 :
        return (
          '交易关闭'
        )
      default :
        return (
          ''
        )
    }
  }
  //获取物流信息
  _orderPackageList = () => {
    this.setState({
      logLoading : true
    })
    let params = {
      orderId : this.state.orderId
    }
    orderPackageList(params,'get').then(res => {
      this.setState({
        logLoading : false
      })
      if(res.data.code==='1'){
        console.log(res)
        let orderPackList = res.data.data
        this.setState({
          orderPackList
        })
      }
    })
  }
  onChangeTags = (e) => {
    console.log(e)
    this.setState({
      tags: e
    })
    if(e==='1'){
      this._orderPackageList()
    }
    
  }
  transProductType = (productType) => {
    console.log(productType, typeof productType)
    switch (productType) {
      case 1 :
        return (
          <span>国内商品</span>
        )
      case 2 :
        return (
          <span>保税商品</span>
        )
      case 3 :
        return (
          <span>直邮商品</span>
        )
    }
    
  }
  transPayType = (payType) => {
    let type
    if (payType == '1') {
      type = '支付宝'
    } else if (payType == '2') {
      type = '微信'
    } else if (payType == '3') {
      type = '美付宝'
    } else {
      type = '未支付'
    }
    return type
  }
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
  _getOrderDetail = (orderId) => {
    getOrderDetail({orderId: orderId}, 'GET').then(res => {
      console.log('订单详情：', res);
      if (res.data.code !== ERR_OK) {
        return;
      }
      if (res.data.code === ERR_OK) {
        let orderInfo = res.data.data.order;
        let orderItemList = res.data.data.orderItemList;
        let statusMessageList = res.data.data.statusMessageList;
        let orderHistoryList = res.data.data.orderHistoryList;
        this.setState({
          orderInfo,
          orderItemList,
          statusMessageList,
          orderHistoryList
        })
      }
    })
  }
  //关闭交易弹窗
  showCloseTradEnv = () => {
    this.setState({
      showCloseTradBox: true
    })
  }
  handleOk = () => {
    this.setState({
      showCloseTradBox: false
    })
  }
  handleCancel = () => {
    this.setState({
      showCloseTradBox: false
    })
  }
  //地址模态框
  showModalBox = () => {
    this.setState({
      showAddressBox: true,
      consigneeVal: this.state.orderInfo.consignee,
      consigneePhoneVal: this.state.orderInfo.consigneePhone,
      addressVal: this.state.orderInfo.address,
      provinceIdVal: this.state.orderInfo.provinceId,
      cityIdVal: this.state.orderInfo.cityId,
      areaIdVal: this.state.orderInfo.areaId,
      provinceNameVal : this.state.orderInfo.provinceName,
      cityNameVal : this.state.orderInfo.cityName,
      areaNameVal : this.state.orderInfo.areaName
      
    })
  }
  bindConsignee = (e) => {
    let consigneeVal = e.target.value
    this.setState({
      consigneeVal
    })
  }
  bindConsigneePhone = (e) => {
    let consigneePhoneVal = e.target.value
    this.setState({
      consigneePhoneVal
    })
  }
  bindAddress = (e) => {
    let addressVal = e.target.value
    this.setState({
     addressVal
    })
  }
  handleOk = () => {
    let params = {
      orderId: this.state.orderId,
      consignee: this.state.consigneeVal,
      consigneePhone: this.state.consigneePhoneVal,
      address: this.state.addressVal,
      provinceId: this.state.provinceIdVal,
      cityId: this.state.cityIdVal,
      areaId: this.state.areaIdVal
    }
    updateReceiveInfo(params).then(res => {
      console.log(res)
      if (res.data.code === '1') {
        this.setState({
          showAddressBox: false
        })
        this._getOrderDetail(this.state.orderId)
        message.success(res.data.msg)
      } else {
        message.error(res.data.msg)
      }
    })
    
  }
  handleCancel = () => {
    this.setState({
      showAddressBox: false
    })
    
  }
  //获取省市区
  _getAddressList = (type, id) => {
    let params
    if (type === 'province') {
      params = ''
    } else {
      params = {
        areaId : id
      }
    }
    getAddressList(params).then(res => {
      if (res.data.code !== '1') return
      if (type === 'province') {
        let provinceList = res.data.data
        this.setState({
          provinceList
        })
      } else if (type === 'city') {
        let cityList = res.data.data
        this.setState({
          cityList
        })
      } else if (type === 'area') {
        let areaList = res.data.data
        this.setState({
          areaList
        })
      }
    })
  }
  selectProvince = (e,option) => {
    console.log('1111--------',e,option)
    this.setState({
      provinceNameVal : option.props.children,
      provinceIdVal : option.key,
      cityList : null,
      cityNameVal : '请选择城市',
      cityIdVal:null,
      areaNameVal : '请选择地区',
      areaIdVal : null
    })
  }
  selectCity = (e,option) => {
    this.setState({
      cityNameVal : option.props.children,
      cityIdVal : option.key,
      areaNameVal : '请选择地区',
      areaIdVal : null
    })
  }
  selectArea = (e,option) => {
    this.setState({
      areaNameVal : option.props.children,
      areaIdVal : option.key,
    })
  }
  //物流包裹选择回调
  selectPack = (e) => {
    console.log(e)
    this.setState({
      packIndex : e
    })
  
  }
  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        className: 'itemer',
        width: '30%'
      },
      {
        title: '规格',
        dataIndex: 'skuName',
        className: 'itemer',
        key: 'skuName',
        width: '20%'
      },
      {
        title: 'SKU',
        dataIndex: 'SKU',
        className: 'itemer',
        key: 'SKU',
      },
      {
        title: '单价',
        dataIndex: 'price',
        className: 'itemer',
        key: 'price',
      },
      {
        title: '数量',
        dataIndex: 'num',
        className: 'itemer',
        key: 'num',
      },
      {
        title: '商品总价',
        dataIndex: 'total',
        className: 'itemer',
        key: 'total',

      }
    ]
    let dataList = []
    const orderInfo = this.state.orderInfo
    const itemList = this.state.orderItemList
    itemList.forEach((item, index) => {
      dataList.push({
        key: index,
        name: item.productName,
        skuName: item.productTags?item.productTags:'单品',
        SKU: item.productSku,
        price: item.productPrice ? `￥${item.productPrice.toFixed(2)}` : '',
        num: item.quantity,
        total: item.paymentPrice ? `￥${item.paymentPrice.toFixed(2)}` : ''
      })

    })
    return (
      <div className='detail-page'>
        {/*关闭交易*/}
        <Modal
          title="请您在与买家达成一致的前提下，使用关闭这个功能！"
          visible={this.state.showCloseTradBox}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>请选择关闭交易的理由</p>
          <Select defaultValue='缺货' onChange={this.changeCloseReason} style={{width: '400px', height: '40px'}}>
            <Option value='1'>缺货</Option>
            <Option value='2'>未及时支付</Option>
            <Option value='3'>买家不想买</Option>
            <Option value='4'>买家信息填写错误</Option>
            <Option value='5'>买家拍错了</Option>
          </Select>
        </Modal>
        {/*修改地址*/}
        <Modal
          title="修改收货信息"
          visible={this.state.showAddressBox}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <FormItem
              label="收货人"
              {...formItemLayout}>
              <Input onChange={this.bindConsignee} value={this.state.consigneeVal}/>
            </FormItem>
            <FormItem
              label="手机号"
              {...formItemLayout}>
              <Input onChange={this.bindConsigneePhone} value={this.state.consigneePhoneVal}/>
            </FormItem>
            <FormItem
              label="省市区"
              {...formItemLayout}>
              <Select
                defaultValue={this.state.provinceNameVal}
                onChange={this.selectProvince}
                onFocus={this._getAddressList.bind(this,'province')}
                value={this.state.provinceNameVal}
                style={{minWidth:'120px',marginRight:'3px'}}
              >
                {
                  this.state.provinceList&&this.state.provinceList.length>0&&
                  this.state.provinceList.map(item => {
                    return <Option key={item.areaId}>{item.areaName}</Option>
                  })
                }
              </Select>
              <Select
                defaultValue={this.state.cityNameVal}
                value={this.state.cityNameVal}
                onChange={this.selectCity}
                onFocus={this._getAddressList.bind(this,'city',this.state.provinceIdVal)}
                style={{minWidth:'120px',marginRight:'3px'}}
              >
                {
                  this.state.cityList&&this.state.cityList.length>0&&
                  this.state.cityList.map(item => {
                    return <Option key={item.areaId}>{item.areaName}</Option>
                  })
                }
              </Select>
              <Select
                defaultValue={this.state.areaNameVal}
                value={this.state.areaNameVal}
                onChange={this.selectArea}
                onFocus={this._getAddressList.bind(this,'area',this.state.cityIdVal)}
                style={{minWidth:'120px',marginRight:'3px'}}
              >
                {
                  this.state.areaList&&this.state.areaList.length>0&&
                  this.state.areaList.map(item => {
                    return <Option key={item.areaId}>{item.areaName}</Option>
                  })
                }
              </Select>
            </FormItem>
            <FormItem
              label="详细地址"
              {...formItemLayout}>
              <Input onChange={this.bindAddress} value={this.state.addressVal}/>
            </FormItem>
          </div>

         
        </Modal>
        <div className='detailPage'>
            {/*<Card*/}
              {/*title={`当前订单状态: ${this.getOrderStatusName(orderInfo)}`}*/}
              {/*style={{background: 'rgb(255, 248, 237)', margin: '10px 20px'}}*/}
              {/*hoverable={true}*/}
            {/*>*/}
              {/*<div className='status-content'>*/}
                {/*<ul>*/}
                  {/*{*/}
                    {/*this.state.statusMessageList &&*/}
                    {/*this.state.statusMessageList.map((item, index) => {*/}
                      {/*return (*/}
                        {/*<li className='li_item' key={index}>*/}
                          {/*<span className='circle'></span>*/}
                          {/*{item.message}*/}
                        {/*</li>*/}
                      {/*)*/}
                    {/*})*/}
                  {/*}*/}
                {/*</ul>*/}
                {/*/!*<Row>*!/*/}
                {/*/!*<Col offset={1}>*!/*/}
                {/*/!*{*!/*/}
                {/*/!*orderInfo.status == '2' &&*!/*/}
                {/*/!*<div className='btnBox'>*!/*/}
                {/*/!*<Button>立即发货</Button>*!/*/}
                {/*/!*<Button style={{margin:'10px'}} onClick={this.showAddressBox}>修改收货信息</Button>*!/*/}
                {/*/!*</div>*!/*/}
                {/*/!*}*!/*/}
                {/*/!*{*!/*/}
                {/*/!*orderInfo.status == '1' &&*!/*/}
                {/*/!*<div className='btnBox'>*!/*/}
                {/*/!*<Button onClick={this.showCloseTradEnv}>关闭交易</Button>*!/*/}
                {/*/!**!/*/}
                {/*/!*</div>*!/*/}
                {/*/!*}*!/*/}
                {/*/!*</Col>*!/*/}
                {/*/!*</Row>*!/*/}
              {/*</div>*/}
            {/*</Card>*/}
            <Card style={{margin: '20px'}}>
              <div className='detail-info'>
                <Tabs onChange={this.onChangeTags}>
                  {
                    this.state.tagStatus.map((tag, i) =>
                      <TabPane tab={tag} key={i}>
                      </TabPane>
                    )
                  }

                </Tabs>
                <Card hoverable={true}>
                  {
                    this.state.tags == '0' &&
                    <div className='orderInfo'>
                      <div className='orderInfo-main'>
                        <Row>
                          <Col span={8}>
                            <div className='item'>
                              <span>订单编号：</span>
                              {this.state.orderInfo.orderNo}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className='item'>
                              <span>订单状态：</span>
                              {this.getOrderStatusName(orderInfo)}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className='item'>
                              <span>下单平台：</span>
                              {this.transChannelId(orderInfo.channelId)}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={8}>
                            <div className="item">
                              <span>下单时间：</span>
                              {this.state.orderInfo.createTime ? dateFormate(this.state.orderInfo.createTime) : ''}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="item">
                              <span>支付时间：</span>
                              {
                                orderInfo.payTime ?
                                  dateFormate(orderInfo.payTime) : ''
                              }
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="item">
                              <span>支付方式：</span>
                              {
                                this.transPayType(orderInfo.paymentType)
                              }
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={8}>
                            <div className='item'>
                              <span>订单类型：</span>
                              {this.transProductType(orderInfo.productType)}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="item">
                              <span>支付流水：</span>
                              {
                                orderInfo.tradeNo === null ?
                                  '' : orderInfo.tradeNo
                              }
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="add-info">
                              <span className='tags'>收货人地址：</span>
                              <span>{orderInfo.consignee}, {orderInfo.consigneePhone}, {orderInfo.fullAddress}</span>
                              <Icon type="form"
                                    style={{marginLeft:'8px',fontSize:'14px',color:'#666'}}
                                    onClick={this.showModalBox}/>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  }
                  {
                    this.state.tags == '1' &&
                    <div className='orderInfo'>
                      <Spin spinning={this.state.logLoading} size='small'>
                        <div className='orderInfo-main'>
                          <Logistics
                            info={this.state.orderPackList}
                            _selectPackCallback ={this.selectPack}
                            packIndex = {this.state.packIndex}
                          />
                        </div>
                      </Spin>
                    </div>
                  }
                  {
                    this.state.tags == '2' &&
                    <div className='logInfo'>
                      <div className='orderInfo-main'>
                        <Row>
                          <Col>
                            <div className='status-content'>
                              <ul>
                                {
                                  this.state.orderHistoryList && this.state.orderHistoryList.length > 0 ?
                                    this.state.orderHistoryList.map((item, index) => {
                                      return (
                                        <li className='li_item' key={index}>
                                          <span className='circle'></span>
                                          {item.message}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dateFormate(item.createTime)}

                                        </li>
                                      )
                                    }) : <div>暂无操作记录</div>
                                }
                              </ul>
                              {/*<Row>*/}
                              {/*<Col offset={1}>*/}
                              {/*{*/}
                              {/*orderInfo.status == '2' &&*/}
                              {/*<div className='btnBox'>*/}
                              {/*<Button>立即发货</Button>*/}
                              {/*<Button style={{margin:'10px'}} onClick={this.showAddressBox}>修改收货信息</Button>*/}
                              {/*</div>*/}
                              {/*}*/}
                              {/*{*/}
                              {/*orderInfo.status == '1' &&*/}
                              {/*<div className='btnBox'>*/}
                              {/*<Button onClick={this.showCloseTradEnv}>关闭交易</Button>*/}
                              {/**/}
                              {/*</div>*/}
                              {/*}*/}
                              {/*</Col>*/}
                              {/*</Row>*/}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>

                  }

                </Card>
              </div>
              <div className='goodsInfo'>
                <Table columns={columns} dataSource={dataList} bordered={true} pagination={false}>
                </Table>
              </div>
              <Card style={{marginTop: '20px'}} hoverable={true}>
                <div className='footer'>
                  <Row>
                    <Col span={4} offset={20}>
                      <div className='items'>
                        <span className='tags'>商品总金额：</span>
                        ￥{
                        orderInfo.orderAmount === undefined ? '' : orderInfo.orderAmount.toFixed(2)
                      }
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4} offset={20}>
                      <div className='items'>
                        <span className='tags'>运费：</span>
                        <span>￥{orderInfo.postage === undefined ?
                          '' : orderInfo.postage.toFixed(2)}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4} offset={20}>
                      <div className='items'>
                        <span className='tags'>进口关税：</span>
                        ￥
                        {
                          orderInfo.tax !== undefined ?
                            orderInfo.tax.toFixed(2) : ''
                        }
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4} offset={20}>
                      <div className='items'>
                        <span className='tags'>优惠劵：</span>
                        ￥0.00
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4} offset={20}>
                      <div>
                        <div className='totalPrice'>
                          <span className='tags'>实付总金额：</span>
                          ￥{
                          orderInfo.payAmount === undefined ? '' : orderInfo.payAmount.toFixed(2)
                        }
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Card>
          </div>
      </div>
    )
  }
}