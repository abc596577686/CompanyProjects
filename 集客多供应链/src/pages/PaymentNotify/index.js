import React from 'react';
import OpHisTory from '../../components/OperateHisTory'
import {orderPayList} from '../../axios/api'
import {Button,Input,Row,Col,Form,Icon,Modal,Spin,Pagination} from 'antd'
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export default class PaymentNotify extends React.Component {
  state = {
    data : [],
    loadingSearch : false,
    pagesize : 10,
    pageidx : 1,
    total : 0
  }
  getDataList = (params) => {
    this.setState({
      showLoading : true
    })
    orderPayList(params,'get').then(res => {
      this.setState({
        showLoading : false
      })
      console.log(res)
      if(res.data.code=='1'){
        let data = res.data.data
        this.setState({
          loadingSearch : false,
          data
        })
      }
    })
  }
  componentWillMount(){
    let params = {
      pageidx : 1,
      pagesize : 10
    }
    this.getDataList(params)
    
  }
  onChangeA = (e) => {
    let val = e.target.value
    this.setState({
      orderNo : val
    })
  }
  onChangeB = (e) => {
    let val = e.target.value
    this.setState({
      tradeNo : val
    })
  }
  getFilters = () => {
    let params
    let filters = [
      {
        key: 'orderNo',
        value: this.state.orderNo,
      },
      {
        key: 'tradeNo',
        value: this.state.tradeNo,
      },
    ];
    filters = filters.filter(item => item.value !== undefined && item.value !== '')
    if(filters.length>0){
      filters = encodeURIComponent(JSON.stringify(filters))
      params = {
        pageidx : this.state.pageidx,
        pagesize : this.state.pagesize,
        filters
      }
    }else{
      params = {
        pagesize : this.state.pagesize,
        pageidx : this.state.pagesize
      }
      
    }
    console.log('-------', params);
    return params;
  };
  handleOk = () => {
    this.setState({
      showSearchBox:false
    })
    let params = this.getFilters()
    this.getDataList(params)
    
    
  }
  handleCancel = () =>{
    this.setState({
      showSearchBox:false
    })
  }
  showTotal = () => {
    return(
      `共有 ${this.state.total} 条`
    )
  }
  changePage = (e) => {
    console.log('-----------',e)
    this.setState({
      pageidx : e
    },() => {
      let params = this.getFilters()
      this.getDataList(params)
    })
  }
  render() {
    return (
      <div style={{backgroundColor:'#fff',padding:'10px'}}>
        <Button onClick={() => {this.setState({showSearchBox:true})}} icon='search' style={{marginBottom:'20px'}}>
          搜索
        </Button>
        <Modal visible={this.state.showSearchBox}
               title="开始搜索"
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               okText='搜索'
               width='650px'
        >
          <div className='search-boxerrr'>
                <FormItem
                  label="订单ID"
                  {...formItemLayout}>
                  <Input onChange={this.onChangeA}/>
                </FormItem>
                <FormItem
                  label="支付机构流水账号"
                  {...formItemLayout}>
                  <Input onChange={this.onChangeB}/>
                </FormItem>
          </div>
        </Modal>
        <OpHisTory type='4' data={this.state.data}/>
        <Pagination size="small" total={this.state.total} showTotal={this.showTotal} onChange={this.changePage}/>
      </div>
    )
  }
}