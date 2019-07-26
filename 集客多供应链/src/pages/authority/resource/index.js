import React from 'react';
import { Button, Icon, Card, Table, Badge, Menu, Dropdown, message, Radio, Col, Modal, Select, Divider, Input, Upload, Tree, Popconfirm } from 'antd';
import './index.less';
import './indexq.css';
import { WrappedAdvancedSearchForm } from './AdvancedSearchForm'
import { mockTableData, mockTableDatas, mocklist, goodsTableColumns } from './typeData'
// import { mockTableListData } from './typeListData'
import { isDate } from 'util';
import { CategoryList, createResource, resourceTree, deleteResource, updateResource, menuTree, menuInfo } from '../../../axios/api';
import { ERR_OK, baseUrl } from "../../../axios/config";
import { stringify } from 'querystring';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import 'rc-texty/assets/index.css';
import { promises } from 'fs';
const Option = Select.Option;
const confirm = Modal.confirm;
const { Column, ColumnGroup } = Table;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ', selectedRows);
        let keyid = ''
        for (let i = 0; i < selectedRows.length; i++) {
            if (selectedRows[i].categoryId != '') {
                keyid += selectedRows[i].categoryId + ','
            }
        }
        console.log(keyid)
        this.setState({
            keyCategoryId: keyid
        })
    }
};

const { TreeNode } = Tree;


export default class resource extends React.Component {
    constructor(props) {
        super(props);
    };
    componentDidMount() {
        console.log('资源管理');
        this.setState({
            mockTableData,
            mockTableDatas,
            goodsTableColumns
        })
        // this._getresourceTree()
        // this.showTxt()
        // this.showcontent()
        this.getMenuTree()
    }

    state = {
        tableEmpty: {
            emptyText: () => <div>
                <Icon type="frown" theme="outlined" />
                暂无数据
            </div>
        },
        goodsTableColumns: [],
        mockTableListData: [],  //数据
        expandedKeys: [],  //默认展开的节点
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData: [
            // { title: 'Expand to load', key: '0' },
            // { title: 'Tree Node', key: '2', isLeaf: true },
        ],
        getType: '',
        visible: false,
        newResourceName: '',
        newResourceLink: '',
        newMenuId: '',
        resourceName: '',
        resourceLink: '',
        menuId: '',
        isOpenLeaf: false,
        loadingSearch: false,
        treeNodeInfo: '',
        editresourceId: '',
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

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }

    onSelect = (selectedKeys, info) => {
        this.setState({
            selectedKeys,
            isOpenLeaf: true,
            loadingSearch: true
        });
        console.log(selectedKeys);  //当前操作元素的id

        this.setState({
            newMenuId: selectedKeys[0], //当前操作元素的id
        })
        // console.log(info);
        // console.log(info.selectedNodes[0].props.dataRef.type);
        if (selectedKeys && selectedKeys.length > 0) {
            console.log(info.selectedNodes[0].props);
            this.setState({
                resourceName: info.selectedNodes[0].props.title,
                resourceLink: info.selectedNodes[0].props.linkpath,
                menuId: info.selectedNodes[0].props.menuId
            })
            if (info.selectedNodes[0].props.dataRef.type == 'menu' && info.selectedNodes[0].props.dataRef.isLeafNode == true) {
                // console.log(1111)
                let params = {
                    menuId: selectedKeys[0]
                }
                menuInfo(params, 'GET').then(res => {
                    if (res.data.code === '1') {
                        let childrenlist = []
                        if (res.data.data.resourceList && res.data.data.resourceList.length > 0) {
                            res.data.data.resourceList.map((data, i) => {
                                childrenlist.push({
                                    key: data.resourceId,
                                    resourceId: data.resourceId,
                                    name: data.name,
                                    linkPath: data.linkPath,
                                    action:
                                        <div>
                                            <Button size='small' icon='delete' onClick={this.productAction.bind(this, data, 'delete')} >删除</Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button size='small' icon='edit' onClick={this.productAction.bind(this, data, 'edit')} >编辑</Button>
                                        </div>
                                })
                            })
                            // treeNode.props.dataRef.children = childrenlist
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                            // console.log('节点目录', treeNode.props)
                            // resolve();   
                        } else {
                            let childrenlist = []
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                        }
                    }else {
                        message.warning(res.data.msg)
                        this.setState({
                            loadingSearch: false
                        });
                    }
                })
            } else if (info.selectedNodes[0].props.dataRef.type == 'resource') {
                console.log('resource')
                this.setState({
                    loadingSearch: false
                });
            } else {
                console.log('当前点选是菜单')
                let childrenlist = []
                this.setState({
                    mockTableListData: childrenlist,
                    loadingSearch: false
                });
            }

        }
    }

    getMenuTree = () => {
        menuTree().then(res => {
            console.log(res)
            if (res.data.code === '1' && res.data.data.length > 0) {
                // this.setState({
                //     treeData: res.data.data
                // }, () => {

                // })
                let adminlist = res.data.data
                this._setdata(adminlist)
            }
        })
    }

    _setdata(adminlist) {
        let getData = []
        adminlist.map((data, i) => {
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

    onExpand = () => {
        console.log('Trigger Expand');
    };

    // 载入数据
    onLoadData = treeNode => new Promise((resolve) => {
        // console.log('节点目录', treeNode.props)
        if (treeNode.props.children && treeNode.props.children.length == 0) {  //资源获取节点 根据menuId 获取资源
            // console.log('父id', treeNode.props.dataRef.menuId)
            console.log('叶子节点')

            // let params = {
            //     menuId: treeNode.props.dataRef.menuId
            // }
            // this.setState({
            //     treeNodeInfo: params
            // })
            // menuInfo(params, 'GET').then(res => {
            //     if (res.data.code === '1') {
            //         let childrenlist = []
            //         res.data.data.resourceList.map((data, i) => {
            //             childrenlist.push({
            //                 key: data.resourceId,
            //                 title: data.name,
            //                 isLeaf: true,
            //                 isLeafNode: data.isLeafNode,
            //                 type: data.type,
            //                 linkpath: data.linkPath,
            //                 menuId: data.menuId
            //             })
            //         })
            //         treeNode.props.dataRef.children = childrenlist
            //         this.setState({
            //             treeData: [...this.state.treeData],
            //         });
            //         console.log('节点目录', treeNode.props)
            //         resolve();
            //     }
            // })
            this.setState({
                treeData: [...this.state.treeData],
            });
            resolve();
        } else if (treeNode.props.children && treeNode.props.children.length > 0) { //菜单树节点
            console.log('枝干节点')
            this.setState({
                treeData: [...this.state.treeData],
            });
            resolve();
        } else {
            console.log('资源节点')
            this.setState({
                treeData: [...this.state.treeData],
            });
            resolve();
        }
    })

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.menuId} dataRef={item} isLeaf={item.isLeafNode == true ? true : false}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} dataRef={item} />;
    })

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    // 确认添加新下属资源
    handleOk = (e) => {
        this.setState({
            loadingSearch: true
        })
        let params = {
            name: this.state.newResourceName,
            linkPath: this.state.newResourceLink,
            menuId: this.state.newMenuId
        }
        console.log('接口参数', params)

        createResource(params, 'POSt').then(res => {
            if (res.data.code === '1') {
                message.success('新建下属资源成功')

                let paramss = {
                    menuId: this.state.newMenuId
                }
                menuInfo(params, 'GET').then(res => {
                    if (res.data.code === '1') {
                        let childrenlist = []
                        if (res.data.data.resourceList && res.data.data.resourceList.length > 0) {
                            res.data.data.resourceList.map((data, i) => {
                                childrenlist.push({
                                    key: data.resourceId,
                                    resourceId: data.resourceId,
                                    name: data.name,
                                    linkPath: data.linkPath,
                                    action:
                                        <div>
                                            <Button size='small' icon='delete' onClick={this.productAction.bind(this, data, 'delete')} >删除</Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button size='small' icon='edit' onClick={this.productAction.bind(this, data, 'edit')} >编辑</Button>
                                        </div>
                                })
                            })
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                        }else {
                            let childrenlist = []
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                        }
                    } else {
                        message.warning(res.data.msg)
                        this.setState({
                            loadingSearch: false
                        });
                    }
                })
                this.setState({
                    visibles: false
                })
            } else {
                message.success(res.msg)
            }
        })
        this.setState({
            visible: false,
            visibles: false,
            // selectedKeys: []
        });
    }

    productAction(product, type) {
        switch (type) {
            case 'edit':
                this._productEdit(product);
                break;
            case 'delete':
                this._productDelete(product);
                break;
        }
    };

    // 编辑资源
    _productEdit = (product) => {
        console.log(product)
        this.setState({
            resourceName: product.name,
            resourceLink: product.linkPath,
            menuId: product.menuId,
            editresourceId: product.resourceId  //当前操作的资源id
        })
        this.setState({
            visibles: true
        })
    }
    // 删除资源
    _productDelete = (product) => {
        let that = this
        console.log(product)

        confirm({
            title: '操作提示',
            content: '确定删除此资源?',
            okText: '删除',
            // okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.deleteResource(product)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    deleteResource(product) {
        this.setState({
            loadingSearch: true
        })
        let params = {
            resourceId: product.resourceId
        }
        deleteResource(params, 'POST').then(res => {
            if (res.data.code === '1') {
                message.success('删除成功')
                // 刷新资源
                let params = {
                    menuId: product.menuId
                }
                menuInfo(params, 'GET').then(res => {
                    if (res.data.code === '1') {
                        let childrenlist = []
                        if (res.data.data.resourceList && res.data.data.resourceList.length > 0) {
                            res.data.data.resourceList.map((data, i) => {
                                childrenlist.push({
                                    key: data.resourceId,
                                    resourceId: data.resourceId,
                                    name: data.name,
                                    linkPath: data.linkPath,
                                    action:
                                        <div>
                                            <Button size='small' icon='delete' onClick={this.productAction.bind(this, data, 'delete')} >删除</Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button size='small' icon='edit' onClick={this.productAction.bind(this, data, 'edit')} >编辑</Button>
                                        </div>
                                })
                            })
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                        }else {
                            let childrenlist = []
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                        }
                    } else {
                        message.warning(res.data.msg)
                        this.setState({
                            loadingSearch: false
                        });
                    }
                })
                this.setState({
                    visibless: true
                })
            } else {
                message.warning(res.data.msg)
                this.setState({
                    loadingSearch: false
                });
            }
        })
    }

    // 更新菜单下现有资源
    saveEditResource = (e) => {
        this.setState({
            // mockTableListData: childrenlist,
            loadingSearch: true
        });
        let params = {
            menuId: this.state.menuId,
            resourceId: this.state.editresourceId,
            name: this.state.resourceName,
            linkPath: this.state.resourceLink,
        }
        console.log('接口参数', params)

        updateResource(params, 'POSt').then(res => {
            if (res.data.code === '1') {
                message.success('资源更新成功')

                let paramss = {
                    menuId: this.state.menuId,
                }
                menuInfo(paramss, 'GET').then(res => {
                    if (res.data.code === '1') {
                        let childrenlist = []
                        if (res.data.data.resourceList && res.data.data.resourceList.length > 0) {
                            res.data.data.resourceList.map((data, i) => {
                                childrenlist.push({
                                    key: data.resourceId,
                                    resourceId: data.resourceId,
                                    name: data.name,
                                    linkPath: data.linkPath,
                                    action:
                                        <div>
                                            <Button size='small' icon='delete' onClick={this.productAction.bind(this, data, 'delete')} >删除</Button>
                                            &nbsp;&nbsp;&nbsp;
                                        <Button size='small' icon='edit' onClick={this.productAction.bind(this, data, 'edit')} >编辑</Button>
                                        </div>
                                })
                            })
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                        }else {
                            let childrenlist = []
                            this.setState({
                                mockTableListData: childrenlist,
                                loadingSearch: false
                            });
                        }
                    } else {
                        message.success(res.msg)
                        this.setState({
                            loadingSearch: false
                        });
                    }
                })
            } else {
                message.success(res.msg)
            }
        })
        this.setState({
            visible: false,
            visibles: false,
            // selectedKeys: []
        });
    }


    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            visibles: false,
            // selectedKeys: []
        });
    }

    // 新建资源上下行
    handleNewResourceName = (e) => {
        console.log(e.target.value);
        this.setState({
            newResourceName: e.target.value,
        });
    }
    handleNewResourceLink = (e) => {
        console.log(e.target.value);
        this.setState({
            newResourceLink: e.target.value,
        });
    }

    // 修改资源上下行
    handleEditResourceName = (e) => {
        console.log(e.target.value);
        this.setState({
            resourceName: e.target.value,
        });
    }
    handleEditResourceLink = (e) => {
        console.log(e.target.value);
        this.setState({
            resourceLink: e.target.value,
        });
    }

    // 删除资源方法
    // deleteResource = (e) => {
    //     let params = {
    //         resourceId: this.state.newMenuId
    //     }
    //     deleteResource(params, 'POST').then(res => {
    //         if (res.data.code === '1') {
    //             message.success('资源删除成功')

    //             let paramss = {
    //                 menuId: this.state.menuId,
    //             }
    //             menuInfo(paramss, 'GET').then(res => {
    //                 if (res.data.code === '1') {
    //                     // message.success('获取最新资源树成功')
    //                     console.log(res.data.data.resourceList)
    //                     let childrenlist = []
    //                     res.data.data.resourceList.map((data, i) => {
    //                         childrenlist.push({
    //                             key: data.resourceId,
    //                             title: data.name,
    //                             isLeaf: true,
    //                             isLeafNode: data.isLeafNode,
    //                             type: data.type,
    //                             linkpath: data.linkPath,
    //                             menuId: data.menuId
    //                         })
    //                     })
    //                     console.log(childrenlist)
    //                     // treeNode.props.dataRef.children = childrenlist
    //                     console.log(this.state.treeData)
    //                     let newTreeData = this.state.treeData
    //                     newTreeData.map((data, i) => {
    //                         if (data.menuId == this.state.menuId) {
    //                             data.children = childrenlist
    //                         } else {  //一级菜单目录下查询失败 进行下一级查询
    //                             if (data.children.length > 0) {
    //                                 data.children.map((kata, i) => {
    //                                     if (kata.menuId == this.state.menuId) {
    //                                         kata.children = childrenlist
    //                                     } else {   //二级菜单目录下查询失败 进行下一级查询
    //                                         if (kata.children.length > 0) {
    //                                             kata.children.map((ot, i) => {
    //                                                 if (ot.menuId == this.state.menuId) {
    //                                                     ot.children = childrenlist
    //                                                 }
    //                                             })
    //                                         }
    //                                     }
    //                                 })
    //                             }
    //                         }
    //                     })

    //                     this.setState({      //替换为新增后的资源树数据渲染
    //                         treeData: newTreeData,
    //                         visible: false,
    //                         visibles: false,
    //                     }, () => {
    //                         this.renderTreeNodes(this.state.treeData)
    //                     })
    //                 } else {
    //                     message.success(res.data.msg)
    //                 }
    //             })
    //         } else {
    //             message.warning(res.data.msg)
    //         }
    //     })
    // }


    // 选中资源
    onChecked = (e) => {

    }

    // 新增资源按钮
    addResource = () => {
        this.setState({
            visible: true
        })
    }

    render() {
        return (
            <div className="page goodss-page resourcelist">
                <div className="m-t-lg">
                    <Card hoverable={true} className="tableData">
                        <Tree
                            // checkable
                            blockNode
                            showLine
                            // checkable
                            autoExpandParent={false}
                            // expandedKeys={this.state.expandedKeys}
                            onSelect={this.onSelect}
                            // onCheck={this.onChecked}
                            loadData={this.onLoadData}
                        >
                            {this.renderTreeNodes(this.state.treeData)}
                        </Tree>
                        <Modal
                            title="新增资源"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            {/* <Input size="small" addonBefore='当前菜单' style={{ marginBottom: '10px' }} onChange={this.handlename} /> */}
                            <Input size="small" addonBefore='资源名称' style={{ marginBottom: '10px' }} onChange={this.handleNewResourceName} />
                            <Input size="small" addonBefore='资源链接' style={{ marginBottom: '10px' }} onChange={this.handleNewResourceLink} />
                        </Modal>
                        <Modal
                            title="编辑资源"
                            visible={this.state.visibles}
                            onOk={this.saveEditResource}
                            onCancel={this.handleCancel}
                        >
                            <Input size="small" addonBefore='资源名称' style={{ marginBottom: '10px' }} onChange={this.handleEditResourceName} value={this.state.resourceName} />
                            <Input size="small" addonBefore='资源链接' style={{ marginBottom: '10px' }} onChange={this.handleEditResourceLink} value={this.state.resourceLink} />
                            {/* <Popconfirm
                                title="确定删除该资源吗？"
                                onConfirm={this.deleteResource}
                            >
                                <Button icon="retweet">删除该资源</Button>
                            </Popconfirm> */}

                        </Modal>
                    </Card>
                    {
                        this.state.isOpenLeaf == true ?
                            <Card hoverable={false} className="tableDatas" >
                                <Button icon="search"
                                    type="primary"
                                    onClick={this.addResource}>新建资源</Button>
                                {/* <Button>新建资源</Button> */}
                                <Table
                                    bordered={true}
                                    dataSource={this.state.mockTableListData}
                                    columns={this.state.goodsTableColumns}
                                    locale={this.state.tableEmpty}
                                    // rowSelection={rowSelection}
                                    loading={this.state.loadingSearch}
                                    // pagination={true}
                                    className='resourceListStyle'
                                />
                            </Card>
                            : null
                    }
                </div>
            </div>
        )
    }
}
