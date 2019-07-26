import React from 'react'
import './index.less'
import {Table,Modal,Button,Tabs,Input,Form,Row,Col,message,Pagination,Spin,Popover,Select} from'antd'
import IHeader from '../../components/Header';
import {dateFormate} from '../../utils/utils'
import HomeHeader from '../../components/HomeHeader'
import {getBatchSyncOrderList,
  getSyncOrderRecordList,
  getSyncStoreList,
  getSyncOrderCourierList,
  resyncOrder,
  editIdentity,
  getSyncOrderList,
  manualSyncOrder,
  closeSyncOrder
} from '../../axios/api'
import PageFooter from '../../components/PageFooter'
const confirm = Modal.confirm
const TabPane = Tabs.TabPane
const Search = Input.Search;
const FormItem = Form.Item
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
      syncType: [
        {
          id: 1,
          name: '订单批量同步列表'
        },
        {
          id: 2,
          name: '订单同步列表'
        },
        {
          id: 3,
          name: '订单详情列表'
        },
        {
          id: 4,
          name: '店铺列表'
        },
        {
          id: 5,
          name: '订单物流回写列表'
        },
      ],
      curStatus :'1',
      placeholder : '请输入订单号',
      pageidx : 1,
      pagesize :15,
      SyncPanes : [
        {
          id : '1',
          text : '待客审',
        },
        {
          id : '2',
          text : '已完成',
        },
        {
          id : '3',
          text : '已关闭',
        }
      ],
      curTabs : '1'
    }
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
        let params = {
          orderNumber,
          storeId
        }
        resyncOrder(params).then(res => {
          console.log(res)
          if(!res.data.isSucc){
            message.error(res.data.message)
          }else{
            message.success(res.data.message)
          }
          that.getTableList()
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //同步状态
  translateSyncStatus = (status) => {
    switch (status){
      case 1 :
        return '初始化'
      case 2 :
        return '同步成功'
      case 3 :
        return '同步失败'
      default :
        return ''
    }
  }
  //同步订单状态
  translateOrderStatus = (status) => {
    switch (status){
      case 1 :
        return '等待同步'
      case 2 :
        return '同步成功'
      case 3 :
        return '同步失败'
      default :
        return ''
    }
  }
  //同步类型
  translateFrom =(val) =>{
    switch (val){
      case 1 :
        return '宏魏'
      case 2 :
        return '有赞'
      case 3 :
        return '平安'
      default :
        return ''
    }
  }
  // 取消订单
  cancelOpt = (record) => {
    let that = this
    confirm({
      title: '提示',
      content: '确定要关闭这个订单?',
      onOk() {
        let syncId = record.syncId
        let params = {
          syncId
        }
        closeSyncOrder(params).then(res =>{
          if(res.data.code==='1'){
            message.success(res.data.msg)
            that.getTableList()
          }else{
            message.error(res.data.code)
          }
        })
        
      },
      onCancel() {
        console.log('Cancel');
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
      onClick={ ()=> this.showDetail(record) }>查看详情</span>
  </div>
)
const optionBtns3 = (
  <div>
    <span className='item'
     style={{color:'#1890ff',cursor:'pointer'}}
      onClick={ ()=> this.showDetail(record) }>查看详情</span>
    &nbsp;/&nbsp;
    <span className='item'
     style={{color:'#1890ff',cursor:'pointer'}}
      onClick={this.syncOpt.bind(this,record.orderNumber,record.storeId)}>重新同步</span>
  </div>
)
switch(this.state.curTabs){
  case '1' : 
  return optionBtns1
  case '2' : 
  return optionBtns2
  case '3' : 
  return optionBtns3
  default :
  return null
}
  }
  getTableColumns = () => {
    let status = this.state.curStatus
    let columns = []
    console.log('status--------------',status)
    switch(status){
      case '1' :
        console.log(111)
        columns = [
          {
            title: '序号',
            dataIndex: 'recordId',
            key: 'recordId',
            className : 'itemer',
            width : 60
          },
          {
            title: '店铺名称',
            dataIndex: 'name',
            key: 'name',
            className : 'itemer',
            width : 100
            
          },
          // {
          //   title: '同步对应店铺',
          //   dataIndex: 'storeId',
          //   key: 'storeId',
          //   className : 'itemer',
          //   width : 180
          // },
          {
            title: '获取总记录',
            dataIndex: 'totalCount',
            key: 'totalCount',
            className : 'itemer',
            width : 120
          },
          {
            title: '实际总记录',
            dataIndex: 'realTotalCount',
            key: 'realTotalCount',
            className : 'itemer',
            width : 120
          },
          {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            className : 'itemer',
            width : 140
          },
          {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            className : 'itemer',
            width : 140
          },
          // {
          //   title: '创建时间',
          //   dataIndex: 'createTime',
          //   key: 'createTime',
          //   className : 'itemer',
          //   width : 140
          // },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            className : 'itemer',
            width : 140
          }
        ]
        this.setState({
          columns
        })
        break
      case '2' :
        console.log(222)
        columns = [
          {
            title: '序号',
            dataIndex: 'recordId',
            key: 'recordId',
            className : 'itemer',
            width : 60,
          },
          // {
          //   title: '店铺序号',
          //   dataIndex: 'storeId',
          //   key: 'storeId',
          //   className : 'itemer',
          //   width : 180,
          // },
          // {
          //   title: '用户Id',
          //   dataIndex: 'userId',
          //   key: 'userId',
          //   className : 'itemer',
          //   width : 160,
          // },
          {
            title:'同步店铺名称',
            dataIndex: 'name',
            key: 'name',
            className : 'itemer',
            width : 120
          },
          {
            title: '同步订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            className : 'itemer',
            width : 150,
          },
          {
            title: '同步错误信息',
            dataIndex: 'returnMsg',
            key: 'returnMsg',
            className : 'itemer',
            width : 200,
          },
          // {
          //   title: '状态',
          //   dataIndex: 'status',
          //   key: 'status',
          //   className : 'itemer',
          //   width : 140,
          //   render: (a,record) =>{
          //     return this.translateSyncStatus(record.status)
          //   },
          // },
          {
            title: '同步次数',
            dataIndex: 'syncNumber',
            key: 'syncNumber',
            className : 'itemer',
            width : 120
          },
          {
            title: '同步类型',
            dataIndex: 'syncType',
            key: 'syncType',
            className : 'itemer',
            render: (a,record) =>{
              console.log('record',record.syncType)
              return this.translateFrom(record.syncType)
            },
            width : 120
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            className : 'itemer',
            width : 200
          }
        ]
        this.setState({
          columns,
        })
        break
      case '3' :
        console.log(333)
        columns = [
          {
            title: '序号',
            dataIndex: 'syncId',
            key: 'syncId',
            className : 'itemer',
            width : 60
          },
          {
            title: '订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            className : 'itemer',
            width : 120
          },
          // {
          //   title:'店铺Id',
          //   dataIndex: 'storeId',
          //   key: 'storeId',
          //   className : 'itemer',
          //   width : 200
          // },
          // {
          //   title: '身份证姓名',
          //   dataIndex: 'identityName',
          //   key: 'identityName',
          //   className : 'itemer',
          //   width : 200
          // },
          // {
          //   title: '身份证号',
          //   dataIndex: 'identityNo',
          //   key: 'identityNo',
          //   className : 'itemer',
          //   width : 300
          // },
          // {
          //   title: '是否保税订单',
          //   dataIndex: 'isCrossOrder',
          //   key: 'isCrossOrder',
          //   className : 'itemer',
          //   width : 180
          // },
          {
            title: '店铺',
            dataIndex: 'storeName',
            key: 'storeName',
            className : 'itemer',
            width : 70,
          },
          {
            title: '错误信息',
            dataIndex: 'errorMsg',
            key: 'errorMsg',
            className : 'itemer',
            width : 200,
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
            width : 180
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            // fixed: 'right',
            className : 'itemer',
            width : 180,
            render: (a,record) =>
                this.getOptionBtns(record)
          }
        ]
        this.setState({
          columns
        })
        break
      case '4' :
        console.log(444)
        columns = [
          {
            title: '序号',
            dataIndex: 'storeId',
            key: 'storeId',
            className : 'itemer',
            width : 60
          },
          {
            title: '店铺名称',
            dataIndex: 'storeName',
            key: 'storeName',
            className : 'itemer',
            width : 120
          },
          {
            title: '店铺同步名称',
            dataIndex: 'syncName',
            key: 'syncName',
            className : 'itemer',
            width : 150
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            className : 'itemer',
            width : 60,
            render : (a,b) =>{
              console.log('1111111',b)
              let status = b.status?'是':'否'
              return status
              
            }
          },
          {
            title: '同步类型',
            dataIndex: 'syncType',
            key: 'syncType',
            className : 'itemer',
            width : 100,
            render: (a,record) =>{
                return this.translateFrom(record.syncType)
              },
          },
          {
            title: '最后同步时间',
            dataIndex: 'lastSyncTime',
            key: 'lastSyncTime',
            className : 'itemer',
            width : 180
          },
          // {
          //   title: '创建时间',
          //   dataIndex: 'createTime',
          //   key: 'createTime',
          //   className : 'itemer',
          //   width : 300
          // },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            className : 'itemer',
            width : 150
          }
  
        ]
        this.setState({
          columns,
        })
        break
      case '5' :
        console.log(555)
        columns = [
          {
            title: '序号',
            dataIndex: 'expressId',
            key: 'expressId',
            className : 'itemer',
            width : 60
          },
          // {
          //   title: '销售渠道ID',
          //   dataIndex: 'channelId',
          //   key: 'channelId',
          //   className : 'itemer',
          //   width : 200
          // },
          // {
          //   title: '店铺ID',
          //   dataIndex: 'storeId',
          //   key: 'storeId',
          //   className : 'itemer',
          //   width : 150
          // },
          // {
          //   title: '店铺名称',
          //   dataIndex: 'storeName',
          //   key: 'storeName',
          //   className : 'itemer',
          //   width : 150
          // },
          // {
          //   title: '原始订单号',
          //   dataIndex: 'oldOrderNumber',
          //   key: 'oldOrderNumber',
          //   className : 'itemer',
          //   width : 300
          // },
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
          // {
          //   title: '快递公司代码',
          //   dataIndex: 'courierCompanyCode',
          //   key: 'courierCompanyCode',
          //   className : 'itemer',
          //   width : 200
          // },
          {
            title: '错误提示',
            dataIndex: 'msg',
            key: 'msg',
            className : 'itemer',
            width : 180
          },
          // {
          //   title: '更新时间',
          //   dataIndex: 'updateTime',
          //   key: 'updateTime',
          //   className : 'itemer',
          //   width : 300
          // }
        ]
        this.setState({
          columns,
        })
        break
      default :
        this.setState({
          columns : []
        })
    }
    
    
  }
  changeTabs = (e) => {
    console.log(e)
    console.log('ccc------',e)
    this.setState({
      curStatus : e
    },() => {
      this.getTableList()
    })
    
  }
  // getOrderNo = (e) => {
  //   let orderNo = e.target.value
  //   this.setState({
  //     orderNo
  //   })
  // }
  //搜索订单号
  searchOrderNo = (e) => {
    console.log(e)
    this.setState({
      orderNo : e
    },()=>{
      this.getTableList()
    })
    
  }
  //搜索店铺
  searchStore = (e) => {
    console.log(e)
    this.setState({
      storeName : e
    },() =>{
      this.getTableList()
    })
    
  }
  //批量同步订单列表记录
  _getBatchSyncOrderList = () => {
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize,
    }
    getBatchSyncOrderList(params).then(res => {
      console.log(res)
      let dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      this.dateFormFuc(dataSource)
      this.setState({
        dataSource,
        total : res.data.count,
        showLoading : false
      })
    })
  }
  // 订单同步列表
  _getSyncOrderRecordList = () => {
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize,
      orderNumber : this.state.orderNo,
    }
    getSyncOrderRecordList(params).then(res => {
      console.log(res)
      let dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      this.dateFormFuc(dataSource)
      this.setState({
        dataSource,
        total : res.data.count,
        showLoading : false
      })
    })
  }
  //店铺列表
  _getSyncStoreList  = () => {
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize,
      storeName : this.state.storeName
    }
    getSyncStoreList(params).then(res => {
      console.log(res)
      let dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      this.dateFormFuc(dataSource)
      this.setState({
        dataSource,
        total : res.data.count,
        showLoading : false,
      })
    })
  }
  //订单物流回写列表
  _getSyncOrderCourierList  = () => {
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize,
      orderNumber : this.state.orderNo
    }
    getSyncOrderCourierList(params).then(res => {
      console.log(res)
      let dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      this.dateFormFuc(dataSource)
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
      checkStatus:this.state.curTabs,
      storeId : this.state.selectStoreId
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
    getSyncStoreList().then(res => {
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
        this._getBatchSyncOrderList()
        break
      case '2' :
        this._getSyncOrderRecordList()
        break
      case '3' :
        this._getSyncOrderList()
        break
      case '4' :
        this._getSyncStoreList()
        break
      case '5' :
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
  //填写身份证
  _editIdentity =() => {
    // console.log('------------',this.state.identityName,this.state.identityNo,this.state.curOrderNo)
    let params = {
      identityName : this.state.curOrder.identityName,
      identityNo : this.state.curOrder.identityNo,
      syncId : this.state.curOrder.syncId
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
      this.getTableList()
    })
  }
  componentWillMount(){
    // this.getTableList()
    // console.log(this.props)
   
    this.setState({
      curStatus : this.props.type
    },() => {
      this.getTableList()
    })
  }
  handleOk = () => {
    this._editIdentity()
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
      this.getTableList()
    })
  }
  //格式化时间
  dateFormFuc =(data) => {
    // let data = this.state.dataSource
    data&&data.length>0?data.forEach(item => {
      item.createTime = dateFormate(item.createTime)
      item.updateTime = dateFormate(item.updateTime)
      item.lastSyncTime = dateFormate(item.lastSyncTime)
    }):null
    return data
  }
  freshList = () => {
    this.setState({
      orderNo:'',
      storeName:'',
    },() => {
      this.getTableList()
    })
  }
    //同步弹框
  showSync =() =>{
    let curStoreIdVal
    let curStoreNameVal
    let dataSource
    getSyncStoreList().then(res => {
      dataSource = res.data.dataList&&res.data.dataList.length>0?res.data.dataList:[]
      curStoreIdVal = res.data.dataList&&res.data.dataList.length>0?res.data.dataList[0].storeId:''
      curStoreNameVal = res.data.dataList&&res.data.dataList.length>0?res.data.dataList[0].storeName:''
      this.setState({
        storeList : dataSource,
        visible1 : true,
        curOrderNoVal : '',
        curStoreIdVal : '',
        curStoreIdVal,
        curStoreNameVal
      })
    })
  }
  handleOk1 = () =>{
    if(!this.state.curOrderNoVal){
      message.error('订单号不能为空!')
      return
    }
    this._manualSyncOrder()
  
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
      storeId : this.state.curStoreIdVal
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
      selectStoreId : e
    },() =>{
      this.getTableList()
    })
  }
  onChangeTabs = (e) => {
    console.log(e)
    this.setState({
      curTabs : e
    },() => {
      this._getSyncOrderList()
    })
  }
    render(){
      // let dataSource = this.dateFormFuc()
      // console.log('----------------------',dataSource)
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
                 width={700}
          >
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
                      label="同步状态"
                      {...formItemLayout}>
                      <div className='item'>{this.translateSyncStatus(curOrder.status)}</div>
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
                      label="订单详情"
                      {...formItemLayout}>
                      <div className='scroll-box'>
                        <div className='order-info'>
                            {/*<pre>*/}
                              {/*{JSON.stringify(JSON.parse(this.state.curOrder.content), null, '\t')}*/}
                            {/*</pre>*/}
                          <textarea disabled={true} value={JSON.stringify(JSON.parse(curOrder.content), null, '\t')}>
                    
                          </textarea>
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
                 okText='确定'
          >
            <div className='sync-boxerrr'>
                  <Form>
                    <FormItem
                      label="同步店铺名"
                      {...formItemLayout1}
                      
                    >
                      <Select defaultValue={this.state.curStoreNameVal}
                              onChange={this.getCurStoreIdVal}>
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
               this.state.curStatus==='3'&&
                 <Select
                   defaultValue='全部店铺'
                   onChange={this.selectStore}
                   style={{width:'300px',marginRight:'5px'}}>
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
               {
                 this.state.curStatus === '1'||this.state.curStatus==='4'?
                   null:<div className='search-box'>
                     <Search
                       placeholder={this.state.placeholder}
                       onSearch={this.searchOrderNo}
                       enterButton
                     />
                   </div>
               }
               {
                 this.state.curStatus === '4'?
                   <div className='search-box'>
                   <Search
                     placeholder='请输入店铺名'
                     onSearch={this.searchStore}
                     enterButton
                   /></div>:null
               }
             <Button type='primary' onClick={this.freshList}>刷新表格</Button>
             {
               (this.state.curStatus==='2'||this.state.curStatus==='3')&&
               <Button type='primary' onClick={this.showSync} style={{marginLeft:'10px'}}>手动同步</Button>
             }
           </div>
            <Spin spinning={this.state.showLoading} size='small'>
              {
                this.state.curStatus==='3'&&
                <Tabs
                onChange={this.onChangeTabs}
                activeKey={this.state.curTabs}
                type='card'
                defaultActiveKey={this.state.curTabs}
            
                >
                {this.state.SyncPanes.map(pane => <TabPane tab={pane.text} key={pane.id}></TabPane>)}
              </Tabs>
              }
              <Table  columns={this.state.columns}
                      dataSource={this.state.dataSource}
                      bordered={true}
                      pagination={false}
                      size='small'
                      style={{overflowY:'auto'}}
                
              >
              </Table>
            </Spin>
            <Pagination
              total ={this.state.total}
              pageSize = {this.state.pagesize}
              onChange ={this.changePage}
              current={this.state.pageidx}
              size='small'
            >
  
            </Pagination>
          </div>
          {/* <PageFooter/> */}
        </div>
      )
      
    }
}