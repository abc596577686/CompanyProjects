import React from 'react';
import {
  Button,
  Icon,
  Card,
  Table,
  Input,
  Select,
  Form,
  Col,
  Modal,
  message,
  Transfer 
} from 'antd';
// import reqwest from 'reqwest';
import './index.less';
import './indexss.css';
import {getPostageTplTree,createPostageTpl,deletePostageTemplate,areaList,saveRegionTplArea,getRegionListByTplId,deletePostageRegion} from '../../axios/api';
import {WrappedAdvancedSearchForm} from './AdvancedSearchForm'
// 功能块名称
import { ERR_OK ,baseUrl} from "../../axios/config";
import {goodsTableColumns, goodslist} from './staticData';
import { Z_BLOCK } from 'zlib';
import { read } from 'fs';
// import { mockTableListData } from './mockData';

const Option = Select.Option;
const FormItem = Form.Item;
const { Column, ColumnGroup } = Table;
const confirm = Modal.confirm;

export default class PostageTpl extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('商品');

    let params = {
      // pageidx: 1,
      // pagesize: 5,
    };
    this._getPostageTplTree(params);
    // this._areaList(params)
    this.setState({
      goodsTableColumns,
    })
    this.getMock();
  }

  state = {
    mockTableListData: [],
    goodsTableColumns: [],
    // 增加排序搜索模块 
    data: [],
    pagination: {},
    loading: false,
    form:[],
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
    ishsow: 'none',
    visible: '',
    // add
    warehouseId: '',
    warehouseName: '',
    name: '',  
    freePostageAmount: '',  
    firstWeigth: '',
    firstPrice: '',
    afterWeigth: '',
    afterPrice: '',

    templateRegionVo:'',
    visibles: false,
    // transfer
    mockData: [],
    targetKeys: '',
    templateId: '',
    areaId: '',
    // quyu data
    quyulistdata:'',
    areaIds:'',
  };

  expandedRowRenderFile = (record) => {
    let mocklist = []
    console.log(record.postageTplList)
    if(record.postageTplList == '' || record.postageTplList == null) return
    record.postageTplList.map((Category, i) => {
      mocklist.push({
        key: i + 1,
        // imageURL: <img src={baseUrl + Category.imagePath} style={{ width: '81px', height: '30px' }} />,
        name:Category.name,
        freePostageAmount: Category.freePostageAmount,
        isDefault: Category.isDefault==1?'默认':'非默认',
        createTime: Category.createTime,
        action:
          <div>
            <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'del')} >删除邮费模板</a>
          </div>,
        edit:
          <div className='postlist'>
            <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'show')} >查看区域</a>  
            <a href="javascript:;" onClick={this.productAction.bind(this, Category, 'addarea')} >新增区域</a>
          </div>
      })
    })
    return (
      <Table
        columns={goodslist}
        dataSource={mocklist}
        pagination={false}
        bordered
        // rowSelection={rowSelection}
        locale={this.state.tableEmpty}
      />
    );
  }

  // 穿梭框数据
  getMock = () => {
    let params = {}
    areaList(params, 'GET').then(res => {
      if (res.data.code ==1 ) {
        const targetKeys = '';
        const mockData = [];
        const arealist = res.data.data
        arealist.map((postage, i) => {
          mockData.push({
            key: postage.key,
            title: postage.value,
            description: `description of content${i + 1}`,
          })
        })
        this.setState({ mockData, targetKeys });
      } else {
        message.warning('区域列表数据获取失败')
      }
    })
   

    
    // for (let i = 0; i < 10; i++) {
    //   const data = {
    //     key: i.toString(),
    //     title: `content${i + 1}`,
    //     description: `description of content${i + 1}`,
    //     chosen: Math.random() * 2 > 1,
    //   };
    //   if (data.chosen) {
    //     targetKeys.push(data.key);
    //   }
    //   mockData.push(data);
    // }

    // let areaList = res.data.data;
    // PostageTplList.map((postage, i) => {
      
      
    // })

    // this.setState({ mockData, targetKeys });
  }
  

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
    console.log(targetKeys)
  }

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

  // 选择框方法
  // handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  // handleBlur() {
  //   console.log('blur');
  // }
  // handleFocus() {
  //   console.log('focus');
  // }
  

  _getPostageTplTree(params) {
    console.log('params:', params);
    // this.setState({ loading: true });

    getPostageTplTree(params, 'GET').then(res => { 
      let PostageTplList = res.data.data;
      let mockTableListData = []
      if (res.data.code === ERR_OK) {
        PostageTplList.map((postage, i) => {
          mockTableListData.push({
            key: i + 1,
            name: postage.name,
            warehouseId: postage.warehouseId,
            postageTplList: postage.postageTplList,
            createTime: postage.createTime,
            productType: postage.productType=='1'?'国内':(postage.productType=='2'?'跨境':'直邮'),
            action:
            <div>
              <a href="javascript:;" onClick={this.productAction.bind(this, postage, 'add')} >添加本仓库邮费模板</a>
            </div>,
          })
        }) 
      } else {
        this.setState({loadingSearch: false});
        // message.warning('当前操作无数据');
        message.warning(res.data.msg);
      }
      
      this.setState({
        mockTableListData
      });
    });
  }

  // _areaList(params) {
  //   console.log('params:', params);
    
  // }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibles: false,
      visibless: false,
      visiblesss: false,
    });
  }

  // 分类操作
  productAction(product, type) {
    switch (type) {
      case 'add':
        this._productAdd(product);
        break;
      case 'del':
        this._productDelete(product);
        break;
      case 'addarea':
        this._productaddarea(product);
        break;
      case 'show':
        this._productshow(product);
        break;
      case 'areaedit':
        this._productareaedit(product);
        break;
      case 'areadel':
        this._productareadel(product);
        break;
    }
  }

  // 调起创建运费模板
  _productAdd = (product) => {
    console.log(product)
    this.setState({
      visible: true,
      warehouseId: product.warehouseId,
      warehouseName: product.name
    });
  }
  // 调起删除运费模板
  _productDelete = (product) => {
    let _this = this
    console.log(product)
    confirm({
      title: '提示',
      content: '确认删除该模板吗',
      onOk() {
        console.log(product)
        let params = {
          templateId: product.postageTplId,
        };
        deletePostageTemplate(params, 'POST').then(res => { 
          if (res.data.code === ERR_OK) {
            message.success(res.data.msg);
            console.log(res) 
            let params = {};
            _this._getPostageTplTree(params);
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
  // 调起新增模板区域
  _productaddarea=(product)=> {
    let _this = this
    console.log(product)
    this.setState({
      templateRegionVo: product.name,
      templateId: product.postageTplId,
      visibles: true,
    });
  }

  // 调起查询模板区域
  _productshow = (product) => {
    let _this = this
    console.log(product)
    this.setState({
      visibless: true,
    });
    let params = {
      templateId: product.postageTplId,
    };
    getRegionListByTplId(params, 'GET').then(res => { 
      if (res.data.code === ERR_OK) {
        console.log(res)

        let areadata = res.data.data;
        let quyulistdata = []
        areadata.map((postage, i) => {
          quyulistdata.push({
            key: i + 1,
            list: postage.areaId,
            templateName: postage.templateName,
            area: postage.area,
            firstWeigth: postage.firstWeigth,
            firstPrice: postage.firstPrice,
            afterWeigth: postage.afterWeigth,
            afterPrice: postage.afterPrice,
            action:
            <div className='grolinlist'>
                <a href="javascript:;" onClick={this.productAction.bind(this, postage, 'areaedit')} >编辑区域</a>
                <a href="javascript:;" onClick={this.productAction.bind(this, postage, 'areadel')} >删除区域</a>
            </div>,
          })
        })
        this.setState({
          quyulistdata
        });
      } else {
        message.warning('模板数据调取失败');
      }
    })
  }

  // 确认添加运费模板
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
    let targetKeys = this.state.targetKeys
    let keys = ""
    for (let i = 0; i < targetKeys.length; i++){
      if (targetKeys[i] != '') {
        keys+=targetKeys[i] + ",";
      }
    }
    console.log(keys)
    let params = {
      warehouseId: this.state.warehouseId,
      warehouseName: this.state.warehouseName,
      name: this.state.name,  
      freePostageAmount: this.state.freePostageAmount,  
      firstWeigth: this.state.firstWeigth,
      firstPrice: this.state.firstPrice,
      afterWeigth: this.state.afterWeigth,
      afterPrice: this.state.afterPrice,
      areaIds: keys
    }
    createPostageTpl(params, 'POST').then(res => { 
      if (res.data.code === ERR_OK) {
        console.log(res) 
        message.success(res.data.msg);
        let params = {};
        this._getPostageTplTree(params);
      } else {
        message.warning(res.data.msg);
      }
    })
  }
  
  // 确认添加模板区域
  handleOks = (e) => {
    // console.log(e);
    this.setState({
      visibles: false,
    });
    let targetKeys = this.state.targetKeys
    let keys = ""
    for (let i = 0; i < targetKeys.length;i++){
      keys+=targetKeys[i] + ",";
    }
    let params = {
      templateId: this.state.templateId,
      areaId: this.state.areaId,
      templateName: this.state.templateRegionVo,
      firstWeigth: this.state.firstWeigth,
      firstPrice: this.state.firstPrice,
      afterWeigth: this.state.afterWeigth,
      afterPrice: this.state.afterPrice,
      areaIds: keys
    }
    console.log('params', params)
    
    saveRegionTplArea(params, 'POST').then(res => { 
      if (res.data.code === ERR_OK) {
        console.log(res) 
        message.success(res.data.msg);
        let params = {};
        this._getPostageTplTree(params);
      } else {
        message.warning(res.data.msg);
      }
    })
  }

  // handleOks = (e) => { 
  //   this.setState({
  //     visibless: false,
  //   });
  // }

  // 模板内编辑区域确认
  handleOksss = (e) => { 
    this.setState({
      visiblesss: false, 
    });
    let targetKeys = this.state.targetKeys 
    console.log(targetKeys)
    // let targetKeysa = JSON.stringify(targetKeys)
    // console.log(targetKeysa)
    // console.log(targetKeys[0]) 
    let keys = ""
    for (let i = 0; i < targetKeys.length;i++){
      keys+=targetKeys[i] + ",";
    }
    console.log(keys)
    let params = {
      templateId: this.state.templateId,
      areaId: this.state.areaId,
      templateName: this.state.templateName,
      firstWeigth: this.state.firstWeigth,
      firstPrice: this.state.firstPrice,
      afterWeigth: this.state.afterWeigth,
      afterPrice: this.state.afterPrice,
      areaIds: keys
    }
    console.log('params', params)
    
    saveRegionTplArea(params, 'POST').then(res => { 
      if (res.data.code === ERR_OK) {
        console.log(res) 
        message.success(res.data.msg);
        let params = {};
        this._getPostageTplTree(params);
      } else {
        message.warning(res.data.msg);
      }
    })
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

  // 添加运费模板操作
  warehouseNamehandle=(e)=> {
    console.log(e.target.value)
    this.setState({
      warehouseName: e.target.value
    })
  }
  namehandle = (e) => {
    console.log(e.target.value)
    this.setState({
      name: e.target.value
    })
  }
  freePostageAmounthandle = (e) => {
    console.log(e.target.value)
    this.setState({
      freePostageAmount: e.target.value
    })
  }
  firstWeigthhandle = (e) => {
    console.log(e.target.value)
    this.setState({
      firstWeigth: e.target.value
    })
  }
  firstPricehandle = (e) => {
    console.log(e.target.value)
    this.setState({
      firstPrice: e.target.value
    })
  }
  afterWeigthhandle = (e) => {
    console.log(e.target.value)
    this.setState({
      afterWeigth: e.target.value
    })
  }
  afterPricehandle = (e) => {
    console.log(e.target.value)
    this.setState({
      afterPrice: e.target.value
    })
  }
  templateNamehandle = (e) => {
    console.log(e.target.value)
    this.setState({
      templateName: e.target.value
    })
  }

  // 模板内区域操作
  _productareaedit = (product) => {
    console.log(product)
    if (product.areaId == 1) {
      message.warning('不可编辑默认运费模板')
      return
    }
    this.setState({
      visiblesss: true,
      templateName: product.templateName,
      firstWeigth: product.firstWeigth,   
      firstPrice: product.firstPrice,
      afterWeigth: product.afterWeigth,
      afterPrice: product.afterPrice,
      targetKeys: product.areaIdList,
      areaId: product.areaId,
      templateId: product.templateId,
    })
    console.log(this.state)
  }

  _productareadel = (product) => {
    // console.log(product)
    let _this = this
    _this.setState({
      templateId: product.templateId,
      areaIds: product.areaIds
    })
    confirm({
      title: '提示',
      content: '确认删除该模板区域吗',
      onOk() {
        console.log(product)
        let params = {
          templateId: _this.state.templateId,
          areaIds: product.areaId
        };
        console.log(params)
        deletePostageRegion(params, 'POST').then(res => { 
          if (res.data.code == 1) {
            message.success(res.data.msg);
            // console.log(res) 
            console.log(product)
            _this.setState({
              visibless: true,
            });
            let params = {
              templateId: product.templateId,
            };
            getRegionListByTplId(params, 'GET').then(res => { 
              if (res.data.code === ERR_OK) {
                console.log(res)

                let areadata = res.data.data;
                let quyulistdata = []
                areadata.map((postage, i) => {
                  quyulistdata.push({
                    key: i + 1,
                    list: postage.areaId,
                    templateName: postage.templateName,
                    area: postage.area,
                    firstWeigth: postage.firstWeigth,
                    firstPrice: postage.firstPrice,
                    afterWeigth: postage.afterWeigth,
                    afterPrice: postage.afterPrice,
                    action:
                    <div className='grolinlist'>
                        <a href="javascript:;" onClick={_this.productAction.bind(_this, postage, 'areaedit')} >编辑区域</a>
                        <a href="javascript:;" onClick={_this.productAction.bind(_this, postage, 'areadel')} >删除区域</a>
                    </div>,
                  })
                })
                _this.setState({
                  quyulistdata
                });
              } else {
                message.warning('模板数据调取失败');
              }
            })
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

  render() {
    // const { getFieldDecorator } = this.props.form;
    const quyulist = [
      {
        title: '序号',
        dataIndex: 'list',
        key: 'col01'
      },
      {
        title: '所属模板',
        dataIndex: 'templateName',
        key: 'col02'
      },
      {
        title: '配送区域',
        dataIndex: 'area',
        key: 'col03'
      },
      {
        title: '首重（kg）',
        dataIndex: 'firstWeigth',
        key: 'col04'
      },
      {
        title: '运费',
        dataIndex: 'firstPrice',
        key: 'col05'
      },
      {
        title: '续重（kg）',
        dataIndex: 'afterWeigth',
        key: 'col06'
      },
      {
        title: '运费',
        dataIndex: 'afterPrice',
        key: 'col07'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'col08'
      },
    ]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      })
    };

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    return (
      <div className="page goods-page">
        <div className="m-t-lg">
          {/* 列表数据部分 */}
          <Card hoverable={true} className="tableData">
            <Table
              dataSource={this.state.mockTableListData}
              columns={this.state.goodsTableColumns}
              locale={this.state.tableEmpty}
              pagination={false}
              expandedRowRender={record => this.expandedRowRenderFile(record)}
              className='postageTplTable'
            />
          </Card>
        </div>
        <Modal
          title="添加运费模板"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Input size="small" addonBefore='所属仓库名称' style={{ marginBottom: '10px' }} defaultValue={this.state.warehouseName} onChange={this.warehouseNamehandle}/>
          <Input size="small" addonBefore='模板名称' style={{ marginBottom: '10px'}} onChange={this.namehandle}/>
          <Input size="small" addonBefore='满包邮价（元）' style={{ marginBottom: '10px' }} onChange={this.freePostageAmounthandle} />
          <Input size="small" addonBefore='首重（kg）' style={{ marginBottom: '10px' }} onChange={this.firstWeigthhandle}/>
          <Input size="small" addonBefore='首重收费（元）' style={{ marginBottom: '10px'}} onChange={this.firstPricehandle}/>
          <Input size="small" addonBefore='续重（kg）' style={{ marginBottom: '10px' }} onChange={this.afterWeigthhandle} />
          <Input size="small" addonBefore='续重收费（元）' style={{ marginBottom: '10px' }} onChange={this.afterPricehandle} />
        </Modal>
        <Modal
          title="新增区域"
          visible={this.state.visibles}
          onOk={this.handleOks}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Input size="small" addonBefore='所属模板' style={{ marginBottom: '10px' }} defaultValue={this.state.templateRegionVo} onChange={this.warehouseNamehandle}/>
          <Input size="small" addonBefore='首重（kg）' style={{ marginBottom: '10px' }} onChange={this.firstWeigthhandle}/>
          <Input size="small" addonBefore='首重收费（元）' style={{ marginBottom: '10px'}} onChange={this.firstPricehandle}/>
          <Input size="small" addonBefore='续重（kg）' style={{ marginBottom: '10px' }} onChange={this.afterWeigthhandle} />
          <Input size="small" addonBefore='续重收费（元）' style={{ marginBottom: '10px' }} onChange={this.afterPricehandle}/>
          {/* 穿梭框 */}
          <Transfer
            dataSource={this.state.mockData}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </Modal>
        <Modal
          title="当前模板区域"
          visible={this.state.visibless}
          onOk={this.handleOkss}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          width={1000}
          className='okl'
        >
          <Table
              dataSource={this.state.quyulistdata}
              columns={quyulist}
              locale={this.state.tableEmpty}
              rowSelection={rowSelection}
              pagination={false}
            />

        </Modal>
        <Modal
          title="编辑配送区域"
          visible={this.state.visiblesss}
          onOk={this.handleOksss}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Input size="small" addonBefore='所属模板' style={{ marginBottom: '10px' }} defaultValue={this.state.templateName} onChange={this.templateNamehandle}/>
          <Input size="small" addonBefore='首重（kg）' style={{ marginBottom: '10px' }} defaultValue={this.state.firstWeigth} onChange={this.firstWeigthhandle}/>
          <Input size="small" addonBefore='首重收费（元）' style={{ marginBottom: '10px'}} defaultValue={this.state.firstPrice} onChange={this.firstPricehandle}/>
          <Input size="small" addonBefore='续重（kg）' style={{ marginBottom: '10px' }} defaultValue={this.state.afterWeigth} onChange={this.afterWeigthhandle} />
          <Input size="small" addonBefore='续重收费（元）' style={{ marginBottom: '10px' }} defaultValue={this.state.afterPrice} onChange={this.afterPricehandle} />
          {/* 穿梭框 */}
          <Transfer
            dataSource={this.state.mockData}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </Modal>
      </div>
    )
  }
}
