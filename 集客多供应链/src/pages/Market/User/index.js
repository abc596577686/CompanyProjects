import React from 'react';
import {
  Button,
  Icon,
  Select,
  Card,
  Table,
  Input,
  Pagination,
  Form,
  Modal,
  Col,
  Radio,
  Upload,
  message,
  Tabs,
  Spin
} from 'antd';
import './index.less';
import { goodsTableColumns, goodsTableColumnss } from "./setdata.js"
import { userList, auditUser ,savePurchaseExcel,uploadExcel,erpStoreList} from '../../../axios/api';
import { ERR_OK, baseUrl,marketUrl } from "../../../axios/config";
const FormItem = Form.Item;
// radio组件
const RadioGroup = Radio.Group;
const layoutHorizontal = 'horizontal';
const Option = Select.Option;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const { TextArea } = Input;
export default class Custom extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    // 初始化加载选择已审核
    // let filters = []
    //   filters.push({
    //     key: 'isRegisterCheck',
    //     value: 'true'
    // })
    // this.setState({
    //   filters: filters
    // })
    this._getuserList()
    this._erpStoreList()
    
    this.setState({
      tablelist: goodsTableColumnss
    })
  }

  state = {
    tagsOrderStatus: [
      {
        id: '1',
        label: '已审用户'
      },
      {
        id: '0',
        label: '待审核用户'
      }
    ],
    filters: [
      {
        key: 'isRegisterCheck',
        value: 'true'
      }
    ],
    visible: false,
    status: true,
    value: '0',
    remark: '',
    current: 1,
    pagesize: 10,
    pageSizeOptions: ['10', '15', '20'],
    total: 0,
    tablelist:[],
    goodsTableColumnss: [],
    isdisabled: false,
    // showLoading: false,
    loading: false,
    fileList : [],
    uploadColumns :[
      {
        title:'商品码',
        dataIndex:'productCode',
        key:'productCode'
      },
      {
        title:'商品sku',
        dataIndex:'productSku',
        key:'productSku'
      },
      {
        title:'商品价格',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'错误信息',
        dataIndex:'errorMsg',
        key:'errorMsg'
      }
    ],
    user : {},
  //  本地分页
    upPageidx : 1,
    upPagesize : 10,
    downloadUrl: `${marketUrl}/download/getTemplateFile?key=3`,
    userNickname: '',
    userPartgroup: '',
    typeList: [
      {
        name: '官方店铺',
        type: '1'
      },
      {
        name: '非官方店铺',
        type: '0'
      },
    ]
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
  // 页码改变
  pageChange = (page, pageSize) => {
    let filters = encodeURIComponent(JSON.stringify(this.state.filters));
    this.setState({
      current: page,
    });
    let params = {
      pageidx: page,
      pagesize: pageSize,
      filters: filters
    }
    console.log(params)
    userList(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data)
          let userList = res.data.data;
          this._setdata(userList)
        } else {
          message.warning(res.data.msg);
        }
      }
    });
  };

  // 页面条数改变
  _onShowSizeChange = (current, pageSize) => {
    this.setState({
      pagesize: pageSize,
    });
    let filters = encodeURIComponent(JSON.stringify(this.state.filters));
    console.log(filters)
    let params = {
      pageidx: current,
      pagesize: pageSize,
      filters: filters
    }
    console.log(params)
    userList(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data)
          let userList = res.data.data;
          this._setdata(userList)
        } else {
          message.warning(res.data.msg);
        }
      }
    });
  }
  onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
    this.setState({
      status: e.target.value
    })
  }
  clickRadio = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  // 选择店铺
  selectErp = (val) => {
    this.setState({
      curErpStoreId : val
    })

  }
  // 用户编辑
  _editauditUser(params) {
    auditUser(params, 'POST').then(res => {
      if (res.data.code == 1) {
        message.success(res.data.msg);
        this._getuserList()
      } else {
        message.warning(res.data.msg);
      }
    });
  }
  _getuserList() {
    this.setState({
      loading: true,
    });
    console.log('-------',this.state.filters)
    let filters = encodeURIComponent(JSON.stringify(this.state.filters));
    let params = {
      pageidx: this.state.current,
      pagesize: this.state.pagesize,
      filters: filters
    }
    userList(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        // if (res.data.data && res.data.data.length > 0) {
          console.log(res.data)
          let userList = res.data.data;
          this._setdata(userList)
          this.setState({
            total: res.data.count,
            loading: false
          });
        }else {
          message.warning(res.data.msg);
          this.setState({
            TableListData: [],
            loading: false
          })
        }
      // }
    });
  }
  productAction(product, type,tags) {
    switch (type) {
      case 'edit':
        this._productEdit(product,tags);
        break;
      case 'upload':
        this._excelUpload(product)
        break;
        
    }
  };
  _excelUpload = (product) => {
    this.setState({
      userId : product.userId,
      visible1 : true,
      user : product,
      fileUpload : product.purchaseFilePath
    })
  }
  _setdata(userList) {
    if (userList && userList.length > 0) {
      let TableListData = []
      userList.map((user, i) => {
        TableListData.push({
          num: user.userId,
          image: <img src={baseUrl + user.headImage} style={{ width: '30px', height: '30px' }} />,
          nickname: user.fullName,
          mobile: user.mobile,
          remark: user.remark,
          status: user.status == '0' ? '禁用' : '启用',
          name: user.name,
          isRegisterCheck: user.isRegisterCheck == '1' ? '已通过' : '未通过',
          inviteCode: user.inviteCode,
          userType: user.isOfficialShop == 1 ? '官方店铺' : '非官方店铺' ,
          storeName : user.storeName?user.storeName:'',
          action:
            <div>
              <Button size='small' icon='edit' onClick={this.productAction.bind(this, user, 'edit',this.state.curTags)} >编辑</Button>
              &nbsp;&nbsp;&nbsp;
              {
                user.isRegisterCheck == '1'&&
                <Button size='small' icon='upload' onClick={this.productAction.bind(this, user, 'upload',this.state.curTags)} >上传清单</Button>
              }
            </div>
        })
      })
      this.setState({
        userList,
        TableListData,
        // userNickname: userList
      })
    } else {
      let TableListData = []
      this.setState({
        TableListData,
      })
    }
  }
  _productEdit(product,tags) {
    console.log(product,tags)
    this.setState({
      visible: true,
      status: product.status == '0' ? false : true,
      value: product.isRegisterCheck == '0' ? false : true,
      userId: product.userId,
      remark: product.remark,
      curErpStoreId : product.erpStoreId,
      curErpStoreName: product.storeName,
      userNickname: product.fullName,
      userPartgroup: product.isOfficialShop == true ? '官方店铺' : '非官方店铺',
      localtype: product.isOfficialShop == true ? '1' : '0'
    })
    if(this.state.curTags == '2'){
      this.setState({
        status : true
      })
    }
    if (product.isRegisterCheck == 1) {
      this.setState({
        isdisabled: true
      })
    } else {
      this.setState({
        isdisabled: false
      })
    }
  }
  onChangeTags = (val) => {
    console.log('---------',val)
    let filters = this.state.filters
    filters[0].value = val=='2'?'false':'true'
    this.setState({
      filters: filters,
      tablelist:goodsTableColumnss,
      curTags : val
    },() =>{
      this._getuserList();
    })
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    console.log(this.state.status)
    console.log(this.state.value)
    console.log(this.state.userId)
    // 保存新增的品牌
    let params = {
      status: this.state.status,
      isRegisterCheck: this.state.value,
      userId: this.state.userId,
      remark: this.state.remark,
      erpStoreId: this.state.curErpStoreId,
      nickName: this.state.userNickname,
      isOfficialShop: this.state.userPartgroup,
    };
    this._editauditUser(params)
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleOk1 = () => {
    if(!this.state.filePath){
      message.error('请正确上传文件')
      return
    }
    let params = {
      marketUserId : this.state.userId,
      filePath : this.state.filePath
    }
    savePurchaseExcel(params,'post').then(res => {
      if(res.data.code==='1'){
        message.success(res.data.msg)
        this.setState({
          visible1 : false,
          filePath : null,
          uploadDataList : [],
          curList : [],
          uploadTotal : 0
        })
        this._getuserList()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  // 获取erp店铺列表
  _erpStoreList = () => {
    erpStoreList().then(res => {
      if(res.data.code==='1'){
        this.setState({
          erpStoreList : res.data.data
        })
      }else{
        this.setState({
          erpStoreList : []
        })
      }

    })
  }
  handleCancel1 = () => {
    this.setState({
      visible1 : false,
      filePath : null,
      uploadDataList : [],
      curList : [],
      uploadTotal : 0,
      upPageidx : 1
    })
  }
  //上传文件
  uploadChange = (info) => {
      if(info.file.status==='uploading'){
        this.setState({
          showLoading : true
        })
      }
      let dataList,fileList
      if (info.file.status === 'done') {
        console.log('------',info.file, info.fileList);
        dataList = info.file.response.dataList
        fileList = info.fileListgeneratePage
        if(info.file.response.code==='1'){
          message.success('上传成功')
          this.setState({
            uploadDataList : dataList,
            curList : this.generatePage(dataList,'1'),
            uploadTotal : dataList?dataList.length:0,
            filePath : info.file.response.data,
            fileList,
            showLoading : false,
            upPageidx : 1
          })
        }else{
          message.error(info.file.response.msg)
          this.setState({
            uploadDataList : dataList,
            curList : this.generatePage(dataList,'1'),
            uploadTotal : dataList?dataList.length:0,
            filePath : info.file.response.data,
            fileList,
            showLoading : false,
            upPageidx : 1
          })
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
  }
  //手动分页
  generatePage = (dataList,upPageidx = this.state.upPageidx) => {
    let curList
    if(dataList && dataList.length>0){
      let next = upPageidx*this.state.upPagesize
      let prev = (upPageidx-1)*this.state.upPagesize
      curList = dataList.filter((item,idx) =>  idx < next && idx >= prev)
      // curList = dataList.filter((item => item.productCode === this.state.curProductCode)
      // curList = dataList.filter((item => item.productSku === this.state.curProductSku)
      console.log('cur---------',curList,next,prev)
    }else{
      curList = []
    }
    return curList
    
  }
  removeFile = (info) => {
    console.log(info)
    this.setState({
      fileList : [],
      dataList : []
    })
    
  }
  showTotal = () => {
    return(
      // `共有 ${this.state.uploadTotal} 条`
    <a href={this.state.downloadUrl}> 下载清单模板</a>
    )
  }
  uploadChangePage = (e) => {
    this.setState({
      upPageidx : e
    },() => {
      let curList = this.generatePage(this.state.uploadDataList)
      this.setState({
        curList
      })
    })
    
  }
  // 用户昵称修改
  editNewUserName = (e) => {
    this.setState({
      userNickname: e.target.value
    })
  }
  // 用户类别修改
  // editNewUserType = (e) => {
  //   this.setState({
  //     userPartgroup: e.target.value
  //   })
  // }
  // 用户类别修改
  selectType = (val) => {
    console.log(val)
    this.setState({
      userPartgroup : val
    })
  }


  
  render() {
    // 数据
    // const TableListData
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
    const downloadUrl2 = `${marketUrl}/download/downloadPurchaseExcel?userId=${this.state.userId}`
    const props = {
      name: 'file',
      action: `${marketUrl}/manager/productExcel/uploadExcel`,
      // action :(file) =>{
      //   let params = {
      //     file:file.uid,
      //     marketUserId : this.state.userId
      //   }
      //   uploadExcel(params,'post').then(res => {
      //
      //   })
      // },
      data : {
        marketUserId : this.state.userId
      },
      headers: {
        'authorization': localStorage.getItem('token'),
        // 'Content-Type':"multipart/form-data"
      },
      withCredentials : true,
      onChange : this.uploadChange,
      onRemove : this.removeFile,
      showUploadList : false
    };
    return (
      <div className="page goods-page">
        <div className="custom_page m-t-lg lg">
          <Tabs onChange={this.onChangeTags} type="card">
            {
              this.state.tagsOrderStatus.map((tag, i) =>
                <TabPane tab={tag.label} key={i + 1} />
              )
            }
          </Tabs>
          <Table
            className='manager'
            dataSource={this.state.TableListData}
            columns={this.state.tablelist}
            locale={this.state.tableEmpty}
            loading={this.state.loading}
            pagination={false}
          />
          <Pagination
            defaultCurrent={1}
            defaultPageSize={10}
            current={this.state.current}
            pageSize={this.state.pagesize}
            showSizeChanger
            total={this.state.total}
            pageSizeOptions={this.state.pageSizeOptions}
            onShowSizeChange={this._onShowSizeChange}
            onChange={this.pageChange.bind(this)}
          />
          <Modal
            title="用户审核"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose={true}
            width={600}
          > 
            <div>
              <RadioGroup onChange={this.onChange} value={this.state.status} disabled={!this.state.isdisabled}>
                <RadioButton value={true}>启用</RadioButton >
                <RadioButton value={false}>禁用</RadioButton >
              </RadioGroup>
              <Select 
              placeholder='请选择店铺' 
              style={{width:'200px',margin:'0 10px'}}
              onChange={this.selectErp}
              defaultValue={this.state.curErpStoreName}
              disabled={!this.state.isdisabled}
              >
                {
                  this.state.erpStoreList && this.state.erpStoreList.length>0 &&
                  this.state.erpStoreList.map(item => {
                    return(
                      <Option value={item.appStoreId}>{item.nick}</Option>
                    )
                  })
                }
              </Select>  
              <RadioGroup onChange={this.clickRadio} disabled={this.state.isdisabled} value={this.state.value} style={{ marginLeft: '20px' }}>
                <Radio value='1'>通过审核</Radio>
                <Radio value='0'>拒绝审核</Radio>
              </RadioGroup>
              {this.state.isdisabled == true?
                <Input size="default " addonBefore='用户昵称' value={this.state.userNickname} style={{ display: 'inline-block', marginTop: '20px', marginRight: '20px', width: '200px' }} onChange={this.editNewUserName} />
                :null
              }
              {this.state.isdisabled == true?
                <Select 
                placeholder='请选择用户类别'
                style={{ width: '200px', margin: '0 20px' ,marginTop: '20px'}}
                onChange={this.selectType}
                defaultValue={this.state.localtype}
                >
                  {
                    // this.state.erpStoreList && this.state.erpStoreList.length>0 &&
                    this.state.typeList.map(item => {
                      return(
                        <Option value={item.type}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
                : null
              }
              </div>
          </Modal>
          <Modal
            title="上传清单"
            visible={this.state.visible1}
            onOk={this.handleOk1}
            onCancel={this.handleCancel1}
            destroyOnClose={true}
            className='downloadModal'
            width={650}
          >
            <div>
                <div className='flexBox'>
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 上传采购清单
                    </Button>
                  </Upload>
                  {/* {
                    this.state.user.isPurchase&&
                    <Button>
                      <Icon type='download'/>
                      <a href={downloadUrl2}> 下载用户清单</a>
                    </Button>
                    
                  } */}
                </div>
              <Table
              columns={this.state.uploadColumns}
              dataSource={this.state.curList}
              bordered
              style={{marginTop:'20px'}}
              pagination={false}
              rowClassName = {record => record.isError?'abnormal':'normal'}
              loading={this.state.showLoading}
              >
              </Table>
              <div style={{height:'10px'}}></div>
              <a href={downloadUrl2}> 下载清单模板</a>
              <Pagination size="small" total={this.state.uploadTotal}
                          onChange={this.uploadChangePage}
                          current={this.state.upPageidx}
                          // showTotal={this.showTotal}
              
              />
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}