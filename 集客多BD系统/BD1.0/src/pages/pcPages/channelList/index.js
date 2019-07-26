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
  DatePicker,
  Icon,
  Pagination
} from 'antd';
import {
  extendTeamList,
  conversionTeamList,
  getUserListByType,
  updateRegionManager,
  updateTeamManager,
  getRegionList,
  saveRegion,
  saveTeam
} from '../../../axios/api';
// import "antd/dist/antd.css";
import './index.less';
import './index.css';
import PropTypes from 'prop-types'


const TabPane = Tabs.TabPane
const Option = Select.Option;
const confirm = Modal.confirm;

export default class GiftPack extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loadingSearch: false,
    tagsOrderStatus: [
      {
        id: '01',
        label: '地推渠道'
      },
      {
        id: '02',
        label: '转化渠道'
      },
    ],
    secTeamColum: [
      {
        title: '团队',
        dataIndex: 'teamName',
        key: 'col01',
        width: 80,
      },
      {
        title: '人数',
        dataIndex: 'teamCount',
        key: 'col02',
        // width: 100,
      },
      {
        title: '负责人',
        dataIndex: 'username',
        key: 'col03',
        // width: 50,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'col04',
        // width: 50,
      },
    ],
    secTeamData: [],
    showLoading: false,
    orderList: [],  //渠道区域信息
    tabStatus: 0,
    visible: false,
    managerList: [],
    qydata: [],
    localregionId: '',
    localManagerId: '',
    defaultCurrents: 1,
    pageidx: 1,
    pagesize: 10,
    pageidxs: 1,
    pagesizes: 10,
  }

  componentWillMount() {
    console.log('欢迎登录集客多BD系统');
    this._getTeamList(); // 获取地推渠道用户列表
    this._getRegionList(); // 获取创建团队时区域列表
  }

  // 更新
  // getOtherCode = () => {
  //   this._getTeamList()
  // }

  // 获取创建团队时区域列表
  _getRegionList() {
    let params = {
      channelId: 1    //当前默认写死1
    }
    getRegionList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let maindata = res.data.data
          let qydata = []
          maindata.map((dat,j) => {
            qydata.push({
              key:j+1000,
              regionName: dat.regionName,
              regionId: dat.regionId
            })
          })
          this.setState({
            qydata
          }, () => {
            console.log(this.state.qydata)
          })
        }
      }
    })
  }

  // 获取负责人列表
  _getUserListByType=(type,reId)=> {
    this.setState({ managerList: [] })
    let currentTeamId = this.state.replaceTeamId
    let params = { 
      type: type,
      regionId: reId,
      teamId: currentTeamId,
    }
    getUserListByType(params, 'GET').then(res => {
      if (res.data.code == 1) {
        if (res.data.data && res.data.data.length > 0) {
          let orderList = res.data.data;
          this.setState({
            managerList: orderList,
          }, () => {
            console.log(this.state.managerList)
          })
        }
      }
    })
  }

  // 获取地推渠道用户列表
  _getTeamList() {
    this.setState({ showLoading: true })
    let params = {
      type: 1,
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    }
    extendTeamList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        this.setState({
          dataTotals: res.data.count
        })
        if (res.data.data && res.data.data.length > 0) {
          let orderList = res.data.data;
          this.setState({
            orderList: orderList,
            showLoading: false
          })
        } else {
          this.setState({
            orderList: [],
            showLoading: false
          })
        }
      } else {
        message.warning(res.data.msg)
        this.setState({
          orderList: [],
          showLoading: false
        })
      }
    })
  }
  // 获取转化渠道用户列表
  _getSecTeamList() {
    this.setState({ showLoading: true })
    let params = {
      type: 1,
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    }
    conversionTeamList(params, 'GET').then(res => {
      if (res.data.code == 1) {
        this.setState({
          dataTotalss: res.data.count
        })
        if (res.data.data && res.data.data.length > 0) {
          let dataList = res.data.data;
          let secTeamData = []
          dataList.map((data, j) => {
            secTeamData.push({
              key: j,
              teamName: data.teamName,
              teamCount: data.teamCount,
              username: data.username
            })
          })
          this.setState({
            secTeamData,
            showLoading: false
          })
        }
      } else {
        message.warning(res.data.msg)
        this.setState({
          showLoading: false
        })
      }
    })
  }

  // 切换渠道列表
  onChangeTags = (e) => {
    console.log(e)
    this.setState({
      tabStatus: e,
      orderList: []
    })
    if (e == 0) {
      this.setState({
        pageidx: 1,
        pagesize: 10
      }, () => {
        this._getTeamList()   //获取地推渠道列表
      })
    } else {
      this.setState({
        pageidx: 1,
        pagesize: 10
      }, () => {
        this._getSecTeamList()  //获取转化渠道列表
      })
    }
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
                order.teamVoList && order.teamVoList.length > 0 ?
                  <div className="innerBox">
                    {
                      <div>
                        {record.teamName + '团队'}
                      </div>
                    }

                  </div> : '无'
              }
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'operatess',
        render: (text, record) => {
          return (
            <div>
              {
                '团队总人数：' + record.teamCount
              }
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'operate',
        render: (text, record) => {
          return (
            <div>
              {
                '负责人：' + record.username
              }
              {/* <img onClick={this.replaceMidManager.bind(this,record)} style={{ marginLeft: '5px',cursor:'pointer' }} className="icon dp_b" width="20" height="15"
                src="https://www.jk.cn/ms-trade/images/remark0.png" /> */}
              <Icon onClick={this.replaceMidManager.bind(this,record)} style={{ marginLeft: '5px',cursor:'pointer' }} className="icon dp_b"type="retweet" ></Icon>
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'operates',
        render: (text, record) => {
          return (
            <div>
              备注：
            </div>
          )
        }
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'operatec',
        render: (text, record) => {
          return (
            <div>
              操作：
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
    if (order.teamVoList && order.teamVoList.length > 0) {
      order.teamVoList.forEach((item, index) => {
        dataList.push({
          key: index,
          teamName: item.teamName,
          username: item.username,
          teamCount: item.teamCount,
          regionId: item.regionId,
          teamId: item.teamId
        })
      })
      // console.log('-------------', dataList)
      return dataList
    }
  }

  replaceGeneralManager=(order)=> {
    console.log('更换区域负责人')
    console.log(order)
    this._getUserListByType(1,order.regionId)
    this.setState({
      visible: true,
      localManagerName: '区域负责人：'+order.username,
      replaceStatus: 1,
      replaceRegionId: order.regionId,  //当前区域id
    })
  }

  replaceMidManager(order) {
    console.log('更换团队负责人')
    console.log(order)

    this.setState({
      visible: true,
      localManagerName: '团队负责人:'+order.username,
      replaceStatus: 2,
      replaceTeamId: order.teamId,  //当前团队id
    }, () => {
      this._getUserListByType(2,order.regionId)      
    })
  }

  submitReplace=()=> {
    if (this.state.replaceStatus == 1) {
      this.setState({ showLoading: true })
      let params = {
        regionId: this.state.replaceRegionId,
        userId: this.state.useId
      }
      updateRegionManager(params, 'GET').then(res => {
        if (res.data.code == 1) {
          message.success(res.data.msg);
          this.setState({visible: false})
          this._getTeamList()   
          this._getRegionList();  //刷新页面数据
        }else{
          message.error(res.data.msg);
          return;
        }
      })
      this.setState({ showLoading: false })
    }else if (this.state.replaceStatus == 2) {
      let params = {
        teamId: this.state.replaceTeamId,
        userId: this.state.useId
      }
      updateTeamManager(params, 'GET').then(res => {
        if (res.data.code == 1) {
          message.success(res.data.msg);
          this.setState({visible: false})
          this._getTeamList()   
          this._getRegionList();  //刷新页面数据
        }else{
          message.error(res.data.msg);
          return;
        }
      })
      this.setState({ showLoading: false })
    }
  }

  handleChannel = (value) => {
    console.log('当前选择角色id',value)
    this.setState({
      useId: value
    })
  }

  handleChooseQy=(value) => {
    console.log('当前选择区域id',value)
    this.setState({
      localregionId: value,
    })
    this._getUserListByType(2,value)
  }

  handleChooseManager=(value) => {
    console.log('当前选择负责人',value)
    this.setState({
      localManagerId: value
    })
  }

  handleTeamName=(e)=>{
    this.setState({
      teamName: e.target.value
    })
  }

  // 关闭窗口
  handleCancel=()=>{
    this.setState({
      visible: false,
      visibles: false,
      visibless: false,
      replaceTeamId: ''
    })
  }

  handleAddArea=(e)=> {
    this.setState({
      addArea: e.target.value
    })
  }

  // 创建区域
  _addQy = () => {
    let regionId = ''
    this._getUserListByType(1,regionId)
    this.setState({ visibles: true })
  }
  // 确认新建区域
  addNewRegion = () => {
    let params = {
      channelId: Number(this.state.tabStatus)+1,  //渠道id暂时定位1/2
      regionName: this.state.addArea,	
      userId: this.state.useId,
    }

    let _this = this
    confirm({
      title: '新建区域',
      content: '确认添加此区域吗',
      onOk() {
        console.log(params)
        saveRegion(params, 'POST').then(res => {
          if (res.data.code == 1) {
            message.success(res.data.msg);
            _this.setState({
              visibles: false
            })                       //关闭小窗口
            _this._getTeamList()   
            _this._getRegionList();  //刷新页面数据
          } else {
            message.error(res.data.msg);
          }
        });
      }
    });
  }
  // 确认新建团队
  addNewTeam = () => {
    let params = {
      channelId: Number(this.state.tabStatus)+1,  //渠道id暂时定位1/2
      regionId: this.state.localregionId,  
      teamName: this.state.teamName,	
      userId: this.state.localManagerId,
    }

    let _this = this
    confirm({
      title: '新建团队',
      content: '确认添加此团队吗',
      onOk() {
        console.log(params)
        saveTeam(params, 'POST').then(res => {
          if (res.data.code == 1) {
            message.success(res.data.msg);
            _this.setState({
              visibless: false,
              replaceTeamId: ''      //清除当前团队id
            })                       //关闭小窗口
            _this._getTeamList()   
            _this._getRegionList();  //刷新页面数据
          } else {
            message.error(res.data.msg);
          }
        });
      }
    });
  }

  // 创建团队
  _addTd = () => {
    this.setState({ visibless: true })
  }

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
        pageidx: page,
        pagesize: pageSize
    }, () => {
      // if (this.state.tabStatus == 0) {
        this._getTeamList()   //获取地推渠道列表
      // } else {
        // this._getSecTeamList()  //获取转化渠道列表
      // }
    })
  };

  // 页码改变
  pageChanges = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
        pageidxs: page,
        pagesizes: pageSize
    }, () => {
        this._getSecTeamList()  //获取转化渠道列表
    })
  };

  

  render() {
    return (
      <div id="orderPage">
        {/* <Card className="searchForm">
           <OrderSearchComponent
             wrappedComponentRef={this.saveFormRef}
             onSearch={this.searchStart}
           />
         </Card> */}
        <Card className="od_list__card">
          <Tabs onChange={this.onChangeTags}>
            {
              this.state.tagsOrderStatus.map((tag, i) =>
                <TabPane tab={tag.label} key={i}>
                </TabPane>
              )
            }
          </Tabs>
        </Card>
        <div style={{ marginLeft: '24px' }}>
          { this.state.tabStatus == 0 ?
            <Button
              className="addBtn"
              type="primary"
              loading={this.loadingSearch}
              style={{ marginRight: '25px', textAlign: 'center', fontSize: '13px' }}
              onClick={this._addQy}>创建区域</Button>
            :null
          }
          <Button
            className="addBtn"
            type="primary"
            loading={this.loadingSearch}
            style={{ textAlign: 'center', fontSize: '13px' }}
            onClick={this._addTd}>创建团队</Button>
        </div>
        <Spin spinning={this.state.showLoading}>
          {
            this.state.tabStatus == 0 ?
              <Card className="od_list__table">
                <div>
                  {
                    this.state.orderList && this.state.orderList.length > 0 ?
                      this.state.orderList.map((order, i) =>
                        <div key={i}>
                          <Table
                            className="wrapper"
                            align="center"
                            bordered={true}
                            title={() =>
                              <Row className="new_column_type">
                                <p style={{ textAlign: 'left', minWidth: '150px' }}>{order.regionName + '区域'}</p>
                                <p style={{ textAlign: 'left', minWidth: '150px' }}>
                                  {'区域负责人：' + order.username}
                                  {/* <img onClick={this.replaceGeneralManager.bind(this,order)} style={{ marginLeft: '5px',cursor:'pointer' }} className="icon dp_b" width="20" height="15"
                                    src="https://www.jk.cn/ms-trade/images/remark0.png" /> */}
                                  <Icon onClick={this.replaceGeneralManager.bind(this,order)} style={{ marginLeft: '5px',cursor:'pointer' }} className="icon dp_b" type="retweet" ></Icon>
                                </p>
                              </Row>}
                            //  onHeaderCell={() => <span>1</span>}
                            dataSource={this.getTableData.bind(this, order)()}
                            columns={this.renderColumns.bind(this, order)()}
                            pagination={false}
                          >
                          </Table>
                        </div>
                      ) : null
                  }
                </div>
                <Pagination
                    defaultCurrent={this.state.defaultCurrents}
                    current={this.state.pageidx}
                    pageSize={this.state.pagesize}
                    total={this.state.dataTotals}
                    onChange={this.pageChange}
                    size='large'
                    showTotal={total => `共${this.state.dataTotals}个区域`}
                />
              </Card>
              : null
          }
          {
            this.state.tabStatus == 1 ?
              <Card>
                <div>
                  <div>
                    <Table
                      className="wrapper"
                      pagination={false}
                      align="center"
                      bordered={true}
                      columns={this.state.secTeamColum}
                      dataSource={this.state.secTeamData}
                    >
                    </Table>
                    <Pagination
                      defaultCurrent={this.state.defaultCurrents}
                      current={this.state.pageidxs}
                      pageSize={this.state.pagesizes}
                      total={this.state.dataTotalss}
                      onChange={this.pageChanges}
                      size='large'
                      showTotal={total => `共${this.state.dataTotalss}个团队`}
                  />
                  </div>
                </div>
              </Card>
              : null
          }
        </Spin>
        <Modal
            title="管理"
            visible={this.state.visible}
            onOk={this.submitReplace}
            onCancel={this.handleCancel}
            destroyOnClose={true}
            className='addBdModal'
            style={{ width: 400 }}
          >
            {/* <Input size="small" addonBefore={'现有负责人:'} value={this.state.localManagerName} style={{ width: 300 ,display:'block', marginBottom: '30px' }} disabled /> */}
            <div style={{ width: 300 ,display:'block', marginBottom: '30px' }}>
              {this.state.localManagerName}
            </div>
            <div>
              替换负责人：
              <Select size="small" defaultValue="请选择" style={{ width: 120, display: 'inline-block', marginBottom: '40px' }} onChange={this.handleChannel}>
                {this.state.managerList.map(data => <Option key={data.updateTime} value={data.userId}>{data.realName}</Option>)}
              </Select>
            </div>
        </Modal> 
        <Modal
          title="创建区域"
          visible={this.state.visibles}
          onOk={this.addNewRegion}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          className='addBdModal'
          style={{ width: 400 }}
        >
          <div>
            区域名称：<Input size="default" onChange={this.handleAddArea} value={this.state.addArea} style={{ width: 300 ,display:'inline-block', marginTop: '5px', marginBottom: '30px' }}  />
          </div>
          <div>
            负责人：
            <Select size="default" defaultValue="请选择" style={{ width: 120, display: 'inline-block', marginBottom: '40px' }} onChange={this.handleChannel}>
              {this.state.managerList.map(data => <Option key={data.updateTime} value={data.userId}>{data.realName}</Option>)}
            </Select>
          </div>
        </Modal>
        <Modal
          title="创建团队"
          visible={this.state.visibless}
          onOk={this.addNewTeam}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          className='addBdModal'
          style={{ width: 400 }}
        >
          <div>
            所属区域：
            <Select size="default" defaultValue="请选择" style={{ width: 120, display: 'inline-block', marginBottom: '30px' }} onChange={this.handleChooseQy}>
              {this.state.qydata.map(data => <Option key={data.key} value={data.regionId}>{data.regionName}</Option>)}
            </Select>
          </div>
          <div>
            团队名称：
            <Input size="default"  value={this.state.teamName} style={{ width: 300 ,display:'inline-block', marginBottom: '30px'}} onChange={this.handleTeamName} />
          </div>
          <div>
            负责人：
            <Select size="default" defaultValue="请选择" style={{ width: 120, display: 'inline-block', marginBottom: '40px' }} onChange={this.handleChooseManager}>
              {this.state.managerList.map(data => <Option key={data.updateTime} value={data.userId}>{data.realName}</Option>)}
            </Select>
          </div>
        </Modal> 
      </div>
    )
  }
}