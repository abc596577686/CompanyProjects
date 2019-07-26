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
  DatePicker
} from 'antd';
import {
  // extendTeamList,
  // conversionTeamList,
  // getUserListByType,
  // getRegionList,
  pushTeamList,
  teamDetail,
  getUserInfo
} from '../../../../axios/api';
// import "antd/dist/antd.css";
import './index.less';
import './index.css';
import PropTypes from 'prop-types'
import { derivedUrl } from '../../../../axios/config';

const TabPane = Tabs.TabPane
const Option = Select.Option;
const confirm = Modal.confirm;


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
        dataIndex: 'roleName',
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
        dataIndex: 'totalRenewNumber',
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
    visibles: false,
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
    localkeyid:'',
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
    pageidxs:  1,
    pagesizes: 5,
    //数据总条数
    dataTotals: 0,
    startValue: null,
    endValue: null,
    endOpen: false,
    beginTime: '',
    endTime: '',
    derivedUrl:'',
    superAccount: '',
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this.getPushTeamList();  //获取地推团队列表
    this.setState({
      derivedUrl: window.location.host
    })
    this.getUserInfo()
  }

  getUserInfo = () => {
    let params = {}
    this.setState({
      userInfo: []
    })
    getUserInfo(params, 'GET').then(res => {
        if (res.data.code == 1) {
            if (res.data.data) {
              console.log(res.data.data.superAccount)
              
              this.setState({
                superAccount: res.data.data.superAccount
              })
            }
        }
    })
  }

  // 更新
  // getOtherCode = () => {
  //   this.getPushTeamList()
  // }

  // 获取地推团队列表
  getPushTeamList() {
    this.setState({ showLoading: true })
    let params = {
      type: 1,
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
      } else {
        this.setState({ showLoading: false })
        message.warning(res.data.msg)
      }
    })
  }

  // 获取团队详情
  getTeamDataMain(keyid) {
    this.setState({
      teamData: [],       //清空之前的团队详情数据   
      showLoading: true
    })
    let params = {
      teamId: keyid,
      pageidx: this.state.pageidxs,
      pagesize: this.state.pagesizes,
    }

    teamDetail(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let teammaindata = res.data.data
          console.log(teammaindata)
          this.setState({ dataTotals: res.data.total })
          this.setTeamMainData(teammaindata)
        }
        this.setState({ showLoading: false })
      }
    })
  }
  // 处理团队信息详情数据
  setTeamMainData(teammaindata) {
    let teamData = []
    teammaindata.map((data,j)=> {
      teamData.push({
        key: j,
        userName: data.userName,
        mobile: data.mobile,
        roleName: data.roleName,
        totalRenewNumber: data.totalRenewNumber,
        directRegisterNumber: data.directRegisterNumber,       //团队当月注册
        directPromoteNumber: data.directPromoteNumber,         //团队当月晋升
        directRenewNumber: data.directRenewNumber,             //团队当月续费
        indirectRegisterNumber: data.indirectRegisterNumber,   //团队当月转介绍注册
        indirectPromoteNumber: data.indirectPromoteNumber,     //团队当月转介绍晋升
      })
    })
    this.setState({
      teammaindata,
      teamData,         //处理完的数据
    })
  }

  //渲染列
  renderColumns = (order) => {
    const columns = [
      {
        title: '',
        dataIndex: 'zc',
        key: 'orderInfo',
        render: (text, record) => {
          return (
            <div className="order-info">
              {
                // order.teamVoList && order.teamVoList.length > 0 ?
                <div className="innerBox">
                  {
                    <div>
                      {
                        '团队当月注册：' + record.directRegisterNumber
                      }
                    </div>
                  }

                </div>
                // : '无'
              }
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'js',
        key: 'teamjs',
        render: (text, record) => {
          return (
            <div>
              {
                '团队当月晋升：'+ record.directPromoteNumber
              }
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'xf',
        key: 'teamxf',
        render: (text, record) => {
          return (
            <div>
              {
                '团队当月续费：' + record.totalRenewNumber
              }
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'szc',
        key: 'teamzjs',
        render: (text, record) => {
          return (
            <div>
              {
                '团队当月转介绍注册：' + record.indirectRegisterNumber
              }
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'sjs',
        key: 'operate',
        render: (text, record) => {
          return (
            <div>
              {
                '团队当月转介绍晋升：' + + record.indirectPromoteNumber
              }
            </div>
          )
        }
      }
    ]
    return columns
  }

  //获取渲染数据
  getTableData = (order) => {
    let dataList = []
      dataList.push({
        key: order.teamUserId,
        totalRenewNumber: order.totalRenewNumber,
        directRegisterNumber: order.directRegisterNumber,       //团队当月注册
        directPromoteNumber: order.directPromoteNumber,         //团队当月晋升
        directRenewNumber: order.directRenewNumber,             //团队当月续费
        indirectRegisterNumber: order.indirectRegisterNumber,   //团队当月转介绍注册
        indirectPromoteNumber: order.indirectPromoteNumber,     //团队当月转介绍晋升
      })
    return dataList
  }

  // 关闭窗口
  handleCancel = () => {
    this.setState({
      visible: false,
      visibles: false,
      visibless: false,
      localkeyid: ''
    })
  }

  // 查看地推团队详情
  openTeamData = (order) => {
    console.log('----团队信息----', order)
    let keyid = order.teamId
    this.setState({
      visible: true,
      localkeyid: keyid
    })
    
    this.getTeamDataMain(keyid);
  }

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
      pageidx: page,
      pagesize: pageSize
    }, () => {
      this.getPushTeamList();
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
  pageChanges = (page, pageSize) => {
    console.log(page, pageSize);
    let localkeyid = this.state.localkeyid

    this.setState({
      pageidxs: page,
      pagesizes: pageSize
    }, () => {
      this.getTeamDataMain(localkeyid);
    })
  };

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


  _addBDuser = () => {
    this.setState({
      visibles: true
    })
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
    let base = derivedUrl + '/clt/widget/exportBdProductProfit?'
    base = base + 'beginTime=' + this.state.beginTime + '&endTime=' + this.state.endTime + '&type=1'
    console.log(base)
    window.location.href = base
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div id="orderPages">
        <Spin spinning={this.state.showLoading}>
          <Card className="od_list__table">
          {
              this.state.superAccount == true?
              <Button
                className="addBtn"
                type="primary"
                loading={this.loadingSearch}
                onClick={this._addBDuser}
                style={{ marginBottom: '10px' }}
              >地推邀请记录导出</Button>
              :null
          }
            <div>
              {
                this.state.orderList && this.state.orderList.length > 0 ?
                  this.state.orderList.map((order, i) =>
                    <div key={i}>
                      <Table
                        className="wrapper"
                        align="center"
                        bordered={true}
                        pagination={false}
                        title={() =>
                          <Row className="new_column_type">
                            <p style={{ textAlign: 'left', minWidth: '150px' }}>{order.channelName + '—' + order.regionName + '区域—' + order.teamName + '团队'}</p>
                            <p style={{ textAlign: 'left', minWidth: '150px' }}>
                              {'负责人—' + order.teamUserName}
                            </p>
                          </Row>}
                        footer={() =>
                          <Row className="foot" onClick={this.openTeamData.bind(this, order)}>
                            获取团队信息详情
                            <Icon type="up-square" style={{ marginLeft: '10px' }} />
                          </Row>}
                        dataSource={this.getTableData.bind(this, order)()}
                        columns={this.renderColumns.bind(this, order)()}
                      >
                      </Table>
                    </div>
                  ) : null
              }
              <Pagination
                defaultCurrent={this.state.defaultCurrent}
                current={this.state.pageidx}
                pageSize={this.state.pagesize}
                total={Number(this.state.dataTotal)}
                onChange={this.pageChange}
                size='default'
                showSizeChanger={true}
                onShowSizeChange={this.pageSizeChange}
                pageSizeOptions={this.state.pageSizeOptions}
                showTotal={total => `共${this.state.dataTotal}个地推团队`}
              />
            </div>
          </Card>
        </Spin>

        <Modal
          title="团队信息总览"
          visible={this.state.visible}
          onOk={this.addNewTeam}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          className='teamMain'
        // style={{ width: 600 }}
        >
          {/* <div>
            团队名称：
            <Input size="default"  value={this.state.teamName} style={{ width: 300 ,display:'inline-block', marginBottom: '30px'}} onChange={this.handleTeamName} />
          </div> */}
          <Spin spinning={this.state.showLoading}>
            <Table
              className="wrapper"
              align="center"
              bordered={true}
              locale={this.state.tableEmpty}
              columns={this.state.teamColumns}
              dataSource={this.state.teamData}
              pagination={false}
            >
            </Table>
          </Spin>
          <Pagination
            defaultCurrent={this.state.defaultCurrents}
            current={this.state.pageidxs}
            pageSize={this.state.pagesizes}
            total={this.state.dataTotals}
            onChange={this.pageChanges}
            size='small'
            showTotal={total => `共${this.state.dataTotals}个成员`}
          />
        </Modal>
        <Modal
          title="选择时间段"
          visible={ this.state.visibles }
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