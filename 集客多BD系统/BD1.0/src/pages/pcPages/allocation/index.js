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
    Pagination
} from 'antd';
import {
    extendTeamList,
    conversionTeamList,
    userPoolList,
    bindBdUser,
    getTeamList,
    getUserListByTeamId
} from '../../../axios/api';
// import './index.less';
import './index.css';
import PropTypes from 'prop-types'
import { mockTableDatas, mockTableDatass } from './dataclums'
import { Date } from 'core-js';

const TabPane = Tabs.TabPane;
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
                label: '用户池'
            },
            {
                id: '01',
                label: '对接池'
            },
            {
                id: '01',
                label: '已分配'
            },
        ],
        secTeamData: [],
        showLoading: false,
        orderList: [],
        tabStatus: 0,
        visible: false,
        managerList: [],
        qydata: [],
        localregionId: '',
        localManagerId: '',
        mockTableDatas: [],
        userdata: [],
        checkedList: [],
        teamdata: [],
        teamFzdata:[],
        currentTeamName: '请选择',
        currentTeamFzName: '请选择',
        selectedRowKeys: [],
        selectedRows: [],
        bdUserId: '',
        keys: [],
        showLoadings: false,
        pageidx: 1,
        pagesize: 10,
        status: '0',
        //数据总条数
        dataTotal: 0,
        dataTotals: 0,
        //页面大小可选项
        pageSizeOption: ['5', '10', '15'],
        defaultCurrents: 1,
        keyword: '',
    }

    componentWillMount() {
        console.log('欢迎登录集客多BD系统');
        this.setState({
            mockTableDatas,
            mockTableDatass
        })
        this.getUserPoolList(1)
        this.getTeamList(); //获取所有团队列表
    }

    // 页码改变
    pageChange = (page, pageSize) => {
        console.log(page, pageSize);
        this.setState({
            pageidx: page,
            pagesize: pageSize
        }, () => {
            let type = Number(this.state.tabStatus)+1
            this.getUserPoolList(type) 
        })
    };

    getTeamList() {
        let params ={}
        getTeamList(params, 'GET').then(res => {
            if (res.data.code == 1) {
                if (res.data.data && res.data.data.length > 0) {
                    let orderList = res.data.data;
                    let teamdata = []
                    orderList.map((data,j) => {
                        teamdata.push({
                            key: j + 1000,
                            teamName: data.teamName,
                            teamId: data.teamId
                        })
                    })
                    this.setState({
                        teamdata,
                        showLoading: false
                    })
                } else {
                    message.warning('对接池团队列表接口数据为空')
                    this.setState({
                        showLoading: false
                    })
                }
            }
        })
    }

    // 获取用户分配表数据
    getUserPoolList(type) {
        this.setState({
            showLoading: true,
        })
        let params = {
            type: type,
            keyword: this.state.keyword,
            pageidx: this.state.pageidx,
            pagesize: this.state.pagesize,
        }
        userPoolList(params, 'GET').then(res => {
            if (res.data.code == 1) {
                this.setState({
                    dataTotals: Number(res.data.total)
                })
                if (res.data.data && res.data.data.length > 0) {
                    let orderList = res.data.data;
                    this._renderOrderList(orderList)
                    this.setState({
                        showLoading: false
                    })
                } else {
                    // message.warning('接口数据为空')
                    this.setState({ userdata: [] })
                    this.setState({
                        showLoading: false
                    })
                }
            }
        })
    }

    // getLocalTime(nS) {     
    //     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    // }

    // 处理接口信息
    _renderOrderList(orderList) {
        let userdata = []
        orderList.map((data, j) => {
            userdata.push({
                key: j + 100,
                userId: data.userId,
                mobile: data.mobile,
                level: data.level== '1' ?'v0':(data.level == '4'?'v2':(data.level == '5'? 'v3': 'v1')) ,
                registerTime: data.registerTime,
                // registerTime: data.registerTime,
                consultationNumber: data.consultationNumber+'次',
                bdUserName: data.bdUserName,
                createTime: data.createTime,
                enterPoolTime: data.enterPoolTime,
                action:
                    < Button className='fpBtnStyle' onClick={this._userDistribution.bind(this, data)}> 分配</Button>
            })
        })
        this.setState({ userdata })
    }

    // 切换渠道列表
    onChangeTags = (e) => {
        console.log(e)
        // console.log(rowSelection)
        this.setState({
            tabStatus: e,
            orderList: [],
            userdata:[],
            selectedRowKeys: [],
            selectedRows: [],
            pageidx: 1,
        }, () => {
            if (e == 0) {
                this.getUserPoolList(1)  //用户池
            } else if (e == 1) {
                this.getUserPoolList(2)  //对接池
            } else if (e == 2) {
                this.getUserPoolList(3)  //已分配
            }  
        })
    }

    // 开启逐个分配
    _userDistribution = (data) => {
        console.log(data)

        this.setState({
            submitType: 1,
            visible: true,
            bdUserId: '',
            userIdList: data.userId   //被分配人
        })
    }

    // 开启批量分配
    _teamAllocation = () => {
        console.log(this.state.checkedList)
        this.setState({
            submitType: 2,
            visible: true,
            bdUserId: '',
            userIdList: this.state.checkedList  //被分配人集合
        })
    }

    // 确认分配用户
    addNewTeam=()=> {
        let _this = this
        if (_this.state.bdUserId == '' || _this.state.bdUserId == null) {
            message.warning('请选择对接人')
            return
        }
        if (_this.state.userIdList == '' || _this.state.userIdList == null) {
            message.warning('请检查被分配用户')
            return
        }

        let targetKeys = _this.state.userIdList

        if ( _this.state.submitType == 2 ) {
            let keys = ''
            for (let i = 0; i < targetKeys.length; i++){
              if (targetKeys[i] != '') {
                keys+=targetKeys[i] + ",";
              }
            }
            
            setTimeout(() => {
                console.log(keys)
                confirm({
                    title: '分配对接人',
                    content: '确认此分配操作吗',
                    onOk() {
                        let params = {
                            bdUserId: JSON.stringify(_this.state.bdUserId),           //对接人
                            userIdListStr: keys                                       //被对接人集合
                        }
                        console.log(params)
                        bindBdUser(params,'POST').then(res => {
                            if (res.data.code == 1) {
                                message.success(res.data.msg);
                                _this.setState({
                                    visible: false
                                })                       //关闭小窗口
                                let key = Number(_this.state.tabStatus)+1
                                _this.getUserPoolList(key)
                            } else {
                                message.error(res.data.msg);
                            }
                        });
                    }
                });
            }, 100);
        } else {
            let keys = _this.state.userIdList
            setTimeout(() => {
                _this.submitNewTeam(keys)
            }, 100);
        }
        // this.setState({ showLoadings: true })
    }

    submitNewTeam = (keys) => {
        // this.setState({ showLoadings: false })
        let _this = this
        let params = {
            bdUserId: JSON.stringify(_this.state.bdUserId),           //对接人
            userIdListStr: keys                         //被对接人集合
        }
        confirm({
            title: '分配对接人',
            content: '确认此分配操作吗',
            onOk() {
                console.log(params)
                bindBdUser(params).then(res => {
                    if (res.data.code == 1) {
                        message.success(res.data.msg);
                        _this.setState({
                            visible: false
                        })                       //关闭小窗口
                        let key = Number(_this.state.tabStatus)+1
                        _this.getUserPoolList(key)
                    } else {
                        message.error(res.data.msg);
                    }
                });
            }
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    // 分配用户 选择当前团队
    handleChooseTeam = (value) => {
        let _this = this
        let params = {
            teamId: value
        }
        // 获取当前团队可分配负责人
        getUserListByTeamId(params, 'GET').then(res => {
            if (res.data.code == 1) {
                if (res.data.data && res.data.data.length > 0) {
                    _this.setState({
                        teamFzdata: res.data.data,
                        currentTeamFzName : '请选择'
                    })
                }
            } else {
                message.error(res.data.msg);
            }
        });
    }
    // 选定当前负责人对接
    handleChooseQy = (value) => {
        console.log(value)
        this.setState({
            bdUserId: value
        })
        console.log('当前选定对接负责人',this.state.bdUserId)
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys)
        // console.log(selectedRows)
        let checkedList = []
        selectedRows.map((data, j) => {
            checkedList.push(
                data.userId
            )
        })
        console.log(checkedList)
        this.setState({
            selectedRowKeys,
            checkedList
        })
    }
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
            let type = Number(this.state.tabStatus)+1
            this.getUserPoolList(type) 
        })
    }

    render() {

        const { selectedRowKeys, selectedRows } = this.state;
        const rowSelection = {
            selectedRowKeys,
            selectedRows,
            onChange: this.onSelectChange,
        };

        return (
            <div id="allocation">
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
                <Card className="searchForm" style={{ border: 'none',paddingLeft: '24px' }}>
                    <div>
                        <Input size="default" value={this.state.keyword} style={{ width: 300, display: 'inline-block', marginBottom: '10px' }} onChange={this._handlekeyword} />
                        <Button
                        onClick = {this.getSearch}
                        style={{ marginLeft:"10px", backgroundColor: '#108ee9', color:'#fff',display:'inline-block' }}
                        >搜索
                        </Button>
                    </div>
                </Card>
                {
                    this.state.tabStatus !=2 && this.state.userdata!=''?
                    <div style={{ marginLeft: '24px' }}>
                        <Button
                            className="addBtn"
                            type="primary"
                            loading={this.loadingSearch}
                            style={{ marginRight: '25px', textAlign: 'center', fontSize: '13px' }}
                            onClick={this._teamAllocation}
                        >批量分配</Button>
                        </div>
                    :null
                }
                <Spin spinning={this.state.showLoading}>
                    <Card className="od_list__table">
                        <div>
                            <Table
                                rowSelection={rowSelection}
                                className="wrapper"
                                pagination={false}
                                align="center"
                                bordered={true}
                                destroyOnClose={true}
                                title={() =>
                                    <Row className="new_column_type">
                                        {this.state.tabStatus == 0 ? '用户分配—用户池' : this.state.tabStatus == 1 ? '用户分配—对接池' : '用户分配—已分配'}
                                    </Row>}
                                dataSource={this.state.userdata}
                                columns={
                                    this.state.tabStatus == 2 ? this.state.mockTableDatass : this.state.mockTableDatas
                                }
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
                        </div>
                    </Card>
                </Spin>
                <Spin spinning={this.state.showLoadings}>
                    <Modal
                        title="分配对接人"
                        visible={this.state.visible}
                        onOk={this.addNewTeam}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                        className='addBdModal'
                        style={{ width: 400 }}
                    >
                        <div>
                            团队：
                            <Select size="default" defaultValue={this.state.currentTeamName} style={{ width: 120, display: 'inline-block', marginBottom: '30px' }} onChange={this.handleChooseTeam}>
                                {this.state.teamdata.map(data => <Option key={data.key} value={data.teamId}>{data.teamName}</Option>)}
                            </Select>
                        </div>
                        <div>
                            负责人：
                            <Select size="default" defaultValue={this.state.currentTeamFzName} style={{ width: 120, display: 'inline-block', marginBottom: '30px' }} onChange={this.handleChooseQy}>
                                {this.state.teamFzdata.map(data => <Option key={data.createTime} value={data.userId}>{data.realName}</Option>)}
                            </Select>
                        </div>
                    </Modal>
                </Spin>
            </div>
        )
    }
}