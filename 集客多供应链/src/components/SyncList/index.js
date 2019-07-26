import React from 'react'
import moment from 'moment';
import './index.less'
import {Table,Modal,Button,Tabs,Input,Form,message,Pagination,Spin,Popover,Select} from'antd'
import {dateFormate} from '../../utils/index'
import {
  getSyncStoreList,
  getSyncOrderCourierList,
  resyncOrder,
  editIdentity,
  getSyncOrderList,
  manualSyncOrder,
  closeSyncOrder,
  getToken
} from '../../axios/api'

const confirm = Modal.confirm
const TabPane = Tabs.TabPane
const Search = Input.Search;
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {span: 3},
  wrapperCol: {span: 18},
};
const formItemLayout1 = {
  labelCol: {span: 6},
  wrapperCol: {span: 18},
};
const Option = Select.Option

export default class SyncList extends React.Component{
  constructor(props) {
    super()
    this.state = {
      curStatus: '1',
      placeholder: '请输入订单号',
      pageidx: 1,
      pagesize: 20
    }
  }
  //获取token后进行操作
  _getToken = (type,...rest) =>{
    getToken().then(res => {
      console.log('token',res)
      let userToken = res.data.token
      this.setState({
        userToken
      },() => {
        switch (type){
          case 'getTable' :
            this.getTableList()
            break
          case 'syncOrder' :
            let [orderNumber,storeId] = rest
            this._syncOrder(orderNumber,storeId)
            break
          case 'editId' :
            this._editIdentity()
            break
          case 'handleSync' :
            this._manualSyncOrder()
            break
          case 'cancel' :
            let [record] = rest
            this._closeOrder(record)
          default :
            break
        }
      })
    })
  }
  //当前编辑对象
  showDetail =(val) => {
    console.log('------当前订单',val)
    this.setState({
      visible : true,
      curOrder : val,
    })
  }
  syncOpt =(orderNumber,storeId) => {
    let that = this
    confirm({
      title: '提示',
      content: '确定要同步这个订单?',
      onOk() {
        // that._syncOrder(orderNumber,storeId)
        that._getToken('syncOrder',orderNumber,storeId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //同步订单
  _syncOrder = (orderNumber,storeId) => {
    let params = {
      orderNumber,
      storeId,
      SCM_ADMIN_TOKEN : this.state.userToken
    }
    resyncOrder(params).then(res => {
      console.log(res)
      if(!res.data.isSucc){
        message.error(res.data.message)
      }else{
        message.success(res.data.message)
      }
      this._getToken('getTable')
    })
  }
  // 取消订单
  _closeOrder = (record) => {
    let syncId = record.syncId
    let params = {
      syncId,
      SCM_ADMIN_TOKEN : this.state.userToken,
      msg : this.state.closeReason
    }
    closeSyncOrder(params).then(res =>{
      if(res.data.code==='1'){
        message.success(res.data.msg)
        this._getToken('getTable')
      }else{
        message.error(res.data.code)
      }
    })
  }
  //关闭原因
  getCloseReason = (e) => {
    e.persist();
    console.log('---',e)
    let val = e.target.value
    this.setState({
      closeReason : val
    })
    
  }
  cancelOpt = (record) => {
    let that = this
    confirm({
      title: '确定要关闭这个订单?',
      content: (
        <div>
          <Input.TextArea 
            placeholder='请输入关闭原因'
            onChange={this.getCloseReason}
            style={{height:'80px',marginTop:'10px'}}>
          </Input.TextArea>
        </div>
      ),
      onOk() {
        that._getToken('cancel', record)
      },
      onCancel() {
        console.log('Cancel');
        that.setState({
          closeReason : ''
        })
      },
    });
  }
  getOptionBtns = (record) => {
    const optionBtns1 = (
      <div>
        <span className='item'
         style={{color:'#1890ff',cursor:'pointer'}}
          onClick={ ()=> this.showDetail(record) }>查看</span>
        &nbsp;|&nbsp;
        <span className='item'
         style={{color:'#1890ff',cursor:'pointer'}}
          onClick={this.syncOpt.bind(this,record.orderNumber,record.storeId)}>重新同步</span>
          &nbsp;|&nbsp;
        <span className='item'
         style={{color:'#1890ff',cursor:'pointer'}}
          onClick={this.cancelOpt.bind(this,record)}>取消</span>
      </div>
    )
    const optionBtns2 = (
      <div>
        <span className='item'
        style={{color:'#1890ff',cursor:'pointer'}}
          onClick={ ()=> this.showDetail(record) }>查看</span>
      </div>
    )
    const optionBtns3 = (
      <div>
        <span className='item'
        style={{color:'#1890ff',cursor:'pointer'}}
          onClick={ ()=> this.showDetail(record) }>查看</span>
        &nbsp;|&nbsp;
        <span className='item'
        style={{color:'#1890ff',cursor:'pointer'}}
          onClick={this.syncOpt.bind(this,record.orderNumber,record.storeId)}>重新同步</span>
      </div>
    )
    switch(record.checkStatus){
      case 1:  return optionBtns1;
      case 2:  return optionBtns2;
      case 3:  return optionBtns3;
      default: return null;
    }
  }
  getCheckStatus = (record) => {
    switch(record.checkStatus){
      case 1:  return <div style={{fontWeight: '700'}}>待审核</div>;
      case 2:  return <div style={{color: 'green', fontWeight: '700'}}>已完成</div>;
      case 3:  return <div style={{color: 'red', fontWeight: '700'}}>已关闭</div>;
      default: return null;
    }
  }
  getTableColumns = () => {
    let status = this.state.curStatus
    let columns = []
    console.log('status--------------',status)
    switch(status){
      case '1' :
        columns = [
          {
            title: '订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            className : 'itemer',
            width: '10%'
          },
          {
            title: '状态',
            dataIndex: 'checkStatus',
            key: 'checkStatus',
            className : 'itemer',
            width: '8%',
            render: (a, record) => this.getCheckStatus(record)
          },
          {
            title: '店铺',
            dataIndex: 'storeName',
            key: 'storeName',
            className : 'itemer',
            width: '15%'
          },
          {
            title: '错误信息',
            dataIndex: 'errorMsg',
            key: 'errorMsg',
            className : 'itemer',
            width: '20%',
            render : (a,b) =>{
              const content = (
                <div className='magCont'>{b.errorMsg}</div>
              )
              const title = (
                <div className='msgTitle'>错误详情</div>
              )
              return(
                <div>
                  <Popover content={content}>
                    <div className='someMsg'>{b.errorMsg}</div>
                  </Popover>
                </div>
              )
            }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            className : 'itemer',
            width: '12%'
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            className : 'itemer',
            width: '15%',
            render: (a, record) => this.getOptionBtns(record)
          }
        ]
        this.setState({columns})
        break
      case '2' :
        columns = [
          {
            title: '序号',
            dataIndex: 'expressId',
            key: 'expressId',
            className : 'itemer',
            width : 60
          },
          {
            title: '订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            className : 'itemer',
            width : 180
          },
          {
            title: '快递单号',
            dataIndex: 'expressNumber',
            key: 'expressNumber',
            className : 'itemer',
            width : 180
          },
          {
            title: '快递公司',
            dataIndex: 'expressCompany',
            key: 'expressCompany',
            className : 'itemer',
            width : 120
          },
          {
            title: '状态',
            dataIndex: 'isPaymentSucc',
            key: 'isPaymentSucc',
            className : 'itemer',
            width : 70,
            render:(a,b) =>{
              return <span>{b.isPaymentSucc?'成功':'失败'}</span>
            }
          },
          {
            title: '错误提示',
            dataIndex: 'msg',
            key: 'msg',
            className : 'itemer',
            width : 180
          },
        ]
        this.setState({columns})
        break
      default :
        this.setState({columns : []})
    }
  }
  //搜索订单号
  searchOrderNo = (e) => {
    console.log(e)
    this.setState({
      orderNo : e,
      pageidx : 1
    },()=>{
      this._getToken('getTable')
    })
  }
  getOrderNo = (e) => {
    let orderNo = e.target.value
    this.setState({
      orderNo
    })
  }
  //订单物流回写列表
  _getSyncOrderCourierList  = () => {
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize,
      orderNumber : this.state.orderNo,
      'SCM_ADMIN_TOKEN' : this.state.userToken
    }
    getSyncOrderCourierList(params).then(res => {
      console.log(res)
      let dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      dataSource = this.dateFormFuc(dataSource)
      this.setState({
        dataSource,
        total : res.data.count,
        showLoading : false
      })
    })
  }
  //订单详情列表
  _getSyncOrderList  = () => {
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize,
      orderNumber : this.state.orderNo,
      storeId : this.state.selectStoreId,
      checkStatus : this.state.selectCheckStatus,
      'SCM_ADMIN_TOKEN' : this.state.userToken
    }
    let paramss = {
      'SCM_ADMIN_TOKEN' : this.state.userToken
    }
    getSyncOrderList(params).then(res => {
      console.log(res)
      let dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      this.dateFormFuc(dataSource)
      this.setState({
        dataSource,
        total : res.data.count,
        showLoading : false
      })
    })
    getSyncStoreList(paramss).then(res => {
      console.log('----',res)
      let selectStoreList = res.data.dataList
      this.setState({
        selectStoreList
      })
    })
  }
  //获取表格数据
  getTableList = () => {
    let status = this.state.curStatus
    this.setState({
      showLoading : true
    })
    this.getTableColumns()
    console.log('cur----------',status)
    switch (status){
      case '1' :
        this._getSyncOrderList()
        break
      case '2' :
        this._getSyncOrderCourierList()
        break
      default :
        this.setState({
          curTableData : [],
          showLoading : false
        })
        
    }
  }
  onChangeA = (e) => {
    let curOrder = this.state.curOrder
    curOrder.identityName = e.target.value
    this.setState({
      curOrder
    })
  }
  onChangeB = (e) => {
    let curOrder = this.state.curOrder
    curOrder.identityNo = e.target.value
    this.setState({
      curOrder
    })
  }
  onChangeC = (e) => {
    let curOrder = this.state.curOrder
    curOrder.buyerMessage = e.target.value
    this.setState({
      curOrder
    })
  }
  //填写身份证
  _editIdentity =() => {
    let params = {
      identityName : this.state.curOrder.identityName,
      identityNo : this.state.curOrder.identityNo,
      syncId : this.state.curOrder.syncId,
      buyerMessage : this.state.curOrder.buyerMessage,
      SCM_ADMIN_TOKEN : this.state.userToken
    }
    editIdentity(params).then(res => {
      console.log(res)
      if(!res.data.isSucc){
        message.error(res.data.message)
      }else{
        message.success(res.data.message)
        this.setState({
          visible : false
        })
      }
      this._getToken('getTable')
    })
  }
  componentWillMount(){
    this.setState({
      curStatus : this.props.type,
    },() => {
      this._getToken('getTable')
    })
  }
  handleOk = () => {
    // this._editIdentity()
    this._getToken('editId')
  }
  handleCancel = () =>{
    this.setState({
      visible : false
    })
  }
  changePage = (page,pagesize) => {
    console.log(page)
    this.setState({
      pageidx : page
    },()=> {
      this._getToken('getTable')
    })
  }
  //格式化时间
  dateFormFuc =(data) => {
    data&&data.length>0?data.forEach(item => {
      item.createTime = dateFormate(item.createTime)
      item.updateTime = dateFormate(item.updateTime)
    }):null
    return data
  }
  freshList = () => {
    this._getToken('getTable')
  }
    //同步弹框
  showSync =() =>{
    let curStoreIdVal
    let curStoreNameVal
    let dataSource
    let params = {
      SCM_ADMIN_TOKEN : this.state.userToken
    }
    getSyncStoreList(params).then(res => {
      dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      curStoreIdVal = res.data.dataList&&res.data.dataList.length>0?res.data.dataList[0].storeId:''
      curStoreNameVal = res.data.dataList&&res.data.dataList.length>0?res.data.dataList[0].storeName:''
      this.setState({
        storeList : dataSource,
        visible1 : true,
        curOrderNoVal : '',
        curStoreIdVal : '',
        curStoreNameVal
      })
    })
  }
  handleOk1 = () =>{
    if(!this.state.curOrderNoVal){
      message.error('订单号不能为空!')
      return
    }
    // this._manualSyncOrder()
    this._getToken('handleSync')
  }
  handleCancel1 = () =>{
    this.setState({
      visible1 : false
    })
  
  }
    //手动同步
  _manualSyncOrder =() =>{
    let params = {
      orderNumber : this.state.curOrderNoVal,
      storeId : this.state.curStoreIdVal,
      SCM_ADMIN_TOKEN : this.state.userToken
    }
    manualSyncOrder(params).then(res =>{
      if(res.data.isSucc){
        message.success(res.data.message)
        this.setState({
          visible1:false
        })
      }else{
        message.error(res.data.message)
      }
    })
  }
    //同步订单号
  getCurOrderNoVal = (e) =>{
    let curOrderNoVal = e.target.value
    this.setState({
      curOrderNoVal
    })
    
  }
  //同步店铺号
  getCurStoreIdVal = (e) =>{
    let curStoreIdVal = e
    this.setState({
      curStoreIdVal
    })
  }
  //同步订单店铺选择
  selectStore = (e) =>{
    console.log(e)
    this.setState({
      selectStoreId : e,
      pageidx : 1
    },() =>{
      this._getToken('getTable')
    })
  }
  //同步状态选择
  selectCheckStatus = (e) =>{
    console.log(e)
    this.setState({
      selectCheckStatus : e,
      pageidx : 1
    },() =>{
      this._getToken('getTable')
    })
  }
  render(){
    let curOrder = this.state.curOrder
    console.log('json----------',curOrder)
    return(
      <div className='sync-content'>
        {/*详情弹框*/}
        <Modal visible={this.state.visible}
          title="查看详情"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确定'
          className='orderDetailModal'
          width={700}>
          <div className='search-boxerrr'>
          {
            curOrder?
              <Form>
                <FormItem
                  label="订单编号"
                  {...formItemLayout}>
                  <div className='item'>{curOrder.orderNumber}</div>
                </FormItem>
                <FormItem
                  label="是否保税"
                  {...formItemLayout}>
                  <div className='item'>{curOrder.isCrossOrder?'是':'否'}</div>
                </FormItem>
                <FormItem
                  label="身份证姓名"
                  className='inp'
                  {...formItemLayout}>
                  <Input onChange={this.onChangeA} value={curOrder.identityName} size='small'/>
                </FormItem>
                <FormItem
                  label="身份证号码"
                  className='inp'
                  {...formItemLayout}>
                  <Input onChange={this.onChangeB} value={curOrder.identityNo} size='small'/>
                </FormItem>
                <FormItem
                  label="买家留言"
                  className='inp'
                  {...formItemLayout}>
                  <TextArea onChange={this.onChangeC} value={curOrder.buyerMessage}  size='small' className='orderMessage'/>
                </FormItem>
                <FormItem
                  label="订单详情"
                  {...formItemLayout}>
                  <div className='scroll-box'>
                    <div className='order-info'>
                      <textarea className='orderDetail' disabled={true} value={JSON.stringify(JSON.parse(curOrder.content), null, '\t')}/>
                    </div>
                  </div>
                </FormItem>
                <FormItem>
                
                </FormItem>
              </Form>:null
          }
          </div>
        </Modal>
        {/*手动同步弹框*/}
        <Modal visible={this.state.visible1}
          title="手动同步"
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          okText='确定'>
          <div className='sync-boxerrr'>
            <Form>
              <FormItem label="同步店铺名" {...formItemLayout1}>
                <Select defaultValue={this.state.curStoreNameVal} onChange={this.getCurStoreIdVal}>
                  <Option value=''>全部</Option>
                  {
                    this.state.storeList&&this.state.storeList.length>0&&
                    this.state.storeList.map(item =>
                      <Option value={item.storeId}>{item.storeName}</Option>
                    )
                  }
                </Select>
              </FormItem>
              <FormItem
                label="同步订单号"
                {...formItemLayout1}>
                <Input onChange={this.getCurOrderNoVal} value={this.state.curOrderNoVal}/>
              </FormItem>
            </Form>
          </div>
        </Modal>
        <div className='sync-main'>
          <div className='flex-box'>
          {
            this.state.curStatus==='1'&& <Select
              defaultValue='全部状态'
              onChange={this.selectCheckStatus}
              style={{width:'100px',marginRight:'5px'}}>
              <Option value=''>全部状态</Option>
              <Option value={1}>待审核</Option>
              <Option value={2}>已完成</Option>
              <Option value={3}>已关闭</Option>
            </Select>
          }
          {
            this.state.curStatus==='1'&& <Select
              defaultValue='全部店铺'
              onChange={this.selectStore}
              style={{minWidth:'200px',marginRight:'5px'}}>
              <Option value=''>全部店铺</Option>
              {
                this.state.selectStoreList && this.state.selectStoreList.length>0 &&
                this.state.selectStoreList.map(item => {
                  return(
                    <Option value={item.storeId}>{item.storeName}</Option>
                  )
                })
              }
            </Select>
          }
          <div className='search-box'>
            <Search
              style={{width:'250px',marginRight:'5px'}}
              placeholder={this.state.placeholder}
              onSearch={this.searchOrderNo}
              onChange={this.getOrderNo}
              enterButton
              value={this.state.orderNo}
            />
          </div>
          <Button type='primary' onClick={this.freshList}>刷新表格</Button>
          {
            this.state.curStatus==='1'&&
            <Button type='primary' onClick={this.showSync} style={{marginLeft:'10px'}}>手动同步</Button>
          }
          </div>
          <Spin spinning={this.state.showLoading} size='small'>
            <Table  
              columns={this.state.columns}
              dataSource={this.state.dataSource}
              bordered={true}
              pagination={false}
              size='small'
              style={{overflowY:'auto'}}>
            </Table>
          </Spin>
          <Pagination
            total ={this.state.total}
            pageSize = {this.state.pagesize}
            onChange ={this.changePage}
            current={this.state.pageidx}
            size='small'>
          </Pagination>
        </div>
        {/* <PageFooter/> */}
      </div>
    )
    
  }
}