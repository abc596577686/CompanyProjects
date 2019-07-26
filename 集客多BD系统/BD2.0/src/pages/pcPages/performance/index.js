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
  DatePicker,
  Pagination
} from 'antd';
import { derivedUrl } from '../../../axios/config';
import { userList, channelList, getRegionList, getroleList, saveUser, customerHistoryList, achievementsHistoryList, exportAllBdAchievements, getUserInfo } from '../../../axios/api';
import "antd/dist/antd.css";
import './index.css';
import PropTypes from 'prop-types'
import { mockTableData } from './typeData'
import qs from 'qs'
import moment from 'moment'

const Option = Select.Option;
const confirm = Modal.confirm;
const { TextArea } = Input;

export default class GiftPack extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    mockTableListData: [],  //数据
    mockTableData: [],   //标题
    loadingSearch: false,
    visible: false,
    account: '',  //关键词搜索
    username: '',
    channelListData: [],
    options: [],
    duty: '',  //职级
    channel: '', //渠道
    regionListData: [],  //从属
    roleList: [],  //职级
    area: '', //区域
    team: '', //团队
    // searchKey: '搜索关键词',
    keyword: '',  //关键词搜索
    pageidx: '1',
    pagesize: '10',
    showLoading: false,
    addType: '',
    addArea: '',
    addContent: '',
    startValue: null,
    endValue: null,
    endOpen: false,
    beginTime: '',
    endTime: '',
    derivedUrl: '',
    userId: '',
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this.setState({
      mockTableData
    })

    this._getAchievementsHistoryList()  //绩效记录
    this.setState({
      derivedUrl: window.location.host
    })

    this.getUserInfo()
  }

  getUserInfo = () => {
    let params = {}
    getUserInfo(params, 'GET').then(res => {
      if (res.data.code == 1) {
        this.setState({ userId: res.data.data.userId })
      }
    })
  }


  // 获取绩效记录
  _getAchievementsHistoryList() {
    this.setState({ showLoading: true })
    let params = {
      keyword: this.state.account,  //关键词
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    }
    achievementsHistoryList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        this.setState({
          dataTotals: res.data.total
        })
        if (res.data.data && res.data.data.length > 0) {        
          let adminlist = res.data.data
          this._setdata(adminlist)
          this.setState({
            showLoading: false,
          })
          } else {
            this.setState({ mockTableListData: [] })
            message.warning('获取数据为空')
            this.setState({ showLoading: false }) 
        }
        this.setState({ showLoading: false }) 
      }
    })
  }
  _setdata(adminlist) {
    let mockTableListData = []
    adminlist.map((data,j) => {
      mockTableListData.push({
        key: data.payTime,
        mobile: data.mobile,
        userName: data.userName,
        recordType: data.recordType,
        registerTime: data.registerTime,
        number: data.number,
        payTime: data.payTime,
        bdType: data.bdType,
        bdUserName: data.bdUserName,
      })
    })
    this.setState({
      mockTableListData
    })
  }

  // 修改搜索关键词
  _handleAccount = (e) => {
    this.setState({
      account: e.target.value
    })
  }

  // 执行搜索
  goSearch = () => {
    this.setState({
      pageidx: 1             //初始搜索为第一页数据
    }, () => {
      this._getAchievementsHistoryList()  //获取客户管理
    })
  }

  // 页面刷新
  getOtherCode = () => {
    // this._getUserList()
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

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  // 添加拜访记录
  _addBDuser = () => {
    this.setState({
      visible: true
    })
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
    console.log(value)
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  goDerive = () => {
    let beginTime = this.state.startValue.format('YYYY-MM-DD HH:mm:ss')
    let endTime = this.state.endValue.format('YYYY-MM-DD HH:mm:ss')
    this.setState({ 
      beginTime: beginTime,
      endTime: endTime,
    },()=> {
        this.requestImport()
    })
  }

  requestImport = () => {
    // this.setState({ showLoading: true })
    // let params = {
    //   beginTime: this.state.beginTime,
    //   endTime: this.state.endTime
    // }
    // exportAllBdAchievements(params, 'GET').then(res => {
    //   if (res.data.code == 1) {
    //     message.success('导出成功')
    //     this.setState({ showLoading: false }) 
    //   }
    // })
    let base = derivedUrl + '/clt/widget/exportAllBdAchievements?'
    // let base = 'http://dbtest.uzengroup.com' + '/clt/widget/exportAllBdAchievements?'
    // let params = {
    //   beginTime: this.state.beginTime,
    //   endTime: this.state.endTime
    // }
    // base = base + 'filters=' + encodeURIComponent(JSON.stringify(params))
    // base = base + encodeURIComponent(JSON.stringify(params))
    base = base + 'beginTime=' + this.state.beginTime + '&endTime=' + this.state.endTime +'&userId=' +this.state.userId
    // return base
    console.log(base)
    window.location.href = base
  }

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
      pageidx: page,
      pagesize: pageSize
    }, () => {
        this._getAchievementsHistoryList()
    })
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;

    return (
      <div className="superPerformanceList">
        <Button
          className="addBtn"
          type="primary"
          loading={this.loadingSearch}
          onClick={this._addBDuser}
          style={{ marginBottom: '10px' }}
        >绩效记录导出</Button>
        <div>
          <Input
            size="default"
            value={this.state.account}
            style={{ width: 200, display: 'inline-block', marginBottom: '10px', marginLeft: '27px' }}
            onChange={this._handleAccount}
          />
          <Button
            onClick ={ this.goSearch }
            style={{ marginLeft:"10px", backgroundColor: '#108ee9', color:'#fff',display:'inline-block' }}
          >搜索
          </Button>
        </div>
        {/* <Button
          className="addBtn"
          type="primary"
          loading={this.loadingSearch}
          onClick={this.addVisit}>添加拜访记录</Button> */}
        <Spin spinning={this.state.showLoading}>
          <div className="m-t-lg">
            <Table
              className='userList'
              bordered
              loading={this.state.loadingSearch}
              dataSource={this.state.mockTableListData}
              columns={this.state.mockTableData}
              // rowSelection={rowSelection}
              pagination={false}
            />
            <Pagination
              defaultCurrent={this.state.defaultCurrents}
              current={this.state.pageidx}
              pageSize={this.state.pagesize}
              total={this.state.dataTotals}
              onChange={this.pageChange}
              size='large'
              // showTotal={total => `共${this.state.dataTotals}个成员`}
            />
          </div>
        </Spin>
        <Modal
          title="选择时间段"
          visible={ this.state.visible }
          onOk={ this.goDerive }
          onCancel={ this.handleCancel }
          destroyOnClose={ true }
          className='visitHistoryList'
          okText = {'确认导出'}
        >
          <div>
            <DatePicker
              disabledDate={this.disabledStartDate}
              showTime
              format="YYYY-MM-DD HH-mm-ss"
              value={startValue}
              placeholder="Start"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
            <DatePicker
              disabledDate={this.disabledEndDate}
              showTime
              format="YYYY-MM-DD HH-mm-ss"
              value={endValue}
              placeholder="End"
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
              style={{ marginLeft:'20px' }}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
