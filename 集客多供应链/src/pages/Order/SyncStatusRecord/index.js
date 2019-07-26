import React from 'react';
import OpHisTory from '../../../components/OperateHisTory'
import {SyncList} from '../../../axios/api'
import {Pagination,Spin,message} from 'antd'

export default class SyncStatusRecord extends React.Component {
  state = {
    data : [],
    pagesize : 20,
    pageidx : 1
  }
  componentWillMount(){
    this.getTableList()
  }
  getTableList = () => {
    this.setState({
      showLoading : true
    })
    let params = {
      pageidx : this.state.pageidx,
      pagesize : this.state.pagesize
    }
    SyncList(params,'get').then(res => {
      console.log(res)
      this.setState({
        showLoading : false
      })
      if(res.data.code=='1'){
        let data = res.data.data
        let total = res.data.count
        this.setState({
          data,
          total
        })
        if(!res.data.data||res.data.data.length===0){
          message.warn('搜索商品失败')
        }
      }else{
        message.error(res.data.msg)
      }
    })
  }
  showTotal = () => {
    return(
      `共有 ${this.state.total} 条`
    )
  }
  changePage = (e) => {
    this.setState({
      pageidx : e
    },() => {
      this.getTableList()
    })
  }
  render() {
    return (
      <div className="page" style={{backgroundColor:'#fff',padding:'10px'}}>
       <Spin spinning={this.state.showLoading}>
         <OpHisTory type='1' data={this.state.data}/>
         <Pagination size="small" total={this.state.total} showTotal={this.showTotal} onChange={this.changePage} pageSize={this.state.pagesize}/>
       </Spin>
      </div>
    )
  }
}