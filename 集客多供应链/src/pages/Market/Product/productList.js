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
  Tabs,
  Modal,
  message,
  Cascader,
  Row,
  Col,
  Menu,
  Dropdown,
} from 'antd';
import {Link} from "react-router-dom";
import './index.less';
import {goodsTableColumns, specTitleColumns} from './staticData';
import {marketProductList, deleteProductMarket,updateFxStatusMarket} from '../../../axios/api';
import {baseUrl, ERR_OK} from "../../../axios/config";
import {substring} from "../../../utils/utils";
import SearchComponent from '../../../components/SearchComponent/container/index'
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm
class MarketProductLists extends React.Component {
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
      ],
      goodsTableData: [],
      goodsTableColumns: [],
      specTitleColumns: [],
      loadingSearch: false,
      //默认状态
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
      showIndex: 1,
    };
  };

  componentDidMount() {
    this.setState({
      goodsTableColumns,
      specTitleColumns
    });
    this._getChannelProductList()
    console.log('-------------local',this.props.local)
    if(this.props.local){
      let time = setTimeout(() => {
        this._productEdit(this.props.local.productName,this.props.local.productId)
        clearTimeout(time)
      },100)
    }else{
    
    }
  }
  componentWillReceiveProps(){
    console.log(11111)
    
  }
  // // 搜索
  // _search_getGoodsList = () => {
  //   let filterList = this.state.filters;
  //   console.log(filterList);
  //   let indexTab = this.state.indexTab;
  //   let row = {
  //     key: 'status',
  //     value: indexTab
  //   }
  //   const index = filterList.findIndex(item => 'status' === item.key);
  //   if (index > -1) {
  //     const item = filterList[index];
  //     filterList.splice(index, 1, {
  //       ...item,
  //       ...row,
  //     });
  //   } else {
  //     filterList.push(row);
  //   }
  //
  //   console.log(filterList);
  //   let params = {
  //     filters: JSON.stringify(filterList),
  //     pageidx: this.state.pageidx,
  //     pagesize: this.state.pagesize
  //   };
  //   this._getChannelProductList(params);
  // };
  // 搜索开始
  searchStart = (filters) => {
    this.setState({
      filters,
      pageidx : 1
    },() =>{
      this._getChannelProductList();
    })
    
  };
  _getChannelProductList() {
    let filters = this.state.filters
    filters.forEach(item => {
      if(item.key ==='status'){
        console.log('status---------',this.state.indexTab)  
        item.value = this.state.indexTab
      }
      if(item.key ==='isDelete'){
        item.value = this.state.isDelete
      }
    })
    let params = {
      filters: JSON.stringify(filters),
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize
    };
    this.setState({loadingSearch: true});
    marketProductList(params, 'POST').then(res => {
      this.setState({loadingSearch: false});
      if (res.data.code === ERR_OK) {
        let goodsData = res.data.data || [];
        let goodsCount = res.data.count;
        this._generateTable(goodsData, goodsCount);
      }
    })
  };
  _productEdit(title, productId) {
    this.state.superComponent.stateCallback(substring(title, 10), productId);
  };
  _generateTable(goodsData, dataTotal) {
    let goodsTableData = [];
    goodsData.map((item, i) => {
      goodsTableData.push({
        key: i + 1,
        image: baseUrl + item.image,
        productId: item.productId,
        productName: item.name,
        categoryName: item.categoryName,
        updateTime: item.updateTime,
        status: item.status,
        productSpecList: item.productSpecList,
        action: <div>
            <Button
                    onClick={this._productEdit.bind(this, item.name, item.productId, true)}
                    size='small'
                    style={{marginRight:'12px'}}
            
            ><Icon type="edit" style={{fontSize:'10px'}} />编辑</Button>
          {
            this.state.showIndex == '1'&&
            <Button
                    onClick={this._updateFxStatus.bind(this,'down',item)}
                    size='small'
                    ><Icon type="fall" style={{fontSize:'10px'}} />下架</Button>
          }
          {
            this.state.showIndex == '2'&&
            <Button
              onClick={this._deleteproduct.bind(this,item,'0')}
              size='small'
            ><Icon type="fall" style={{fontSize:'10px'}} />下架</Button>
          }
          {
            this.state.showIndex == '0'&&
            <Dropdown
              overlay={this.getMoreMenu(item)}
              placement="bottomLeft">
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
  getMoreMenu =(item) =>{
    return <Menu>
        <Menu.Item>
          <a type="primary" onClick={this._updateFxStatus.bind(this,'up',item)}><Icon  type='rise' size='small'/>上架</a>
        </Menu.Item>
        <Menu.Item>
        <a type="primary" onClick={this._deleteproduct.bind(this,item,'1')}><Icon type='delete' size='small'/>删除</a>
        </Menu.Item>
      </Menu>
  };
  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    this.setState({
      pageidx: 1,
      pagesize: pageSize
    }, () => {
      this._getChannelProductList()
    });
  };
  // 页码改变
  pageChange = (page, pageSize) => {
    this.setState({
      pageidx: page,
      pagesize: pageSize
    }, () => {
      this._getChannelProductList()
    });
  };

  onChangeTags = (index) => {
    console.log(index)
    this.setState({
      showIndex : index
    })
    
    if(index == '2'){
      this.setState({
        isDelete : '1',
        indexTab : '0',
        pageidx: 1,
        pagesize: 20,
      }, () => {
        this._getChannelProductList()
      });
    }else{
      this.setState({
        indexTab: index,
        isDelete : '0',
        pageidx: 1,
        pagesize: 20,
      }, () => {
        this._getChannelProductList()
      });
    }
   
  };
  onChangeFilters = (name, type, event) => {
    let row = {
      key: name,
      value: (type == 1) ? event : event.target.value
    }

    let filterList = this.state.filters;
    const index = filterList.findIndex(item => name === item.key);
    if (index > -1) {
      const item = filterList[index];
      filterList.splice(index, 1, {
        ...item,
        ...row,
      });
    } else {
      filterList.push(row);
    }

    this.setState({
      filters: filterList
    });
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
  //商品上下架
  _updateFxStatus = (type,item) => {
    let params = {
      productIds : item.productId
    }
    if(type === 'up'){
      params.status = '1'
      
    }else if(type === 'down'){
      params.status = '0'
    }else{
      return
    }
    updateFxStatusMarket(params,'get').then(res => {
      console.log(res)
      if(res.data.code==='1'){
        message.success(res.data.msg)
        this._getChannelProductList()
      }
    }) 
  }
  // 删除商品恢复下架状态
  _updateReStatus= (item) => {
    let params = {
      isDelete: '0',
      productIds : this.state.productIds
    }
    deleteProductMarket(params).then(res => {
      console.log(res)
      if(res.data.code === '1'){
        message.success(res.data.msg)
        this._getChannelProductList()
      }else{
        message.error(res.data.msg)
      }
    })
  
  }
  _updateReStatuslo = (item) => {
    console.log(item)
    let params = {
      isDelete: '0',
      productIds : item.productId
    }
    deleteProductMarket(params).then(res => {
      console.log(res)
      if(res.data.code === '1'){
        message.success(res.data.msg)
        this._getChannelProductList()
      }else{
        message.error(res.data.msg)
      }
    })
  
  }

  //删除商品
  _deleteproduct = (item , type = '1') => {
    let params = {
      productIds : item.productId,
      isDelete : type
    }
    deleteProductMarket(params).then(res => {
      console.log(res)
      if(res.data.code === '1'){
        message.success(res.data.msg)
        this._getChannelProductList()
      }else{
        message.error(res.data.msg)
      }
    })
  
  }
  // 重置状态
  generateSelect = () => {
    this.setState({
      selectedRowKeys :[]
    })
  }
  // 上下架
  _updateFxStatusAll = (type) => {
    let params = {
      status : type ,
      productIds : this.state.productIds
    }
    let _this = this;
    confirm({
      title: '提示',
      content: type == '1' ? '确认上架吗' : '确认下架吗',
      onOk() {
        console.log('ok')
        updateFxStatusMarket(params).then(res => {
          console.log(res)
          if(res.data.code === '1'){
            message.success(res.data.msg)
            _this._getChannelProductList()
            _this. generateSelect()
          }else{
            message.error(res.data.msg)
          }
        })
      }
    })
    
  }
  // 批量删除‘恢复
  _deleteProductAll = (type) =>{
    let params = {
      productIds : this.state.productIds,
      isDelete : type
    }
    let _this = this;
    confirm({
      title: '提示',
      content: type == '1' ? '确认删除吗' : '恢复下架吗',
      onOk() {
        console.log('ok')
        deleteProductMarket(params).then(res => {
          console.log(res)
          if(res.data.code === '1'){
            message.success(res.data.msg)
            _this._getChannelProductList()
            _this.generateSelect()
          }else{
            message.error(res.data.msg)
          }
        })
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
      <Card hoverable={true} className="market-product-body">
        {/*搜索模块*/}
        <SearchComponent submitSearchEnv={this.searchStart} hideAdd={true} />
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
    )
  }
}
export const MarketProductListComponent = Form.create()(MarketProductLists);
