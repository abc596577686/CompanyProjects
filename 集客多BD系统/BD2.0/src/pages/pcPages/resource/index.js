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
  getUserInfo,
  bdMemberQuotaList
} from '../../../axios/api';
// import './resource.less';
import './resource.css';
// import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { mockTableData } from './typeData'

const TabPane = Tabs.TabPane;
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
    pagesize: 20,
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
    // monthDataColumns: [],
    monthDataColumnss: [],
    account: '请输入搜索内容',
    monthData: [],  //本月数据
    underTeamList: [],
    phoneCode: '',
    showLoadings: false,
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this.getUserInfo()
    this.getbdMemberQuotaList()
    // this.getPushTeamList();    //获取默认团队列表
    this.setState({
      mockTableData
    })
  }

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

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
      pageidx: page,
      pagesize: pageSize
    }, () => {
      this.getbdMemberQuotaList();
    })
  };
  // 页面条数改变
  pageSizeChange = (current, pagesize) => {
    // console.log(current, pagesize);
    this.setState({
      pagesize: pagesize
    }, () => {
      this.getbdMemberQuotaList();
    });
  };

  getbdMemberQuotaList = () => {
    this.setState({
      showLoading: true
    })
    let params = {
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    }
    bdMemberQuotaList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let dataList = res.data.data;
          let dataTotal = res.data.total;
          let secTeamData = []
          dataList.map((data, j) => {
            secTeamData.push({
              key: j,
              bdUserName: data.bdUserName,
              createTime: this.dateFormate(data.createTime),
              recordId: data.recordId,
              regionTeamName: data.regionTeamName,
              allocateNumber: data.allocateNumber,
              declareMemberNumber: data.declareMemberNumber,
              freeMemberNumber: data.freeMemberNumber,
              usedNumber: data.usedNumber
            })
          })
          this.setState({
            dataTotal,
            secTeamData,
            showLoading: false
          })
        } else {
          this.setState({
            secTeamData: [],
            showLoading: false
          })
        }
      } else {
        this.setState({
          showLoading: false
        })
        message.error(res.data.msg);
      }
    });
  }

  render() {
    return (
      <div id="mainPagesss">
        <Spin spinning={this.state.showLoading}>
          <Card className="od_list__card">
            <Table
              className="wrapper"
              align="center"
              bordered={true}
              pagination={false}
              title={() =>
                <Row className="new_column_type">
                  <p>资源内部分配记录</p>
                </Row>}
              columns={this.state.mockTableData}
              dataSource={this.state.secTeamData}
            >
            </Table>
            <Pagination
              defaultCurrent={this.state.defaultCurrent}
              current={this.state.pageidx}
              pageSize={this.state.pagesize}
              total={this.state.dataTotal}
              onChange={this.pageChange}
              size='default'
              showSizeChanger={true}
              onShowSizeChange={this.pageSizeChange}
              pageSizeOptions={this.state.pageSizeOptions}
              showTotal={total => `共${this.state.dataTotal}条记录`}
            />
          </Card>
        </Spin>
      </div>
    )
  }
}
