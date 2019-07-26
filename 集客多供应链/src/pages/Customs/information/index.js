import React from 'react';
import {
  Button,
  Icon,
  Select,
  Card,
  Table,
  Input,
  Pagination,
  Form,
  Modal,
  Col,
  Radio,
  Upload,
  message,
  Affix
} from 'antd';
import './index.less';
import './indexx.css';
import { brandList, saveBrand, requestLog, getOrderByOrderId } from '../../../axios/api';
import { WrappedAdvancedSearchForm } from './AdvancedSearchForm';
import { PushData } from './pushhandle';
import { goodsTableColumns ,goodsTableColumnss } from './staticData';
import { baseUrl, ERR_OK } from "../../../axios/config";
import { Z_DATA_ERROR } from 'zlib';
// 引用单元素动画
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
TweenOne.plugins.push(SvgMorphPlugin);

const FormItem = Form.Item;
// radio组件
const RadioGroup = Radio.Group;

const layoutHorizontal = 'horizontal';
const Option = Select.Option;
const confirm = Modal.confirm;
// 单元素动效
const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
const p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
const ease0 = TweenOne.easing.path(p0);
const ease1 = TweenOne.easing.path(p1);
const children = PropTypes.any;
const className = PropTypes.string; 
const paused = PropTypes.bool;
// const Brand = TweenOne.TweenOneGroup;

export default class Brand extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('商品');

    this.setState({
      goodsTableColumns,
      goodsTableColumnss
    })
    // 按钮文字显示动效
    this.onshowtxt();
    let paramss ={}
    this._getrequestLog(paramss)
  }

  state = {
    // 默认第几页
    defaultCurrent: 1,
    //页面大小
    pagesize: 20,
    //数据总条数
    dataTotal: 0,
    //页面大小可选项
    pageSizeOptions: ['20', '30', '40'],
    mockTableListData: [],
    mockTableListDatas:[],
    goodsTableColumns: [],
    goodsTableColumnss:[],
    visible: false,
    // 触发搜索后 记录搜索条件
    paramsa:[],
    // 增加排序搜索模块
    // data: [],
    // pagination: {},
    loading: false,
    tableEmpty: {
      // 空数据样式
      emptyText: () => <div>
        <Icon type="frown" theme="outlined"/>
        暂无数据
      </div>
    },
    visibleModelAddGoods: false,
    loadingAddGoods: false,
    loadingSearch: false,
    // radio组件
    value: '',
    // 新增品牌
    name: '',
    shortName: '',
    countryId: '',
    tagNames: '',
    initial:'',
    isHot: '',
    image: '',
    savemodel: [],
    saveidx: '',
    savesize: 5,
    // edit
    // visiblea:false,
    fileList: [],
    isR: 0,
    // 固钉
    top: 10,
    bottom: 10,
    animation: {
      // delay: 1000,
      x: 30, 
      scale: 1, 
      rotate: 120, 
      yoyo: false, // demo 演示需要
      repeat: 1, // demo 演示需要
      duration: 1000
    },
    // 文字动效
    show: false,

    // 海关订单信息
    orderNo: '',
    oldOrderNo: '',
    payIntialRequest: '',
    payIntialResponse: '',
    ebpCode: '',
    payCode: '',
    payTransactionId: '',
    totalAmount: '',
    currency: '',
    verDept: '',
    payType: '',
    tradingTime: '',
    recpAccount: '',
    recpCode: '',
    recpName: '',
    note:'',
  };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  getEnter = (e) => {
    switch (e.index) {
      case 0:
        return {
          rotate: 90,
          opacity: 0,
          y: -60,
        };
      case 10:
      case 1:
        return {
          y: -60,
          x: -10,
          opacity: 0,
        };
      case 9:
      case 2:
        return {
          y: -60,
          x: 20,
          opacity: 0,
        };
      case 3:
        return {
          y: 60,
          opacity: 0,
        };
      case 8:
      case 4:
        return {
          x: 30,
          opacity: 0,
        };
      case 5:
        return {
          enter: [
            {
              scale: 2,
              opacity: 0,
              type: 'set',
            },
            { scale: 1.2, opacity: 1, duration: 300 },
            { scale: 0.9, duration: 200 },
            { scale: 1.05, duration: 150 },
            { scale: 1, duration: 100 },
          ],
          leave: {
            opacity: 0, scale: 0,
          },
        };
      case 6:
        return {
          scale: 0.8,
          x: 30,
          y: -10,
          opacity: 0,
        };
      case 7:
        return {
          scale: 0.8,
          x: 30,
          y: 10,
          opacity: 0,
        };
      default:
        return {
          opacity: 0,
        };
    }
  }

  onshowtxt = () => {
    this.setState({
      show: !this.state.show
    });
  }

  productAction(product, type) {
    switch (type) {
      case 'edit':
        this._productEdit(product);
        break;
      case 'delete':
        this._productDelete(product);
        break;
    }
  };

  // 获取海关信息列表
  _getrequestLog(params) {
    requestLog(params, 'GET').then(res => { 
      if (res.data.code === ERR_OK) { 
        console.log(res.data)
        if (res.data.data && res.data.data.length > 0) {
          this.setState({loadingSearch: false});
          let orderList = res.data.data;
          this.setState({
            dataTotal: res.data.count
          });
          this._setdata(orderList)
        } else {  
          this.setState({loadingSearch: false});
          // message.warning('当前操作无数据');
          message.warning(res.data.msg);
        }
      }
    })
  }
  _setdata(orderList) {
    // console.log(typeof (orderList[0].isRequestSucc))
    console.log(orderList[0].isRequestSucc)
    let mockTableListData = []
    orderList.map((order, i) => {
      mockTableListData.push({
        key: i + 1,
        orderNo: order.orderNo,
        isRequestSucc: order.isRequestSucc == '1' ? '是' : '否',
        isCustomsSucc: order.isCustomsSucc == '1' ? '是' : '否',
        syncNumber: order.syncNumber,
        createTime: order.createTime,
        updateTime: order.updateTime
      })
    })
    this.setState({
      orderList,
      mockTableListData,
    })
  }

  // 获取海关信息详情
  _getOrderByOrderId(record) {
    console.log(record.orderNo) 
    let params = {
      orderNo: record.orderNo
      // orderNumber: record.orderNo
    }
    getOrderByOrderId(params, 'GET').then(res => { 
      if (res.data.code === ERR_OK) { 
        console.log(res.data)
        this.setState({
          orderNo: res.data.data.orderNo,
          oldOrderNo: res.data.data.oldOrderNoNo,
          payIntialRequest: res.data.data.payIntialRequest,
          payIntialResponse: res.data.data.payIntialResponse,
          ebpCode: res.data.data.ebpCode,
          payCode: res.data.data.payCode,
          payTransactionId: res.data.data.payTransactionId,
          totalAmount: res.data.data.totalAmount,
          currency: res.data.data.currency,
          verDept: res.data.data.verDept,
          payType: res.data.data.payType,
          tradingTime: res.data.data.tradingTime,
          recpAccount: res.data.data.recpAccount,
          recpCode: res.data.data.recpCode,
          recpName: res.data.data.recpName,
          note: res.data.data.note,
        });
        let orderMain = res.data.data.orderItemList;
        this._setdatas(orderMain)
      }
    })
  }

  _setdatas(orderMain) {
    let mockTableListDatas = []
    console.log('111',orderMain)
    if (orderMain) {
      if (orderMain.length > 0) {
        orderMain.map((order, i) => {
          mockTableListDatas.push({
            key: i + 1,
            gname: order.gname,
            itemLink: order.itemLink
          })
        })
        this.setState({
          orderMain,
          mockTableListDatas,
        })   
      }
    }
  }
  
  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    console.log(this.state.paramsa.filters)
    console.log(current, pageSize);
    this.setState({
      pagesize: pageSize,
    });

    let params = {
      pageidx: 1,
      pagesize: pageSize,
      filters: this.state.paramsa.filters
    };

    this.setState({
      savesize: pageSize,
      savemodel: params,
    });
    this._getrequestLog(params);
  };

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(this.state.paramsa.filters)
    console.log('当前页码',page);
    console.log('当前页显示条数', pageSize)
    if (this.state.paramsa.filters) {
      let params = {
        pageidx: page,
        pagesize: pageSize,
        filters: this.state.paramsa.filters
      };
      this.setState({
        savesize: pageSize,
        savemodel: params,
      });
      // this._getBrandList(params);
      this._getrequestLog(params);
    } else {
      let params = {
        pageidx: page,
        pagesize: pageSize,
        // filters: this.state.paramsa.filters
      };
      this.setState({
        savemodel: params,
      });
      this._getrequestLog(params);
    }
  };

  // 搜索
  search = (params) => {
    let paramsa = params.params
    let paramsb = {
      pageidx: 1,
      pagesize: this.state.savesize,
      filters: paramsa.filters,
    }

    this.setState({
      paramsa: paramsa,
    });

    this._getrequestLog(paramsb)

  }

  pusha = (val) => {
    this.setState({
      name: val.value,
    });
    console.log(this.state.name)
  }
  pushb = (val) => {
    this.setState({
      shortName: val.value,
    });
    console.log(this.state.shortName)
  }
  pushc = (val) => {
    this.setState({
      countryId: val.value,
    });
    console.log('设置前国家id',this.state.countryId)
  }
  pushd = (val) => {
    this.setState({
      tagNames: val.value,
    });
    console.log(this.state.tagNames)
  }
  pushe = (val) => {
    this.setState({
      initial: val.value,
    });
    console.log(this.state.initial)
  }

  // 显示订单详情
  // showModal = () => {
  //   // localStorage.setItem('localBrandData', '');
  //   this.setState({
  //     visible: true,
  //   });
  // }

  // 编辑提示窗口
  showModala = (params) => {
    console.log(params)
    // let data = {
    //   uid: '-1',
    //   name: params.imagePath,
    //   status: 'done',
    //   url: baseUrl + params.imagePath,
    // }
    // fileList.push(data)
    console.log('唤醒编辑框') 
    var brandData = JSON.stringify(params);// 转成JSON格式
    localStorage.setItem('localBrandData', '');
    localStorage.setItem('localBrandData', brandData);
    let localdatas = JSON.parse(brandData)
    console.log(localdatas)
    if (localdatas) {
      console.log(localdatas.isHot)
      this.setState({
        value: localdatas.isHot,
        name: localdatas.name,
        shortName: localdatas.shortName,
        countryId: localdatas.countryId,
        tagNames: localdatas.tagNames,
        isHot: localdatas.isHot,
        image: localdatas.image,
        initial: localdatas.initial,
      });
    }
    if (localdatas.imageURL !='') {
      // fileList.push({'url':localdatas.imageURL})
      // console.log(localdatas)
      let fileList = []
      let data = {
        uid: '-1',
        name: localdatas.name,
        status: 'done',
        url: baseUrl + localdatas.image,
      }
      fileList.push(data)
      this.setState({
        fileList: fileList,
      });
      // console.log(this.state.fileList)
    }
    this.setState({
      visiblea: true,
    });
  }
  
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancela = (e) => {
    this.setState({
      visiblea: false,
    });
  }
  // radio
  clickRadio = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      isHot: e.target.value,
    });
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    // 编辑 移除图片
    const removeAction=()=> {
      console.log('移除图片')
      this.setState({
        fileList: ''
      })
      // let fileList = ''
    }

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="page goods-page">
        <div className="m-t-lg">
          {/* 搜索 */}
          <Card hoverable={true} className="tableData">
            <Card hoverable={true}>
              <WrappedAdvancedSearchForm
                search={this.search}
                loadingSearch={this.state.loadingSearch}
              />
            </Card>
            <Table
              dataSource={this.state.mockTableListData}
              columns={this.state.goodsTableColumns}
              locale={this.state.tableEmpty}
              loading={this.state.loadingSearch}
              pagination={false}
              className='brandlists'
              onRow={(record) => {
                return {
                  onClick: () => {
                    console.log(record)
                    this._getOrderByOrderId(record)
                    this.setState({
                      visible: true,
                    });
                  },      
                };
              }}
            />
            <Pagination
              defaultCurrent={this.state.defaultCurrent}
              pageSize={this.state.pagesize}
              showSizeChanger
              total={this.state.dataTotal}
              pageSizeOptions={this.state.pageSizeOptions}
              onShowSizeChange={this.pageSizeChange}
              onChange={this.pageChange.bind(this)}
            />
          </Card>
          <Modal
            title="订单信息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose={true}
          >
            <h3>订单详情</h3>
            <div  className='ddMainList'>
              <Input size="small" disabled addonBefore='订单号' style={{ marginBottom: '3px' }} value={this.state.orderNo}/>
              <Input size="small" disabled addonBefore='原始订单号' style={{ marginBottom: '3px' }}  value={this.state.oldOrderNo}/>
              <Input size="small" disabled addonBefore='支付原始请求' style={{ marginBottom: '3px' }} value={this.state.payIntialRequest}/>
              <Input size="small" disabled addonBefore='支付原始响应' style={{ marginBottom: '3px' }}  value={this.state.payIntialResponse} />
              <Input size="small" disabled addonBefore='电商平台的海关注册登记编号' style={{ marginBottom: '3px' }}  value={this.state.ebpCode}/>
              <Input size="small" disabled addonBefore='支付企业的海关注册登记编号' style={{ marginBottom: '3px' }}  value={this.state.payCode}/>
              <Input size="small" disabled addonBefore='交易流水号' style={{ marginBottom: '3px' }}  value={this.state.payTransactionId}/>
              <Input size="small" disabled addonBefore='交易金额' style={{ marginBottom: '3px' }}  value={this.state.totalAmount}/>
              <Input size="small" disabled addonBefore='实际交易币制（海关编码）' style={{ marginBottom: '3px' }}  value={this.state.currency}/>
              <Input size="small" disabled addonBefore='验核机构' style={{ marginBottom: '3px' }}  value={this.state.verDept}/>
              <Input size="small" disabled addonBefore='支付类型' style={{ marginBottom: '3px' }} value={this.state.payType}/>
              <Input size="small" disabled addonBefore='交易成功时间' style={{ marginBottom: '3px' }} value={this.state.tradingTime} />
              <Input size="small" disabled addonBefore='收款账号' style={{ marginBottom: '3px' }}  value={this.state.recpAccount}/>
              <Input size="small" disabled addonBefore='收款企业代码' style={{ marginBottom: '3px' }}  value={this.state.recpCode}/>
              <Input size="small" disabled addonBefore='收款企业名称' style={{ marginBottom: '3px' }}  value={this.state.recpName}/>
              <Input size="small" disabled addonBefore='备注' style={{ marginBottom: '3px' }}  value={this.state.note}/>
            </div>
            <h3>商品信息</h3>
            <Table
              dataSource={this.state.mockTableListDatas}
              columns={this.state.goodsTableColumnss}
              locale={this.state.tableEmpty}
              loading={this.state.loadingSearch}
              pagination={false}
              className='infoList'
            />
          </Modal>
        </div>
      </div>
    )
  }
}
