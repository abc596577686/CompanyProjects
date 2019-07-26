import React from 'react'
import './index.less'
import Header from '../../components/Header'
import HomeHeader from "../../components/HomeHeader/index";
import {getCouponList} from '../../axios/api'
class CouponItem extends React.Component{
  state = {
    showHiddenBox : false,
    bottom : 'hidden'
  }
  componentWillMount(){
  
  
  }
  componentDidMount(){
    let colorRed = this.props.status == '0'?true:false
    console.log('didMount')
    this.setState({
      colorRed : colorRed
    })
  }
  componentWillUpdate(){
    console.log('willup')
    
  }
  componentDidUpdate(){
    console.log('didup')
  }
  componentWillReceiveProps(newProps){
    console.log('new',newProps,this.props)
    let colorRed = newProps.status == '0'?true:false
    this.setState({
      colorRed : colorRed,
      showHiddenBox : false,
      bottom : 'hidden'
    })
  }
  
  showHiddenBox = () =>{
    let showHiddenBox = !this.state.showHiddenBox
    let bottom = showHiddenBox?'bottom-hidden':'hidden'
    this.setState({
      bottom : bottom,
      showHiddenBox : showHiddenBox
    })
  }
  render(){
    let data = this.props.data
    // console.log(data)
    // console.log('-------',data)
    data.fullAmount = parseInt(data.fullAmount)
    data.giveAmount = parseInt(data.giveAmount)
    return(
      <li className={this.state.colorRed?'colorRed':''}>
        <div className='coupon-top'>
          <div className='c-left'>
            <div>
              <span className='a'>￥</span>
              <span className='b'>{data.giveAmount}</span>
            </div>
            <div>满{data.fullAmount}使用</div>
          </div>
          <div className='c-center'>
            <div className='c-c-top'>
              <span className='tags'>{data.typeName}</span>
              <span className='info'>{data.couponName}</span>
            </div>
            <div className='time'>{data.effectiveTimeFormat}</div>
          </div>
          <div className='c-right'>
            <div className='btn' style={{visibility:this.state.colorRed?'visible':'hidden'}}>立即使用</div>
          </div>
        </div>
        <div className='coupon-bottom'>
          <div className='bottom' onClick={this.showHiddenBox}>
            <span>{data.title}</span>
            <i className='fa fa-caret-down'></i>
          </div>
            <div className={this.state.bottom}>{data.bindNames}</div>
        </div>
      </li>
    )
  }
}
export default class Coupon extends React.Component{
  state = {
    icon_arrow1 : 'fa fa-caret-down',
    icon_arrow2 : 'fa fa-caret-up',
    sortList : [
      {
        title:'使用期限',
        isUp : false
      
      },
      {
        title:'优惠金额',
        isUp : false
        
      }
    ],
    isUp : false,
    sortIndex : '0',
    couponList: [
    
    ],
    statusList : [
      '未使用',
      '已使用',
      '已过期'
    ],
    curIndex : '0'
  
  }
  selStatus = (e) =>{
   let curIndex = e.target.getAttribute('data-index')
    this.setState({
      curIndex : curIndex
    },()=>{
      this._getCouponList(curIndex)
    })
    
  
  }
  sortChange = (e) => {
    let sortIndex = e.target.getAttribute('data-index')
    let list = this.state.sortList
    list[sortIndex].isUp = !list[sortIndex].isUp
    this.setState({
      sortIndex : sortIndex,
      sortList : list
    })
  }
  _getCouponList = (status) => {
    let params = {
      pageidx: '0',
      pagesize: '100',
      status: status || '0',
      lastId: '1'
    }
    getCouponList(params).then(res => {
      // console.log('--------',res)
      if(res.data.code=='1'){
        let couponList = res.data.dataList
        this.setState({
          couponList : couponList
        })
        
      }
    })
  }
  componentDidMount(){
    this._getCouponList()
  }
  render(){
    return(
      <div className='coupon_container'>
        <Header/>
        <HomeHeader/>
        <div className='coupon_content'>
          <div className='coupon_title'>
            <div className='left_handle'>
              <ul className='clearfix'>
                {this.state.statusList.map((item,index)=>{
                  return(
                    <li className={index == this.state.curIndex?'active':''} key={index}>
                      <a href="javascript:void (0)"  onClick={this.selStatus} data-index={index}>{item}</a>
                    </li>
                  )
                })
                }
                
                
              </ul>
            </div>
            <div className='right_handle'>
              <span>排序</span>
              {this.state.sortList.map((item,index)=>{
                return (
                  <a href="javascript:void (0)"
                     className={index==this.state.sortIndex?'active':''}
                     key={index}
                     onClick={this.sortChange}
                     data-index={index}>
                    {item.title}&nbsp;
                    <i className={item.isUp?'fa fa-caret-up':'fa fa-caret-down'}></i>
                  </a>
                )
              })}
              {/*<a href="javascript:void (0)">*/}
                {/*优惠金额&nbsp;*/}
                {/*<i className={this.state.icon_arrow2}></i>*/}
              {/*</a>*/}
            </div>
          </div>
          <div className='coupon_list'>
            <ul>
              {this.state.couponList.map((item,index) => {
                return <CouponItem key={index} status={this.state.curIndex} data={item}/>
              })}
            </ul>
          </div>
          
        </div>
      
      
      </div>
    )
  }
}