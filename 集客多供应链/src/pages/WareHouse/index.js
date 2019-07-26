import React from 'react';
import {Button,Icon,Card,Table,Badge,Menu,Dropdown,message,Radio,Col,Modal,Select,Divider,Input,Upload} from 'antd';
// import reqwest from 'reqwest';
import './index.less';
import './index.css';
import {brandList,warehouseList,saveOrUpdate,warehousedelete} from '../../axios/api';
import {WrappedAdvancedSearchForm} from './AdvancedSearchForm'
// 功能块名称
import {goodsTableColumns} from './staticData';
import { Z_BLOCK } from 'zlib';
import { ERR_OK } from "../../axios/config";
// import { mockTableListData } from './mockData';

const Option = Select.Option;
const confirm = Modal.confirm;
const { Column, ColumnGroup } = Table;

export default class WareHouse extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('商品');

    let params = {
      pageidx: 1,
      pagesize: 5,
    };
    this._getWarehouseList(params);
    this.setState({
      goodsTableColumns,
    })
  }

  state = {
    mockTableListData: [],
    goodsTableColumns: [],
    // 增加排序搜索模块 
    data: [],
    pagination: {},
    loading: false,

    tableEmpty: {
      // 空数据样式
      emptyText: () => <div>
        <Icon type="frown" theme="outlined"/>
        暂无数据
      </div>
    },

    visibleModelAddGoods: false,
    loadingAddGoods: false,
    loadingSearch: false,

    // modal
    visible: false,
    // 仓库操作数据
    name: '',
    productType: '',
    warehouseType: '',
    warehouseId:'',
  };

  // onAddGoods = () => {
  //   window.open('goods/create');
  // };

  // 表单更新
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  _getWarehouseList(params) {
    console.log('params:', params);
    warehouseList(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        console.log(res)
          console.log(res.data)
          // let Categorylist = res.data.data
          // this.setState({
          //   mockTableListData: res.data.data
          // })
          // this._setdata(Categorylist)
        let warehouseList = res.data.data;
        let mockTableListData = []
        warehouseList.map((warehouse, i) => {
          mockTableListData.push({
            key: i + 1,
            warehouseId: warehouse.warehouseId,
            name: warehouse.name,
            warehouseType: warehouse.warehouseType==1?'自营':'他营',
            productType: warehouse.productType=='1'?'国内':(warehouse.productType=='2'?'跨境':'直邮'),
            isPushCustoms: warehouse.isPushCustoms == true?'是':'否',
            isDirectPushErp: warehouse.isDirectPushErp == true?'是':'否',
            createTime: warehouse.createTime,
            updateTime: warehouse.updateTime,
            action:
            <div className='worhouselist'>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item>
                    <a href="javascript:;" onClick={this.productAction.bind(this, warehouse, 'del')} >删除</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a href="javascript:;" onClick={this.productAction.bind(this, warehouse, 'edit')} >编辑</a>
                  </Menu.Item>
                </Menu>
              }>
                <a>操作</a>
              </Dropdown>
            </div>
          })
        })
        this.setState({
          mockTableListData
        });
      }else {
        // message.warning('当前操作无数据');
        message.warning(res.data.msg);
      }
    })
  }

  // 新增仓库
  _saveOrUpdate(params) { 
    let _this = this
    console.log(typeof (params))
    saveOrUpdate(params,'POST').then(res => { 
      if (res.data.code === ERR_OK) {
        console.log(res) 
        message.success(res.data.msg);
        let params = {
          pageidx: 1,
          pagesize: 5,
        };
        _this._getWarehouseList(params);
      } else {
        message.warning(res.data.msg);
      }
    });
  }
  

  // 搜索
  search = (params) => {
    console.log(params);
    this.setState({
      loadingSearch: true,
    });

    setTimeout(()=> {
      this.setState({
        loadingSearch: false,
      });
      this.setState({
        // mockTableListData
      });
    }, 1000);
  };

  // 取消操作
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibles: false,
      // visibless: false,
    });
  }
  
  // 确认添加仓库
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    let params = {
      name: this.state.name,
      productType: this.state.productType,
      warehouseType: this.state.warehouseType,
      warehouseId:'',
    }
    this._saveOrUpdate(params)
  }
  // 确认编辑仓库
  handleOks = (e) => {
    console.log(e);
    this.setState({
      visibles: false,
    });
    let params = {
      name: this.state.name,
      productType: this.state.productType,
      warehouseType: this.state.warehouseType,
      warehouseId:this.state.warehouseId,
    }
    this._saveOrUpdate(params)
  }

  // 仓库操作
  productAction(product, type) {
    switch (type) {
      case 'del':
        this._productDelete(product);
        break;
      case 'edit':
        this._productEdit(product);
        break;
    }
  };

  // 调起删除仓库
  _productDelete(product) {
    let _this = this
    console.log(product)
    confirm({
      title: '提示',
      content: '确认删除该仓库吗',
      onOk() {
        let params = {
          warehouseId: product.warehouseId,
        };
        warehousedelete(params, 'POST').then(res => { 
          if (res.data.code === ERR_OK) { 
            message.success(res.data.msg);
            let params = {
              pageidx: 1,
              pagesize: 5,
            };
            _this._getWarehouseList(params);
          } else {
            message.warning(res.data.msg);
          }
        })
      },
      onCancel() {
        console.log('取消禁用')
      }
    })
  }

  // 调起编辑仓库
  _productEdit(product) {
    console.log(product)
    this.setState({
      visibles: true,
      name: product.name,
      productType: product.productType,
      warehouseType: product.warehouseType,
      warehouseId:product.warehouseId,
    });
  }

  // 调起添加仓库
  addWareHouse=()=> {
    console.log('添加模式启动')
    this.setState({
      visible:true
    });
  }
  addwarename=(e)=> {
    console.log(e.target.value)
    this.setState({
      name: e.target.value
    })
  }
  // cang
  addwaretype=(e)=> {
    console.log(e.target.value)
    this.setState({
      addwareme: e.target.value
    })
  }
  // 仓库属性
  selectChange = (e) => {
    console.log(e)
    this.setState({
      productType: e,
    });
  }
  // 仓库类型
  selectChanges = (e) => {
    console.log(e)
    this.setState({
      warehouseType: e,
    });
  }
  

  
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div className="page goods-page">
        <div className="m-t-lg">
          {/* 列表数据部分 */}
          <Card hoverable={true} className="tableData">
            <div className="top-other-btn">
              {/* <Button type="primary" onClick={this.onAddGoods}>添加商品</Button> */}
              <Button type="primary" onClick={this.addWareHouse} style={{marginBottom:'20px'}}>添加仓库</Button>
              {/* <Button type="primary">编辑仓库</Button> */}
            </div>
            <Table
              dataSource={this.state.mockTableListData}
              columns={this.state.goodsTableColumns}
              locale={this.state.tableEmpty}
              className='worseHouseTable'
            />
          </Card>
        </div>
        <Modal
          title="添加仓库"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Input size="small" addonBefore='仓库名称' style={{ marginBottom: '10px' }} onChange={this.addwarename} />
          <Select size="" placeholder="仓库属性" onChange={this.selectChange} style={{ marginRight: '10px',width:'100px' }}>
            <Option value="1">国内</Option>
            <Option value="2">跨境</Option>
            <Option value="3">直邮</Option>
          </Select>
          <Select size="" placeholder="仓库类型" onChange={this.selectChanges} style={{ marginBottom: '10px' ,width:'100px'}}>
            <Option value="1">自营</Option>
            <Option value="2">他营</Option>
          </Select>
          
        </Modal>
        <Modal
          title="编辑仓库"
          visible={this.state.visibles}
          onOk={this.handleOks}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Input size="small" addonBefore='仓库名称' style={{ marginBottom: '10px' }} onChange={this.addwarename} defaultValue={this.state.name}/>
          <Select size="" placeholder="仓库属性" onChange={this.selectChange} style={{ marginRight: '10px' }} defaultValue={this.state.productType=='1'?'国内':(this.state.productType=='2'?'跨境':'直邮')}>
            <Option value="1">国内</Option>
            <Option value="2">跨境</Option>
            <Option value="3">直邮</Option>
          </Select>
          <Select size="" placeholder="仓库类型" onChange={this.selectChanges} style={{ marginBottom: '10px' }} defaultValue={this.state.warehouseType==1?'1':'2'}>
            <Option value="1">自营</Option>
            <Option value="2">他营</Option>
          </Select>
          
        </Modal>
      </div>
    )
  }
}
