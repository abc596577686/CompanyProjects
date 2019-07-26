import React from 'react';
import {
  Button,
  Card,
  message,
  Table,
  Modal,
  Select,
  Input,
  Cascader,
  Spin,
  Pagination,
  InputNumber 
} from 'antd';
import { userList, channelList, getRegionList, getroleList, saveUser } from '../../../axios/api';
import "antd/dist/antd.css";
import './index.css';
import PropTypes from 'prop-types'
import { mockTableData } from './typeData'
import qs from 'qs'

const Option = Select.Option;
const confirm = Modal.confirm;

export default class GiftPack extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    mockTableListData: [],  //数据
    mockTableData: [],   //标题
    loadingSearch: false,
    visible: false,
    account: '',
    username: '',
    channelListData: [],
    options: [
      // {
      //   value: 'zhejiang',
      //   label: 'Zhejiang',
      //   children: [{
      //     value: 'hangzhou',
      //     label: 'Hangzhou',
      //   }],
      // }, 
      // {
      //   value: 'jiangsu',
      //   label: 'Jiangsu',
      //   children: [{
      //     value: 'nanjing',
      //     label: 'Nanjing',
      //   }],
      // }
    ],
    duty: '',  //职级
    channel: '', //渠道
    regionListData: [],  //从属
    roleList: [],  //职级
    area: '', //区域
    team: '', //团队
    defaultCurrents: 1,
    pageidx: 1,
    pagesize: 10,
    keyword: '',
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this.setState({
      mockTableData
    })
    this._getUserList();
    this._getchannelList();
    this._getRegionList();
    this._getgetroleList();
  }

  // 页面刷新
  getOtherCode = () => {
    this._getUserList()
  }

  // 获取用户列表
  _getUserList() {
    this.setState({ showLoading: true })
    let params = {
      keyword: this.state.keyword,
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    }
    userList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        // console.log(res.data.data)
        this.setState({
          dataTotals: res.data.count
        })
        if ( res.data.data && res.data.data != '' && res.data.data.length > 0) {
          let adminlist = res.data.data
          this._setdata(adminlist)
          this.setState({ showLoading: false })
        } else {
          this.setState({
            adminlist: [],
            mockTableListData: []
          })
          this.setState({ showLoading: false })
        }
      }
    })
  }
  // 获取渠道列表
  _getchannelList() {
    this.setState({ showLoading: true })
    let params = {}
    channelList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let adminlists = res.data.data
          this._setChannelListData(adminlists)
          this.setState({ showLoading: false })
        }
      }
    })
  }
  // 获取默认从属
  _getRegionList() {
    this.setState({ showLoading: true })
    let params = {
      channelId: 1    //当前默认写死1
    }
    getRegionList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let adminlistss = res.data.data
          this._setRegionList(adminlistss)
          this.setState({ showLoading: false })
        }
      }
    })
  }

  // 获取职级
  _getgetroleList() {
    this.setState({ showLoading: true })
    let params = {}
    getroleList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let adminlistsss = res.data.data
          this._setRoleList(adminlistsss)
          this.setState({ showLoading: false })
        } else {
          this.setState({
            adminlistsss: []
          })
          this.setState({ showLoading: false })
        }
      }
    })
  }

  _setdata(adminlist) {
    let mockTableListData = []
    adminlist.map((user, i) => {
      mockTableListData.push({
        key: i,
        userId: user.userId,
        username: user.username,
        channelName: user.channelName,
        roleName: user.roleName,
        realName: user.realName,
        regionTeamName: user.regionTeamName,
        customerCount: user.customerCount
      })
    })
    this.setState({
      adminlist,
      mockTableListData,
    })
  }

  _setChannelListData(adminlists) {
    let channelListData = []
    adminlists.map((user, i) => {
      channelListData.push({
        key: i + 10,
        value: user.channelId,
        text: user.channelName
      })
    })
    this.setState({
      adminlists,
      channelListData
    }, () => {
      console.log(this.state.channelListData)
    })
  }

  _setRegionList(adminlistss) {
    let regionListData = []
    adminlistss.map((user, i) => {
      regionListData.push({
        key: i + 100,
        label: user.regionName,
        value: user.regionId,
        children: user.teamList ? this.renderchildren(user.teamList) : null
      })
    })
    this.setState({
      adminlistss,
      regionListData
    }, () => {
      console.log(this.state.regionListData)
    })
  }

  _setRoleList(adminlistsss) {
    let roleList = []
    adminlistsss.map((user, i) => {
      roleList.push({
        key: i + 10000,
        name: user.name,
        roleId: user.roleId,
      })
    })
    this.setState({
      adminlistsss,
      roleList
    }, () => {
      console.log(this.state.roleList)
    })
  }

  // 处理children数据
  renderchildren(teamList) {
    let children = []
    teamList.map((data) =>
      children.push({
        value: data.teamId,
        label: data.teamName
      })
    )
    return (children)
  }

  // 关闭窗口
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  // 创建角色
  _addBDuser = () => {
    this.setState({
      visible: true
    })
  }

  _handleAccount = (e) => {
    this.setState({
      account: e.target.value
    })
  }
  _handleName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  // 选择从属
  onChangeCascader = (value) => {
    console.log('当前选择区域id为', value[0]);
    console.log('当前选择团队id为', value[1]);
    this.setState({
      area: value[0],
      team: value[1]
    })
  }

  // 选择职级
  handleDuty = (value) => {
    console.log('当前选择职级', value)
    this.setState({
      duty: value
    })
  }
  // 选择渠道
  handleChannel = (value) => {
    console.log('当前选择渠道', value)
    this.setState({
      channel: value
    })
  }

  // 确认提交添加注册
  submitAdd = () => {
    // 检查输入
    if (this.state.channel == '') {
      message.warning('请选择渠道')
      return
    }
    if (this.state.username == '') {
      message.warning('请添加姓名')
      return
    }
    if (this.state.duty == '') {
      message.warning('请选择职级')
      return
    }
    if (this.state.account == '') {
      message.warning('请添加账号')
      return
    }
    let params = {
      roleId: this.state.duty,
      channelId: this.state.channel,
      realName: this.state.username,
      regionId: this.state.area,
      teamId: this.state.team,
      username: this.state.account
    }

    let _this = this
    confirm({
      title: '新建BD用户',
      content: '确认添加此账号吗',
      onOk() {
        console.log(params)
        saveUser(params, 'POST').then(res => {
          if (res.data.code == 1) {
            message.success(res.data.msg);
            _this.setState({
              visible: false
            })                    //关闭小窗口
            _this.getOtherCode()   //刷新页面数据
          } else {
            message.error(res.data.msg);
          }
        });
      }
    });
  }

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
        pageidx: page,
        pagesize: pageSize
    }, () => {
        this._getUserList() 
    })
  };

  // 修改搜索关键词
  _handlekeyword = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  getSearch = () => {
    this.setState({
      pageidx: 1             //初始搜索为第一页数据
    }, () => {
      this._getUserList()  //获取客户管理
    })
  }

  // 成员管理列表
  renderMockTableData = () => {
    const columns = [
      {
        title: '序号',
        dataIndex: 'aa',
        key: 'orderInfoa',
        render: (text, record) => {
          return (
            <div>
              {record.userId}
            </div>
          )
        }
      },
      {
        title: '账号',
        dataIndex: 'ab',
        key: 'orderInfob',
        render: (text, record) => {
          return (
            <div>
              {record.username}
            </div>
          )
        }
      },
      {
        title: '姓名',
        dataIndex: 'ac',
        key: 'orderInfoc',
        render: (text, record) => {
          return (
            <div>
              {record.realName}
            </div>
          )
        }
      },
      {
        title: '所属渠道',
        dataIndex: 'ad',
        key: 'orderInfod',
        render: (text, record) => {
          return (
            <div>
              {record.channelName}
            </div>
          )
        }
      },
      {
        title: '职级',
        dataIndex: 'ae',
        key: 'orderInfoee',
        render: (text, record) => {
          return (
            <div>
              {record.roleName}
            </div>
          )
        }
      },
      {
        title: '从属',
        dataIndex: 'af',
        key: 'orderInfof',
        render: (text, record) => {
          return (
            <div>
              {record.regionTeamName}
            </div>
          )
        }
      },
      {
        title: '客户人数',
        dataIndex: 'ag',
        key: 'orderInfog',
        render: (text, record) => {
          return (
            <div>
              {record.customerCount}
            </div>
          )
        }
      },
      {
        title: '本月剩余试用经销商名额',
        dataIndex: 'zce',
        key: 'orderInfoe',
        render: (text, record) => {
          return (
            // <div onClick={this.showMonthData.bind(this, 5)} style={{ cursor:'pointer' }}>
            //   {record.customerCount}
            // </div>
            <InputNumber min={0} max={10000} defaultValue={record.customerCount} onChange={this.onChangeInputNumber} />
            // <div>
            //   {record.customerCount}
            // </div>
          )
        }
      }
    ]
    return columns
  }

  render() {
    return (
      <div className="superUserList">
        <Button
          className="addBtn"
          // icon="add"
          type="primary"
          loading={this.loadingSearch}
          onClick={this._addBDuser}>创建BD账号</Button>
        <Card className="searchForm" style={{ border: 'none',paddingLeft: '27px' }}>
          <div>
            <Input size="default" value={this.state.keyword} style={{ width: 300, display: 'inline-block', marginBottom: '10px' }} onChange={this._handlekeyword} />
            <Button
              onClick = {this.getSearch}
              style={{ marginLeft:"10px", backgroundColor: '#108ee9', color:'#fff',display:'inline-block' }}
            >搜索
            </Button>
          </div>
        </Card>
        <Spin spinning={this.state.showLoading}>
          <div className="m-t-lg">
            <Table
              className='userList'
              bordered
              loading={this.state.loadingSearch}
              // columns={this.state.mockTableData}
              columns={this.renderMockTableData(this.state.mockTableData)}
              dataSource={this.state.mockTableListData}
              pagination={false}
            />
            <Pagination
              defaultCurrent={ 1 }
              current={this.state.pageidx}
              pageSize={this.state.pagesize}
              total={this.state.dataTotals}
              onChange={this.pageChange}
              size='large'
              showTotal={total => `共${this.state.dataTotals}条记录`}
            />
            <Modal
              title="添加BD账号"
              visible={this.state.visible}
              onOk={this.submitAdd}
              onCancel={this.handleCancel}
              destroyOnClose={true}
              className='addBdModal'
              style={{ width: 300 }}
            >
              <Input size="default" addonBefore='注册账号' value={this.state.account} style={{ width: 300, display: 'block', marginBottom: '10px' }} onChange={this._handleAccount} />
              <Input size="default" addonBefore='BD姓名' value={this.state.username} style={{ width: 300, display: 'block', marginBottom: '10px' }} onChange={this._handleName} />
              <Select size="default" defaultValue="职级" style={{ width: 120, display: 'block', marginBottom: '10px' }} onChange={this.handleDuty}>
                {/* <Option value="1">专员</Option>
              <Option value="2">主管</Option>
              <Option value="3">经理</Option>
              <Option value="4">总监</Option> */}
                {this.state.roleList.map(data => <Option key={data.key} value={data.roleId}>{data.name}</Option>)}
              </Select>
              <Select size="default" defaultValue="渠道" style={{ width: 120, display: 'block', marginBottom: '10px' }} onChange={this.handleChannel}>
                {this.state.channelListData.map(data => <Option key={data.key} value={data.value}>{data.text}</Option>)}
              </Select>
              {
                this.state.duty == 4 && this.state.channel == 1 ?
                  <div>
                    <p style={{ color: 'red' }}>地推团队专员需填写从属区域：</p>
                    <Cascader style={{ width: 300 }} options={this.state.regionListData} onChange={this.onChangeCascader} placeholder="从属区域选择（区域/团队）" />
                  </div>
                  : null
              }
            </Modal>
          </div>
        </Spin>
      </div>
    )
  }
}
