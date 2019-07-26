import React from 'react';
import { Button, Icon, Card, Table, Badge, Menu, Dropdown, message, Radio, Col, Modal, Select, Divider, Input, Upload } from 'antd';
import './index.less';
import './indexq.css';
import { WrappedAdvancedSearchForm } from './AdvancedSearchForm'
import { mockTableData, mocklist } from './typeData'
// import { mockTableListData } from './typeListData'
import { isDate } from 'util';
import { categoryList, categorySave, categoryDelete, setCategoryDisEnabled, fileUpload } from '../../../axios/api';
import { ERR_OK, baseUrl } from "../../../axios/config";
import { stringify } from 'querystring';

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


export default class Gategory extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('商品');
    this.setState({
      mockTableData,
      // mockTableListData
      // mocklist
    })
    let params = {}
    this._getCategoryList(params);
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

    visibleModelAddGoods: false,
    loadingAddGoods: false,
    loadingSearch: false,
    // modal
    visible: false,
    visibles: false,
    visibless: false,
    // upload
    previewVisible: false,
    previewImage: '',
    fileList: [
      // {
      // uid: '-1',
      // name: 'xxx.png',
      // status: 'done',
      // url: '',
      //  }
    ],
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
  };

  expandedRowRenderFile = (record) => {
    let mocklist = []
    record.childList.map((Category, i) => {
      mocklist.push({
        key: i + 1,
        imageURL: <img src={baseUrl + Category.imagePath} style={{ width: '30px', height: '30px' }} />,
        name: Category.name,
        categoryId: Category.categoryId,
        status: Category.status == true ? '启用' : '禁用',
        sort: Category.sort,
        description: Category.description,
        tagNames: Category.tagNames,
        createTime: Category.createTime,
        childList: Category.childList,
        action:
          <div className='recordlist'>
            {/* <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'add')} >添加分类</a> */}
            <Dropdown overlay={
              <Menu>
                <Menu.Item>
                  <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'del')} >删除</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'edit')} >编辑</a>
                </Menu.Item>
              </Menu>
            }>
              <a>操作</a>
            </Dropdown>
          </div>
      })
    })
    console.log(mocklist)
    console.log(record.childList)
    
    // if (mocklist != '') {
    return (
      <Table
        columns={mockTableData}
        dataSource={mocklist}
        pagination={false}
        bordered
        // rowSelection={rowSelection}
        locale={this.state.tableEmpty}
      />
    );
    // }
  };

  onAddGoods = () => {
    window.open('goods/create');
  };

  _getCategoryList(params) {
    this.setState({loadingSearch: true});
    categoryList(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        console.log(res)
        if (res.data.data && res.data.data.length > 0) {
          this.setState({ loadingSearch: false });
          let Categorylist = res.data.data
          // let secondlist = 
          this.setState({
            mockTableListData: res.data.data
          })
          this._setdata(Categorylist)
          // this._setdatas()
        }
      } else {
        this.setState({loadingSearch: false});
        // message.warning('当前操作无数据');
        message.warning(res.data.msg);
      }
    });
  }

  _setdata(Categorylist) {
    let mockTableListData = []
    Categorylist.map((Category, i) => {
      mockTableListData.push({
        key: i + 1,
        imageURL: <img src={baseUrl + Category.imagePath} style={{ width: '30px', height: '30px' }} />,
        name: Category.name,
        categoryId: Category.categoryId,
        status: Category.status == true ? '启用' : '禁用',
        sort: Category.sort,
        description: Category.description,
        tagNames: Category.tagNames,
        createTime: Category.createTime,
        childList: Category.childList,
        action:
          <div className='firstCatelist'>
            <Dropdown overlay={
              <Menu>
                <Menu.Item>
                  <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'add')} >添加二级分类</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'del')} >删除</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'edit')} >编辑</a>
                </Menu.Item>
              </Menu>
            }>
              <Button size='small' icon='bars'>操作</Button>
            </Dropdown>
            {/* <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'open')} style={{ marginLeft: '3px' }}>启用</a> */}
            {/* <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'close')} style={{ marginLeft: '3px' }}>禁用</a> */}
          </div>
      })
    })
    // console.log(mockTableListData.childList)
    this.setState({
      Categorylist,
      mockTableListData,
    })
  }

  // 搜索
  search = (params) => {
    console.log(params);
    this.setState({
      loadingSearch: true,
    });

    setTimeout(() => {
      this.setState({
        loadingSearch: false,
      });
    }, 1000);
  };

  // 分类操作
  productAction(product, type) {
    switch (type) {
      case 'add':
        this._productAdd(product);
        break;
      case 'del':
        this._productDelete(product);
        break;
      case 'edit':
        this._productEdit(product);
        break;
      // case 'open':
      //   this._productOpen(product);
      //   break;
      // case 'close':
      //   this._productClose(product);
      //   break;
    }
  };

  // action 
  // 添加二级分类
  _productAdd(product) {
    console.log('点击元素的分类id', product.categoryId)
    console.log('点击元素父id', product.parentId)
    this.setState({
      parentId: product.categoryId,
      visibles: true,
      fileList: []
    });
  }
  // 编辑分类
  _productEdit(product) {
    console.log(product)
    console.log(baseUrl)
    console.log(product.imagePath)
    
    // console.log(product.parentId)
    let fileList = []
    let data = {
      uid: '-1',
      name: product.imagePath,
      status: 'done',
      url: baseUrl + product.imagePath,
    }
    fileList.push(data)
    console.log(fileList)
    this.setState({
      categoryId: product.categoryId,
      visibless: true,
      fileList: fileList,
      name: product.name,
      description: product.description,
      status: product.status== true ? '启用' : '禁用',
      imagePath: product.imagePath,
      tagNames: product.tagNames,
      parentId: product.parentId,
    });
  }
  // 删除分类
  _productDelete(product) {
    this.setState({
      categoryId: product.categoryId,
      level: product.level,
    });
    let _this = this
    confirm({
      title: '提示',
      content: '确认删除吗',
      onOk() {
        console.log(product)
        let params = {
          categoryId: product.categoryId,
          level: product.level,
        };
        categoryDelete(params, 'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res)
            let params = {}
            _this._getCategoryList(params);
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
  //启用分类
  _productOpen=()=> {
    let _this = this
    if (_this.state.keyCategoryId == '') {
      message.warning('请选择分类')
      return
    } 
    // console.log(_this.keyCategoryId)
    confirm({
      title: '提示',
      content: '确认启用吗',
      onOk() {
        let params = {
          // categoryId: product.categoryId,
          categoryIds: _this.state.keyCategoryId,
          status: true,
        };
        setCategoryDisEnabled(params, 'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res)
            let params = {}
            _this._getCategoryList(params);
          } else {
            message.warning(res.data.msg);
          }
        })
      },
      onCancel() {
        console.log('取消启用')
      }
    })
  }
  //禁用分类
  _productClose=()=> {
    let _this = this
    if (_this.state.keyCategoryId == '') {
      message.warning('请选择分类')
      return
    } 
    confirm({
      title: '提示',
      content: '确认禁用吗',
      onOk() {
        let params = {
          categoryIds: _this.state.keyCategoryId,
          status: false,
        };
        setCategoryDisEnabled(params, 'POST').then(res => {
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res)
            let params = {}
            _this._getCategoryList(params);
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
  // modal
  // 添加一级分类
  addFirst = () => {
    this.setState({
      visible: true,
      fileList: []
    });
  }
  // 确认添加一级分类
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
    let params = {
      // categoryId:'212',
      name: this.state.name,
      description: this.state.description,
      // parentId: this.state.parentId,
      // status: this.state.status,
      status: this.state.status,
      imagePath: this.state.imagePath,
      tagNames: this.state.tagNames
    }
    this._categorySave(params)
  }
  // 确认添加二级分类
  handleOks = (e) => {
    // console.log(e);
    this.setState({
      visibles: false,
    });
    let params = {
      categoryId: '',
      name: this.state.name,
      description: this.state.description,
      parentId: this.state.parentId,
      status: this.state.status,
      imagePath: this.state.imagePath,
      tagNames: this.state.tagNames
    }
    this._categorySave(params)

  }
  // 编辑分类
  handleOkss = (e) => {
    this.setState({
      visibless: false,
    });
    let params = {
      categoryId: this.state.categoryId,
      name: this.state.name,
      description: this.state.description,
      parentId: this.state.parentId,
      status: this.state.status,
      imagePath: this.state.imagePath,
      tagNames: this.state.tagNames
    }
    this._categorySave(params)
  }

  _categorySave(params) {
    console.log(typeof (params))

    categorySave(params, 'POST').then(res => {
      if (res.data.code === ERR_OK) {
        console.log(res)
        // if (res.data.data && res.data.data.length > 0) {
        message.success(res.data.msg);
        let par = {}
        this._getCategoryList(par)
        // }
      } else {
        message.warning(res.data.msg);
      }
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibles: false,
      visibless: false,
    });
  }

  // upload
  uphandleCancel = () => this.setState({ previewVisible: false })
  uphandlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  // uphandleChange = ({ fileList }) => this.setState({ fileList })
  uphandleChange = (fileList, val) => {

    this.setState({
      fileList: fileList.fileList,
    })
    if (fileList.fileList[0]) {
      if (fileList.fileList[0].response) {
        // console.log(fileList.fileList[0].response.imagePath)
        this.setState({
          imagePath: fileList.fileList[0].response.imagePath
        })
      }
    }
  }

  // 添加 编辑
  // 分类名称
  handlename = (e) => {
    console.log(e.target.value)
    this.setState({
      name: e.target.value
    })
  }
  handledescription = (e) => {
    console.log(e.target.value)
    this.setState({
      description: e.target.value
    })
  }
  handleparentId = (e) => {
    console.log(e.target.value)
    this.setState({
      parentId: e.target.value
    })
  }
  handlestatus = (e) => {
    console.log(e.target.value)
    this.setState({
      status: e.target.value
    })
  }
  handletagNames = (e) => {
    console.log(e.target.value)
    this.setState({
      tagNames: e.target.value
    })
  }

  // 选项
  selectChange = (e) => {
    console.log(e)
    this.setState({
      status: e,
    });
  }


  render() {
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
      // 
      // console.log(selectedRows[0])
    };

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="page goods-page category">
        <div className="m-t-lg">
          <Card hoverable={true} className="tableData">
            <div className="top-other-btn" style={{ marginBottom: '20px' }}>
              <Button type="primary" onClick={this.addFirst}>添加一级品牌分类</Button>
              <Button type="primary" onClick={this._productOpen}>启用分类</Button>
              <Button type="primary" onClick={this._productClose}>禁用分类</Button>
            </div>
            <Table
              loading={this.state.loadingSearch}
              className='pl'
              dataSource={this.state.mockTableListData}
              columns={this.state.mockTableData}
              rowSelection={rowSelection}
              locale={this.state.tableEmpty}
              expandedRowRender={record => this.expandedRowRenderFile(record)}
            />
          </Card>
        </div>
        <Modal
          title="添加一级分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          {/* <Input size="small" addonBefore='分类ID' style={{ marginBottom: '10px'}} onChange={this.handledescription}/> */}
          <Input size="small" addonBefore='分类名称' style={{ marginBottom: '10px' }} onChange={this.handlename} />
          <Input size="small" addonBefore='分类描述' style={{ marginBottom: '10px' }} onChange={this.handledescription} />
          {/* <Input size="small" addonBefore='父分类Id' style={{ marginBottom: '10px' }} onChange={this.handleparentId} /> */}
          <Input size="small" addonBefore='分类标签' style={{ marginBottom: '10px' }} onChange={this.handletagNames} />

          {/* <Input size="small" addonBefore='分类状态' style={{ marginBottom: '10px'}} onChange={this.handlestatus}/> */}
          <Select size="" placeholder="启用状态" onChange={this.selectChange} style={{ marginBottom: '10px', width: '100px' }}>
            <Option value="true">启用</Option>
            <Option value="false">禁用</Option>
          </Select>
          <Upload
            action={fileUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.uphandlePreview}
            onChange={this.uphandleChange}
            className='categoryUploada'
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.uphandleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Modal>
        <Modal
          title="添加二级分类"
          visible={this.state.visibles}
          onOk={this.handleOks}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          {/* <Input size="small" addonBefore='分类ID' style={{ marginBottom: '10px'}} onChange={this.handledescription}/> */}
          <Input size="small" addonBefore='分类名称' style={{ marginBottom: '10px' }} onChange={this.handlename} />
          <Input size="small" addonBefore='分类描述' style={{ marginBottom: '10px' }} onChange={this.handledescription} />
          {/* <Input size="small" addonBefore='父分类Id' style={{ marginBottom: '10px' }} onChange={this.handleparentId} /> */}
          <Input size="small" addonBefore='分类标签' style={{ marginBottom: '10px' }} onChange={this.handletagNames} />

          <Select size="" placeholder="启用状态" onChange={this.selectChange} style={{ marginBottom: '10px', width: '100px' }}>
            <Option value="true">启用</Option>
            <Option value="false">禁用</Option>
          </Select>
          <Upload
            action={fileUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.uphandlePreview}
            onChange={this.uphandleChange}
            className='categoryUploadb'
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.uphandleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Modal>
        <Modal
          title="编辑分类"
          visible={this.state.visibless}
          onOk={this.handleOkss}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          {/* <Input size="small" addonBefore='分类ID' style={{ marginBottom: '10px'}} onChange={this.handledescription}/> */}
          <Input size="small" addonBefore='分类名称' style={{ marginBottom: '10px' }} onChange={this.handlename} value={this.state.name} />
          <Input size="small" addonBefore='分类描述' style={{ marginBottom: '10px' }} onChange={this.handledescription} value={this.state.description} />
          {/* <Input size="small" addonBefore='父分类Id' style={{ marginBottom: '10px' }} onChange={this.handleparentId} /> */}
          <Input size="small" addonBefore='分类标签' style={{ marginBottom: '10px' }} onChange={this.handletagNames} value={this.state.tagNames} />

          <Select size="" placeholder="启用状态" onChange={this.selectChange} value={this.state.status} style={{ marginBottom: '10px', width: '100px' }}>
            <Option value="true">启用</Option>
            <Option value="false">禁用</Option>
          </Select>
          <Upload
            action={fileUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.uphandlePreview}
            onChange={this.uphandleChange}
            className='categoryUploadb'
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.uphandleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Modal>
      </div>
    )
  }
}
