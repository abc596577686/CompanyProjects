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
  Pagination,
  Icon,
  Upload
} from 'antd';
import { derivedUrl } from '../../../axios/config';
import { userList, channelList, getRegionList, getroleList, saveUser, customerHistoryList, achievementsHistoryList, exportAllBdAchievements, getUserInfo ,dockRecordList ,applyDock} from '../../../axios/api';
import "antd/dist/antd.css";
import './applyDockRecord.css';
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
    mobile: ''
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this.setState({
      mockTableData
    })

    // this._getAchievementsHistoryList()  //绩效记录
    this.getDockRecordList()

    this.setState({
      derivedUrl: window.location.host
    })

    this.getUserInfo()
  }

  dateFormate = date => {
    if (date == '' || date == null || date == 0) {   //空值或者0 不显示
      return null
    }
    if (date.length == 10) {        //10位时间戳
      var now = new Date(date * 1000),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    } else {                        //13位时间戳
      var now = new Date(date),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
}

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }, () => {
          // console.log(info.file.response.data.imageAbso)
          this.setState({
            readyUpUrl: info.file.response.data.imageAbso
          })
        }),
      );
    }
  };
  
  // beforeUpload(file) {
  //   const isJPG = file.type === 'image/jpeg';
  //   if (!isJPG) {
  //     message.error('You can only upload JPG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJPG && isLt2M;
  // }

  getUserInfo = () => {
    let params = {}
    getUserInfo(params, 'GET').then(res => {
      if (res.data.code == 1) {
        this.setState({ userId: res.data.data.userId })
      }
    })
  }

  getDockRecordList() {
    this.setState({ showLoading: true })
    let params = {
      
    }
    dockRecordList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        this._setdata(res.data.data)
        this.setState({ showLoading: false }) 
      } else {
        message.warning(res.data.msg)
      }
    })
  }
  _setdata(adminlist) {
    let mockTableListData = []
    adminlist.map((data,j) => {
      mockTableListData.push({
        key: j,
        recordId: data.recordId,
        userName: data.userName,
        mobile: data.mobile,
        registerTime: this.dateFormate(data.registerTime),
        promoteTime: this.dateFormate(data.promoteTime),
        bdUserName: data.bdUserName,
        createTime: this.dateFormate(data.createTime),
        complateTime: this.dateFormate(data.complateTime),
        status: data.status==0?'审核中':(data.status==1?'已通过':'已拒绝')
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
    let params = {
      mobile: this.state.mobile,
      imagePath: this.state.readyUpUrl
    }
    applyDock(params, 'GET').then(res => {
      if (res.data.code == 1) {
        // this._setdata(res.data.data)
        this.setState({
          showLoading: false,
          visible: false
        })
        this.getDockRecordList()
        message.success(res.data.msg)
      } else {
        message.warning(res.data.msg)
      }
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

  handleMobile = (e) => {
    this.setState({
      mobile: e.target.value
    })
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <div className="superPerformanceList">
        <Button
          className="addBtn"
          type="primary"
          loading={this.loadingSearch}
          onClick={this._addBDuser}
          style={{ marginBottom: '10px' }}
        >申请对接</Button>
        <Spin spinning={this.state.showLoading}>
          <div className="m-t-lg">
            <Table
              className='userList'
              bordered
              loading={this.state.loadingSearch}
              dataSource={this.state.mockTableListData}
              columns={this.state.mockTableData}
              pagination={false}
            />
            <Pagination
              defaultCurrent={this.state.defaultCurrents}
              current={this.state.pageidx}
              pageSize={this.state.pagesize}
              total={this.state.dataTotals}
              onChange={this.pageChange}
              size='large'
            />
          </div>
        </Spin>
        <Modal
          title="申请对接"
          visible={ this.state.visible }
          onOk={ this.goDerive }
          onCancel={ this.handleCancel }
          destroyOnClose={ true }
          className='visitHistoryList'
          okText = {'确认对接'}
        >
          <div>
            <Input addonBefore='用户账号' size='default' style={{ marginBottom: '20px' }} value={this.state.mobile} onChange={ this.handleMobile }/>
            <div>
              晋升证明图片：
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://dbtest.uzengroup.com/clt/upload/webUploadImage"
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
              </Upload>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
