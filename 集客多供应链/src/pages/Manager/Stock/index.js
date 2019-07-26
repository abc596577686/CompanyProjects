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
  Popconfirm,
  Row,
  Col,
  Menu,
  Checkbox,
  Dropdown
} from 'antd';
import {Link} from "react-router-dom";
import './index.less';
import {goodsTableColumns, specTitleColumns} from './staticData';
import {
  getProductStockList,
  getChannelList,
  getProductStockById,
  getSearchProductList,
  updateProductStock,
  deleteProductStock
} from '../../../axios/api';
import {ERR_OK} from "../../../axios/config";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const confirm = Modal.confirm;
const layoutHorizontal = 'horizontal';
const EditableContext = React.createContext();
const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  constructor(props) {
    super(props);
  };

  getInput = () => {
    return <Input/>;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      record,
      ...restProps
    } = this.props;

    return (
      <EditableContext.Consumer>
        {(form) => {
          const {getFieldDecorator} = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{margin: 0}}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入 ${title}!`,
                    }, {
                      pattern: new RegExp('^[0-9]*$', 'g'),
                      message: '请输入数字类型'
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    )
  }
};
class StockSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.searchColumns = [{
      title: '序号',
      dataIndex: 'productId',
      key: 'productId',
      width: '15%'
    }, {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: '70%',
      render : (text,record) => {
        return(
          <div style={{textAlign:'left'}}>
            {record.productName}
          </div>
        )
      }
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      render: (text, record) => {
        const editable = this._search_isEditing(record);
        return (<div>{editable ? <a onClick={this._search_productConfirm.bind(this, record)}>选择</a> : ''}</div>);
      }
    }];
    this.state = {
      defaultCurrent: 1,
      pageidx: 1,
      pagesize: 5,
      dataTotal: 0,
      searchTypeId: 1,
      searchValue: '',
      editingKey: '',
      productDataList: [],
      modalPopoverVisible: false,
      productListLoading: false,
      curSelectProductName: props.superComponent.state.curSelectProductName,
      superComponent: props.superComponent,
      tableEmpty: {
        emptyText: () => <div>
          <Icon type="frown" theme="outlined"/>
          暂无数据
        </div>
      }
    }
  }

  _search_getProductList(params) {
    this.setState({productListLoading: true});
    getSearchProductList(params, 'GET').then(res => {
      this.setState({
        productListLoading: false,
        productDataList: [],
        dataTotal: 0
      });

      if (res.data.code === ERR_OK) {
        let productCount = res.data.count;
        let productDataList = res.data.data;
        if (productDataList != null && productDataList.length > 0) {
          productDataList.map((item, i) => {
            item['key'] = i + 1;
          });
        }
        this.setState({productDataList, dataTotal: productCount});
      }
    })
  }

  _search_setModalPopoverVisible = (visible) => {
    this.setState({modalPopoverVisible: visible});
  }

  // 页码改变
  _search_pageChange = (page) => {
    this.setState({
      pageidx: page,
    });

    let searchTypeId = this.state.searchTypeId;
    let searchValue = this.state.searchValue;
    let params = {
      searchTypeId: searchTypeId,
      searchValue: searchValue,
      pageidx: page,
      pagesize: this.state.pagesize
    };
    this._search_getProductList(params);
  };

  _search_queryProductList = () => {
    let searchTypeId = this.state.searchTypeId;
    let searchValue = this.state.searchValue;
    if (searchValue == null || searchValue.length <= 0) {
      message.warn('请输入搜索关键查询', 3)
      return;
    }

    let pageidx = 0;
    this.setState({
      pageidx: pageidx,
    });

    let params = {
      searchTypeId: searchTypeId,
      searchValue: searchValue,
      pageidx: pageidx,
      pagesize: this.state.pagesize
    };
    this._search_getProductList(params);
  }

  _search_onChangeSearch = (name, event) => {
    if (name == 'typeId') {
      this.setState({searchTypeId: event});
    } else if (name == 'name') {
      this.setState({searchValue: event.target.value});
    }
  }

  _search_isEditing = (record) => {
    return record.productId === this.state.editingKey;
  };

  _search_productConfirm = (record) => {
    this.state.superComponent.selectProductConfirm(record.productId, record.productName);
    this.setState({curSelectProductName: record.productName});
    this._search_setModalPopoverVisible(false);
  };

  render() {
    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 14},
    };

    const addProductSpec = (
      <Menu className="ant-select-product-modal">
        <Row>
          <Col span={5}>
            <FormItem>
              <Select
                showSearch
                defaultValue={'1'}
                onChange={this._search_onChangeSearch.bind(this, 'typeId')}>
                <Option value='1' key={1}>商品名称</Option>
                <Option value='2' key={2}>商品货号</Option>
                <Option value='3' key={3}>商品条码</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              <Input onChange={this._search_onChangeSearch.bind(this, 'name')}/>
            </FormItem>
          </Col>
          <Col span={4} style={{paddingLeft: '15px'}}>
            <FormItem>
              <Button 
                icon="search"
                type="primary"
                loading={this.state.loadingSearch}
                onClick={this._search_queryProductList.bind(this)}>查询</Button>
            </FormItem>
          </Col>
          <Col span={4} style={{paddingLeft: '15px'}}>
            <FormItem>
              <Button icon="close"
                      onClick={this._search_setModalPopoverVisible.bind(this, false)}>取消</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Table
            className="anttable"
            loading={this.state.productListLoading}
            dataSource={this.state.productDataList}
            columns={this.searchColumns}
            locale={this.state.tableEmpty}
            pagination={false}
            style={{padding: '10px'}}
            onRow={(record) => {
              return {
                onMouseEnter: () => {
                  this.setState({editingKey: record.productId});
                }
              };
            }}/>
          <Pagination
            showQuickJumper
            defaultCurrent={this.state.pageidx}
            total={this.state.dataTotal}
            onChange={this._search_pageChange}/>
        </Row>
      </Menu>
    )

    return (
      <Dropdown disabled={this.state.superComponent.state.isEditProductStock} overlay={addProductSpec}
                visible={this.state.modalPopoverVisible} placement="bottomLeft">
        <Input
          readOnly
          placeholder="请选择商品"
          suffix={<Icon type="down"/>}
          defaultValue={this.state.curSelectProductName}
          onClick={this._search_setModalPopoverVisible.bind(this, true)}/>
      </Dropdown>
    );
  }
}
export default class Stock extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    filters: [{
      key : 'typeId',
      value : '1'
    }],
    channelList: [],
    goodsTableColumns: [],
    // specTitleColumns: [],
    productTableLoading: false,
    defaultCurrent: 1,
    pageidx: 1,
    pagesize: 20,
    dataTotal: 0,
    pageSizeOptions: ['40', '60', '80'],
    loadingSearch: false,
    isEditProductStock: false,
    curSelectChannelId: null,
    curSelectProductId: null,
    curSelectProductName: null,
    productTableData: null,
    modalVisible: false,
    isViewStockList: false,
    modalStockListVisible: false,
    tableEmpty: {
      emptyText: () => <div>
        <Icon type="frown" theme="outlined"/>
        暂无数据
      </div>
    },
    specTitleColumns : [
      {
        title: '序号',
        dataIndex: 'productSpecId',
        key: 'productSpecId',
        width: '7%'
      },
      {
        title: '商品条码',
        dataIndex: 'productUpc',
        key: 'productUpc',
        width: '13%'
      },
      {
        title: '商品货号',
        dataIndex: 'productCode',
        key: 'productCode',
        width: '13%'
      },
      {
        title: '规格类型',
        dataIndex: 'productTags',
        key: 'productTags',
        width: '12%'
      },
      {
        title: '总量库存',
        dataIndex: 'totalStockNumber',
        key: 'totalStockNumber',
        width: '9%'
      },
      {
        title: '可用库存',
        dataIndex: 'availableStockNumber',
        key: 'availableStockNumber',
        width: '9%'
      },
      {
        title: '独享',
        className: "stock-cloumn-share",
        dataIndex: 'isExclusive',
        key: 'isExclusive',
        width: '7%',
        render: (text, record) => {
          return (text==1?<Icon type="check-square" theme="twoTone" style={{fontSize:'20px'}}/>:<Icon type="close-square" style={{fontSize:'20px'}}/>)
        }
      },
      {
        title: '渠道库存',
        dataIndex: 'channelStockNumber',
        key: 'channelStockNumber',
        width: '9%'
      },
      {
        title: '渠道销量',
        dataIndex: 'saleNumber',
        key: 'saleNumber',
        width: '9%'
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '9%',
        render : (text,record) => {
          console.log('11111111111111111',this,record)
          return(
            <Popconfirm
              title="是否确定删除?"
              onConfirm={() => this.delSpec(record)}>
              <Button icon='delete' size='small'>删除</Button>
            </Popconfirm>
          )
        
        }
      },
    ]
  };

  // 搜索
  searchProductStock = () => {
    this.setState({loadingSearch: true});
    console.log(this.state.filters);
    let params = {
      filters: JSON.stringify(this.state.filters),
      pageidx: this.state.pageidx,
      pagesize: this.state.pagesize
    };
    this._getProductStockList(params);
  };

  componentDidMount() {
    let params = {
      filters: [],
      pageidx: 1,
      pagesize: this.state.pagesize,
    };
    this._getProductStockList(params);
    this._getChannelList();

    this.setState({
      goodsTableColumns,
      // specTitleColumns
    });
  }

  // 商品渠道店铺
  _getChannelList() {
    getChannelList({}, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        let chList = res.data.data;
        if (chList != null && chList.length > 0) {
          let optionsChannel = [];
          chList.map((item, i) => {
            let channel = {
              value: item.channelId,
              label: item.name
            };
            optionsChannel.push(channel);
          });

          this.setState({
            channelList: optionsChannel
          });
        }
      }
    });
  };

  _getProductStockList(params) {
    this.setState({loadingSearch: true});
    getProductStockList(params, 'POST').then(res => {
      this.setState({loadingSearch: false});

      if (res.data.code === ERR_OK) {
        let productStockList = this._generateStockData(res.data.data);
        this.setState({
          productTableData: productStockList,
          dataTotal: res.data.count,
        })
      }
    })
  };

  _generateStockData(data) {
    if (!data || !data.length) return [];
    data.map((item, i) => {
      item['key'] = item.productId;
      item['action'] = <div><Button size='small' icon='edit' onClick={this.editorProductStock.bind(this, item)}>编辑</Button></div>;
    });
    return data;
  };

  addProductStock = () => {
    this.setState({
      modalVisible: true,
      isEditProductStock: false,
      curSelectChannelId: null,
      curSelectProductId: null,
      curSelectProductName: null
    })
  };

  viewStockList = () => {
    this.setState({
      modalStockListVisible: true,
      isViewStockList: true
    })
  };

  editorProductStock = (record) => {
    this.setState({
      modalVisible: true,
      isEditProductStock: true,
      curSelectChannelId: record.channelId,
      curSelectProductId: record.productId,
      curSelectProductName: record.name
    })
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
  //删除投放
  delSpec = (record) => {
    console.log(record)
    let params = {
      channelId : record.channelId,
      productId : record.productId,
      productSpecId : record.productSpecId
    }
    deleteProductStock(params,'post').then(res => {
      if(res.data.code==='1'){
        message.success(res.data.msg)
        let params = {
          filters: [],
          pageidx: 1,
          pagesize: this.state.pagesize,
        };
        this._getProductStockList(params);
      }else{
        message.error(res.data.msg)
      }
    })
    
  }

  expandedRowRenderFile = (record) => {
    return (
      <Table
        bordered
        columns={this.state.specTitleColumns}
        dataSource={record.childrenStockList}
        pagination={false}
        rowKey={record => record.stockId}
      />
    );
  };
  pageChange = (e) => {
    let pageidx = e
    this.setState({
      pageidx
    })
    let params = {
      filters: JSON.stringify(this.state.filters),
      pageidx,
      pagesize: this.state.pagesize
    };
    this._getProductStockList(params);
    
  }
  pageSizeChange = (e,cur) => {
    console.log(e,cur)
    let pagesize = cur
    this.setState({
      pagesize
    })
    let params = {
      filters: JSON.stringify(this.state.filters),
      pagesize,
      pageidx: this.state.pageidx
    };
    this._getProductStockList(params);
  
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 18},
    };
    class StockModal extends React.Component {
      constructor(props) {
        super(props);
        let curSelectChannelId = null;
        let curSelectProductId = null;
        let curSelectProductName = null;
        let isEditProductStock = props.superComponent.state.isEditProductStock;
        if (isEditProductStock) {
          curSelectChannelId = props.superComponent.state.curSelectChannelId;
          curSelectProductId = props.superComponent.state.curSelectProductId;
          curSelectProductName = props.superComponent.state.curSelectProductName;
        }

        this.state = {
          editingKey: '',
          productStockList: [],
          modalPopoverVisible: false,
          productListLoading: false,
          isProductSpecEidtStatus: false,
          isEditProductStock: isEditProductStock,
          curSelectChannelId: curSelectChannelId,
          curSelectProductId: curSelectProductId,
          curSelectProductName: curSelectProductName,
          superComponent: props.superComponent,
          columns: [{
            title: '序号',
            dataIndex: 'productSpecId',
            key: 'productSpecId',
            editable: false,
            width: '8%'
          },
            {
              title: '商品货号',
              dataIndex: 'productCode',
              key: 'productCode',
              editable: false,
              width: '16%'
            },
            {
              title: '规格类型',
              dataIndex: 'productTags',
              key: 'productTags',
              editable: false,
              width: '16%'
            },
            {
              title: '总量库存',
              dataIndex: 'totalStockNumber',
              key: 'totalStockNumber',
              editable: false,
              width: '12%'
            },
            {
              title: '可用库存',
              dataIndex: 'availableStockNumber',
              key: 'availableStockNumber',
              editable: false,
              width: '12%'
            },
            {
              title: '独享',
              className: "stock-cloumn-share",
              dataIndex: 'isExclusive',
              key: 'isExclusive',
              editable: false,
              width: '8%',
              render: (text, record) => {
                return (<Checkbox defaultChecked={record.isExclusive} onChange={this.onChangeExclusive.bind(this, record)}/>);
              }
            },
            {
              title: '渠道库存',
              dataIndex: 'channeStockNumber',
              key: 'channeStockNumber',
              editable: true,
              width: '12%'
            },
            {
              title: '操作',
              dataIndex: 'action',
              key: 'action',
              width: '14%',
              render: (text, record) => {
                const showEdit = this.isShowEdit(record);
                const editable = this.isEditing(record);
                return (
                  <div>
                  {!showEdit ? '' : (editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record)}
                          style={{marginRight: 8}}
                        >保存</a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm
                      title="是否确定取消?"
                      onConfirm={() => this.cancel(record.key)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                  ):(
                      <Button size='small' icon='edit' onClick={() => this.edit(record.key)}>编辑</Button>
                  ))
                  }
                  </div>
                );
              }
            }]
        }

        // 编辑投放自动加载投放规格信息
        if (isEditProductStock) {
          this._getProductStockList();
        }
      }

      isShowEdit = (record) => {
        return (record.isExclusive != null && record.isExclusive == true);
      };
      
      onChangeExclusive(record, event) {
        let key = record.key;
        const productStockList = [...this.state.productStockList];
        const index = productStockList.findIndex(item => key === item.key);
        if (index > -1) {
          const item = productStockList[index];
          item.isExclusive = event.target.checked;

          // 关闭已编辑状态的文本框
          if(event.target.checked){
            item.channeStockNumber = 0;
            this.edit(key);
          }else{
            item.channeStockNumber = item.availableStockNumber;
            this.cancel();
          }
          this.setState({productStockList: productStockList});
        }
      };

      isEditing = (record) => {
        return record.key === this.state.editingKey;
      };

      edit(key) {
        this.setState({editingKey: key, isProductSpecEidtStatus: true});
      }

      save(form, record) {
        let key = record.key;
        form.validateFields((error, row) => {
          if (error) {
            return;
          } else if (record.availableStockNumber < row.channeStockNumber) {
            message.warn('渠道库存不能大于可用库存数量', 5);
            return;
          }

          const productStockList = [...this.state.productStockList];
          const index = productStockList.findIndex(item => key === item.key);
          if (index > -1) {
            const item = productStockList[index];
            productStockList.splice(index, 1, {
              ...item,
              ...row,
            });
            this.setState({productStockList: productStockList, editingKey: '', isProductSpecEidtStatus: false});
          } else {
            productStockList.push(row);
            this.setState({productStockList: productStockList, editingKey: '', isProductSpecEidtStatus: false});
          }
        });
      }

      cancel = () => {
        this.setState({editingKey: ''});
      };

      handleOkForProductSearch = (e) => {
        let curSelectChannelId = this.state.curSelectChannelId;
        let curSelectProductId = this.state.curSelectProductId;
        let productStockList = this.state.productStockList;
        let isProductSpecEidtStatus = this.state.isProductSpecEidtStatus;
        if (isProductSpecEidtStatus) {
          message.warn('编辑状态不能保存', 5);
          return;
        } else if (curSelectProductId == null || Number(curSelectProductId) <= 0) {
          message.warn('请选择有效商品信息', 5);
          return;
        } else if (curSelectChannelId == null || Number(curSelectChannelId) <= 0) {
          message.warn('请选择有效渠道信息', 5);
          return;
        } else if (productStockList == null || productStockList.length <= 0) {
          message.warn('投放商品规格信息不能为空', 5);
          return;
        }

        let superComponent = this.state.superComponent;
        let params = {
          channelId: Number(this.state.curSelectChannelId),
          productId: Number(this.state.curSelectProductId),
          productStockList: JSON.stringify(this.state.productStockList)
        };

        confirm({
          title: '商品投放',
          content: '请您确认是否投放商品保存操作?',
          onOk() {
            updateProductStock(params, 'POST').then(res => {
              if (res.data.code === ERR_OK) {
                superComponent.setState({modalVisible: false});
                message.success(res.data.msg);
              } else {
                message.error(res.data.msg, 5);
              }
            });
          }
        });
      };

      handleCancelProductSearch = (e) => {
        this.state.superComponent.setState({modalVisible: false});
      };

      selectProductConfirm(productId, productName) {
        this.setState({
          curSelectProductId: productId,
          curSelectProductName: productName
        }, this._getProductStockList);
      };

      selectChannelConfirm = (value) => {
        this.setState({
          curSelectChannelId: value
        }, this._getProductStockList);
      };

      _getProductStockList() {
        let curSelectProductId = this.state.curSelectProductId;
        let curSelectChannelId = this.state.curSelectChannelId
        if (curSelectProductId != null
          && Number(curSelectProductId) > 0
          && curSelectChannelId != null
          && Number(curSelectChannelId) > 0) {
          let params = {
            productId: curSelectProductId,
            channelId: curSelectChannelId
          }

          getProductStockById(params, 'GET').then(res => {
            if (res.data.code === ERR_OK) {
              let productStockList = res.data.data;
              if (productStockList != null && productStockList.length > 0) {
                productStockList.map((spec, i) => {
                  spec['key'] = i + 1;
                });
              }

              this.setState({
                productStockList: productStockList
              });
            }
          })
        }
      };
      // 翻页
      pageChange = (e) => {
        console.log('------------',e)

      }
      pageSizeChange = (e) => {
        console.log('---------',e)
      }

      render() {
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };

        const getHeaderColumns = this.state.columns.map((col) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: record => ({
              record,
              inputType: 'number',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: this.isEditing(record),
            }),
          };
        });

        return (
          <Modal
            className="productTFModal"
            title="商品投放"
            visible={this.state.superComponent.state.modalVisible}
            onOk={this.handleOkForProductSearch}
            onCancel={this.handleCancelProductSearch}
            confirmLoading={false}
            okText="确定">
            <Form layout={layoutHorizontal} className="productTFModal">
              <Row>
                <Col span={24}>
                  <FormItem
                    label="商品"
                    {...formItemLayout}>
                    <StockSelectModal superComponent={this}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem
                    label="渠道"
                    {...formItemLayout}>
                    <Select
                      showSearch
                      placeholder="请选择"
                      defaultValue={this.state.curSelectChannelId}
                      disabled={this.state.isEditProductStock}
                      onChange={this.selectChannelConfirm}
                      filterOption={
                        (input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {
                        this.state.superComponent.state.channelList.map((channel, i) =>
                          <Option value={channel.value} key={i}>{channel.label}</Option>
                        )
                      }
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Table
              bordered
              className="anttable"
              components={components}
              pagination={false}
              columns={getHeaderColumns}
              dataSource={this.state.productStockList}
              rowClassName="editable-row"/>
          </Modal>
        );
      }
    }
    
    const formSearchLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };

    const formSelectSearchLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    return (
      <div className="manager-stock">
        <div className="m-t-lg">
          <Card hoverable={true} className="tableData">
            <Form layout={layoutHorizontal}>
              <Row>
                <Col span={6}>
                  <FormItem
                    label="渠道"
                    {...formSearchLayout}>
                    <Select
                      showSearch
                      placeholder="请选择"
                      onChange={this.onChangeFilters.bind(this, 'channelId', 1)}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      <Option key={-1} width={100}>全部渠道</Option>
                      {
                        this.state.channelList.map((channel, i) =>
                          <Option value={channel.value} key={i} width={100}>{channel.label}</Option>
                        )
                      }
                    </Select>
                  </FormItem>
                </Col>
                <Col span={10} className="stork-select-keyword">
                  <Row>
                    <Col span={10}>
                      <FormItem
                        label='关键字'
                        {...formSelectSearchLayout}>
                        <Select
                          showSearch
                          placeholder="请选择"
                          style={{width:'90%'}}
                          defaultValue={'商品名称'}
                          onChange={this.onChangeFilters.bind(this, 'typeId', 1)}>
                          <Option value='1' key={1}>商品名称</Option>
                          <Option value='2' key={2}>商品货号</Option>
                          <Option value='3' key={3}>商品条码</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={13}>
                      <FormItem>
                        <Input onChange={this.onChangeFilters.bind(this, 'name', 0)}/>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
                <Col span={3} className="stork-search">
                  <FormItem>
                    <Button
                      icon="search"
                      type="primary"
                      onClick={this.searchProductStock}>查询</Button>
                  </FormItem>
                </Col>
                <Col span={3}>
                  <FormItem>
                    <Button type="primary" ghost icon="cluster" onClick={this.addProductStock}>投放</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Table
              className="anttable"
              loading={this.state.loadingSearch}
              dataSource={this.state.productTableData}
              columns={this.state.goodsTableColumns}
              locale={this.state.tableEmpty}
              pagination={false}
              expandedRowRender={record => this.expandedRowRenderFile(record)}
            />
            <Pagination
              defaultCurrent={this.state.defaultCurrent}
              current={this.state.pageidx}
              pageSize={this.state.pagesize}
              total={this.state.dataTotal}
              showSizeChanger={true}
              showQuickJumper={true}
              pageSizeOptions={this.state.pageSizeOptions}
              onShowSizeChange={this.pageSizeChange}
              onChange={this.pageChange}/>
            <StockModal superComponent={this}/>
          </Card>
        </div>
      </div>
    )
  }
}