import React from 'react';
import { Pagination, Button, Icon, Card, Table, message, Modal, Select, Input, Transfer, Cascader, Menu, Dropdown, Tree } from 'antd';
import './index.less';
import { mockTableData } from './typeData'
import { superadmin, createUser, enableUser, isSuperAccount, adminInfo, userBindRole, roleList, createRole, deleteRole, updateRole, roleInfo, roleBindMenu, roleBindResource, menuTree, menuInfo } from '../../../axios/api';
import { ERR_OK, baseUrl } from "../../../axios/config";
// 引入文字特效
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import 'rc-texty/assets/index.css';
// 引入切换动效

const confirm = Modal.confirm;
const Option = Select.Option;
const { TreeNode } = Tree;

export default class role extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        // this.setState({
        //     mockTableData,
        //     mockTableDatas,
        // })
        console.log('商品');
        this.setState({
            mockTableData
        })

        this._getRoleList();

        this.showTxt()
        this.showcontent()
        // 载入角色菜单资源树
        this.getMenuTree()
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
        keyname: '',
        description: '',
        mobile: '',
        enabled: '',
        superAccount: '',
        username: '',
        password: '123456',
        keyid: '',
        visibles: false,
        userId: '',
        targetKeys: '',
        targetKeyss: '',
        roleId: '',
        // mockData: '',
        // targetKeys:'',
        menuIds: '',
        expandedKeys: [],  //默认展开的节点
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData: [
            // { title: 'Expand to load', key: '0' },
            // { title: 'Tree Node', key: '2', isLeaf: true },
        ],
        getType: '',
        // visible: false,
        newResourceName: '',
        newResourceLink: '',
        newMenuId: '',
        resourceName: '',
        resourceLink: '',
        menuId: '',
        allParentList: [],
        newParams: '',
        normalExpandedKeys: [
            // '9f5afec5-db99-472d-a196-665cffb81c22',
            // 'a5a8c7cf-8d4d-4f9c-86c3-2710a8873933'
        ]
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

    // 获取角色信息
    _getRoleList() {
        this.setState({ loadingSearch: true });
        roleList('GET').then(res => {
            if (res.data.code === ERR_OK) {
                // console.log(res)
                if (res.data.data && res.data.data.length > 0) {
                    this.setState({ loadingSearch: false });
                    let adminlist = res.data.data
                    // console.log(this.state.roleId)
                    // console.log(res.data.data[0].resourceIds)
                    this.setState({
                        mockTableListData: res.data.data,
                        // normalExpandedKeys: [
                        //     '9f5afec5-db99-472d-a196-665cffb81c22',
                        //     'a5a8c7cf-8d4d-4f9c-86c3-2710a8873933'
                        // ],
                        normalExpandedKeys: []
                    })
                    this._setdata(adminlist)
                } else {
                    message.warning(res.data.msg);
                    this.setState({
                        loadingSearch: false,
                    })
                }
            } else {
                // message.warning('当前操作无数据');
                message.warning(res.data.msg);
                this.setState({ loadingSearch: false });
            }
        });
    }
    // 获取菜单资源
    getMenuTree = () => {
        menuTree().then(res => {
            console.log(res)
            if (res.data.code === '1' && res.data.data.length > 0) {
                let alist = res.data.data
                this._setdatas(alist)
            }
        })
    }

    _setdatas(alist) {
        console.log('重新渲染')
        let getData = []
        alist.map((data, i) => {
            getData.push({
                menuId: data.menuId,
                title: data.title,
                children: data.children,

                // children: [
                //     { key: data.menuId },
                //     { title: data.title }
                // ]
            })
            this.setState({
                treeData: getData
            })
        })
    }
    // 载入数据
    onLoadData = treeNode => new Promise((resolve) => {
        // console.log('节点目录', treeNode.props)
        if (treeNode.props.children && treeNode.props.children.length == 0) {  //资源获取节点 根据menuId 获取资源
            console.log('资源获取节点')
            setTimeout(() => {
                console.log('父id', treeNode.props.dataRef.menuId)
                let params = {
                    menuId: treeNode.props.dataRef.menuId,
                    roleId: this.state.roleId
                }
                menuInfo(params, 'GET').then(res => {
                    if (res.data.code === '1') {
                        // this.setState({
                        //     treeData: res.data.data
                        // }, () => {

                        // })
                        // console.log(res.data.data.resourceList)
                        let childrenlist = []
                        res.data.data.resourceList.map((data, i) => {
                            childrenlist.push({
                                key: data.resourceId,
                                title: data.name,
                                isLeaf: true,
                                isLeafNode: data.isLeafNode,
                                type: data.type,
                                linkpath: data.linkPath,
                                menuId: data.menuId,
                                // disableCheckbox: false
                            })
                        })

                        // console.log(childrenlist)
                        treeNode.props.dataRef.children = childrenlist
                        this.setState({
                            treeData: [...this.state.treeData]
                        });
                        console.log('节点目录', treeNode.props)
                        resolve();
                    }
                })
            }, 1000);
        } else if (treeNode.props.children && treeNode.props.children.length > 0) { //菜单树节点
            // console.log(treeNode.props)
            // treeNode.props.push({disableCheckbox: true})
            console.log('非资源获取节点')
            console.log(this.state.treeData)
            // let newList = []
            // this.state.treeData.map((data) => {
            //     newList.push({
            //         // key: data.resourceId,
            //         // title: data.name,
            //         // isLeaf: true,
            //         // isLeafNode: data.isLeafNode,
            //         // type: data.type,
            //         // linkpath: data.linkPath,
            //         // menuId: data.menuId,
            //         title: data.title,
            //         menuId: data.menuId,
            //         children: data.children,
            //         disableCheckbox: true
            //     })
            // })
            this.setState({
                treeData: [...this.state.treeData],
                // treeData: newList
            });
            resolve();
        } else {
            console.log('当前是资源节点')
            this.setState({
                treeData: [...this.state.treeData],
            });
            resolve();
        }
    })
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.menuId} dataRef={item} disableCheckbox>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} dataRef={item} />;
    })

    // 数据
    getMock = (params) => {
        let _this = this
        roleInfo(params, 'GET').then(res => {
            if (res.data.code == 1) {
                // 角色绑定菜单数据
                // const targetKeys = [];
                // const mockData = [];
                // const adminlist = res.data.data.allMenus   //全部角色
                // const adminlists = res.data.data.menus   //已存在角色

                _this.setState({
                    roleId: res.data.data.roleId,
                });
                menuTree().then(res => {
                    console.log(res)
                    if (res.data.code === '1' && res.data.data.length > 0) {
                        let alist = res.data.data
                        _this._setdatas(
                            alist,
                            // loadingSearch: false
                        )
                    }
                })

                // _this.setState({
                //     roleId: res.data.data.roleId,
                // });


                // console.log(this.state.roleId)

                // if (adminlist.length > 0) {
                //     adminlist.map((admin, i) => {
                //         mockData.push({
                //             key: admin.menuId,
                //             title: admin.title,
                //             description: `description of content${i + 1}`,
                //         })
                //     })
                //     console.log(mockData)
                // }
                // if (adminlists.length > 0) {
                //     adminlists.map((admins, i) => {
                //         targetKeys.push(admins.menuId)
                //     })
                // }
                // _this.setState({
                //     mockData: mockData,
                //     targetKeys: targetKeys
                // });

                // 角色绑定资源数据
                // const targetKeyss = [];
                // const mockDatas = [];
                // const resourcelist = res.data.data.allResources   //全部资源
                // const resourcelists = res.data.data.resources   //已有资源

                // this.setState({
                //     roleId: res.data.data.roleId
                // });
                // if (resourcelist.length > 0) {
                //     resourcelist.map((admin, i) => {
                //         mockDatas.push({
                //             key: admin.resourceId,
                //             title: `${admin.groupName}/${admin.name}`,
                //             description: `description of content${i + 1}`,
                //         })
                //     })
                //     console.log(mockDatas)
                // }
                // if (resourcelists.length > 0) {
                //     resourcelists.map((admins, i) => {
                //         targetKeyss.push(admins.resourceId)
                //     })
                // }
                // _this.setState({
                //     mockDatas: mockDatas,
                //     targetKeyss: targetKeyss
                // });
            } else {
                message.warning('角色信息获取失败')
            }
        })
    }

    // 菜单穿梭框右侧内容
    // handleChange = (targetKeys, direction, moveKeys) => {
    //     console.log(targetKeys)  //操作的id
    //     console.log(direction)   //方向
    //     console.log(moveKeys)    //操作后剩下的id
    //     this.setState({
    //         targetKeys: targetKeys
    //     });
    // }

    // 资源穿梭框右侧内容
    // handleChanges = (targetKeyss, direction, moveKeys) => {
    //     console.log(targetKeyss)  //操作的id
    //     console.log(direction)   //方向
    //     console.log(moveKeys)    //操作后剩下的id
    //     this.setState({
    //         targetKeyss: targetKeyss
    //     });
    // }



    // 数据处理
    _setdata(adminlist) {
        let mockTableListData = []
        adminlist.map((role, i) => {
            mockTableListData.push({
                key: i + 1,
                name: role.name,
                description: role.description,
                roleId: role.roleId,
                action:
                    <div>
                        <a href="javascript:;" onClick={this.productAction.bind(this, role, 'edit')} >编辑角色</a>&nbsp;&nbsp;&nbsp;
                        <a href="javascript:;" onClick={this.productAction.bind(this, role, 'del')} >删除角色</a>
                        {/* <Dropdown overlay={
                            <Menu>
                                <Menu.Item>
                                    <a href="javascript:;" onClick={this.productAction.bind(this, role, 'edit')} >编辑角色</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="javascript:;" onClick={this.productAction.bind(this, role, 'del')} >删除角色</a>
                                </Menu.Item>
                            </Menu>
                        }

                        >
                            <a href="javascript:;">角色操作</a>
                        </Dropdown> */}
                        &nbsp;&nbsp;&nbsp;
                        <a href="javascript:;" onClick={this.productAction.bind(this, role, 'bdzy')} >查看角色绑定资源</a>
                        {/* <Dropdown overlay={
                            <Menu>
                                <Menu.Item>
                                    <a href="javascript:;" onClick={this.productAction.bind(this, role, 'bdzy')} >查看角色绑定资源</a>
                                </Menu.Item>
                            </Menu>
                        }

                        >
                            <a href="javascript:;">查看详情</a>
                        </Dropdown> */}
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
            case 'edit':
                this._roleEdit(admin);
                break;
            case 'bd':
                this._productBd(admin);
                break;
            case 'del':
                this.deletRole(admin);
                break;
            case 'bdzy':
                this._bdinfo(admin);
                break;
        }
    };

    // 绑定资源操作
    _bdinfo = (admin) => {
        let params = {
            roleId: admin.roleId
        }
        this.getMock(params)

        this.setState({
            visiblesss: true
        })
        console.log(admin)
        this.setState({
            normalExpandedKeys: admin.resourceIds,
            allParentList: admin.menuIds
        })
    }

    // 绑定角色操作
    // _productBd = (admin) => {
    //     console.log(admin)
    //     let params = {
    //         roleId: admin.roleId
    //     }
    //     this.getMock(params)

    //     this.setState({
    //         roleId: admin.roleId,
    //         visibless: true
    //     })
    // }

    // 添加角色
    addFirst = () => {
        this.setState({
            visible: true
        });
    }

    // 删除角色
    deletRole = (admin) => {
        let _this = this
        confirm({
            title: '提示',
            content: '确认删除该角色吗',
            onOk() {
                let params = {
                    roleId: admin.roleId,
                };
                deleteRole(params, 'POST').then(res => {
                    if (res.data.code === ERR_OK) {
                        message.success(res.data.msg);

                        _this._getRoleList();
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

    // 编辑角色
    _roleEdit = (admin) => {
        this.setState({
            visibles: true,
            roleId: admin.roleId,
            name: admin.name,
            description: admin.description
        });
    }

    // 取消操作
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            visibles: false,
            visibless: false,
            visiblesss: false,
        });
    }

    // 数据绑定
    _editname = (e) => {
        console.log(e.target.value)
        this.setState({
            keyname: e.target.value
        })
    }
    _editdescription = (e) => {
        console.log(e.target.value)
        this.setState({
            description: e.target.value
        })
    }

    // 编辑完毕 确认添加
    handleOk = () => {
        this.setState({
            visible: false,
        });
        let params = {
            name: this.state.keyname,
            description: this.state.description,
        }
        console.log(params)
        this._createRole(params)
    }

    // 确认添加角色
    _createRole(params) {
        console.log('确认编辑信息', params)
        createRole(params, 'POST').then(res => {
            if (res.data.code === ERR_OK) {
                message.success(res.data.msg);
                this._getRoleList();
            } else {
                message.warning(res.data.msg);
            }
        })
    }

    // 确认角色编辑
    handleOks = () => {
        let _this = this
        confirm({
            title: '提示',
            content: '确认当前角色设置吗',
            onOk() {
                let params = {
                    roleId: _this.state.roleId,
                    name: _this.state.keyname,
                    description: _this.state.description
                };
                updateRole(params, 'POST').then(res => {
                    if (res.data.code === ERR_OK) {
                        message.success(res.data.msg);
                        _this.setState({
                            visibles: false
                        })

                        _this._getRoleList();
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

    // 修改角色绑定资源
    handleOksss = () => {
        let _this = this
        confirm({
            title: '提示',
            content: '确认当前角色的资源配置吗',
            onOk() {
                let value = _this.state.newParams
                roleBindResource(value, 'POST').then(res => {
                    if (res.data.code === ERR_OK) {
                        message.success(res.data.msg);
                        _this._getRoleList();
                        // _this.setState({
                        //     visibles: false
                        // })
                    } else {
                        message.warning(res.data.msg);
                    }
                })
            },
            onCancel() {
                console.log('取消设置')
            }
        })
    }

    // 绑定资源选择变更
    onChangeSelect = () => {

    }
    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

    // 数组去重
    uniq(array) {
        if (array.length != 0) {
            var temp = []; //一个新的临时数组
            for (var i = 0; i < array.length; i++) {
                if (temp.indexOf(array[i]) == -1) {
                    temp.push(array[i]);
                }
            }
            return temp;
        } else {
            return array
        }
    }

    // 选中资源
    onChecked = (checkedKeys, info) => {
        // let _this = this
        let mainList = this.uniq(this.state.allParentList)
        let allParentList = mainList

        console.log('当前所有已选中资源id有', checkedKeys.checked);
        // console.log('当前点选的资源id是', checkedKeys.checked[checkedKeys.checked.length-1]);

        // this.setState({ checkedKeys });
        // console.log('当前点选信息', info);
        info.checkedNodes.map((data) => {
            if (data.key == checkedKeys.checked[checkedKeys.checked.length - 1]) {   //调用当前选择元素的信息
                // console.log('当前点选的资源的父级菜单id是', data.props.menuId)   //当前操作元素的父id
                if (allParentList.length == 0) {   //如果菜单id集合为空 直接添加
                    allParentList.push(data.props.menuId)
                    console.log('操作元素的所有父id集合', allParentList)
                    let params = {
                        roleId: this.state.roleId,
                        resourceIds: (checkedKeys.checked).join(','),
                        menuIds: (allParentList).join(',')
                    }

                    this.setState({
                        newParams: params
                    })

                } else {  //如果菜单id集合非空 查询是否重复
                    // let medList = []
                    allParentList.map((ea) => {
                        if (ea != data.props.menuId) {
                            allParentList.push(data.props.menuId)   //如果之前没有这个父id 存入菜单id list
                        }
                    })
                    allParentList = this.uniq(allParentList)
                    console.log('操作元素的所有父id集合', allParentList)
                    let params = {
                        roleId: this.state.roleId,
                        resourceIds: (checkedKeys.checked).join(','),
                        menuIds: (allParentList).join(',')
                    }
                    this.setState({
                        newParams: params,
                        allParentList
                    })
                }
            }
        })
    }

    // 角色绑定资源权限
    // bindRole(value) {

    // }

    render() {
        return (
            <div className="page goods-page">
                <div className="m-t-lg">
                    <Card hoverable={true} className="tableData">
                        <QueueAnim className="demo-content" interval={300}>
                            {this.state.showContent ? [
                                <div className="top-other-btn" style={{ marginBottom: '20px' }} key="a">
                                    <Button type="primary" onClick={this.addFirst}>
                                        添加角色
                                        {/* <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '新建角色'}</Texty> */}
                                    </Button>
                                </div>,
                                <Table
                                    key="b"
                                    bordered
                                    loading={this.state.loadingSearch}
                                    className='pl'
                                    dataSource={this.state.mockTableListData}
                                    columns={this.state.mockTableData}
                                    // rowSelection={rowSelection}
                                    pagination={false}
                                    locale={this.state.tableEmpty}
                                />,
                            ] : null}
                        </QueueAnim>
                        <Modal
                            title="添加角色"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            destroyOnClose={true}
                            className='addRoleModal'
                        >
                            <QueueAnim className="demo-content" interval={200}>
                                {this.state.showContent ? [
                                    <Input size="small" addonBefore='角色名称' style={{ marginBottom: '10px' }} onChange={this._editname} key="1" />,
                                    <Input size="small" addonBefore='备注信息' style={{ marginBottom: '10px' }} onChange={this._editdescription} key="2" />,
                                ] : null}
                            </QueueAnim>
                        </Modal>
                        <Modal
                            title="编辑角色"
                            visible={this.state.visibles}
                            onOk={this.handleOks}
                            onCancel={this.handleCancel}
                            destroyOnClose={true}
                            className='addRoleModal'
                        >
                            <QueueAnim className="demo-content" interval={200}>
                                {this.state.showContent ? [
                                    <Input size="small" defaultValue={this.state.name} addonBefore='角色名称' style={{ marginBottom: '10px' }} onChange={this._editname} key="3" />,
                                    <Input size="small" defaultValue={this.state.description} addonBefore='备注信息' style={{ marginBottom: '10px' }} onChange={this._editdescription} key="4" />,
                                ] : null}
                            </QueueAnim>
                        </Modal>
                        {/* <Modal
                            title="查看角色绑定菜单"
                            visible={this.state.visibless}
                            onOk={this.handleOkss}
                            onCancel={this.handleCancel}
                            destroyOnClose={true}
                        >
                            <Transfer
                                dataSource={this.state.mockData}
                                targetKeys={this.state.targetKeys}
                                titles={['其他菜单', '已有菜单']}
                                onChange={this.handleChange}
                                render={item => item.title}
                            />
                        </Modal> */}
                        <Modal
                            title="查看角色绑定资源"
                            visible={this.state.visiblesss}
                            onOk={this.handleOksss}
                            onCancel={this.handleCancel}
                            destroyOnClose={true}
                            className='editResourceModal'
                        >
                            {/* 穿梭框 */}
                            {/* <Transfer
                                dataSource={this.state.mockDatas}
                                targetKeys={this.state.targetKeyss}
                                titles={['其他资源', '已配资源']}
                                onChange={this.handleChanges}
                                render={item => item.title}
                                showSearch
                            /> */}
                            <Tree
                                checkable
                                blockNode
                                showLine
                                locale={this.state.tableEmpty}
                                autoExpandParent={true}
                                checkStrictly={true}
                                // defaultExpandAll={true}  //默认展开所有树节点
                                // expandedKeys={this.state.expandedKeys}
                                defaultCheckedKeys={this.state.normalExpandedKeys}
                                onCheck={this.onChecked}
                                loadData={this.onLoadData}
                            >
                                {this.renderTreeNodes(this.state.treeData)}
                            </Tree>
                        </Modal>
                    </Card>
                </div>
            </div>
        )
    }
}
