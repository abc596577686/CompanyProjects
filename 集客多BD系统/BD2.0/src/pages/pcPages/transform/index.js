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
  allocateUserMember
} from '../../../axios/api';
import './index.less';
import './index.css';
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
    teamColumns: [
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'col01',
        width: 90,
      },
      {
        title: '账号',
        dataIndex: 'mobile',
        key: 'col02',
        width: 110,
      },
      {
        title: '职级',
        dataIndex: 'jkdUserId',
        key: 'col03',
        width: 70,
      },
      {
        title: '当月注册',
        dataIndex: 'directRegisterNumber',
        key: 'col04',
        width: 90,
      },
      {
        title: '当月晋升',
        dataIndex: 'directPromoteNumber',
        key: 'col05',
        width: 90,
      },
      {
        title: '当月续费',
        dataIndex: 'directRenewNumber',
        key: 'col06',
        width: 90,
      },
      {
        title: '转介绍注册',
        dataIndex: 'indirectRegisterNumber',
        key: 'col07',
        width: 90,
      },
      {
        title: '转介绍晋升',
        dataIndex: 'indirectPromoteNumber',
        key: 'col08',
        width: 90,
      },
    ],
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
    pagesize: 5,
    status: '0',
    //数据总条数
    dataTotal: 0,
    //页面大小可选项
    pageSizeOption: ['5', '10', '15'],

    // 默认第几页
    defaultCurrents: 1,
    //页面
    pageidxs: 1,
    pagesizes: 20,
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
    totalSurplusNumber: '' ,   //试用名额剩余
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this.getUserInfo()
    this.getPushTeamList();    //获取默认团队列表
    this.getCustomerDetail();  //获取客户管理
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

  onClickMeun = ({ key }) => {
    console.log(key);
    console.log(this.state.localStatus);

    let params = {
      userId: this.state.localStatus,
      type: key
    }
    updateStatus(params, 'GET').then(res => {
      if (res.data.code == 1) {
        message.success(res.data.msg)
        this.getCustomerDetail()  //重渲染
      } else {
        message.warning(res.data.msg)
      }
    })
  }

  getCustomerDetail = () => {
    this.setState({
      underTeamList: []
    })
    this.setState({ showLoading: true })
    let params = {
      keyword: this.state.keyword,
      sort: this.state.sort,        //1、注册时间 2、晋升时间 3、分配时间 4、过期时间 5、v0 6、v1
      sortType: this.state.sortType,     //1、升序 2、降序
      pageidx: this.state.pageidxs,
      pagesize: this.state.pagesizes,
      type: 0,
      level: Number(this.state.level),             //用户V等级筛选
      concatType: Number(this.state.concatType),   //状态类型
      inviteType: Number(this.state.inviteType),   //用户来源筛选
      monthType: Number(this.state.monthType),     //当月数据类型筛选
    }
    customerList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        // if (res.data.data && res.data.data.length > 0) {
        let orderList = res.data                   //本月数据
        let currentUnderTeamList = res.data.data   //用户信息{
        this.setState({
          dataTotals: Number(res.data.total),
          totalAllocateNumber: res.data.totalAllocateNumber,
          totalUsedNumber: res.data.totalUsedNumber,
          totalSurplusNumber: res.data.totalSurplusNumber
        })
        let underTeamList = []
        if (this.state.userchannelType == 1) {   //地推渠道数据
          currentUnderTeamList.map((data, j) => {
            underTeamList.push({
              key: j + 1000,
              consultateNumber: data.consultateNumber,
              expireDate: data.expireDate,
              level: data.level,
              mobile: data.mobile,
              nickName: data.nickName,
              promoteDate: data.promoteDate,
              registerTime: data.registerTime,
              userId: data.userId,
              v0Count: data.v0Count,
              v1Count: data.v1Count,
              memberStatus: data.memberStatus,
              type: data.type == '1' ? '直接' : '转介绍',
  
            })
          })
        } else {     //转化渠道数据
          const menu = (
            <Menu onClick={this.onClickMeun}>
              <Menu.Item key="1">已联系</Menu.Item>
              <Menu.Item key="2">联系中</Menu.Item>
              <Menu.Item key="3">已拒绝</Menu.Item>
            </Menu>
          );

          currentUnderTeamList.map((data, j) => {
            underTeamList.push({
              key: j + 1000,
              mobile: data.mobile,
              nickName: data.nickName,
              level: data.level,
              registerTime: data.registerTime,
              promoteDate: data.promoteDate,
              bindTime: data.bindTime,
              expireDate: data.expireDate,
              consultateNumber: data.consultateNumber,
              v0Count: data.v0Count,
              v1Count: data.v1Count,
              type: data.type == '1' ? '直接' : '转介绍',
              userId: data.userId,
              memberStatus: data.memberStatus,
              status: data.status == 0 ?
                <Dropdown overlay={menu} onVisibleChange={this.setCurrentUserId.bind(this, data.userId)}>
                  <Icon type="edit" style={{ marginLeft: '10px', cursor: 'pointer' }}></Icon>
                </Dropdown>
                :
                <div>
                  {data.status == 1 ? '已联系' : (data.status == 2 ? '联系中' : '已拒绝')}
                  <Dropdown overlay={menu} onVisibleChange={this.setCurrentUserId.bind(this, data.userId)}>
                    <Icon type="edit" style={{ marginLeft: '10px', cursor: 'pointer' }}></Icon>
                  </Dropdown>
                </div>
            })
          })
        }
        this.setState({
          monthData: orderList,
          underTeamList
        })
        // if (orderList && orderList.length > 0) {
          this.getmonthData()  // 处理当月数据
        // }
        
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

  // 处理当月数据
  getmonthData = () => {
    let keydata = this.state.monthData
    console.log(keydata)
    let keyList = []
    if (this.state.userchannelType == 1) {   //地推渠道BD
      keyList.push({
        key: keydata.systemTime,
        directRegisterNumber: keydata.directRegisterNumber,     //当月注册
        directPromoteNumber: keydata.directPromoteNumber,       //当月晋升
        totalRenewNumber: keydata.totalRenewNumber,             //当月续费
        indirectRegisterNumber: keydata.indirectRegisterNumber, //转介绍注册
        indirectPromoteNumber: keydata.indirectPromoteNumber,   //转介绍晋升
        totalIncome: keydata.totalIncome,                       //当月累计返点
        directV0Number: keydata.directV0Number,
        directDeclareNumber: keydata.directDeclareNumber,
        indirectV0Number: keydata.indirectV0Number,
        indirectDeclareNumber: keydata.indirectDeclareNumber,
        // memberStatus: keydata.memberStatus
        totalYearsNumber: keydata.totalYearsNumber
      })
    } else {                                 //转化渠道BD
      keyList.push({
        key: keydata.systemTime,
        directRegisterNumber: keydata.directRegisterNumber,     //当月分配
        concatNumber: keydata.concatNumber,                     //当月联系
        directPromoteNumber: keydata.directPromoteNumber,       //当月晋升
        totalRenewNumber: keydata.totalRenewNumber,             //当月续费
        indirectRegisterNumber: keydata.indirectRegisterNumber, //转介绍注册
        indirectPromoteNumber: keydata.indirectPromoteNumber,   //转介绍晋升
        totalIncome: keydata.totalIncome,                       //当月累计返点
        directV0Number: keydata.directV0Number,
        directDeclareNumber: keydata.directDeclareNumber,
        indirectV0Number: keydata.indirectV0Number,
        indirectDeclareNumber: keydata.indirectDeclareNumber,
        // memberStatus: keydata.memberStatus
        totalYearsNumber: keydata.totalYearsNumber
      })
    }

    this.setState({
      keyList: keyList
    })
    console.log(this.state.keyList)
    // return keyList
  }

  // 获取列表  (上面表格)
  getPushTeamList() {
    this.setState({ showLoading: true })
    let params = {
      type: this.state.userchannelType,
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    }
    pushTeamList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let orderList = res.data.data
          console.log(orderList)
          this.setState({
            orderList,
            dataTotal: Number(res.data.total)
          })
        }
        this.setState({ showLoading: false })
      }
    })
  }

  // 获取团队详情
  // getTeamDataMain(keyid) {
  //   this.setState({
  //     teamData: [],       //清空之前的团队详情数据   
  //     showLoading: true
  //   })
  //   let params = {
  //     teamId: keyid,
  //     pageidx: this.state.pageidxs,
  //     pagesize: this.state.pagesizes,
  //   }

  //   teamDetail(params, 'GET').then(res => {
  //     if (res.data.code == 1) {
  //       if (res.data.data && res.data.data.length > 0) {
  //         let teammaindata = res.data.data
  //         console.log(teammaindata)
  //         this.setState({ dataTotals: res.data.total })
  //         this.setTeamMainData(teammaindata)
  //       }
  //       this.setState({ showLoading: false })
  //     }
  //   })
  // }

  // 处理团队信息详情数据
  // setTeamMainData(teammaindata) {
  //   let teamData = []
  //   teammaindata.map((data,j)=> {
  //     teamData.push({
  //       key: j,
  //       userName: data.userName,
  //       mobile: data.mobile,

  //       directRegisterNumber: data.directRegisterNumber,       //团队当月注册
  //       directPromoteNumber: data.directPromoteNumber,         //团队当月晋升
  //       directRenewNumber: data.directRenewNumber,             //团队当月续费
  //       indirectRegisterNumber: data.indirectRegisterNumber,   //团队当月转介绍注册
  //       indirectPromoteNumber: data.indirectPromoteNumber,     //团队当月转介绍晋升
  //     })
  //   })
  //   this.setState({
  //     teammaindata,
  //     teamData,         //处理完的数据
  //   })
  // }

  //地推渠道本月数据渲染列 
  renderMonthData = () => {
    const columns = [
      {
        title: '当月注册',
        dataIndex: 'zca',
        key: 'orderInfoa',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 1)} style={{ cursor:'pointer' }}>
              {record.directRegisterNumber}
            </div>
          )
        }
      },
      {
        title: '当月晋升',
        dataIndex: 'zcb',
        key: 'orderInfob',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 2)} style={{ cursor:'pointer' }}>
              {record.directPromoteNumber}
            </div>
          )
        }
      },
      {
        title: '当月续费',
        dataIndex: 'zcc',
        key: 'orderInfoc',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 3)} style={{ cursor:'pointer' }}>
              {record.totalRenewNumber}
            </div>
          )
        }
      },
      {
        title: '转介绍注册',
        dataIndex: 'zcd',
        key: 'orderInfod',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 4)} style={{ cursor:'pointer' }}>
              {record.indirectRegisterNumber}
            </div>
          )
        }
      },
      {
        title: '转介绍晋升',
        dataIndex: 'zce',
        key: 'orderInfoe',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 5)} style={{ cursor:'pointer' }}>
              {record.indirectPromoteNumber}
            </div>
          )
        }
      },
      {
        title: '当月累计返点',
        dataIndex: 'zcf',
        key: 'orderInfof',
        render: (text, record) => {
          return (
            <div>
              {record.totalIncome}
            </div>
          )
        }
      },
      {
        title: '当月总年限',
        dataIndex: 'zcaf',
        key: 'orderInafof',
        render: (text, record) => {
          return (
            <div>
              {record.totalYearsNumber}
            </div>
          )
        }
      },
    ]
    return columns
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
        title: '账号',
        dataIndex: 'zc',
        key: 'orderInfo',
        render: (text, record) => {
          return (
            <div>
              {
                record.mobile
              }
              {/* <Input size="default" value={record.mobile} style={{ display: 'inline-block', border: 'none', width: '120px' }} />
              <CopyToClipboard text={record.mobile}
                onCopy={() => message.success('复制成功')}>
                <Button style={{ display: 'inline-block', marginLeft: '10px' }}>复制</Button>
              </CopyToClipboard> */}
            </div>
          )
        }
      },
      {
        title: '姓名',
        dataIndex: 'js',
        key: 'teamjs',
        render: (text, record) => {
          return (
            <div>
              {
                record.nickName
              }
            </div>
          )
        }
      },
      {
        title: (text, record) => {
          return (
            <div>
              <Select style={{ width: 120 }} onChange={this.handleVlevelChangeb} value={ this.state.level == 0 ? 'V等级': this.state.level }>
                <Option value="1">V0</Option>
                <Option value="2">V1</Option>
                <Option value="4">V2</Option>
                <Option value="5">V3</Option>
              </Select>
            </div>
          )
        },
        dataIndex: 'xf',
        key: 'teamxf',
        render: (text, record) => {
          return (
            <div>
              {
                record.level == '1' ? 'v0' : (record.level == '4' ? 'v2' : (record.level == '5' ? 'v3' : 'v1'))
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
        // title: '晋升时间',
        title: ((text, record) => {
          return (
            <div>
              {'晋升时间'}<Icon onClick={this.switchPromoteDate} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'sjs',
        key: 'operate',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.promoteDate)
              }
            </div>
          )
        }
      },
      {
        title: '咨询报价',
        dataIndex: 'xbj',
        key: 'operatea',
        render: (text, record) => {
          return (
            <div>
              {
                record.consultateNumber + '次'   //
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'到期时间'}<Icon onClick={this.switchExpireDate} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'qsj',
        key: 'operateb',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.expireDate)
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'V0(人)'}<Icon onClick={this.switchV0Count} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'V0',
        key: 'operatec',
        render: (text, record) => {
          return (
            <div>
              {
                record.v0Count
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'V1(人)'}<Icon onClick={this.switchV1Count} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'V1',
        key: 'operated',
        render: (text, record) => {
          return (
            <div>
              {
                record.v1Count
              }
            </div>
          )
        }
      },
      {
        // title: '客户来源',
        title: (text, record) => {
          return (
            <div>
              <Select style={{ width: 100 }} onChange={this.handleInChangeb} value={ this.state.inviteType == 0? '来源':this.state.inviteType  }>
                <Option value="1">直接</Option>
                <Option value="2">转介绍</Option>
              </Select>
            </div>
          )
        },
        dataIndex: 'jssass',
        key: 'teamjsasdAs',
        render: (text, record) => {
          return (
            <div>
              {
                record.type
              }
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'V3',
        key: 'operatee',
        render: (text, record) => {
          return (
            <div>
              {
                <Button
                  onClick={this.showUserMain.bind(this, record)}
                  style={{ backgroundColor: '#1890ff', color: '#fff' }}
                >查看用户记录</Button>
              }
            </div>
          )
        }
      },
      {
        title: '试用经销商',
        dataIndex: 'oskj',
        key: 'opesratee',
        render: (text, record) => {
          return (
            <div>
              {
                record.memberStatus == '0' ?
                  <Button
                    onClick={this.tryMotion.bind(this, record)}
                    style={{ backgroundColor: '#1890ff', color: '#fff' }}
                  >
                    启用
                  </Button>
                  : (record.memberStatus == '1' ? '已发放' : (record.memberStatus == '2' ? '已使用' : (record.memberStatus == '3' ? '已过期' : '')))
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

  // 地推渠道列表 —— 切换排序
  switchExpireDate = () => {              //到期时间
    if (this.state.sort != 2) {
      this.setState({ sortType: 1, sort: 2 }, () => {
        this.getCustomerDetail()
      })
      return
    }
    if (this.state.sortType == 1) {
      this.setState({ sort: 4, sortType: 2 }, () => {
        this.getCustomerDetail()  //重新获取客户管理
      })
    } else {
      this.setState({ sort: 4, sortType: 1 }, () => {
        this.getCustomerDetail()
      })
    }
  }
  switchV0Count = () => {                 //V0人数
    if (this.state.sort != 5) {
      this.setState({ sortType: 1, sort: 5 }, () => {
        this.getCustomerDetail()
      })
      return
    }
    if (this.state.sortType == 1) {
      this.setState({ sortType: 2, sort: 5 }, () => {
        this.getCustomerDetail()
      })
    } else {
      this.setState({ sortType: 1, sort: 5 }, () => {
        this.getCustomerDetail()
      })
    }
  }
  switchV1Count = () => {                 //V0人数
    if (this.state.sort != 6) {
      this.setState({ sortType: 1, sort: 6 }, () => {
        this.getCustomerDetail()
      })
      return
    }
    if (this.state.sortType == 1) {
      this.setState({ sortType: 2, sort: 6 }, () => {
        this.getCustomerDetail()
      })
    } else {
      this.setState({ sortType: 1, sort: 6 }, () => {
        this.getCustomerDetail()
      })
    }
  }

  // 展示用户信息
  showUserMain = (record) => {
    this.setState({ allorder: true })
    console.log(record)
    this.setState({
      visibles: true
    })
    this._getCustomerHistory(record.userId)
  }

  _getCustomerHistory(userId) {
    let params = {
      userId: userId
    }
    this.setState({
      currentUserId: userId
    })
    getCustomerHistory(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.map) {
          let userInfo = res.data.map
          let currentTimeLineData = res.data.data
          console.log(userInfo)
          this.setState({
            kfName: userInfo.realName,
            kfRemark: userInfo.remark
          })
          let timeLineData = []
          currentTimeLineData.map((data, j) => {
            timeLineData.push({
              key: j + 1000,
              content: data.content,
              createTime: data.createTime,
            })
          })
          this.setState({
            userInfo,
            timeLineData
          })
        }
        this.setState({ allorder: false })
      } else {
        this.setState({ allorder: false })
        message.warning(res.data.msg)
      }
    })
  }

  //转化渠道本月数据渲染列 
  renderMonthDatas = () => {
    const columns = [
      {
        title: '当月分配',
        dataIndex: 'zca',
        key: 'orderInfoa',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 1)} style={{ cursor:'pointer' }}>
              {record.directRegisterNumber}
            </div>
          )
        }
      },
      {
        title: '当月联系',
        dataIndex: 'zcb',
        key: 'orderInfob',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 7)} style={{ cursor:'pointer' }}>
              {record.concatNumber}
            </div>
          )
        }
      },
      {
        title: '当月晋升',
        dataIndex: 'zcc',
        key: 'orderInfoc',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 2)} style={{ cursor:'pointer' }}>
              {record.directPromoteNumber}
            </div>
          )
        }
      },
      {
        title: '当月续费',
        dataIndex: 'zcd',
        key: 'orderInfod',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 3)} style={{ cursor:'pointer' }}>
              {record.totalRenewNumber}
            </div>
          )
        }
      },
      {
        title: '转介绍注册',
        dataIndex: 'zce',
        key: 'orderInfoe',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 4)} style={{ cursor:'pointer' }}>
              {record.indirectRegisterNumber}
            </div>  
          )
        }
      },
      {
        title: '转介绍晋升',
        dataIndex: 'zcf',
        key: 'orderInfof',
        render: (text, record) => {
          return (
            <div onClick={this.showMonthData.bind(this, 5)} style={{ cursor:'pointer' }}>
              {record.indirectPromoteNumber}
            </div>
          )
        }
      },
    ]
    return columns
  }

  //转化渠道渲染列
  renderSecondColumns = () => {
    const menus = (
      <Menu onClick={this.onClickMeun}>
        <Menu.Item key="1">已联系</Menu.Item>
        <Menu.Item key="2">联系中</Menu.Item>
        <Menu.Item key="3">已拒绝</Menu.Item>
      </Menu>
    )

    const columns = [
      {
        title: '账号',
        dataIndex: 'zc',
        key: 'orderInfo',
        render: (text, record) => {
          return (
            <div>
              {
                record.mobile
              }
              {/* <Input size="default" value={record.mobile} style={{ display: 'inline-block', border: 'none', width: '120px' }} />
              <CopyToClipboard text={record.mobile}
                onCopy={() => message.success('复制成功')}>
                <Button style={{ display: 'inline-block', marginLeft: '10px' }}>复制</Button>
              </CopyToClipboard> */}
            </div>

            // <div>
            //   {
            //     record.mobile
            //   }
            //   <Button
            //     style={{ display:'inline-block' , marginLeft:'10px' }}
            //   >复制</Button>
            // </div>
          )
        }
      },
      {
        title: '姓名',
        dataIndex: 'js',
        key: 'teamjscc',
        render: (text, record) => {
          return (
            <div>
              {
                record.nickName
              }
            </div>
          )
        }
      },
      {
        title: (text, record) => {
          return (
            <div>
              <Select style={{ width: 80 }} onChange={this.handleVlevelChangeb} value={this.state.level == 0 ? 'V等级' : this.state.level}>
                <Option value="1">V0</Option>
                <Option value="2">V1</Option>
                <Option value="4">V2</Option>
                <Option value="5">V3</Option>
              </Select>
            </div>
          )
        },
        dataIndex: 'xf',
        key: 'teamxf',
        render: (text, record) => {
          return (
            <div>
              {
                record.level == '1' ? 'v0' : (record.level == '4' ? 'v2' : (record.level == '5' ? 'v3' : 'v1'))
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'注册时间'}<Icon onClick={this.switchRegisterTime} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
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
        title: ((text, record) => {
          return (
            <div>
              {'晋升时间'}<Icon onClick={this.switchPromoteDate} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'sjs',
        key: 'operate',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.promoteDate)
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'分配时间'}<Icon onClick={this.switchConsultateNumber} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'xbj',
        key: 'operatea',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.bindTime)
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'到期时间'}<Icon onClick={this.switchExpireDate} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'qsj',
        key: 'operateb',
        render: (text, record) => {
          return (
            <div>
              {
                this.dateFormate(record.expireDate)
              }
            </div>
          )
        }
      },
      {
        title: '报价',
        dataIndex: 'V0',
        key: 'operatec',
        render: (text, record) => {
          return (
            <div>
              {
                record.consultateNumber + '次'
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'V0(人)'}<Icon onClick={this.switchV0Count} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'V0',
        key: 'operatedbb',
        render: (text, record) => {
          return (
            <div>
              {
                record.v0Count
              }
            </div>
          )
        }
      },
      {
        title: ((text, record) => {
          return (
            <div>
              {'V1(人)'}<Icon onClick={this.switchV1Count} type="retweet" style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )
        }),
        dataIndex: 'V1',
        key: 'operatedaa',
        render: (text, record) => {
          return (
            <div>
              {
                record.v1Count
              }
            </div>
          )
        }
      },
      {
        title: (text, record) => {
          return (
            <div>
              <Select style={{ width: 100 }} onChange={this.handleStatusChangeb} value={ this.state.concatType == 4? '状态': this.state.concatType }>
                <Option value="0">未联系</Option>
                <Option value="1">已联系</Option>
                <Option value="2">联系中</Option>
                <Option value="3">已拒绝</Option>
              </Select>
            </div>
          )
        },
        dataIndex: 'js',
        key: 'teamjsa',
        render: (text, record) => {
          return (
            <div>
              {
                record.status
              }
            </div>
          )
        }
      },
      {
        title: (text, record) => {
          return (
            <div>
              <Select style={{ width: 100 }} onChange={this.handleInChangeb} value={ this.state.inviteType == 0? '来源':this.state.inviteType  }>
                <Option value="1">直接</Option>
                <Option value="2">转介绍</Option>
              </Select>
            </div>
          )
        },
        dataIndex: 'jsss',
        key: 'teamjsasd',
        render: (text, record) => {
          return (
            <div>
              {
                record.type
              }
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'V100',
        key: 'sdsdoperatee',
        render: (text, record) => {
          return (
            <div>
              {
                <Button
                  onClick={this.showUserMain.bind(this, record)}
                  style={{ backgroundColor: '#1890ff', color: '#fff' }}
                >查记录</Button>
              }
            </div>
          )
        }
      },
      {
        title: '试用经销商',
        dataIndex: 'oskj',
        key: 'opesratee',
        render: (text, record) => {
          return (
            <div>
              {
                record.memberStatus == '0' ?
                  <Button
                    onClick={this.tryMotion.bind(this, record)}
                    style={{ backgroundColor: '#1890ff', color: '#fff' }}
                  >
                    启用
                  </Button>
                  : (record.memberStatus == '1' ? '已发放' : (record.memberStatus == '2' ? '已使用' : (record.memberStatus == '3' ? '已过期' : '')))
              }
            </div>
          )
        }
      }
    ]
    return columns
  }

  handleVlevelChangeb = (value) => {
    console.log(value)
    this.setState({
      level: value
    }, () =>{
      this.getCustomerDetail()
    })
  }

  handleStatusChangeb = (value) => {
    console.log(value)
    this.setState({
      concatType: value
    }, () =>{
      this.getCustomerDetail()
    })
  }

  handleInChangeb = (value) => {
    console.log(value)
    this.setState({
      inviteType: value
    }, () =>{
      this.getCustomerDetail()
    })
  }

  showMonthData = (key) => {   // 1当月注册/分配 2当月晋升 3当月续费 7当月联系 4转介绍注册 5转介绍晋升 6转介绍续费
    this.setState({
      monthType: key
    }, () =>{
      this.getCustomerDetail()
    })
  }

  switchRegisterTime = () => {                 //注册时间
    if (this.state.sort != 1) {
      this.setState({ sortType: 1, sort: 1 }, () => {
        this.getCustomerDetail()
      })
      return
    }
    if (this.state.sortType == 1) {
      this.setState({ sortType: 2, sort: 1 }, () => {
        this.getCustomerDetail()
      })
    } else {
      this.setState({ sortType: 1, sort: 1 }, () => {
        this.getCustomerDetail()
      })
    }
  }
  switchPromoteDate = () => {                 //晋升时间
    if (this.state.sort != 2) {
      this.setState({ sortType: 1, sort: 2 }, () => {
        this.getCustomerDetail()
      })
      return
    }
    if (this.state.sortType == 1) {
      this.setState({ sortType: 2, sort: 2 }, () => {
        this.getCustomerDetail()
      })
    } else {
      this.setState({ sortType: 1, sort: 2 }, () => {
        this.getCustomerDetail()
      })
    }
  }
  switchConsultateNumber = () => {            //分配时间
    if (this.state.sort != 3) {
      this.setState({ sortType: 1, sort: 3 }, () => {
        this.getCustomerDetail()
      })
      return
    }
    if (this.state.sortType == 1) {
      this.setState({ sortType: 2, sort: 3 }, () => {
        this.getCustomerDetail()
      })
    } else {
      this.setState({ sortType: 1, sort: 3 }, () => {
        this.getCustomerDetail()
      })
    }
  }
  switchExpireDate = () => {                  //到期时间
    if (this.state.sort != 4) {
      this.setState({ sortType: 1, sort: 4 }, () => {
        this.getCustomerDetail()
      })
      return
    }
    if (this.state.sortType == 1) {
      this.setState({ sortType: 2, sort: 4 }, () => {
        this.getCustomerDetail()
      })
    } else {
      this.setState({ sortType: 1, sort: 4 }, () => {
        this.getCustomerDetail()
      })
    }
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

  // 查看地推团队详情
  // openTeamData = (order) => {
  //   console.log('----团队信息----', order)
  //   let keyid = order.teamId
  //   this.setState({
  //     visible: true,
  //     localkeyid: keyid
  //   })

  //   this.getTeamDataMain(keyid);
  // }

  // 页码改变
  pageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    this.setState({
      pageidxs: page,
      pagesizes: pageSize
    }, () => {
      this.getCustomerDetail()
    })
  };

  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({
      pagesize: pageSize
    }, () => {
      this.getPushTeamList();
    });
  };

  // 团队详情页页面翻页
  // pageChange = (page, pageSize) => {
  //   console.log(page, pageSize);
  //   let localkeyid = this.state.localkeyid

  //   this.setState({
  //     pageidxs: page,
  //     pagesizes: pageSize
  //   }, () => {
  //     this.getTeamDataMain(localkeyid);
  //   })
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
      // pageidxs: 1,
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
      <div id="mainPagess">
        <Spin spinning={this.state.showLoading}>
          <Card className="od_list__table">
            <Button
              onClick={this.openSelect}
              style={{ marginBottom: "20px", backgroundColor: '#108ee9', color: '#fff' }}
            >查询信息
            </Button>
            <div>
              <Table
                className="wrapper"
                align="center"
                bordered={true}
                pagination={false}
                title={() =>
                  <Row className="new_column_type">
                    <p>历史总数据</p>
                  </Row>}
                // columns={this.state.userchannelType == 1 ? this.state.historyColumns : this.state.historyColumnss}
                columns={this.state.historyColumns}
                dataSource={this.state.keyList}
              >
              </Table>
            </div>
            <div>
              <Table
                className="wrapper"
                align="center"
                bordered={true}
                pagination={false}
                title={() =>
                  <Row className="new_column_type">
                    <p>本月数据</p>
                  </Row>}
                // columns={this.state.userchannelType == 1 ? this.state.monthDataColumns : this.state.monthDataColumnss}
                columns={this.state.userchannelType == 1 ? this.renderMonthData(this.state.monthDataColumns) : this.renderMonthDatas(this.state.monthDataColumnss)}
                // columns={this.state.userchannelType == 1 ? this.renderColumns(this.state.underTeamList) : this.renderSecondColumns(this.state.underTeamList)}
                dataSource={this.state.keyList}
              >
              </Table>
            </div>
            <Card className="searchForm">
              <div>
                <Input size="default" value={this.state.keyword} style={{ width: 300, display: 'inline-block', marginBottom: '10px' }} onChange={this._handlekeyword} />
                <Button
                  onClick={this.getSearch}
                  style={{ marginLeft: "10px", backgroundColor: '#108ee9', color: '#fff', display: 'inline-block' }}
                >搜索
                </Button>
                <Button
                  onClick={this.getAllSearch}
                  style={{ marginLeft: "15px", backgroundColor: '#108ee9', color: '#fff', display: 'inline-block' }}
                >重置全部搜索条件
                </Button>
                {/* <div className='moreSearch' style={{ cursor: 'pointer', color: '#1890ff' }} onClick={ this.changeDown }>
                  更多搜索条件
                  {
                    this.state.searchDownStatus == true?
                    <Icon type="up" onClick={this.addVisitHistory}  style={{ marginLeft: '5px' }}/>
                    :
                    <Icon type="down" onClick={this.addVisitHistory} style={{ marginLeft: '5px' }}/>
                  }
                </div>
                <Button
                  onClick={this.getSearch}
                  style={{ marginLeft: "15px", backgroundColor: '#108ee9', color: '#fff', display: 'inline-block' }}
                >重置
                </Button> */}
              </div>
            </Card>
            {/* {
              this.state.searchDownStatus == false?
              <Card className="searchForms">
                <div>
                  按V等级搜索：  
                  <Radio.Group defaultValue="" buttonStyle="solid" style={{ marginRight: '20px' }}>
                    <Radio.Button value="a">V0</Radio.Button>
                    <Radio.Button value="b">V1</Radio.Button>
                    <Radio.Button value="c">V2</Radio.Button>
                    <Radio.Button value="d">V3</Radio.Button>
                  </Radio.Group>
                    
                  按用户状态搜索： 
                  <Radio.Group defaultValue="" buttonStyle="solid" style={{ marginRight: '20px' }}>
                    <Radio.Button value="e">未联系</Radio.Button>
                    <Radio.Button value="f">已联系</Radio.Button>
                    <Radio.Button value="g">联系中</Radio.Button>
                    <Radio.Button value="h">已拒绝</Radio.Button>
                  </Radio.Group>

                  按用户状态搜索：  
                  <Radio.Group defaultValue="" buttonStyle="solid">
                    <Radio.Button value="e">直接</Radio.Button>
                    <Radio.Button value="f">转介绍</Radio.Button>
                  </Radio.Group>  
                </div>
              </Card>
              :null
            } */}
            <Spin spinning={this.state.showLoading}>
              <Table
                className="currentTeamList"
                align="center"
                bordered={true}
                locale={this.state.tableEmpty}
                columns={this.state.userchannelType == 1 ? this.renderColumns(this.state.underTeamList) : this.renderSecondColumns(this.state.underTeamList)}
                dataSource={this.state.underTeamList}
                pagination={false}
              >
              </Table>
              <Pagination
                defaultCurrent={this.state.defaultCurrents}
                current={this.state.pageidxs}
                pageSize={this.state.pagesizes}
                total={this.state.dataTotals}
                onChange={this.pageChange}
                size='large'
                showTotal={total => `共${this.state.dataTotals}条记录`}
              />
            </Spin>
          </Card>
        </Spin>
        {/* 查询信息 */}
        <Spin spinning={this.state.showLoadings}>
          <Modal
            visible={this.state.visible}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            destroyOnClose={true}
            title="查询信息"
          >
            {
              this.state.searchStatus == 1 ?
                <div>
                  <Input size="small" addonBefore={'手机号:'} onChange={this.handlePhoneInput} value={this.state.phoneCode} style={{ width: 250, display: 'inline-block', marginBottom: '30px' }} />
                  <Button size="small" onClick={this.onSearch} style={{ display: 'inline-block', marginLeft: '30px', backgroundColor: '#108ee9', color: '#fff' }}>搜索</Button>
                </div>
                : null
            }
            {
              this.state.searchStatus == 2 ?
                <div>
                  <Input size="small" addonBefore={'客户名称/等级:'} value={this.state.teamUserInfo.userName} style={{ width: 250, display: 'block', marginBottom: '30px' }} />
                  <Input size="small" addonBefore={'客户手机号:'} value={this.state.teamUserInfo.userMobile} style={{ width: 250, display: 'block', marginBottom: '30px' }} />
                  <Input size="small" addonBefore={'上级昵称:'} value={this.state.teamUserInfo.topUserName} style={{ width: 250, display: 'block', marginBottom: '30px' }} />
                  <Input size="small" addonBefore={'上级ID:'} value={this.state.teamUserInfo.topUserId} style={{ width: 250, display: 'block', marginBottom: '30px' }} />
                  <Input size="small" addonBefore={'对接人:'} value={this.state.teamUserInfo.bdUserName} style={{ width: 250, display: 'block', marginBottom: '30px' }} />
                  <Input size="small" addonBefore={'对接人账号:'} value={this.state.teamUserInfo.bdUserMobile} style={{ width: 250, display: 'block', marginBottom: '30px' }} />
                </div>
                : null
            }
          </Modal>
        </Spin>
        <Modal
          title="用户记录"
          visible={this.state.visibles}
          onOk={this.editUserRecord}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          className='teamMainlist'
          okText={'保存'}
        >
          <Spin spinning={this.state.allorder}>
            <p style={{ fontWeight: 'bold' }}>用户记录：</p>
            <div>
              {'账户：' + this.state.userInfo.mobile}
            </div>
            <div style={{ marginBottom: '15px' }}>
              {'昵称：' + this.state.userInfo.nickName}
            </div>
            <p style={{ fontWeight: 'bold' }}>客户姓名：</p>
            <Input size="small" value={this.state.kfName} style={{ width: 120, display: 'block', marginBottom: '10px' }} onChange={this.handlekfName} />
            <p style={{ fontWeight: 'bold' }}>备注信息：</p>
            <TextArea
              onChange={this.handlekfRemark}
              value={this.state.kfRemark}
              rows={2}
              style={{ outline: 'none', resize: 'none' }}
            />
            <div className="visitHistoryBox">
              <div>
                <p style={{ display: 'inline-block', fontWeight: 'bold' }}>拜访记录：</p>
                <Icon type="plus-circle" onClick={this.addVisitHistory} style={{ cursor: 'pointer' }} />
              </div>
              <div className='historyList'>
                {
                  this.state.timeLineData && this.state.timeLineData.length > 0 ?
                    <Timeline>
                      {
                        this.state.timeLineData.map((data) =>
                          <Timeline.Item key={data.key}>{data.content + '(' + data.createTime + ')'}</Timeline.Item>
                        )
                      }
                    </Timeline>
                    : null
                }
              </div>
            </div>
          </Spin>
        </Modal>
        <Modal
          title="拜访记录"
          visible={this.state.visibless}
          onOk={this.submitAddVisitTe}
          onCancel={this.handleCancels}
          destroyOnClose={true}
          className='visitHistoryList'
          // style={{ width: 400 }}
          okText={'保存'}
        >
          <div>
            拜访方式：
            <Select size="default" defaultValue="请选择" style={{ width: 120, display: 'inline-block', marginBottom: '10px' }} onChange={this.addTypeHandle}>
              <Option key='1' value={1}>微信拜访</Option>
              <Option key='2' value={2}>当面拜访</Option>
            </Select>
          </div>
          <div>
            拜访地址：
            <TextArea
              onChange={this.addAreaHandle}
              value={this.state.addArea}
              rows={2}
              style={{ outline: 'none', resize: 'none', marginBottom: '20px' }}
            />
          </div>
          <div>
            拜访内容：
            <TextArea
              onChange={this.addContentHandle}
              value={this.state.addContent}
              rows={2}
              style={{ outline: 'none', resize: 'none' }}
            />
          </div>
        </Modal>
        <Modal
          title="启用名额"
          visible={this.state.isAddTest}
          onOk={this.handleAddTest}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          className='addTest'
          okText={'启用'}
        >
          您本月共有{this.state.totalAllocateNumber}个试用经销商名额，已使用{this.state.totalUsedNumber}个，还剩{this.state.totalSurplusNumber}个，请确认是否为此用户发放？
        </Modal>
      </div>
    )
  }
}