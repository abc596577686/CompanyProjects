import React from 'react';
import { Pagination, Button, Icon, Card, Table, message, Modal, Select,Input, Transfer,Menu,Dropdown } from 'antd';
import './index.less';
import { mockTableData } from './typeData'
import { superadmin, createUser , enableUser, isSuperAccount, adminInfo, userBindRole} from '../../../axios/api';
import { ERR_OK, baseUrl } from "../../../axios/config";
// 引入文字特效
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
// 引入切换动效
import QueueAnim from 'rc-queue-anim';

const confirm = Modal.confirm;
const Option = Select.Option;

export default class superAdmin extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('商品');
    this.setState({
      mockTableData
    })
    let params = {
      pageidx: 1,     //默认第一页
      pagesize: 10,   //默认一页十条
    }
    this._getSuperAdminList(params);
    
    this.showTxt()
    this.showcontent()
  }

  state = {
    mockTableListData: [],
    mockTableData: [],
    data: [],
    tableEmpty: {
      emptyText: () => <div>
        <Icon type="frown" theme="outlined" />
        暂无数据
      </div>
    },
    loadingAddGoods: false,
    loadingSearch: false,
    // 分类操作数据
    categoryId: '',
    name: '',
    description: '',
    parentId: '',
    status: '',
    imagePath: '',
    tagNames: '',
    level: '',
    mocklist: [],
    keyCategoryId: '',
    // 切换文字动效
    show: false,
    // 切换动效
    showContent: false,
    pageidx: '',
    pagesize: '',
    count: '',
    visible: false,
    fullName: '',
    mobile: '',
    enabled: '',
    superAccount: '',
    username: '',
    password: '123456',
    keyid: '',
    visibles: false,
    userId: '',
    targetKeys: '',
  };

  // 文字动效运动轨迹
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

  // 启动文字动效
  showTxt = () => {
    this.setState({
      show: !this.state.show
    });
  }
  // 启动切换动效
  showcontent = () => {
    this.setState({
      showContent: !this.state.showContent
    });
  }

  // 穿梭框数据
  getMock = (params) => {
    adminInfo(params, 'GET').then(res => {
      if (res.data.code == 1) {
        console.log(res.data)
        const targetKeys = [];
        const mockData = [];
        const adminlists = res.data.data.roles   //已存在角色
        const adminlist = res.data.data.allRoles   //其余角色
        this.setState({
          userId: res.data.data.userId
        });
        if (adminlist.length > 0) {
          adminlist.map((admin, i) => {   
            mockData.push({
              key: admin.roleId,
              title: admin.description,
              description: `description of content${i + 1}`,
            })
          })
        }
        if (adminlists.length > 0) {    
          adminlists.map((admins, i) => {   
            targetKeys.push(admins.roleId)
          })
        }
        this.setState({
          mockData: mockData,
          targetKeys: targetKeys
        });
      } else {
        message.warning('管理员角色获取失败')
      }
    })
  }

  handleChange = (targetKeys) => {
    this.setState({
      targetKeys: targetKeys
    });
  }

  _getSuperAdminList(params) {
    this.setState({loadingSearch: true});
    superadmin(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        console.log(res)
        if (res.data.data && res.data.data.length > 0) {
          this.setState({loadingSearch: false});
          let adminlist = res.data.data
          this.setState({
            mockTableListData: res.data.data,
            count: res.data.count,  //数据总数
            pageidx: res.data.pageidx,
            pagesize: res.data.pagesize,

          })
          this._setdata(adminlist)
        }
      }else {
        // message.warning('当前操作无数据');
        message.warning(res.data.msg);
        this.setState({loadingSearch: false});
      }
    });
  }
  // 添加管理员接口
  _createUser(params) {
    this.setState({ loadingSearch: true });
    createUser(params, 'post').then(res => {
      this.setState({ loadingSearch: false })
      if (res.data.code === ERR_OK) {
        message.success(res.data.msg);
        let params = {
          pageidx: this.state.pageidx,
          pagesize: this.state.pagesize
        }
        this._getSuperAdminList(params);
      } else {
        message.warning(res.data.msg);
      }
    })
  }
  getMenu = (admin) =>{
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="javascript:;" onClick={this.productAction.bind(this, admin, 'open')} >启用</a>
        </Menu.Item>
        <Menu.Item>
          <a href="javascript:;" onClick={this.productAction.bind(this, admin, 'close')} >禁用</a>
        </Menu.Item>
      </Menu>
    )
    return menu
  }

  _setdata(adminlist) {
    let mockTableListData = []
    
    adminlist.map((admin, i) => {
      mockTableListData.push({
        key: i + 1,
        fullName: admin.fullName,
        mobile: admin.mobile,
        enabled: admin.enabled == true ? '是' : '否',
        superAccount: admin.superAccount == true ? '是' : '否',
        username: admin.username,
        userId: admin.userId,
        roles: admin.roles,
        otherRoles: admin.otherRoles,
        action:
          <div className='firstCatelist'>
            <Dropdown overlay={this.getMenu(admin)} placement="bottomLeft">
              <a href='javascript:void(0);'>操作</a>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:;" onClick={this.productAction.bind(this, admin, 'bd')} >角色绑定</a>
          </div>
      })
    })
    this.setState({
      adminlist,
      mockTableListData,
    })
  }
  // 分类操作
  productAction(admin, type) {
    switch (type) {
      case 'open':
        this._productOpen(admin);
        break;
      case 'close':
        this._productClose(admin);
        break;
      case 'bd':
        this._productBd(admin);
        break;
    }
  };
  // 启用管理员操作
  _productOpen = (admin) => {
    console.log(admin)
    if (admin.enabled == true) {
      message.warning('当前管理员账号已经启用')
      return
    }
    let _this = this
    confirm({
      title: '提示',
      content: '确认启用该管理员账户吗',
      onOk() {
        console.log(admin)
        let params = {
          userIds: admin.userId,
          enable: true,
        };
        enableUser(params, 'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res)
            let params = {
              pageidx: _this.state.pageidx,
              pagesize: _this.state.pagesize
            }
            _this._getSuperAdminList(params);
          } else {
            message.warning(res.data.msg);
          }
        });
      },
      onCancel() {
        console.log('取消删除')
      }
    })
  }

  // 禁用管理员操作
  _productClose = (admin) => {
    console.log(admin)
    if (admin.enabled == false) {
      message.warning('当前管理员账号已经禁用')
      return
    }
    let _this = this
    confirm({
      title: '提示',
      content: '确认禁用该管理员账户吗',
      onOk() {
        console.log(admin)
        let params = {
          userIds: admin.userId,
          enable: false,
        };
        enableUser(params, 'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res)
            let params = {
              pageidx: _this.state.pageidx,
              pagesize: _this.state.pagesize
            }
            _this._getSuperAdminList(params);
          } else {
            message.warning(res.data.msg);
          }
        });
      },
      onCancel() {
        console.log('取消删除')
      }
    })
  }

  // 绑定角色操作
  _productBd = (admin) => {
    console.log(admin)  //当前获取无角色信息
    let params = {
      userId: admin.userId
    }
    this.getMock(params)
    this.setState({
      visibles: true
    })
  }

  // 设置超级管理员权限操作
  _superAdmina = () => {
    if (this.state.keyid == '' || this.state.keyid == null) {
      message.warning('当前未选择管理员账号')
      return
    }
    let _this = this
    confirm({
      title: '提示',
      content: '确认设置该管理员账户为超级管理员权限吗',
      onOk() {
        let params = {
          userIds: _this.state.keyid,
          isSuperAccount: true,
        };
        isSuperAccount(params, 'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res)
            let params = {
              pageidx: _this.state.pageidx,
              pagesize: _this.state.pagesize
            }
            _this._getSuperAdminList(params);
          } else {
            message.warning(res.data.msg);
          }
        });
      },
      onCancel() {
        console.log('取消设置')
      }
    })
  }

  // 取消超级管理员权限操作
  _superAdminb = () => {
    if (this.state.keyid == '' || this.state.keyid == null) {
      message.warning('当前未选择管理员账号')
      return
    }
    let _this = this
    confirm({
      title: '提示',
      content: '确认取消该管理员账户的超级管理员权限吗',
      onOk() {
        let params = {
          userIds: _this.state.keyid,
          isSuperAccount: false
        };
        isSuperAccount(params, 'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res)
            let params = {
              pageidx: _this.state.pageidx,
              pagesize: _this.state.pagesize
            }
            _this._getSuperAdminList(params);
          } else {
            message.warning(res.data.msg);
          }
        });
      },
      onCancel() {
        console.log('取消设置')
      }
    })
  }
  
  // 页码改变
  onPaginationChange = (page, pageSize) => {
    console.log(page, pageSize);
    let params
    this.setState(
      {
        pageidx: page,
        pagesize: pageSize
      }, () => {
        params = {
          pagesize: this.state.pagesize,
          pageidx: this.state.pageidx,
        }
        this._getSuperAdminList(params);
      }
    )
  };

  // 添加管理员
  addFirst = () => {
    this.setState({
      visible: true
    });
  }

  // 取消操作
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibles:false
    });
  }

  // 数据绑定
  _editfullname = (e) => {
    console.log(e.target.value)
    this.setState({
      fullname: e.target.value
    })
  }
  _editUsername = (e) => {
    console.log(e.target.value)
    this.setState({
      username: e.target.value
    })
  }
  _editPhoneCode = (e) => {
    console.log(e.target.value)
    this.setState({
      mobile: e.target.value
    })
  }
  selectChangea = (e) => {
    console.log(e)
    this.setState({
      enabled: e,
    });
  }
  selectChangeb = (e) => {
    console.log(e)
    this.setState({
      superAccount: e,
    });
  }

  // 编辑完毕 确认添加
  handleOk = () => {
    this.setState({
      visible: false,
    });
    let params = {
        fullName: this.state.fullname,
        username: this.state.username,
        mobile: this.state.mobile,
        enabled: this.state.enabled,
        superAccount: this.state.superAccount
    }
    console.log(params)
    this._createUser(params)
  }

  // 确认账号角色编辑
  handleOks = () => {
    let _this = this
    confirm({
      title: '提示',
      content: '确认当前角色设置吗',
      onOk() {
        let targetKeys = _this.state.targetKeys
        let keys = ""
        for (let i = 0; i < targetKeys.length; i++){
          if (targetKeys[i] != '') {
            keys+=targetKeys[i] + ",";
          }
        }
        let params = {
          userId: _this.state.userId,
          roleIds: keys,
        };
        userBindRole(params,'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            _this.setState({
              visibles: false
            })
            let params = {
              pageidx: _this.state.pageidx,
              pagesize: _this.state.pagesize
            }
            _this._getSuperAdminList(params);
          } else {
            message.warning(res.data.msg);
          }
        });
      },
      onCancel() {
        console.log('取消设置')
      }
    })
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ', selectedRows);
        let keyid = ''
        for (let i = 0; i < selectedRows.length; i++) {
          if (selectedRows[i].userId != '') {
            keyid += selectedRows[i].userId +','
          }
        }
        console.log(keyid)
        this.setState({
          keyid: keyid
        })
      }
    };
    return (
      <div className="page goods-page">
        <div className="m-t-lg">
          <Card hoverable={true} className="tableData">
            <QueueAnim className="demo-content" interval={300}>
              {this.state.showContent ? [
                <div className="top-other-btn" style={{ marginBottom: '20px' }} key="a">
                  <Button type="primary" onClick={this.addFirst}>
                    添加管理员
                    {/* <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '添加管理员'}</Texty> */}
                  </Button>
                  <Button type="primary" onClick={this._superAdmina}>
                    设置超级管理员
                    {/* <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '设置超级管理员'}</Texty> */}
                  </Button>
                  <Button type="primary" onClick={this._superAdminb}>
                    取消超级管理员
                    {/* <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '取消超级管理员'}</Texty> */}
                  </Button>
                </div>,
                <Table
                  key="b"
                  bordered
                  loading={this.state.loadingSearch}
                  className='pl'
                  dataSource={this.state.mockTableListData}
                  columns={this.state.mockTableData}
                  rowSelection={rowSelection}
                  pagination={false}
                />,
                <Pagination
                  key="c" 
                  onChange={this.onPaginationChange}
                  total={this.state.count}
                  current={this.state.pageidx}
                  pageSize={this.state.pagesize}
                />
              ]: null}
            </QueueAnim>
            <Modal
              title="添加管理员"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              destroyOnClose={true}
              className='addAdminModal'
            >
              <QueueAnim className="demo-content" interval={200}>
                {this.state.showContent ? [
                  <Input size="small" addonBefore='管理员名称' style={{ marginBottom: '10px' }} onChange={this._editfullname}  key="1"/>,
                  <Input size="small" addonBefore='用户名称' style={{ marginBottom: '10px' }} onChange={this._editUsername} key="2"/>,
                  <Input size="small" addonBefore='手机号' style={{ marginBottom: '10px' }} onChange={this._editPhoneCode} key="3" />,
                  <Select size="" placeholder="启用状态" onChange={this.selectChangea} style={{ marginBottom: '10px', width: '100px' }} key="4">
                    <Option value="true">启用</Option>
                    <Option value="false">禁用</Option>
                  </Select>,
                  <Select size="" placeholder="是否超级管理权限" onChange={this.selectChangeb} style={{ marginBottom: '10px',marginLeft: '10px', width: '150px' }} key="5">
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                  </Select>,
                ]: null}  
              </QueueAnim>
            </Modal>
            <Modal
              title="角色绑定关系"
              visible={this.state.visibles}
              onOk={this.handleOks}
              onCancel={this.handleCancel}
              destroyOnClose={true}
            >
              {/* 穿梭框 */}
              <Transfer
                dataSource={this.state.mockData}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => item.title}
                titles={['其他角色', '已有角色']}
              />
            </Modal>
          </Card>
        </div>
      </div>
    )
  }
}
