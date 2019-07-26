import React from 'react';
import {
  Button,
  Card,
  message,
  Table,
  Modal,
  Select,
  Input,
  Popover,
  Row,
  Spin,
  Tabs,
  Col,
  Icon,
  Pagination,
  Timeline,
  Menu,
  Dropdown,
  Radio
} from 'antd';
import {
  pushTeamList,
  teamDetail,
  customerList,
  queryUserInfo,
  getCustomerHistory,
  saveCustomerHistory,
  updateCustomerInfo,
  getUserInfo,
  updateStatus,
  allocateUserMember,
  dockRecordList,
  checkDock
} from '../../../axios/api';
import './applyDockList.css';
// import PropTypes from 'prop-types'
import { monthDataColumns, monthDataColumnss, historyColumns, historyColumnss } from './columnsType'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TabPane = Tabs.TabPane
const Option = Select.Option;
const confirm = Modal.confirm;
const { TextArea } = Input;

export default class GiftPack extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loadingSearch: false,
    secTeamData: [],
    showLoading: false,
    orderList: [],  //团队信息
    tabStatus: 0,
    visible: false,
    managerList: [],
    qydata: [],
    localregionId: '',
    localManagerId: '',
    tableEmpty: {
      emptyText: () => <div>
        <Icon type="frown" theme="outlined" />
        暂无数据
      </div>
    },
    localkeyid: '',
    // 默认第几页
    defaultCurrent: 1,
    //页面大小
    pageidx: 1,
    pagesize: 10,
    status: '0',
    //数据总条数
    dataTotal: 0,
    //页面大小可选项
    pageSizeOption: ['5', '10', '15'],

    // 默认第几页
    defaultCurrents: 1,
    //数据总条数
    dataTotals: 0,
    dataColumns: [],
    monthDataColumns: [],
    monthDataColumnss: [],
    account: '请输入搜索内容',
    monthData: [],  //本月数据
    underTeamList: [],
    phoneCode: '',
    showLoadings: false,
    searchStatus: '1',   //默认未搜索状态 
    keyword: '',  //搜索关键词
    allorder: false,
    value: 'asdaddsadsadas',
    copied: false,
    userInfo: [],
    kfName: '',
    kfRemark: '',
    timeLineData: [],
    addType: '',
    addArea: '',
    addContent: '',
    sort: '1',
    sortType: '2',
    userchannelType: '',
    searchDownStatus: true,
    level: 0,        // 0所有 1v0 2v1 4v2 5v3
    concatType: 4,   // 0未联系 1已联系 2联系中 3已拒绝 4所有
    inviteType: 0,   // 0所有 1直接 2转介绍
    monthType: null,   // 1当月注册/分配  2当月晋升 3当月续费 7当月联系 4转介绍注册 5转介绍晋升 6转介绍续费
    totalAllocateNumber: '',   //共有试用名额
    totalUsedNumber: '',       //已使用试用名额
    totalSurplusNumber: '',   //试用名额剩余
    imagePathUrl: '',
    showImg: false
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this.getUserInfo()
    // this.getPushTeamList();    //获取默认团队列表
    this.getCustomerDetail();  
    this.setState({
      monthDataColumns,
      monthDataColumnss,
      historyColumns
    })
  }

  // getLocalTime(nS) {     
  //   if (nS == 0) {
  //     return '' 
  //   }
  //   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
  // }

  dateFormate = date => {
    if (date == '' || date == null || date == 0) {   //空值或者0 不显示
      return null
    }
    if (date.length == 10) {   //10位时间戳
      var now = new Date(date * 1000),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    } else {   //13位时间戳
      var now = new Date(date),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
  }

  getUserInfo = () => {
    let params = {}
    getUserInfo(params, 'GET').then(res => {
      if (res.data.code == 1) {
        console.log('当前检测用户渠道类别：', res.data.data.channelType)
        this.setState({ userchannelType: res.data.data.channelType })
      }
    })
  }

  // onClickMeun = ({ key }) => {
  //   console.log(key);
  //   console.log(this.state.localStatus);

  //   let params = {
  //     userId: this.state.localStatus,
  //     type: key
  //   }
  //   updateStatus(params, 'GET').then(res => {
  //     if (res.data.code == 1) {
  //       message.success(res.data.msg)
  //       this.getCustomerDetail()  //重渲染
  //     } else {
  //       message.warning(res.data.msg)
  //     }
  //   })
  // }

  getCustomerDetail = () => {
    this.setState({
      underTeamList: []
    })
    this.setState({ showLoading: true })
    let params = {
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    }
    dockRecordList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        let currentUnderTeamList = res.data.data   //用户信息{
        this.setState({
          dataTotals: Number(res.data.total),
          totalAllocateNumber: res.data.totalAllocateNumber,
          totalUsedNumber: res.data.totalUsedNumber,
          totalSurplusNumber: res.data.totalSurplusNumber
        })
        let underTeamList = []
        currentUnderTeamList.map((data, j) => {
          underTeamList.push({
            key: j + 1000,
            bdUserId: data.bdUserId,
            bdUserName: data.bdUserName,
            complateTime: data.complateTime,
            createTime: data.createTime,
            imagePath: data.imagePath,
            mobile: data.mobile,
            oldBdUserName: data.oldBdUserName,
            promoteTime: data.promoteTime,
            recordId: data.recordId,
            registerTime: data.registerTime,
            status: data.status,
            userId: data.userId,
            userName: data.userName
          })
        })
        this.setState({
          underTeamList
        })
        this.setState({ showLoading: false })
      } else {
        message.warning(res.data.msg)
        this.setState({ showLoading: false })
      }
    })
  }

  setCurrentUserId(userId) {
    // console.log(userId)
    this.setState({
      localStatus: userId
    })
  }

  changeImgStatus = (url) => {
    console.log(url)
    this.setState({
      showImg: !this.state.showImg,
      imgUrls: url
    })
  }

 

  // 获取列表  (上面表格)
  // getPushTeamList() {
  //   this.setState({ showLoading: true })
  //   let params = {
  //     type: this.state.userchannelType,
  //     pageidx: this.state.pageidx,
  //     pagesize: this.state.pagesize,
  //   }
  //   pushTeamList(params, 'GET').then(res => {
  //     if (res.data.code == 1) {
  //       if (res.data.data && res.data.data.length > 0) {
  //         let orderList = res.data.data
  //         console.log(orderList)
  //         this.setState({
  //           orderList,
  //           dataTotal: Number(res.data.total)
  //         })
  //       }
  //       this.setState({ showLoading: false })
  //     }
  //   })
  // }

  handleCheckDock = (data,key) => {
    // console.log(data.recordId)
    // console.log(key)
    if (key == 1) {              //同意 
      let params = {
        recordId: data.recordId,
        status: key
      }
      checkDock(params, 'GET').then(res => {
        if (res.data.code == 1) {
          message.success(res.data.msg)
          this.setState({ showLoading: false })
          this.getCustomerDetail();
        } else {
          message.warning(res.data.msg)
          this.setState({ showLoading: false })
        }
      })
    } else if (key == 2) {       //拒绝
      let params = {
        recordId: data.recordId,
        status: key
      }
      checkDock(params, 'GET').then(res => {
        if (res.data.code == 1) {
          message.success(res.data.msg)
          this.setState({ showLoading: false })
          this.getCustomerDetail();
        } else {
          message.warning(res.data.msg)
          this.setState({ showLoading: false })
        }
      })
    }
  }

  //地推渠道渲染列
  renderColumns = () => {
    const menu = (
      <Menu onClick={this.onClickMeun}>
      <Menu.Item key="1">已联系</Menu.Item>
      <Menu.Item key="2">联系中</Menu.Item>
      <Menu.Item key="3">已拒绝</Menu.Item>
      </Menu>
    );
    
    const columns = [
      {
        title: '序号',
        dataIndex: 'zc',
        key: 'orderInfo',
        render: (text, record) => {
          return (
            <div>
              {
                record.recordId
              }
            </div>
          )
        }
      },
      {
        title: '申请人',
        dataIndex: 'js',
        key: 'teamjs',
        render: (text, record) => {
          return (
            <div>
              {
                record.bdUserName
              }
            </div>
          )
        }
      },
      {
        title: '用户账号',
        dataIndex: 'xf',
        key: 'teamxf',
        render: (text, record) => {
          return (
            <div>
              {
                record.mobile
              }
            </div>
          )
        }
      },
      {
        title: '注册时间',
        dataIndex: 'szc',
        key: 'teamzjs',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.registerTime)
              }
            </div>
          )
        }
      },
      {
        title: '晋升时间',
        dataIndex: 'sjs',
        key: 'operate',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.promoteTime)
              }
            </div>
          )
        }
      },
      {
        title: '当前对接人',
        dataIndex: 'xbj',
        key: 'operatea',
        render: (text, record) => {
          return (
            <div>
              {
                record.oldBdUserName
              }
            </div>
          )
        }
      },
      {
        title: '申请对接时间',
        dataIndex: 'qsj',
        key: 'operateb',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.createTime)
              }
            </div>
          )
        }
      },
      {
        title: '晋升证明',
        dataIndex: 'V0',
        key: 'operatec',
        render: (text, record) => {
          return (
            <div>
              {
                <img style={{ width:'30px', cursor:'pointer' }} src={ record.imagePath} onClick={this.changeImgStatus.bind(this,record.imagePath)} />
              }
            </div>
          )
        }
      },
      {
        title: '申请结果',
        dataIndex: 'V1',
        key: 'operated',
        render: (text, record) => {
          return (
            <div>
              {
                record.status == 1 ? '已通过' : (record.status == 2 ? '已拒绝' :
                <div>
                  <Button
                    type='primary'
                    style={{ marginRight: '10px' }}
                    onClick={ this.handleCheckDock.bind(this,record,1) }
                  >通过</Button>
                  <Button
                    onClick={ this.handleCheckDock.bind(this,record,2) }
                  >拒绝</Button>
                </div>
              )
                  
            
              }
            </div>
          )
        }
      }
    ]
    return columns
  }

  // 调起地推渠道发放试用
  tryMotion = (idData) => {
    console.log(idData.userId)
    this.setState({
      isAddTest: true,
      keyUserId: idData.userId
    })
  }

  // 确认启用名额
  handleAddTest = () => {
    let params = {
      userId: this.state.keyUserId
    }
    allocateUserMember(params, 'get').then(res => { 
      if (res.data.code != 1) {
        message.warning(res.data.msg)
        return
      }
      this.setState({
        isAddTest: false,
      })
      this.getCustomerDetail();  //刷新客户管理列表数据
    })
  }



  //获取渲染数据
  getTableData = (order) => {
    let dataList = []
    dataList.push({
      key: order.teamUserId,

    })
    return dataList
  }

  // 关闭窗口
  handleCancel = () => {
    this.setState({
      visible: false,
      visibles: false,
      visibless: false,
      isAddTest: false,
      localkeyid: '',
      searchStatus: '1',  //恢复未搜索状态
    })
  }
  handleCancels = () => {
    this.setState({
      visibless: false,
      localkeyid: '',
      searchStatus: '1',  //恢复未搜索状态
      addArea: '',
      addContent: ''
    })
  }

  // 页码改变
  pageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    this.setState({
      pageidx: page,
      pagesize: pageSize
    }, () => {
      this.getCustomerDetail()
    })
  };

  // // 页面条数改变
  // pageSizeChange = (current, pageSize) => {
  //   console.log(current, pageSize);
  //   this.setState({
  //     pagesize: pageSize
  //   }, () => {
  //     this.getPushTeamList();
  //   });
  // };

  // 打开查询信息
  openSelect = () => {
    this.setState({
      visible: true
    })
  }

  // 查询信息——输入手机号
  handlePhoneInput = (e) => {
    this.setState({
      phoneCode: e.target.value
    })
  }

  // 搜索手机号 显示信息
  onSearch = () => {
    this.setState({ showLoadings: true })
    let params = {
      mobile: this.state.phoneCode
    }
    queryUserInfo(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.map) {
          let teamUserInfo = res.data.map
          console.log(teamUserInfo)
          this.setState({
            searchStatus: 2,    //改为展示搜索结果状态
            teamUserInfo
          })
        } else {
          console.log(res.data.map)
          message.warning('数据异常')
          this.setState({ showLoadings: false })
        }
        this.setState({ showLoadings: false })
      } else {
        message.warning(res.data.msg)
        this.setState({ showLoadings: false })
      }
    })
  }

  // 修改搜索关键词
  _handlekeyword = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  // 用户记录——修改用户名字
  handlekfName = (e) => {
    this.setState({
      kfName: e.target.value
    })
  }

  handlekfRemark = (e) => {
    this.setState({
      kfRemark: e.target.value
    })
  }

  // 更新
  addTypeHandle = (value) => {
    this.setState({ addType: value })
  }
  addAreaHandle = (e) => {
    this.setState({ addArea: e.target.value })
  }
  addContentHandle = (e) => {
    this.setState({ addContent: e.target.value })
  }

  // 打开新增拜访记录
  addVisitHistory = () => {
    this.setState({
      visibless: true
    })
  }

  closeImg = () => {
    this.setState({
      showImg: false
    })
  }

  // 保存新增的拜访记录
  submitAddVisitTe = () => {
    let _this = this
    let params = {
      userId: _this.state.currentUserId,
      type: _this.state.addType,
      address: _this.state.addArea,
      content: _this.state.addContent,
    }
    saveCustomerHistory(params, 'POST').then(res => {
      if (res.data.code == 1) {
        message.success(res.data.msg);
        _this.setState({
          addArea: '',
          addContent: '',
          visibless: false
        })                       //关闭小窗口
        let keyid = this.state.currentUserId  //当前userId
        this._getCustomerHistory(keyid)   //刷新用户记录——拜访记录页面数据  
      } else {
        message.error(res.data.msg);
      }
    });
  }

  // 修改用户记录
  editUserRecord = () => {
    let params = {
      userId: this.state.currentUserId,
      realName: this.state.kfName,
      remark: this.state.kfRemark
    }
    updateCustomerInfo(params, 'POST').then(res => {
      if (res.data.code == 1) {
        message.success(res.data.msg);
        this.setState({
          visibles: false
        })                       //关闭小窗口
        let keyid = this.state.currentUserId  //当前当前userId
        this._getCustomerHistory(keyid)   //刷新用户记录页面数据  
      } else {
        message.error(res.data.msg);
      }
    });
  }

  getSearch = () => {
    this.setState({
      pageidxs: 1             //初始搜索为第一页数据
    }, () => {
      this.getCustomerDetail();  //获取客户管理
    })
  }

  changeDown = () => {
    this.setState({
      searchDownStatus: !this.state.searchDownStatus
    })
  }

  getAllSearch = () => {      
    this.setState({
      keyword: '',
      sort: '1',
      sortType: '2',
      pageidxs: '1',
      pagesizes: '20',
      type: 0,
      level: 0,        // 0所有 1v0 2v1 4v2 5v3
      concatType: 4,   // 0未联系 1已联系 2联系中 3已拒绝 4所有
      inviteType: 0,   // 0所有 1直接 2转介绍
      monthType: '',   // 1当月注册/分配  2当月晋升 3当月续费 7当月联系 4转介绍注册 5转介绍晋升 6转介绍续费
    }, () => {
      this.getCustomerDetail();  //获取客户管理
    })
  } 

  render() {
    return (
      <div id="mainPagesss">
        <Spin spinning={this.state.showLoading}>
          <Table
            className="currentTeamList"
            align="center"
            bordered={true}
            locale={this.state.tableEmpty}
            columns= {this.renderColumns(this.state.underTeamList)}
            dataSource={this.state.underTeamList}
            pagination={false}
          >
          </Table>
          <Pagination
            defaultCurrent={this.state.defaultCurrents}
            current={this.state.pageidx}
            pageSize={this.state.pagesize}
            total={this.state.dataTotals}
            onChange={this.pageChange}
            size='large'
            showTotal={total => `共${this.state.dataTotals}条记录`}
          />
        </Spin>
        {/* <Modal
          title="通过申请"
          visible={this.state.visibless}
          onOk={this.submitAddVisitTe}
          onCancel={this.handleCancels}
          destroyOnClose={true}
          className='visitHistoryList'
          okText={'确定'}
        >
        </Modal> */}
        {
          this.state.showImg == true?
          <div className='modelImg' onClick={this.closeImg}>
            {/* <img src={this.state.imagePathUrl} /> */}
              <img src={ this.state.imgUrls }/>
          </div>
          :null
        }
      </div>
    )
  }
}