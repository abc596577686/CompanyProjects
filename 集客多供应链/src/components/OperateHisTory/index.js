import React from 'react'
import './index.less'
import {getValForKey,dateFormate} from '../../utils/index'

import {
  Table,
  Tabs,
  message
} from 'antd';
export default class OpHisTory extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      data : [],
      columns:[],
      dataList : []
    }
  }
  transPayment = (payment) => {
    switch (payment){
      case 1 :
        return '支付宝支付'
      case 2 :
        return '微信支付'
      default :
        return '未知'
    }
    
  }
  getTableData = () => {
    let columns
    let dataList = []
    console.log('props--------------',this.props)
    switch(this.props.type){
      case '1' :
        console.log(111)
        columns = [
          {
            title: '序号',
            dataIndex: 'idx',
            key: 'idx',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '店铺名称',
            dataIndex: 'storeName',
            key: 'storeName',
            className : 'itemer',
            width : '12%'
            
          },
          {
            title: '同步总数',
            dataIndex: 'allCount',
            key: 'allCount',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            className : 'itemer',
            width : '15%'
          },
          {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            className : 'itemer',
            width : '15%'
          },
          
          {
            title: '是否同步成功',
            dataIndex: 'isSuccess',
            key: 'isSuccess',
            className : 'itemer',
            width :'12%'
          },
          {
            title: '同步消息',
            dataIndex: 'syncMsg',
            key: 'syncMsg',
            className : 'itemer',
            width : '10%'
          },
          {
            title: '创建时间',
            dataIndex: 'crateTime',
            key: 'crateTime',
            className : 'itemer',
            width : '15%'
          }
        ]
        if(this.props.data && this.props.data.length>0){
          this.props.data.forEach((item,index) => {
            dataList.push({
              key : index,
              idx : item.recordId,
              storeName : item.storeName,
              allCount : item.totalCount,
              startTime : dateFormate(item.startTime),
              endTime : dateFormate(item.endTime),
              isSuccess : item.status?'是':'否',
              syncMsg : item.returnMsg,
              crateTime : dateFormate(item.createTime),
              updateTime : dateFormate(item.updateTime)
            })
          })
          this.setState({
            columns,
            dataList
          })
        }
        break
      case '2' :
        console.log(222)
        columns = [
          {
            title: '序号',
            dataIndex: 'idx',
            key: 'idx',
            className : 'itemer',
            width : '8%',
          },
          // {
          //   title: '店铺名称',
          //   dataIndex: 'storeName',
          //   key: 'storeName',
          //   className : 'itemer',
          //   width : '10%',
          // },
          {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            className : 'itemer',
            width : '15%',
          },
          {
            title:'订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '同步次数',
            dataIndex: 'allsyncCount',
            key: 'allsyncCount',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '是否成功',
            dataIndex: 'isSuccess',
            key: 'isSuccess',
            className : 'itemer',
            width : '8%',
          },
          {
            title: '快递单号',
            dataIndex: 'tradeNo',
            key: 'tradeNo',
            className : 'itemer',
            width : '15%',
          },
          {
            title: '物流公司',
            dataIndex: 'tradeCompany',
            key: 'tradeCompany',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '错误信息',
            dataIndex: 'errMsg',
            key: 'errMsg',
            className : 'itemer',
            width : '15%'
          },
          {
            title: '创建时间',
            dataIndex: 'crateTime',
            key: 'crateTime',
            className : 'itemer',
            width : '15%'
          },
        ]
       if( this.state.data&&this.state.data.length>0){
         this.state.data.forEach((item,index) => {
           dataList.push({
             key : index,
             idx : item.recordId,
             storeName : item.storeName,
             orderNo : item.orderNumber,
             orderStatus : item.orderStatus,
             isSuccess : item.isSyncSucc?'是':'否',
             tradeNo : item.expressNumber,
             errMsg : item.errorMsg,
             tradeCompany : item.logisticName,
             crateTime : dateFormate(item.createTime),
             updateTime : dateFormate(item.updateTime),
             allsyncCount :item.syncNumber
           })
         })
         this.setState({
             columns,
             dataList
           }
         )
       }else{
         // this.setState({
         //     columns,
         //     dataList : []
         //   }
         // )
       
       }
       console.log('----------1111111',columns,dataList)
        break
      case '3' :
        console.log(333)
        columns = [
          {
            title: '序号',
            dataIndex: 'idx',
            key: 'idx',
            className : 'itemer',
            width : 70
          },
          {
            title: '是否成功',
            dataIndex: 'isSuccess',
            key: 'isSuccess',
            className : 'itemer',
            width : 80
          },
          {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            className : 'itemer',
            width : 150
          },
          {
            title:'支付单号',
            dataIndex: 'tradeOrderNo',
            key: 'tradeOrderNo',
            className : 'itemer',
            width : 200
          },
          {
            title: '真实姓名',
            dataIndex: 'realName',
            key: 'realName',
            className : 'itemer',
            width : 100
          },
          {
            title: '身份证号',
            dataIndex: 'idCardNo',
            key: 'idCardNo',
            className : 'itemer',
            width : 140
          },
          {
            title: '错误信息',
            dataIndex: 'errMsg',
            key: 'errMsg',
            className : 'itemer',
            width : 180
          },
          {
            title: '支付金额',
            dataIndex: 'payAmount',
            key: 'payAmount',
            className : 'itemer',
            width : 80
          },
          {
            title: '订单税费',
            dataIndex: 'tax',
            key: 'tax',
            className : 'itemer',
            width : 80
          },
          {
            title : '订单邮费',
            dataIndex: 'postage',
            key: 'postage',
            className : 'itemer',
            width : 80
          },
          {
            title: '支付类型',
            dataIndex: 'payType',
            key: 'payType',
            className : 'itemer',
            width : 80
            
          },
          {
            title: '微信支付类型',
            dataIndex: 'weChatConfigName',
            key: 'weChatConfigName',
            className : 'itemer',
            width : 100
          },
          {
            title: '同步次数',
            dataIndex: 'allsyncCount',
            key: 'allsyncCount',
            className : 'itemer',
            width : 80
          },
          {
            title: '创建时间',
            dataIndex: 'crateTime',
            key: 'crateTime',
            className : 'itemer',
            width : 140
            
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            className : 'itemer',
            width : 140
          }
        ]
        this.state.data.forEach((item,index) => {
          dataList.push({
            key : index,
            isSuccess : item.isPushCustomSucc?'成功':'失败',
            idx : item.recordId,
            orderNo : item.orderNo,
            tradeOrderNo : item.tradeNo,
            realName : item.idCardName,
            idCardNo : item.idCardNo,
            errMsg : item.errorMsg,
            payAmount : item.payAmount,
            tax : item.orderTax,
            postage : item.postage,
            weChatConfigName : item.weChatConfigId,
            payType : this.transPayment(item.paymentType),
            allsyncCount : item.syncNumber,
            crateTime : dateFormate(item.createTime),
            updateTime : dateFormate(item.updateTime)
          })
        })
        console.log('----------------222222',columns,dataList)
        this.setState({
          columns,
          dataList
        })
        break
      case '4' :
        console.log(444)
        columns = [
          {
            title: '序号',
            dataIndex: 'idx',
            key: 'idx',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            className : 'itemer',
            width : '15%'
          },
          {
            title: '支付机构流水账号',
            dataIndex: 'payNo',
            key: 'payNo',
            className : 'itemer',
            width : '20%'
          },
          {
            title: '订单金额',
            dataIndex: 'orderPay',
            key: 'orderPay',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            className : 'itemer',
            width : '7%'
          },
          {
            title: '支付类型',
            dataIndex: 'payType',
            key: 'payType',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '微信类型',
            dataIndex: 'wenxinType',
            key: 'wenxinType',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '同步次数',
            dataIndex: 'allsyncCount',
            key: 'allsyncCount',
            className : 'itemer',
            width : '8%'
          },
          {
            title: '创建时间',
            dataIndex: 'crateTime',
            key: 'crateTime',
            className : 'itemer',
            width : '15%'
          },
          // {
          //   title: '更新时间',
          //   dataIndex: 'updateTime',
          //   key: 'updateTime',
          //   className : 'itemer',
          //   width : 140
          // }
          
        ]
        this.state.data.forEach((item,index) => {
          dataList.push({
            key : index,
            idx : item.recordId,
            orderNo : item.orderNo,
            payNo : item.tradeNo,
            orderPay : item.price,
            status : item.status,
            payType : this.transPayment(item.paymentType),
            wenxinType : item.weChatConfigId,
            allsyncCount : item.syncNumber,
            crateTime : dateFormate(item.createTime),
            updateTime : dateFormate(item.updateTime)
          })
        })
        this.setState({
          columns,
          dataList
        })
        break
      default :
        this.setState({
          columns : [],
          dataList : []
        })
    }
  }
  componentWillMount(){
    this.getTableData()
  }
  componentWillReceiveProps(nextProps){
    console.log('next--------',nextProps)
    this.setState({
      data : nextProps.data
    },() => {
      this.getTableData()
    })
  }
  render(){
    return(
      <div className={this.props.type==='3'?'history-page long':'history-page'}>
        <Table columns={this.state.columns}
               dataSource={this.state.dataList}
               bordered={true}
               pagination={false}
               scroll={this.props.type==='3'?{x:1800}:''}
        >
        </Table>
      </div>
    )
  }
}