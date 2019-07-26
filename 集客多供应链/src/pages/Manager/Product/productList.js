import React from 'react';
import {
  Button,
  Icon,
  Card,
  Table,
  Pagination,
  Form,
  Select,
  Input,
  Menu,
  Dropdown,
  Tabs,
  Modal,
  message,
  Cascader,
  Row,
  Col,
} from 'antd';
import {Link} from "react-router-dom"
import './index.less';
import {goodsTableColumns, specTitleColumns} from './staticData';
import {getGoodsList, productUpdateFxStatus, productDelete} from '../../../axios/api';
import {baseUrl, ERR_OK} from "../../../axios/config";
import {substring} from "../../../utils/utils";
import SearchComponent from '../../../components/SearchComponent/container/index'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const layoutHorizontal = 'horizontal';
const Option = Select.Option
class ProductLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      superComponent: props.superComponent,
      // 默认第几页
      defaultCurrent: 1,
      //页面大小
      pagesize: 20,
      pageidx: 1,
      //数据总条数
      dataTotal: 0,
      //页面大小可选项
      pageSizeOptions: ['40', '60', '80'],

      filters: [
        {
          key : 'status',
          value : '1'
        },
        {
          key : 'isDelete',
          value : '0'
        }
      ]
      ,
      categoryId : null,
      searchTypeId : '1',
      searchValue : '',
      goodsTableData: [],
      goodsTableColumns: [],
      specTitleColumns: [],
      loadingSearch: false,
      //初始状态
      indexTab: 1,
      isDelete : '0',
      tagsOrderStatus: [{
        id: '1',
        label: '已上架'
      },{
        id: '0',
        label: '已下架'
      },{
        id: '2',
        label: '已删除'
      }],
      tableEmpty: {
        emptyText: () => <div>
          <Icon type="frown" theme="outlined"/>
          暂无数据
        </div>
      },
      showIndex:1
    };
  };

  componentDidMount() {
    this.setState({
      goodsTableColumns,
      specTitleColumns
    });
    this._getGoodsList()
  }
  // 搜索开始
  searchStart = (filters) => {
    this.setState({
      filters,
      pageidx : 1
    },() =>{
      this._getGoodsList();
    })
   
  };
  _getGoodsList() {
    let filters = this.state.filters
    filters.forEach(item => {
      if(item.key ==='status'){
        item.value=this.state.indexTab
      }
      if(item.key ==='isDelete'){
        item.value = this.state.isDelete
      }
    })
    let params = {
      filters: JSON.stringify(filters),
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize,
    };
    this.setState({loadingSearch: true});
    getGoodsList(params, 'POST').then(res => {
      this.setState({loadingSearch: false});
      if (res.data.code === ERR_OK) {
        let goodsData = res.data.data || [];
        let goodsCount = res.data.count;
        this._generateTable(goodsData, goodsCount);
      }
    })
  };
  productAction(product, type,del) {
    console.log(product, type);
    switch (type) {
      case 'pickUp':
        this._productPickUp(product);
        break;
      case 'pickDown':
        this._productPickDown(product);
        break;
      case 'delete':
        this._productDelete(product,del);
        break;
    }
  };
  _productPickUp(product) {
    // let _this = this;
    // confirm({
    //   title: '提示',
    //   content: '确认上架吗',
    //   onOk() {
    //     console.log('ok');
        let params = {
          status: 1,
          productIds: product.productId
        };
        this._productUpdateFxStatus(params);
    //   },
    //   onCancel() {
    //     console.log('cancel')
    //   }
    // })
  }
  _productPickDown(product) {
    // let _this = this;
    // confirm({
    //   title: '提示',
    //   content: '确认下架吗',
    //   onOk() {
    //     console.log('ok');
        let params = {
          status: 0,
          productIds: product.productId
        };
        this._productUpdateFxStatus(params);
    //   },
    //   onCancel() {
    //     console.log('cancel')
    //   }
    // })
  }
  _productEdit(title, productId, isEditProduct) {
    this.state.superComponent.stateCallback(substring(title, 10), productId, isEditProduct);
  }
  _productDelete(product,del) {
    // let _this = this;
    // confirm({
    //   title: '提示',
    //   content: '确认删除吗',
    //   onOk() {
    //     console.log('ok')
        let params = {
          isDelete: del,
          productIds: product.productId,
        };
        this._productDeleteAction(params);
      // },
      // onCancel() {
      //   console.log('cancel')
      // }
    // })
  }
  _productUpdateFxStatus(params) {
    productUpdateFxStatus(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        message.success(res.data.msg);
        this._getGoodsList()
      }else{
        message.error(res.data.msg);
        return;
      }
    })
  };
  _productDeleteAction(params) {
    productDelete(params, 'GET').then(res => {
      if(res.data.code === ERR_OK) {
        message.success(res.data.msg);
        this._getGoodsList();
      }else{
        message.error(res.data.msg, 4);
      }
    })
  };
  getMoreMenu =(item) =>{
    return <Menu>
      <Menu.Item>
        <a type="primary" onClick={this.productAction.bind(this,item,'pickUp')} ><Icon  type='rise' size='small'/>上架</a>
      </Menu.Item>
      <Menu.Item>
        <a type="primary"
           onClick={this.productAction.bind(this,item,'delete','1')}
        ><Icon type='delete' size='small'/>删除</a>
      </Menu.Item>
    </Menu>
  };
  _generateTable(goodsData, dataTotal) {
    let goodsTableData = [];
    goodsData.map((item, i) => {
      goodsTableData.push({
        key: i + 1,
        image: baseUrl + item.imagePath,
        productId: item.productId,
        productName: item.productName,
        priceRecommend: item['price'],
        categoryName: item.categoryName,
        updateTime: item.updateTime,
        status: item.status,
        productSpecList: item.productSpecList,
        action: <div>
          <Button  onClick={this._productEdit.bind(this, item.productName, item.productId, true)} size='small' style={{marginRight:'14px'}}><Icon type="edit" style={{fontSize:'10px'}} />编辑</Button>
          {
            this.state.showIndex == 1 &&
            <Button
                    onClick={this.productAction.bind(this, item, 'pickDown')}
                    size='small'
            ><Icon type="fall" style={{fontSize:'10px'}} />下架 </Button>
          }
          {
            this.state.showIndex == '2'&&
            <Button
              onClick={this.productAction.bind(this,item,'delete','0')}
              size='small'
            ><Icon type="fall" style={{fontSize:'10px'}} />下架</Button>
          }
          {
            this.state.showIndex == '0'&&
            <Dropdown
              overlay={this.getMoreMenu(item)}
              placement="bottomCenter"
              // overlayStyle={{width:'62px'}}
              >
              <Button
                size='small'
              ><Icon type="bars" style={{fontSize:'10px'}} />更多</Button>
            </Dropdown>
          }
        </div>
      })
    });

    console.log(goodsTableData);
    this.setState({
      goodsTableData: goodsTableData,
      dataTotal: dataTotal,
      loadingSearch: false,
    })
  };
  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    this.setState({
      pageidx: 1,
      pagesize: pageSize
    }, () =>{
      this._getGoodsList()
    });
  };
  // 页码改变
  pageChange = (page, pageSize) => {
    this.setState({
      pageidx: page,
      pagesize: pageSize
    }, () =>{
      this._getGoodsList()
    });
  };
  onChangeTags = (index) => {
    this.setState({
      showIndex : index
    })
    if(index == '2'){
      this.setState({
        isDelete : '1',
        indexTab : '0',
        pageidx: 1,
        pagesize: 20
      }, () =>{
          this._getGoodsList()
        }
      )
    }else{
      this.setState({
        indexTab: index,
        pageidx: 1,
        pagesize: 20,
        isDelete : '0'
      }, () =>{
        this._getGoodsList()
      });
    }
  };
  expandedRowRenderFile = (record) => {
    return (
      <Table
        bordered
        columns={this.state.specTitleColumns}
        dataSource={record.productSpecList}
        pagination={false}
        rowKey={record => record.productId}
      />
    );
  };
  showTotal = (total) =>{
    return `查询结果共${this.state.dataTotal}条`;
  }
  //上下架
  _updateFxStatusAll = (type) => {
    let _this = this;
    confirm({
      title: '提示',
      content: type=='1'?'确认上架吗':'确认下架吗',
      onOk() {
        console.log('ok');
    let params = {
      status: type,
      productIds: _this.state.productIds
    };
    _this._productUpdateFxStatus(params);
    _this.generateSelect()
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }
  // 批量删除、恢复
  _deleteProductAll = (type) =>{
    let _this = this;
    confirm({
      title: '提示',
      content: type=='1'?'确认删除吗':'恢复下架吗',
      onOk() {
        console.log('ok')
    let params = {
      isDelete: type,
      productIds: _this.state.productIds,
    };
    _this._productDeleteAction(params);
    _this.generateSelect()
    },
    onCancel() {
      console.log('cancel')
    }
    })
  }
  //选项改变
  selectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    let productIds =  selectedRows.map(item => {
      return item.productId
    })
    productIds = productIds.join()
    console.log('-----------',productIds)
    this.setState({
      productIds,
      selectedRowKeys
    })
  }
  // 重置状态
  generateSelect = () => {
    this.setState({
      selectedRowKeys :[]
    })
  }
 
  render() {
    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 14},
    };
    const rowSelection = {
      selectedRowKeys:this.state.selectedRowKeys,
      onChange: this.selectChange,
    };
    return (
      <div className="manager-product-list">
        <Card hoverable={true}>
          {/*搜索模块*/}
          <SearchComponent submitSearchEnv={this.searchStart}
                           _productAdd = {this._productEdit.bind(this, '添加商品', 'newProduct', false)} />
          <Tabs onChange={this.onChangeTags}>
            {
              this.state.tagsOrderStatus.map((tag, i) =>
                <TabPane tab={tag.label} key={tag.id}/>
              )
            }
          </Tabs>
          <div>
            {this.state.showIndex == 0  ?
              <Button icon="rise" className="goods-button" onClick={this._updateFxStatusAll.bind(this, '1')}>上架</Button>
              : null
            }
            {this.state.showIndex == 1 ?
              <Button icon="fall" className="goods-button" onClick={this._updateFxStatusAll.bind(this, '0')}>下架</Button>
              : null
            }
            {this.state.showIndex == 0 ?
              <Button icon="delete" className="goods-button" onClick={this._deleteProductAll.bind(this,'1')}>删除</Button>
              : null
            }
            {
              this.state.showIndex=='2'&&
              <Button icon="fall" className="goods-button" onClick={this._deleteProductAll.bind(this, '0')}>下架</Button>
      
            }
          </div>
          <Table
              loading={this.state.loadingSearch}
              dataSource={this.state.goodsTableData}
              columns={this.state.goodsTableColumns}
              locale={this.state.tableEmpty}
              pagination={false}
              rowSelection={rowSelection}
              expandedRowRender={record=>this.expandedRowRenderFile(record)}
            />
          <Pagination
            showTotal={this.showTotal}
            defaultCurrent={this.state.defaultCurrent}
            current={this.state.pageidx}
            pageSize={this.state.pagesize}
            total={this.state.dataTotal}
            showSizeChanger={true}
            showQuickJumper={true}
            pageSizeOptions={this.state.pageSizeOptions}
            onShowSizeChange={this.pageSizeChange}
            onChange={this.pageChange}/>
        </Card>
      </div>
    )
  }
}
export const ProductListComponent = Form.create()(ProductLists);
