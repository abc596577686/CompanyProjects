import React from 'react';
import OrderSearchComUI from '../view/index'
import {Form, message} from 'antd'
import {erpStoreList, orderPay} from "../../../axios/api";
class OrderSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showMoreBox: false,
      storeList: []
    }
  }
  //重置表单
  resetForm = () => {
    this.props.form.resetFields();
  }
  changeShowBox = () => {
    this.setState({
      showMoreBox: !this.state.showMoreBox
    })
  }
  componentWillMount() {
    erpStoreList().then(res => {
      if(res.data.code==='1'){
        console.log(res.data.data)
        this.setState({
          storeList : res.data.data
        })
      }else{
        this.setState({
          storeList : []
        })
      }
    })
  }
  render(){
    const {
      form,onSearch
    } = this.props;
    return(
      <OrderSearchComUI
        _searchGoodsCallback = {onSearch}
        _resetFormCallback = {this.resetForm}
        _changeShowBoxCallBack = {this.changeShowBox}
        showMoreBox = {this.state.showMoreBox}
        storeList = {this.state.storeList}
        form = {form}
      />
    )
  }
}
const OrderSearchComponent  = Form.create()(OrderSearch)
export default OrderSearchComponent
