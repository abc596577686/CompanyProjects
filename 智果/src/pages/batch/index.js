import React from 'react';
import './index.less'
import IHeader from '../../components/Header';
import HomeHeader from '../../components/HomeHeader';
import axios from 'axios'
import {message,Upload,Button,Icon,Modal,Table,Spin,Switch,Card} from 'antd'
import {baseUrl,orderImport} from '../../axios/api'
import PageFooter from '../../components/PageFooter'
const download1 = `${baseUrl}download/getTemplateFile?key=1`
const download2 =`${baseUrl}download/getTemplateFile?key=2`
const confirm = Modal.confirm

export default class Batch extends React.Component{
  constructor(){
    super()
    this.myForm = React.createRef()
    this.file = React.createRef()
  }
  state = {
    columns : [
      {
        title : '行号',
        dataIndex: 'key',
        key: 'key',
        width: 30
      },
      {
        title : '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 80
      },
      {
        title : '条形码',
        dataIndex: 'productUpc',
        key: 'productUpc',
        width: 90
      },
      {
        title : '收货人(手机号)',
        dataIndex: 'customerInfo',
        key: 'customerInfo',
        width: 110,
        render : (text,record)=>{
          return(
            <div>
              {record.customerName}({record.customerPhone})
            </div>
          )
        }
      },
      {
        title : '收货地址',
        dataIndex: 'addressInfo',
        key: 'addressInfo',
        width: 180,
        render : (text,record)=>{
          return(
            <div>
              {record.province+record.city+record.area}
              {record.address}
            </div>
          )
        }
      },
      {
        title : '订单数量',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 50
      },
      {
        title : '订单金额',
        dataIndex : 'totalPrice',
        key : 'totalPrice',
        width: 50
      },
      {
        title : '错误信息',
        dataIndex: 'errorMsgList',
        key: 'errorMsgList',
        width: 200
      },
    ],
    orderIds : [],
    showLoading : false,
    isIgnore : ''
  }
  submitFile = () => {
    // this.handleOk()
    this.setState({
      showLoading : true,
      isIgnore : '',
      token : ''
    })
    console.log(this.myForm.current)
    let formData = new FormData()
    // let file = this.file.current
    // console.log(file.files)
    if(this.state.file === undefined){
      message.warn('请选择要上传的文件！')
      return
    }
    formData.append('img',this.state.file)
    console.log('------------',formData,this.state.file)
    axios({
      method : 'post',
      url : `${baseUrl}/batchImport/orderCheck`,
      headers: {"Content-Type": "multipart/form-data"},
      data : formData
    }).then(res => {
      console.log(res)
      if(res.data.code == 1){
        this.handleOk()
        let data = res.data.data;
        let token = res.data.token
        data.forEach((item,index) => {
          item.key = index+1
          if(item.errorMsgList.length>0){
            item.bgc = 'abnormal'
          }
        })
        this.setState({
          dataSource : data,
          showLoading : false,
          fileValue : '',
          token,
        })
      }else{
        message.error(res.data.msg)
      }
    })
  }
  handleUpload = (e) => {
    console.log('文件内容-----',e.target.files);
    const reader = new FileReader();
    // 读取文件内容，结果用data:url的字符串形式表示
    reader.readAsDataURL(e.target.files[0]);
    let that = this
    reader.onload = function (e) {
      console.log('上传的文件的编码---------',e.target);  //
      that.setState({
        previewPic: e.target.result
      });
    }
  }
  getFile = (e) => {
    let fileValue = e.target.value
    let file = e.target.files[0]
    console.log('文件---------------',this.myForm,file,fileValue)
    this.setState({
      file,
      fileName : file.name,
      fileValue
    })
  }
  triggerGetFile = () => {
    this.file.current.click()
  }
  handleOk = () => {
    this.setState({
      visible: true
    })
  }
  checkItem = (a,b) => {
    console.log(a,b)
    let selectedKeys = a
    let selectedList = b
    if(selectedKeys.length>0){
      this.setState({
        hasSelected : true,
        selectedList,
        selectedKeys
      })
    }else{
      this.setState({
        hasSelected : false,
        selectedList,
        selectedKeys
      })
    }
  }
  _orderImport =()=> {
    let data = this.state.dataSource
    let token = this.state.token
    let isIgnore = this.state.isIgnore
    this.setState({
      showLoading : true
    })
    orderImport(data,'post',token,isIgnore).then(res => {
      console.log(res)
      this.setState({
        showLoading : false
      })
      if(res.data.code==='1'){
        message.success('导入订单成功')
        this.setState({
          visible : false,
          file : undefined,
          fileName : '',
        })
      }else{
        message.error(<span dangerouslySetInnerHTML={{__html:res.data.msg}}></span>)
      }
    })
  }
  delSomeRows = () => {
    let selectedKeys = this.state.selectedKeys
    let data = this.state.dataSource
    let restList = data.filter(item => selectedKeys.indexOf(item.key) === -1)
    this.setState({
      dataSource:restList,
      selectedKeys : [],
      selectedList :[],
      hasSelected : false
    })
  }
  showConfirm =() => {
    let that = this
    confirm({
      title: '提示',
      content: '确认生成订单吗?',
      onOk() {
        that._orderImport()
        that.setState({
          selectedRowKeys : ''
        })
      },
      onCancel() {
        console.log('Cancel');
        that.setState({
          selectedRowKeys : ''
        })
      },
    });
  }
  
  showDel =(val) => {
    let that = this
    confirm({
      title: '提示?',
      content: '确认删除选中的订单？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        that.delSomeRows()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  switchChange = (e) => {
    console.log(e)
    if(e){
      this.setState({
        isIgnore : '1'
      })
    }else{
      this.setState({
        isIgnore : ''
      })
    }
    
  }
  render(){
    const confirmBox = (
      <Modal
        title="订单批量导入校验"
        width={1000}
        okText="确认导入订单"
        visible={this.state.visible}
        className='orderModal'
        onOk={this._orderImport}
        destroyOnClose = {true}
        onCancel={() => {this.setState({visible : false})}}>
        <div className='table-box1'>
          <div className='switchBox'>
            <Switch onChange={this.switchChange } checkedChildren="是" unCheckedChildren="否"/>
            <span className='info'>是否忽略已存在订单</span>
          </div>
          <Table columns={this.state.columns}
                dataSource={this.state.dataSource}
                pagination ={false}
                size='small'
                 scroll={{y:400}}
                rowClassName = {record => record.bgc==='abnormal'?'abnormal':'normal'}
                bordered>
          </Table>
        </div>
      </Modal>
    )
    
    return(
      <Spin spinning={this.state.showLoading}>
       <Card>
         <div className='batch_container'>
           {confirmBox}
           <div className='batch_content'>
             <div className='title'>操作说明</div>
             <div className='item'>
               <p>一、点击 " 下载最新地区列表 " 获取最新的地区列表； </p>
               <a href={download2} className='downLoad'>立即下载最新地区列表</a>
             </div>
             <div className='item'>
               <p>二、点击 " 下载智果导入模板 " 获取导入模板, 根据模板格式填入所需信息；</p>
               <a href={download1} className='downLoad'>立即下载导入模板</a>
             </div>
             <div className='item'>
               <p>三、点击 " 上传文件 " 进行批量下单；</p>
               <p>完成即可点击" 订单 - 全部订单" 查看导入成功的待付款订单</p>
             </div>
             <div id="upload-pic">
               <form
                 encType="multipart/form-data"
                 id = 'form'
                 ref = {this.myForm}
               >
                 <input type="file"
                        name='img' ref={this.file}
                        onChange={this.getFile}
                        style={{display:'none'}}
                        value={this.state.fileValue}
          
                 />
               </form>
               <div className='fileBox'>
                 <div className='fileName'>{this.state.fileName}</div>
                 <div className='oprateFile' onClick={this.triggerGetFile}>选择文件</div>
               </div>
             </div>
             <div className='btn btn-danger' style={{marginTop:'30px',borderRadius:'2px'}} onClick={this.submitFile}>上传文件</div>
           </div>
         </div>
       </Card>
      </Spin>
    )
  }
}
class ProductList extends React.Component{
  state = {
    columns : [
      {
        title : '商品名称',
        dataIndex : 'productName',
        key: 'productName'
      },
      {
        title : '商品数量',
        dataIndex : 'quantity',
        key: 'quantity'
      },
      {
        title : '商品价格',
        dataIndex : 'productPrice',
        key: 'productPrice'
      },
      {
        title : '商品税费',
        dataIndex : 'totalTax',
        key: 'totalTax',
      },
      {
        title : '小计',
        dataIndex : 'paymentPrice',
        key: 'paymentPrice',
      }
    ]
    
  }
  render(){
    return(
      <div>
        <Table columns={this.state.columns}
               dataSource={this.props.data}
               pagination={false}
        >
        </Table>
      </div>
    )
  }
  
}