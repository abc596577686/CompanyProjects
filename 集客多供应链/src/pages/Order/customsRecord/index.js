import React from 'react';
import OpHisTory from '../../../components/OperateHisTory'
import {customsList} from '../../../axios/api'
import {Button,Input,Row,Col,Form,Icon,Modal,Spin,Pagination} from 'antd'
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export default class CustomsRecord extends React.Component {
  state = {
    data : [],
    showSearchBox : false,
    pageidx : 1,
    pagesize : 20
  }
  getDataList = (params) => {
    this.setState({
      showLoading : true
    })
    customsList(params,'get').then(res => {
      this.setState({
        showLoading : false
      })
      console.log(res)
      if(res.data.code=='1'){
        let data = res.data.data
        this.setState({
          data,
          loadingSearch:false,
          total : res.data.count
        })
      }
    })
  }
  componentWillMount(){
    let params = {
      pageidx : 1,
      pagesize : 20
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
  onChangeC = (e) => {
    let val = e.target.value
    this.setState({
      idCardName : val
    })
  }
  onChangeD = (e) => {
    let val = e.target.value
    this.setState({
      idCardNo : val
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
      {
        key: 'idCardName',
        value: this.state.idCardName,
      },
      {
        key: 'idCardNo',
        value: this.state.idCardNo,
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
        pageidx : this.state.pageidx
      }
      
    }
    console.log('-------', params);
    return params;
  };
  handleOk = () => {
    this.setState({
      loadingSearch : true,
      showSearchBox : false
    })
    let params = this.getFilters()
    this.getDataList(params)
  }
  handleCancel = () =>{
    this.setState({
      showSearchBox : false
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
               width='600px'
        >
          <div className='search-boxerrr'>
            <FormItem
              label="订单ID"
              {...formItemLayout}>
              <Input onChange={this.onChangeA} size='small'/>
            </FormItem>
            <FormItem
              label="支付机构流水号"
              {...formItemLayout}>
              <Input onChange={this.onChangeB} size='small'/>
            </FormItem>
            <FormItem
              label="真实姓名"
              {...formItemLayout}>
              <Input onChange={this.onChangeC} size='small'/>
            </FormItem>
            <FormItem
              label="身份证号"
              {...formItemLayout}>
              <Input onChange={this.onChangeD} size='small'/>
            </FormItem>
          </div>
        </Modal>
        <Spin spinning={this.state.showLoading}>
          <OpHisTory type='3' data={this.state.data}/>
          <Pagination size="small" total={this.state.total} showTotal={this.showTotal} onChange={this.changePage} pageSize={this.state.pagesize}/>
        </Spin>
      </div>
    )
  }
}