import React from 'react';
import OpHisTory from '../../../components/OperateHisTory'
import {SyncstatusList} from '../../../axios/api'
import {Button,Input,Row,Col,Form,Icon,Modal,Spin,Pagination,message} from 'antd'
import './index.less';
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
export default class SyncStatus extends React.Component {
  state = {
    pageidx : 1,
    pagesize : 20,
    data : [],
    showSearchBox : false
    
  }
  getDataList = (params) => {
    this.setState({
      showLoading : true
    })
    SyncstatusList(params,'get').then(res => {
      this.setState({
        showLoading :false
      })
      console.log('------',res)
      if(res.data.code == '1'){
        this.setState({
          data : res.data.data,
          loadingSearch: false,
          total : res.data.count
        })
        if(!res.data.data||res.data.data.length===0){
          message.warn('搜索商品失败')
        }
      }else{
        message.warn(res.data.msg)
      }
    })
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
      logisticCode : val
    })
  }
  getFilters = () => {
    let params
    let filters = [
      {
        key: 'orderNumber',
        value: this.state.orderNo,
      },
      {
        key: 'expressNumber',
        value: this.state.logisticCode,
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
  handleOk = () =>{
    this.setState({
      loadingSearch : true
    })
    let params = this.getFilters()
    this.getDataList(params)
    this.setState({
      showSearchBox : false
    })
    
  }
  handleCancel =() =>{
    this.setState({
      showSearchBox : false
    })
    
  }
  componentWillMount(){
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize
    }
    this.getDataList(params)
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
      <div className="page syncStatus-page">
          <Modal visible={this.state.showSearchBox}
                 title="开始搜索"
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
                 okText='搜索'
          
          >
            <div className='search-boxerrr'>
                 <Form>
                   <FormItem
                     label="订单ID"
                     {...formItemLayout}>
                     <Input onChange={this.onChangeA}/>
                   </FormItem>
                   <FormItem
                     label="快递单号"
                     {...formItemLayout}>
                     <Input onChange={this.onChangeB}/>
                   </FormItem>
                 </Form>
            </div>
          </Modal>
            <div>
              <Button onClick={() => this.setState({showSearchBox:true})} style={{marginBottom:'20px'}} icon='search'>搜索</Button>
            </div>
       <Spin spinning={this.state.showLoading}>
         <OpHisTory type='2' data={this.state.data}/>
         <Pagination size="small" total={this.state.total} showTotal={this.showTotal} onChange={this.changePage} pageSize={this.state.pagesize}/>
       </Spin>
      </div>
    )
  }
}